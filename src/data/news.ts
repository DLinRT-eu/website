
export interface NewsItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  content?: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "ai-contouring",
    date: "April 24, 2025",
    title: "AI in Contouring: Latest Developments",
    summary: "New breakthroughs in auto-contouring accuracy and efficiency.",
    content: "Recent developments in AI-powered auto-contouring have shown significant improvements in both accuracy and efficiency. These advancements leverage deep learning techniques to better identify critical structures while reducing the time needed for manual adjustments. Research teams across multiple institutions have been working on training models with larger and more diverse datasets, resulting in more robust performance across different anatomical sites. These improvements are expected to greatly reduce the workload for radiation oncologists and medical physicists, enabling them to focus more on treatment planning optimization."
  },
  {
    id: "qa-evolution",
    date: "April 22, 2025",
    title: "Quality Assurance Evolution",
    summary: "How AI is revolutionizing QA processes in radiotherapy.",
    content: "Quality assurance processes in radiotherapy are undergoing a major transformation thanks to artificial intelligence. New AI-driven QA tools can automatically detect anomalies in treatment plans, identify potential errors in beam delivery, and provide comprehensive verification with minimal human intervention. These systems are being integrated into existing radiotherapy workflows, offering real-time feedback and reducing the time needed for plan verification. Several leading hospitals have reported significant reductions in QA time while maintaining or even improving the quality of verification processes."
  },
  {
    id: "treatment-planning",
    date: "April 20, 2025",
    title: "Treatment Planning Innovation",
    summary: "AI-driven personalization in treatment planning systems.",
    content: "Treatment planning systems are becoming increasingly personalized with the help of AI algorithms. These advanced systems can now analyze a patient's individual anatomy, disease characteristics, and response patterns to generate highly optimized treatment plans. By incorporating data from thousands of previous cases, AI can predict potential outcomes for different treatment approaches and suggest the most promising options. Clinicians report that this collaboration between human expertise and AI assistance is resulting in more efficient planning processes and potentially better treatment outcomes for patients."
  }
];
