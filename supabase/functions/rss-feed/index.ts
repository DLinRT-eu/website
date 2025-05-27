
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Import the news data - we'll recreate it here since we can't import from src
const NEWS_ITEMS = [
  {
    id: "communication-features-launch",
    date: "2025-05-27",
    title: "Enhanced Communication: Mailing List and Contact Form Now Live",
    summary: "We've launched mailing list subscription and contact form features with a privacy-first approach, enabling better community engagement while ensuring full GDPR compliance.",
    content: `# Enhanced Communication: Mailing List and Contact Form Now Live

We're excited to announce the launch of two new communication features that will help strengthen our community and improve how we connect with users interested in deep learning solutions for radiotherapy.

## What's New

### Mailing List Subscription
Stay updated with the latest developments in deep learning for radiotherapy through our new mailing list service.

### Contact Form
We've introduced a direct contact form that makes it easier for users to report issues, suggest improvements, and get in touch with our maintenance team.

## Privacy-First Approach
Both features are built with privacy at their core with explicit consent required, minimal data collection, GDPR compliance, and transparent processing.

Thank you for being part of the DLinRT community!`
  },
  {
    id: "website-v0-11-release",
    date: "2025-05-27",
    title: "Website v0.11 Release: One Month Milestone",
    summary: "Celebrating our first month of development with enhanced review features, improved dashboards, and 60+ products collected.",
    content: `# Website v0.11 Release: One Month Milestone

We're excited to announce the release of **DLinRT.eu v0.11**, marking exactly one month since we began coding this comprehensive database of deep learning products in radiotherapy!

## 🎉 Major Milestone: 60+ Products Collected
In just one month, we've successfully gathered and documented **nearly 60 AI products** across all radiotherapy categories.

## ✨ Key Features in v0.11
- Enhanced Review System with new Review Dashboard
- Improved Analytics & Dashboards
- Technical Enhancements including multi-category product support

Thank you to everyone who has contributed to making DLinRT.eu a valuable resource for the radiotherapy community!`
  },
  {
    id: "project-launch",
    date: "April 26, 2025",
    title: "DLinRT product finder launch",
    summary: "A new open community-driven initiative to catalog deep learning solutions in radiotherapy.",
    content: `# DLinRT Product Finder Launch

🚀 Launch Announcement: DLinRT Product Finder

We're excited to announce the launch of the **DLinRT Product Finder**, now live at [DLinRT.eu](https://dlinrt.eu/)!

This initiative is designed to catalog **deep learning solutions in radiotherapy**, with a special focus on the **European market**.

## 🎯 Our Mission
To build an **open, transparent, and community-maintained** repository of **commercial deep learning solutions** available for **radiotherapy clinics across Europe**.

## 🌟 Key Features
- **Open Access** – All content is freely accessible
- **Community-Driven** – Contributors keep the data accurate and current
- **Transparent** – No vendor bias, just clear product information
- **European Focus** – Tailored to the regulatory and market landscape in Europe

Thank you for joining forces!`
  }
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatRFC822Date(dateString: string): string {
  const date = new Date(dateString);
  return date.toUTCString();
}

function generateRSSFeed(): string {
  const baseUrl = 'https://dlinrt.eu';
  const buildDate = new Date().toUTCString();
  
  let rssItems = '';
  
  NEWS_ITEMS.forEach(item => {
    const description = item.content || item.summary;
    const pubDate = formatRFC822Date(item.date);
    const guid = `${baseUrl}/news/${item.id}`;
    
    rssItems += `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${guid}</link>
      <description>${escapeXml(item.summary)}</description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${guid}</guid>
    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Deep Learning in Radiotherapy News</title>
    <link>${baseUrl}</link>
    <description>Latest developments and announcements in deep learning for radiotherapy</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/functions/v1/rss-feed" rel="self" type="application/rss+xml"/>
    <managingEditor>info@dlinrt.eu (DLinRT Team)</managingEditor>
    <webMaster>info@dlinrt.eu (DLinRT Team)</webMaster>
    <category>Medical Technology</category>
    <category>Artificial Intelligence</category>
    <category>Radiotherapy</category>
    ${rssItems}
  </channel>
</rss>`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rssXml = generateRSSFeed();
    
    return new Response(rssXml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('Error generating RSS feed', {
      status: 500,
      headers: corsHeaders,
    });
  }
});
