
import { NewsItem } from "@/types/news";
import { projectLaunch } from "./news/project-launch";
import { websiteV011Release } from "./news/website-v0-11-release";
import { communicationFeaturesLaunch } from "./news/communication-features-launch";

export const NEWS_ITEMS: NewsItem[] = [
  communicationFeaturesLaunch,
  websiteV011Release,
  projectLaunch
];
