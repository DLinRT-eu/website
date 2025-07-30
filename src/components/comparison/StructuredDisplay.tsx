import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { parseAndGroupStructures, StructureGroup } from '@/utils/structureGrouping';

interface StructuredDisplayProps {
  structures: string[] | any[];
  maxStructuresPerGroup?: number;
  maxInitialGroups?: number;
  compact?: boolean;
}

const StructuredDisplay: React.FC<StructuredDisplayProps> = ({
  structures,
  maxStructuresPerGroup = 8,
  maxInitialGroups = 3,
  compact = false
}) => {
  const [showAll, setShowAll] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  if (!structures || structures.length === 0) {
    return <span className="text-muted-foreground">N/A</span>;
  }

  const { groups, ungrouped } = parseAndGroupStructures(structures);
  
  if (groups.length === 0 && ungrouped.length === 0) {
    return <span className="text-muted-foreground">N/A</span>;
  }

  const toggleGroup = (modelName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(modelName)) {
      newExpanded.delete(modelName);
    } else {
      newExpanded.add(modelName);
    }
    setExpandedGroups(newExpanded);
  };

  const renderGroup = (group: StructureGroup, isExpanded: boolean) => {
    const displayStructures = isExpanded ? 
      group.structures : 
      group.structures.slice(0, maxStructuresPerGroup);
    
    const hasMore = group.structures.length > maxStructuresPerGroup;

    return (
      <div key={group.modelName} className="mb-3 last:mb-0">
        <div className="font-medium text-primary text-sm mb-1">
          {group.modelName}:
        </div>
        <div className="text-sm text-muted-foreground pl-3">
          • {displayStructures.join(', ')}
          {hasMore && !isExpanded && (
            <button
              onClick={() => toggleGroup(group.modelName)}
              className="ml-2 text-primary hover:underline text-xs"
            >
              +{group.structures.length - maxStructuresPerGroup} more
            </button>
          )}
          {hasMore && isExpanded && (
            <button
              onClick={() => toggleGroup(group.modelName)}
              className="ml-2 text-primary hover:underline text-xs"
            >
              show less
            </button>
          )}
        </div>
      </div>
    );
  };

  const displayGroups = showAll ? groups : groups.slice(0, maxInitialGroups);
  const hasMoreGroups = groups.length > maxInitialGroups;

  return (
    <div className={`max-w-xs ${compact ? 'space-y-1' : 'space-y-2'}`}>
      {displayGroups.map(group => 
        renderGroup(group, expandedGroups.has(group.modelName))
      )}
      
      {ungrouped.length > 0 && (
        <div className="mb-3">
          <div className="font-medium text-primary text-sm mb-1">
            Other Structures:
          </div>
          <div className="text-sm text-muted-foreground pl-3">
            • {ungrouped.slice(0, maxStructuresPerGroup).join(', ')}
            {ungrouped.length > maxStructuresPerGroup && (
              <span className="text-xs text-muted-foreground">
                {' '}+{ungrouped.length - maxStructuresPerGroup} more
              </span>
            )}
          </div>
        </div>
      )}
      
      {hasMoreGroups && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="h-auto p-1 text-xs text-primary hover:text-primary-foreground"
        >
          {showAll ? (
            <>
              <ChevronUp className="h-3 w-3 mr-1" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3 mr-1" />
              Show {groups.length - maxInitialGroups} more models
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default StructuredDisplay;