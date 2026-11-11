import { ContactFormData, RoiEstimate } from '../types';

/**
 * Calculates estimated campaign reach, ROAS, and deliverables based on monthly budget and service focus.
 */
export function calculateRoiEstimate(monthlyBudget: number, serviceType: string): RoiEstimate {
  const budget = Math.max(25000, monthlyBudget);

  let cpm = 180; // Cost per 1000 impressions in INR
  let baseRoas = 3.8;
  let timelineWeeks = 3;
  let recommendedMix = ['Instagram Reels', 'Meta Feed Ads', 'Story Retargeting'];

  switch (serviceType) {
    case 'video-ad-production':
      cpm = 240;
      baseRoas = 4.5;
      timelineWeeks = 4;
      recommendedMix = ['Cinema Commercial Film', '4K Vertical Reels', 'YouTube Pre-Roll Ads', 'UGC Creator Drops'];
      break;
    case 'performance-marketing':
      cpm = 150;
      baseRoas = 5.2;
      timelineWeeks = 2;
      recommendedMix = ['Meta Performance Scaling', 'Google Search & PMax', 'High-Converting Landing Pages', 'DCO Dynamic Creative'];
      break;
    case 'influencer-creator-lab':
      cpm = 210;
      baseRoas = 4.1;
      timelineWeeks = 3;
      recommendedMix = ['Mumbai Macro Creator Drops', 'Hyper-Local Micro Influencers', 'Whitelisted Spark Ads', 'Affiliate Tracking'];
      break;
    case 'social-media-management':
    default:
      cpm = 160;
      baseRoas = 3.9;
      timelineWeeks = 3;
      recommendedMix = ['Daily Content Production', 'Reels Algorithm Strategy', 'Community DM Automation', 'Viral Trend Seeding'];
      break;
  }

  // Budget scaling bonus
  if (budget >= 500000) {
    baseRoas += 0.6;
  } else if (budget >= 200000) {
    baseRoas += 0.3;
  }

  const estimatedImpressions = Math.round((budget / cpm) * 1000);
  const clickThroughRate = 0.022; // 2.2%
  const conversionRate = 0.038; // 3.8%
  const projectedLeads = Math.max(12, Math.round(estimatedImpressions * clickThroughRate * conversionRate));

  return {
    estimatedImpressions,
    projectedLeads,
    estimatedRoas: Math.round(baseRoas * 10) / 10,
    productionTimelineWeeks: timelineWeeks,
    recommendedMix,
  };
}

/**
 * Safe circular navigation helper for the 3D player next / prev buttons.
 */
export function getProjectIndex(currentIndex: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  const next = (currentIndex + delta) % total;
  return next < 0 ? next + total : next;
}

/**
 * Validates the contact form fields.
 */
export function validateContactForm(data: Partial<ContactFormData>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid business email address.';
  }

  // Clean phone input and check for minimum 10 digits (e.g. 8006603090)
  const phoneClean = (data.phone || '').replace(/[^\d]/g, '');
  if (!data.phone || phoneClean.length < 10) {
    errors.phone = 'Please provide a 10-digit mobile number.';
  }

  if (!data.serviceType) {
    errors.serviceType = 'Please select a primary service.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats a number to Indian Rupee standard format (e.g. ₹5,00,000).
 */
export function formatINR(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
}
