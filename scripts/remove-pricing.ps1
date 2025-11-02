# Script to remove pricing sections from product files
$productFiles = Get-ChildItem -Path "src\data\products" -Recurse -Filter "*.ts" -Exclude "index.ts"

$pricingPattern = '(?s)(\r?\n\s*//\s*Pricing Information\r?\n\s*pricing:\s*\{[^}]*\},?)|(\r?\n\s*pricing:\s*\{[^}]*\},?)'

$filesModified = 0

foreach ($file in $productFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    if ($content -match 'pricing:') {
        Write-Host "Processing: $($file.FullName)"
        
        # Remove pricing sections
        $newContent = $content -replace $pricingPattern, ''
        
        # Clean up any double blank lines
        $newContent = $newContent -replace '(\r?\n\s*){3,}', "`r`n`r`n"
        
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        $filesModified++
        Write-Host "  Removed pricing from $($file.Name)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Total files modified: $filesModified" -ForegroundColor Cyan
