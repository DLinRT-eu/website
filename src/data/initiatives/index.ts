
import { CHALLENGE_INITIATIVES } from './challenges';
import { DATASET_INITIATIVES } from './datasets';
import { RESEARCH_PROJECT_INITIATIVES } from './research-projects';
import { Initiative } from '@/types/initiative';

export const ALL_INITIATIVES: Initiative[] = [
  ...CHALLENGE_INITIATIVES,
  ...DATASET_INITIATIVES,
  ...RESEARCH_PROJECT_INITIATIVES
];

export {
  CHALLENGE_INITIATIVES,
  DATASET_INITIATIVES,
  RESEARCH_PROJECT_INITIATIVES
};
