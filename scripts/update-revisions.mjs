#!/usr/bin/env node
// update-revisions.mjs
// Purpose: Ensure product lastRevised dates are kept in sync with git modifications.
// - For single-product files: lastRevised >= file's last commit date
// - For multi-product files: if HEAD modified lines within a product object, set lastRevised to HEAD commit date for that product
// Usage:
//   node scripts/update-revisions.mjs        # apply fixes
//   node scripts/update-revisions.mjs --check  # only check, exit 1 if changes needed

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'src', 'data', 'products');
const CHECK_MODE = process.argv.includes('--check');

function run(cmd, opts = {}) {
  try {
    return execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8', ...opts }).trim();
  } catch (e) {
    return '';
  }
}

function toISO(dateStr) {
  // Expect formats like 2025-01-31; normalize to YYYY-MM-DD
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().split('T')[0];
}

function getHeadSha() {
  const sha = run('git rev-parse HEAD');
  return sha || null;
}

function getCommitDate(sha) {
  if (!sha) return null;
  const date = run(`git show -s --format=%cs ${sha}`); // %cs = committer date, short (YYYY-MM-DD)
  return date || null;
}

function getFileLastCommitDate(filePath) {
  const date = run(`git log -1 --format=%cs -- ${escapePath(filePath)}`);
  return date || null;
}

function escapePath(p) {
  // Quote path to handle spaces
  return `'${p.replace(/'/g, `'\''`)}'`;
}

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.ts')) results.push(full);
  }
  return results;
}

function computeLineOffsets(text) {
  const lines = text.split(/\n/);
  let offset = 0;
  const lineOffsets = lines.map((l) => {
    const start = offset;
    offset += l.length + 1; // include \n
    return { start, end: offset };
  });
  return { lines, lineOffsets };
}

function scanProductObjects(text) {
  // Naive but practical scanner to find top-level product object literals
  // Heuristic: capture object blocks that include name:, company:, category:
  const objects = [];
  const { lineOffsets } = computeLineOffsets(text);

  let i = 0;
  const n = text.length;
  let inStr = false; let strCh = '';
  let inLineComment = false; let inBlockComment = false;
  let depth = 0;

  const stack = [];

  while (i < n) {
    const ch = text[i];
    const next = text[i + 1];

    if (inLineComment) {
      if (ch === '\n') inLineComment = false;
      i++; continue;
    }
    if (inBlockComment) {
      if (ch === '*' && next === '/') { inBlockComment = false; i += 2; continue; }
      i++; continue;
    }
    if (inStr) {
      if (ch === '\\') { i += 2; continue; }
      if (ch === strCh) { inStr = false; strCh = ''; i++; continue; }
      i++; continue;
    }

    if (ch === '/' && next === '/') { inLineComment = true; i += 2; continue; }
    if (ch === '/' && next === '*') { inBlockComment = true; i += 2; continue; }
    if (ch === '"' || ch === '\'' || ch === '`') { inStr = true; strCh = ch; i++; continue; }

    if (ch === '{') {
      stack.push(i);
      depth++;
      i++; continue;
    }
    if (ch === '}') {
      const start = stack.pop();
      depth--;
      const end = i + 1;
      if (start != null) {
        const objText = text.slice(start, end);
        // quick filter
        if (/\bname\s*:\s*['"`]/.test(objText) && /\bcompany\s*:\s*['"`]/.test(objText) && /\bcategory\s*:\s*['"`]/.test(objText)) {
          // compute start/end line numbers
          const startLine = lineOffsets.findIndex(o => o.start <= start && o.end > start) + 1;
          const endLine = lineOffsets.findIndex(o => o.start < end && o.end >= end) + 1;
          const idMatch = objText.match(/\bid\s*:\s*['"`]([^'"`]+)['"`]/);
          const nameMatch = objText.match(/\bname\s*:\s*['"`]\s*([^'"`]+)\s*['"`]/);
          const companyMatch = objText.match(/\bcompany\s*:\s*['"`]\s*([^'"`]+)\s*['"`]/);
          objects.push({ start, end, startLine, endLine, text: objText, id: idMatch?.[1], name: nameMatch?.[1], company: companyMatch?.[1] });
        }
      }
      i++; continue;
    }

    i++;
  }

  // Sort by start index
  objects.sort((a, b) => a.start - b.start);
  return objects;
}

function findLastRevised(objText) {
  const m = objText.match(/lastRevised\s*:\s*(["'`])([^"'`]+)\1/);
  if (m) return { value: m[2], quote: m[1], index: m.index, length: m[0].length };
  return null;
}

function insertOrUpdateLastRevised(obj, newDate) {
  const { text } = obj;
  const found = findLastRevised(text);
  if (found) {
    // Replace inside the existing property
    const before = text.slice(0, found.index);
    // found.index points to start of 'lastRevised'; now replace the value portion
    const propMatch = text.slice(found.index).match(/lastRevised\s*:\s*(["'`])([^"'`]+)\1/);
    if (!propMatch) return null;
    const propStart = found.index + propMatch.index;
    const propEnd = propStart + propMatch[0].length;
    const updated = `${text.slice(0, propStart)}lastRevised: "${newDate}"${text.slice(propEnd)}`;
    return updated;
  }
  // Insert after lastUpdated if present, else after opening brace
  const afterLastUpdated = text.match(/lastUpdated\s*:\s*(["'`])[^"'`]+\1\s*,?/);
  let insertPos = -1;
  if (afterLastUpdated && typeof afterLastUpdated.index === 'number') {
    // Insert after the end of this match, at next newline
    const endPos = (afterLastUpdated.index + afterLastUpdated[0].length);
    const nl = text.indexOf('\n', endPos);
    insertPos = nl >= 0 ? nl + 1 : endPos;
  } else {
    // After first '{' and newline
    const brace = text.indexOf('{');
    const nl = text.indexOf('\n', brace);
    insertPos = nl >= 0 ? nl + 1 : brace + 1;
  }
  // Determine indentation from next line
  const nextLineEnd = text.indexOf('\n', insertPos);
  const nextLineStart = insertPos;
  const sample = text.slice(nextLineStart, nextLineEnd >= 0 ? nextLineEnd : nextLineStart + 100);
  const indentMatch = sample.match(/^(\s*)/);
  const indent = indentMatch ? indentMatch[1] : '  ';
  const insertText = `${indent}lastRevised: "${newDate}",\n`;
  const updated = text.slice(0, insertPos) + insertText + text.slice(insertPos);
  return updated;
}

function buildLineToCommitMap(filePath, totalLines) {
  const blame = run(`git blame --line-porcelain -- ${escapePath(filePath)}`);
  if (!blame) return null;
  const lines = blame.split('\n');
  const map = [];
  let currentSha = null;
  let lineNo = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^[0-9a-f]{7,40}\s/.test(line)) {
      const parts = line.split(' ');
      currentSha = parts[0];
    } else if (line.startsWith('lineno ')) {
      lineNo = parseInt(line.slice('lineno '.length), 10);
      // map is 1-indexed by lines
      map[lineNo] = currentSha;
    }
  }
  // Sometimes lineno entries aren't present; fallback to counting with 'newline' markers
  if (!map.length || map.filter(Boolean).length === 0) {
    let ln = 0;
    for (const l of lines) {
      if (l === '') continue;
      if (/^[0-9a-f]{7,40}\s/.test(l)) {
        const parts = l.split(' ');
        currentSha = parts[0];
      }
      if (l.startsWith('\t')) { // actual code line starts with tab per porcelain format
        ln++;
        map[ln] = currentSha;
      }
    }
  }
  // Ensure length
  for (let i = 1; i <= totalLines; i++) if (!map[i]) map[i] = null;
  return map;
}

function updateFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const objects = scanProductObjects(original);
  if (objects.length === 0) return { changed: false };

  const { lines } = computeLineOffsets(original);
  const headSha = getHeadSha();
  const headDate = getCommitDate(headSha);

  const lineToSha = objects.length > 1 ? buildLineToCommitMap(filePath, lines.length) : null;

  const single = objects.length === 1;
  const fileDate = single ? getFileLastCommitDate(filePath) : null;

  let changed = false;
  let newContent = '';
  let cursor = 0;

  for (let idx = 0; idx < objects.length; idx++) {
    const obj = objects[idx];

    // Determine if we should update this object
    let desiredDate = null;
    if (single) {
      desiredDate = fileDate;
    } else {
      if (lineToSha && headSha && headDate) {
        // Check if any line in range belongs to HEAD
        let modified = false;
        for (let ln = obj.startLine; ln <= obj.endLine; ln++) {
          if (lineToSha[ln] === headSha) { modified = true; break; }
        }
        if (modified) desiredDate = headDate;
      }
    }

    // Compare with existing lastRevised
    const existing = findLastRevised(obj.text);
    const existingISO = existing ? toISO(existing.value) : null;

    if (desiredDate) {
      const desiredISO = toISO(desiredDate);
      let shouldUpdate = false;
      if (!existingISO) shouldUpdate = true;
      else if (existingISO < desiredISO) shouldUpdate = true;

      if (shouldUpdate && desiredISO) {
        const updatedObjText = insertOrUpdateLastRevised(obj, desiredISO);
        if (updatedObjText && updatedObjText !== obj.text) {
          // splice into file content
          newContent += original.slice(cursor, obj.start) + updatedObjText;
          cursor = obj.end;
          changed = true;
        }
      }
    }
  }

  if (!changed) return { changed: false };
  // append remainder
  newContent += original.slice(cursor);

  if (!CHECK_MODE) {
    fs.writeFileSync(filePath, newContent, 'utf8');
  }
  return { changed: true };
}

function main() {
  // Ensure we're in a git repo
  const isGit = run('git rev-parse --is-inside-work-tree');
  if (isGit !== 'true') {
    console.error('Not a git repository. Skipping revision update.');
    process.exit(0);
  }

  const files = walk(DATA_DIR);
  const touched = [];

  for (const file of files) {
    const res = updateFile(file);
    if (res.changed) touched.push(path.relative(ROOT, file));
  }

  if (touched.length) {
    if (CHECK_MODE) {
      console.error('Revision dates out of date in:');
      for (const f of touched) console.error(' - ' + f);
      console.error('Run: node scripts/update-revisions.mjs to update them.');
      process.exit(1);
    } else {
      console.log('Updated lastRevised in:');
      for (const f of touched) console.log(' - ' + f);
    }
  } else {
    console.log('All product lastRevised dates are up to date.');
  }
}

main();
