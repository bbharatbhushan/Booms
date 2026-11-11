export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string;
  tagline: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  deliverables: string[];
  director: string;
  location: string;
  accentColor: string;
  duration: string;
  type?: 'video' | 'link' | 'image' | 'instagram';
  videoUrl?: string;
  youtubeId?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  deliverableMetric: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  serviceType: string;
  budgetRange: string;
  message: string;
}

export interface RoiEstimate {
  estimatedImpressions: number;
  projectedLeads: number;
  estimatedRoas: number;
  productionTimelineWeeks: number;
  recommendedMix: string[];
}

export interface InstagramFeedItem {
  id: string;
  clientName: string;
  instagramHandle: string;
  postUrl: string;
  mediaType: 'reel' | 'post' | 'carousel';
  caption: string;
  viewsCount?: string;
  likesCount?: string;
  commentsCount?: string;
  thumbnailUrl: string;
  tags: string[];
  publishedDate: string;
}

export interface LeadItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  serviceType: string;
  budgetRange: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'proposal_sent' | 'closed';
}

