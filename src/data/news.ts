
export interface NewsItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  content?: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "project-launch",
    date: "April 26, 2025",
    title: "AI-RAD Product Finder Launch",
    summary: "A new open community-driven initiative to catalog AI solutions in radiotherapy.",
    content: `We are excited to announce the launch of AI-RAD Product Finder, a project deeply influenced by the Health AI Register's approach to cataloging AI solutions in radiology (https://radiology.healthairegister.com/). 

Our goal is to create an open, transparent, and community-maintained repository of deep learning-based commercial solutions available for radiotherapy in the European market. 

This initiative aims to help healthcare professionals, researchers, and decision-makers easily find, compare, and evaluate AI solutions in radiotherapy. What makes our platform unique is its community-driven nature - the information is maintained and updated by the users themselves, ensuring the most current and relevant information is always available.

We invite all stakeholders in the radiotherapy community to join us in this endeavor and contribute to building a comprehensive resource for AI solutions in radiotherapy.`
  }
];

