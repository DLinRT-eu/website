
import { CHALLENGE_INITIATIVES } from './challenges';
import { DATASET_INITIATIVES } from './datasets';
import { RESEARCH_PROJECT_INITIATIVES } from './research-projects';
import { MODEL_ZOO_INITIATIVES } from './modelzoo';
import { Initiative } from '@/types/initiative';

export const ALL_INITIATIVES: Initiative[] = [
  ...CHALLENGE_INITIATIVES,
  ...DATASET_INITIATIVES,
  ...RESEARCH_PROJECT_INITIATIVES,
  ...MODEL_ZOO_INITIATIVES
];

export {
  CHALLENGE_INITIATIVES,
  DATASET_INITIATIVES,
  RESEARCH_PROJECT_INITIATIVES,
  MODEL_ZOO_INITIATIVES
};

