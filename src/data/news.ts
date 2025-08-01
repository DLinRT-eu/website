
import { NewsItem } from "@/types/news";
import { projectLaunch } from "./news/project-launch";
import { websiteV011Release } from "./news/website-v0-11-release";
import { communicationFeaturesLaunch } from "./news/communication-features-launch";
import { fdaAiListUpdateJanuary2025 } from "./news/fda-ai-list-update-january-2025";

export const NEWS_ITEMS: NewsItem[] = [
  fdaAiListUpdateJanuary2025,
  communicationFeaturesLaunch,
  websiteV011Release,
  projectLaunch
];
