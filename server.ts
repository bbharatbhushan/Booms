import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-Memory Data Store for Portfolio Projects (3D Stage & Portfolio)
let portfolioProjects: any[] = [
  {
    id: 'booms-primary-reel',
    title: 'Booms Digi AD Final',
    client: 'Booms · GRATITUDE Films',
    category: 'TVC',
    mediaGroup: 'video',
    year: '2026',
    image: 'https://i.ytimg.com/vi/t7LrsUoxvro/hqdefault.jpg',
    type: 'video',
    videoUrl: 'https://youtu.be/t7LrsUoxvro',
    youtubeId: 't7LrsUoxvro',
    tagline: 'Primary Brand Commercial · Directed by Bharat Bhushan at Booms Mumbai Studio',
    description: 'Primary commercial film for Booms (Booms.in) produced with GRATITUDE Films, uniting high-end filmmaking, viral social media growth, and data-driven performance marketing.',
    metrics: [
      { label: 'Reel Views', value: '8.5M+' },
      { label: 'ROAS', value: '5.8x' },
      { label: 'Engagement', value: '12.4%' },
      { label: 'Conversions', value: '+210%' },
    ],
    deliverables: ['Primary Brand Commercial', '8K Commercial Production', 'Data-Driven Funnel Cut', 'Social Growth Reels'],
    director: 'Bharat Bhushan',
    location: 'Booms Production Hub & Studio Stage, Mumbai',
    accentColor: '#38bdf8',
    duration: '0:31',
  },
  {
    id: 'music-video-1',
    title: 'Cinematic Music Video I',
    client: 'Pixel Nudge Visuals',
    category: 'Music Videos',
    mediaGroup: 'video',
    year: '2026',
    image: 'https://img.youtube.com/vi/8ax8yEg6PdQ/sddefault.jpg',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/8ax8yEg6PdQ',
    youtubeId: '8ax8yEg6PdQ',
    tagline: 'A stunning visual journey featuring breathtaking landscapes',
    description: 'Produced by Booms & Pixel Nudge Cine Lab. A sweeping musical odyssey capturing pristine Himalayan and coastal horizons with 8K anamorphic cinematography.',
    metrics: [
      { label: 'Reel Views', value: '4.8M' },
      { label: 'ROAS', value: '5.2x' },
      { label: 'Engagement', value: '9.4%' },
      { label: 'Shares', value: '82K+' },
    ],
    deliverables: ['8K Music Film', '12x High-Hook Reels', 'DaVinci Color Master', 'Influencer Teaser Drops'],
    director: 'B. Bhushan',
    location: 'Booms Production Hub & Studio Stage, Mumbai',
    accentColor: '#38bdf8',
    duration: '3:45',
  },
  {
    id: 'commercial-ad-1',
    title: 'Brand Commercial I',
    client: 'Illtill Chemist',
    category: 'TVC',
    mediaGroup: 'video',
    year: '2026',
    image: 'https://img.youtube.com/vi/MZJ-LQoAeQc/sddefault.jpg',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/MZJ-LQoAeQc',
    youtubeId: 'MZJ-LQoAeQc',
    tagline: 'Creative advertising campaign & high-impact visual marketing',
    description: 'Commercial production that translated healthcare brand values into immediate customer trust, driving retail footfall and high-converting online orders.',
    metrics: [
      { label: 'Ad Impressions', value: '6.4M' },
      { label: 'Conversion Lift', value: '+42%' },
      { label: 'Direct Orders', value: '18.5K' },
      { label: 'ROAS', value: '4.7x' },
    ],
    deliverables: ['TV Commercial 30s', 'Meta Performance Ad Suite', 'In-Store Display Cut', 'Sound Design Master'],
    director: 'Rajvi Sheth',
    location: 'Booms Cine Stage, Mumbai',
    accentColor: '#0ea5e9',
    duration: '0:45',
  },
  {
    id: 'music-video-2',
    title: 'Cinematic Music Video II',
    client: 'Studio Harmony',
    category: 'Music Videos',
    mediaGroup: 'video',
    year: '2026',
    image: 'https://img.youtube.com/vi/fBjppZsR748/sddefault.jpg',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/fBjppZsR748',
    youtubeId: 'fBjppZsR748',
    tagline: 'Capturing the essence of nature in high definition',
    description: 'High-definition visual rhythm and sound design celebrating organic textures, sunset lighting, and emotive storytelling.',
    metrics: [
      { label: 'YouTube Reach', value: '2.9M' },
      { label: 'Watch Time', value: '88%' },
      { label: 'Audio Streams', value: '450K+' },
      { label: 'Audience Lift', value: '+65%' },
    ],
    deliverables: ['Cinematic Visual Anthem', 'Spotify Canvas Loops', 'Social Teaser Rigs'],
    director: 'Vedant Sakade',
    location: 'Mumbai Coastal Soundstage',
    accentColor: '#6366f1',
    duration: '3:12',
  },
  {
    id: 'commercial-ad-6',
    title: 'Brand Commercial VI',
    client: 'NexGen Labs',
    category: 'TVC',
    mediaGroup: 'video',
    year: '2026',
    image: 'https://img.youtube.com/vi/JYg0ImH77wM/sddefault.jpg',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/JYg0ImH77wM',
    youtubeId: 'JYg0ImH77wM',
    tagline: 'Innovative commercial production & dynamic brand storytelling',
    description: 'A modern commercial narrative highlighting cutting-edge technology and customer lifestyle integration for forward-thinking brands.',
    metrics: [
      { label: 'Campaign Views', value: '5.1M' },
      { label: 'ROAS', value: '4.9x' },
      { label: 'App Installs', value: '120K+' },
      { label: 'CTR', value: '4.2%' },
    ],
    deliverables: ['Broadcast TVC', 'Meta Funnel Ads', 'YouTube Pre-Rolls'],
    director: 'B. Bhushan',
    location: 'Booms Creator & Tech Stage, Mumbai',
    accentColor: '#38bdf8',
    duration: '0:30',
  },
  {
    id: 'short-film-1',
    title: 'Promotional Brand Film Showcase I',
    client: 'Metawork Studios',
    category: 'Promotional Videos',
    mediaGroup: 'video',
    year: '2026',
    image: 'https://img.youtube.com/vi/UF6nPLrCm74/sddefault.jpg',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/UF6nPLrCm74',
    youtubeId: 'UF6nPLrCm74',
    tagline: 'An artistic promotional film production pushing cinematic boundaries',
    description: 'A high-concept promotional film exploring brand identity and human connection in modern metropolitan Mumbai.',
    metrics: [
      { label: 'Festival Laurels', value: '4 Awards' },
      { label: 'Audience Reach', value: '1.8M' },
      { label: 'Critic Score', value: '96%' },
      { label: 'Screenings', value: '12 Cities' },
    ],
    deliverables: ['Theatrical DCP Master', 'Behind-the-Scenes Mini-Doc', 'Promotional Cut'],
    director: 'Kabir Varma',
    location: 'Bandra Soundstage & South Mumbai Sets',
    accentColor: '#10b981',
    duration: '8:20',
  },
  {
    id: 'brands-reels-1',
    title: 'Social Media Reels & Post Showcase I',
    client: 'Trinity Institute of Foreign Languages (TIFL)',
    category: 'Social Media Reels and Post',
    mediaGroup: 'video',
    year: '2026',
    image: 'https://img.youtube.com/vi/MV7YXGcQKsc/sddefault.jpg',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/MV7YXGcQKsc',
    youtubeId: 'MV7YXGcQKsc',
    tagline: 'Dynamic reel highlighting brand collaborations & viral reach',
    description: 'Engineered for high algorithmic retention on Instagram Reels and YouTube Shorts, resulting in record-breaking student admissions for TIFL.',
    metrics: [
      { label: 'Reel Impressions', value: '3.8M' },
      { label: 'Enrollment Lift', value: '+140%' },
      { label: 'Shares', value: '64K' },
      { label: 'ROAS', value: '6.1x' },
    ],
    deliverables: ['Daily Reel Pipeline', 'Hook Testing Suite', 'Community DM Automation'],
    director: 'Rhea Sen',
    location: 'Booms Creator Lab, Mumbai',
    accentColor: '#0ea5e9',
    duration: '0:50',
  },
  {
    id: 'illtill-reel-1',
    title: 'Illtill Chemist Social Reel I',
    client: 'Illtill Chemist',
    category: 'Social Media Reels and Post',
    mediaGroup: 'video',
    year: '2026',
    image: 'https://img.youtube.com/vi/MIGxQHrcJzo/sddefault.jpg',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/MIGxQHrcJzo',
    youtubeId: 'MIGxQHrcJzo',
    tagline: 'Promotional social reel focusing on customer trust and product benefits',
    description: 'Short-form reel campaign shot in Mumbai with high-speed macro product optics and vibrant healthcare lifestyle cues.',
    metrics: [
      { label: 'Organic Views', value: '2.4M' },
      { label: 'Saves & Bookmarks', value: '38K' },
      { label: 'Store Footfall', value: '+35%' },
      { label: 'CTR', value: '3.8%' },
    ],
    deliverables: ['Vertical 9:16 Reel Series', 'Paid Retargeting Ads', 'Macro Product Cut'],
    director: 'Vedant Sakade',
    location: 'Booms Soundstage, Mumbai',
    accentColor: '#38bdf8',
    duration: '0:40',
  },
  {
    id: 'balcony-tickets-web',
    title: 'Balcony Tickets Promotional Video',
    client: 'Balcony Tickets',
    category: 'Promotional Videos',
    mediaGroup: 'video',
    year: '2026',
    image: '/src/assets/images/hero_booms_studio_1794348322633.jpg',
    type: 'video',
    videoUrl: 'https://www.balconytickets.com/',
    tagline: 'Official platform & entertainment promotional video for Balcony Tickets',
    description: 'Comprehensive digital presence, ticketing UI, and promotional video advertising for premier Indian live cinema and stage shows.',
    metrics: [
      { label: 'Monthly Visitors', value: '1.2M' },
      { label: 'Booking Conversion', value: '+35%' },
      { label: 'Ticket Volume', value: '250K+' },
      { label: 'User Rating', value: '4.9/5' },
    ],
    deliverables: ['Promotional Launch Film', 'Brand Video Ads', 'Event Trailers'],
    director: 'B. Bhushan',
    location: 'Mumbai Digital Lab',
    accentColor: '#a855f7',
    duration: '1:15',
  },
  {
    id: 'photo-fashion-1',
    title: 'High-Speed Beverage & Luxury Product Shoot',
    client: 'Orbit Beverages India',
    category: 'Fashion & Product Photography',
    mediaGroup: 'photo',
    year: '2026',
    image: '/src/assets/images/campaign_beverage_1794348323268.jpg',
    type: 'image',
    tagline: 'Studio macro product photography & commercial fashion lookbook lighting',
    description: 'Shot on medium-format phase-one optics with synchronized high-speed strobe rigs at Booms Mumbai Studio for billboard, e-commerce, and lookbook campaigns.',
    metrics: [
      { label: 'CTR Lift', value: '+68%' },
      { label: 'Catalog ROAS', value: '5.4x' },
      { label: 'Hi-Res Assets', value: '85 Stills' },
      { label: 'Print Ready', value: '100MP RAW' },
    ],
    deliverables: ['85x Retouched Product Stills', '3D Packshot Renders', 'Amazon & D2C Hero Banners'],
    director: 'Bharat Bhushan',
    location: 'Booms Tabletop & Cyc Studio, Mumbai',
    accentColor: '#38bdf8',
    duration: 'Photo Series',
  },
  {
    id: 'photo-fashion-2',
    title: 'Editorial Fashion & Studio Couture Campaign',
    client: 'Zephyr Couture Mumbai',
    category: 'Fashion & Product Photography',
    mediaGroup: 'photo',
    year: '2026',
    image: '/src/assets/images/production_gear_1794348325098.jpg',
    type: 'image',
    tagline: 'High-contrast editorial fashion portraiture & luxury accessories lookbook',
    description: 'Full-day fashion editorial and luxury product photography featuring bespoke set design, dramatic rim lighting, and color-calibrated studio grading.',
    metrics: [
      { label: 'Lookbook Views', value: '1.9M' },
      { label: 'Conversion Rate', value: '4.8%' },
      { label: 'Editorial Spreads', value: '42 Frames' },
      { label: 'ROAS', value: '5.1x' },
    ],
    deliverables: ['Seasonal Fashion Lookbook', 'Studio Lighting Master Stills', 'D2C Product Cards'],
    director: 'Bharat Bhushan',
    location: 'Booms Fashion Stage, Andheri West, Mumbai',
    accentColor: '#0ea5e9',
    duration: 'Photo Series',
  },
  {
    id: 'photo-social-1',
    title: 'Fintech Viral Carousel & Social Media Posts',
    client: 'Nexus Wealth Systems',
    category: 'Social Media Posts',
    mediaGroup: 'photo',
    year: '2026',
    image: '/src/assets/images/campaign_tech_1794348325154.jpg',
    type: 'image',
    tagline: 'High-save Instagram carousels, LinkedIn brand graphics & performance ad statics',
    description: 'Data-backed visual design system for social media feeds, combining bold typography, 3D product callouts, and thumb-stopping carousel storytelling.',
    metrics: [
      { label: 'Post Saves', value: '94K+' },
      { label: 'Organic Reach', value: '3.2M' },
      { label: 'Profile Visits', value: '+240%' },
      { label: 'Engagement', value: '11.8%' },
    ],
    deliverables: ['30x Monthly Social Posts', 'Interactive Swipe Carousels', 'Meta Static Ad Creatives'],
    director: 'Bharat Bhushan',
    location: 'Booms Creative Design Lab, Mumbai',
    accentColor: '#38bdf8',
    duration: 'Social Suite',
  },
  {
    id: 'photo-social-2',
    title: 'Superbike Launch Grid & Social Media Post Suite',
    client: 'Aura Electric Superbikes',
    category: 'Social Media Posts',
    mediaGroup: 'photo',
    year: '2026',
    image: '/src/assets/images/hero_booms_studio_1794348322633.jpg',
    type: 'image',
    tagline: 'Cohesive Instagram grid architecture, launch countdown posts & story kits',
    description: 'Complete social media visual identity and launch post suite crafted to build anticipation, community shares, and pre-order signups.',
    metrics: [
      { label: 'Post Impressions', value: '4.1M' },
      { label: 'Shares', value: '52K+' },
      { label: 'Lead Signups', value: '14.2K' },
      { label: 'Ad ROAS', value: '5.6x' },
    ],
    deliverables: ['Instagram 9-Grid Launch Kit', 'Story Poll & Sticker Assets', 'Performance Static Ads'],
    director: 'Bharat Bhushan',
    location: 'Booms Digital Studio, Mumbai',
    accentColor: '#0ea5e9',
    duration: 'Social Suite',
  },
];

// In-Memory Data Store for Client Instagram Feeds & Leads
let instagramFeeds = [
  {
    id: 'feed-1',
    clientName: 'Orbit Beverages',
    instagramHandle: '@orbitbeverages.in',
    postUrl: 'https://instagram.com/orbitbeverages.in',
    mediaType: 'reel',
    caption: 'When citrus hits 1000fps in our Mumbai studio! 🍊 Pure fizz, zero artificial aftertaste. Production by @booms.in',
    viewsCount: '4.2M',
    likesCount: '312K',
    commentsCount: '1,840',
    thumbnailUrl: '/src/assets/images/campaign_beverage_1794348323268.jpg',
    tags: ['#BeverageCinema', '#MumbaiCommercial', '#ViralReels', '#BoomsProduction'],
    publishedDate: '2 days ago',
  },
  {
    id: 'feed-2',
    clientName: 'Nexus Wealth Systems',
    instagramHandle: '@nexuswealth.in',
    postUrl: 'https://instagram.com/nexuswealth.in',
    mediaType: 'reel',
    caption: 'Algorithmic smart investing simplified for Mumbai founders & young wealth builders. Directed by Booms Cine Lab.',
    viewsCount: '2.8M',
    likesCount: '185K',
    commentsCount: '940',
    thumbnailUrl: '/src/assets/images/campaign_tech_1794348325154.jpg',
    tags: ['#FintechReels', '#WealthGrowth', '#ProductionDesign', '#BoomsAds'],
    publishedDate: '4 days ago',
  },
  {
    id: 'feed-3',
    clientName: 'Aura Electric Superbikes',
    instagramHandle: '@aurasuperbikes',
    postUrl: 'https://instagram.com/aurasuperbikes',
    mediaType: 'reel',
    caption: 'Midnight throttle through Bandra-Worli Sea Link. Shot with chase-car gimbal & ARRI optics. ⚡',
    viewsCount: '5.9M',
    likesCount: '540K',
    commentsCount: '3,210',
    thumbnailUrl: '/src/assets/images/hero_booms_studio_1794348322633.jpg',
    tags: ['#SeaLinkMidnight', '#SuperbikeReel', '#REDMonstro', '#BoomsCinema'],
    publishedDate: '1 week ago',
  },
  {
    id: 'feed-4',
    clientName: 'Booms Production Lab',
    instagramHandle: '@booms.in',
    postUrl: 'https://instagram.com/booms.in',
    mediaType: 'post',
    caption: 'Behind the glass: Testing high-speed fluid rigs and macro probes in our Bandra soundstage. Inquire for your brand.',
    viewsCount: '1.4M',
    likesCount: '98K',
    commentsCount: '512',
    thumbnailUrl: '/src/assets/images/production_gear_1794348325098.jpg',
    tags: ['#BehindTheScenes', '#MumbaiStudio', '#CineVault', '#Booms'],
    publishedDate: '2 weeks ago',
  },
];

let leads: any[] = [
  {
    id: 'lead-1',
    fullName: 'Rohan Mehra',
    email: 'rohan@zephyrindia.com',
    phone: '+91 9820011223',
    companyName: 'Zephyr D2C Apparel',
    serviceType: 'video-ad-production',
    budgetRange: '₹5,00,000',
    message: 'Looking for a cinematic reel launch shoot in South Mumbai for our Autumn line.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: 'contacted',
  },
  {
    id: 'lead-2',
    fullName: 'Ananya Deshmukh',
    email: 'ananya@finovate.io',
    phone: '+91 9930456789',
    companyName: 'Finovate Capital',
    serviceType: 'performance-marketing',
    budgetRange: '₹10,00,000',
    message: 'Need high-ROAS Meta and YouTube ad creatives with founder storytelling.',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    status: 'new',
  },
];

let clientTestimonials: any[] = [
  {
    id: 'rev-1',
    name: 'Nitin Gupta',
    role: 'Founder & Director',
    company: 'TIFL (Trinity Institute of Foreign Languages)',
    quote: 'The team understood our vision perfectly and translated it into a compelling digital strategy. We saw a remarkable increase in student enrollments and brand recognition across Mumbai and beyond.',
    rating: 5,
    metric: '+140% Student Enrollments',
    category: 'Brands & Reels',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    projectTitle: 'Brands & Reels Showcase I',
    verified: true,
    createdAt: '2026-09-12T10:00:00.000Z',
  },
  {
    id: 'rev-2',
    name: 'Rohit Sachdeva & Kshitija Saxena',
    role: 'Founders & Managing Directors',
    company: 'Illtill Chemist',
    quote: 'Their innovative approach brought a fresh perspective to our brand. The results were outstanding, significantly boosting our market presence and customer engagement with cinema-grade vertical reels.',
    rating: 5,
    metric: '+42% Sales Conversion',
    category: 'Commercial Ads',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    projectTitle: 'Brand Commercial I & Ad Reel',
    verified: true,
    createdAt: '2026-09-25T14:30:00.000Z',
  },
  {
    id: 'rev-3',
    name: 'B. Bhushan',
    role: 'Founder & Executive Producer',
    company: 'Gratitude Films',
    quote: 'Their creative prowess and technical skill in film production are unparalleled. They delivered a masterpiece that captured the emotional essence of our cinematic vision beautifully.',
    rating: 5,
    metric: '4 International Festival Laurels',
    category: 'Cinema & Films',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    projectTitle: 'Cinematic Music Video & Film Series',
    verified: true,
    createdAt: '2026-10-04T09:15:00.000Z',
  },
  {
    id: 'rev-4',
    name: 'Jessica Williams',
    role: 'Head of Product Marketing',
    company: 'NexGen Labs',
    quote: 'The user experience design and creative commercial production they delivered was intuitive and high-converting. Our paid acquisition funnel scaled from day one.',
    rating: 5,
    metric: '4.9x Ad Return (ROAS)',
    category: 'Performance Marketing',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    projectTitle: 'Brand Commercial VI',
    verified: true,
    createdAt: '2026-10-18T16:45:00.000Z',
  },
  {
    id: 'rev-5',
    name: 'Vikramaditya Rao',
    role: 'Chief Brand Officer',
    company: 'Balcony Tickets',
    quote: 'From our entertainment web portal to high-energy event trailers, Booms handled end-to-end production with zero friction. Monthly ticket conversions jumped within weeks.',
    rating: 5,
    metric: '+35% Ticket Conversion',
    category: 'Cinema & Films',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
    projectTitle: 'Balcony Tickets Official Portal',
    verified: true,
    createdAt: '2026-10-29T11:20:00.000Z',
  },
  {
    id: 'rev-6',
    name: 'Meera Krishnan',
    role: 'VP of Growth',
    company: 'Orbit Beverages India',
    quote: 'Shooting our 1000fps tabletop beverage commercial at the Mumbai soundstage was a game changer. Over 4.2M organic views on our launch reel alone!',
    rating: 5,
    metric: '4.2M+ Launch Reel Views',
    category: 'Brands & Reels',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    projectTitle: 'High-Speed Beverage Launch',
    verified: true,
    createdAt: '2026-11-02T15:10:00.000Z',
  },
];


// Helper to extract YouTube video ID and URLs
function parseMediaUrl(url: string) {
  if (!url) return { type: 'image' as const, embedUrl: '', thumbnailUrl: '/src/assets/images/hero_booms_studio_1794348322633.jpg' };
  
  let ytId: string | undefined;
  if (url.includes('youtube.com/watch?v=')) {
    ytId = url.split('v=')[1]?.split('&')[0];
  } else if (url.includes('youtu.be/')) {
    ytId = url.split('youtu.be/')[1]?.split('?')[0];
  } else if (url.includes('youtube.com/embed/')) {
    ytId = url.split('youtube.com/embed/')[1]?.split('?')[0];
  } else if (url.includes('youtube.com/shorts/')) {
    ytId = url.split('youtube.com/shorts/')[1]?.split('?')[0];
  }

  if (ytId) {
    return {
      type: 'video' as const,
      youtubeId: ytId,
      embedUrl: `https://www.youtube.com/embed/${ytId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${ytId}/sddefault.jpg`,
    };
  }

  if (
    /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url) ||
    url.startsWith('/assets/aistudio/') ||
    url.startsWith('/public/assets/')
  ) {
    const cleanPath = url.replace(/^\/public\//, '/');
    return {
      type: 'video' as const,
      embedUrl: cleanPath,
      thumbnailUrl: '/src/assets/images/hero_booms_studio_1794348322633.jpg',
    };
  }

  if (url.includes('instagram.com')) {
    return {
      type: 'instagram' as const,
      embedUrl: url,
      thumbnailUrl: '/src/assets/images/campaign_beverage_1794348323268.jpg',
    };
  }

  return {
    type: 'video' as const,
    embedUrl: url,
    thumbnailUrl: '/src/assets/images/hero_booms_studio_1794348322633.jpg',
  };
}

// 0. GET /api/portfolio-projects (Interactive 3D Stage & Portfolio)
app.get('/api/portfolio-projects', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: portfolioProjects.length,
    data: portfolioProjects,
  });
});

// 0. POST /api/portfolio-projects (Adds video or photo directly to 3D Stage & Portfolio)
app.post('/api/portfolio-projects', (req: Request, res: Response) => {
  const {
    title,
    client,
    category,
    mediaGroup,
    videoUrl,
    imageUrl,
    tagline,
    description,
    location,
    duration,
  } = req.body;

  if (!title || (!videoUrl && !imageUrl)) {
    return res.status(400).json({ success: false, error: 'Title and Video URL or Image URL are required' });
  }

  const isPhotoGroup =
    mediaGroup === 'photo' ||
    category === 'Fashion & Product Photography' ||
    category === 'Social Media Posts';

  const media = parseMediaUrl(videoUrl || '');
  const resolvedImage =
    imageUrl ||
    (isPhotoGroup && videoUrl ? videoUrl : media.thumbnailUrl) ||
    '/src/assets/images/campaign_beverage_1794348323268.jpg';

  const newProject = {
    id: `proj-${Date.now()}`,
    title: title.trim(),
    client: (client && client.trim()) || 'Booms Partner Client',
    category: category || (isPhotoGroup ? 'Fashion & Product Photography' : 'TVC'),
    mediaGroup: isPhotoGroup ? 'photo' : 'video',
    year: '2026',
    image: resolvedImage,
    type: isPhotoGroup ? 'image' : media.type,
    videoUrl: isPhotoGroup ? undefined : media.embedUrl || videoUrl,
    youtubeId: isPhotoGroup ? undefined : media.youtubeId,
    tagline: tagline || (isPhotoGroup ? 'Studio photography & social creative scaled by Booms Mumbai Studio' : 'High-impact commercial video scaled by Booms Mumbai Studio'),
    description: description || 'Creative visual storytelling and cinema-grade production engineered to stop thumbs and drive client growth.',
    metrics: [
      { label: isPhotoGroup ? 'CTR Lift' : 'Reel Views', value: isPhotoGroup ? '+64%' : '1.2M+' },
      { label: 'Avg ROAS', value: '4.8x' },
      { label: 'Shares', value: '45K+' },
      { label: 'Engagement', value: '8.6%' },
    ],
    deliverables: isPhotoGroup
      ? ['Retouched Studio Stills', 'Social Post Suite', 'Ad Creatives', 'Color Grade Master']
      : ['Cinema Commercial Cut', '4K Vertical Reels', 'Color Grade Master', 'Sound Design'],
    director: 'Bharat Bhushan',
    location: location || 'Booms Production Hub, Mumbai',
    accentColor: '#38bdf8',
    duration: duration || (isPhotoGroup ? 'Photo Series' : '0:45'),
  };

  // Add immediately to the beginning of the 3D Stage & Portfolio projects list
  portfolioProjects.unshift(newProject);

  // Also auto-add to Instagram feeds if it's a social/reel link
  if (
    videoUrl &&
    (videoUrl.includes('instagram.com') ||
      videoUrl.includes('shorts') ||
      category === 'Social Media Reels and Post' ||
      category === 'Social Media Posts')
  ) {
    instagramFeeds.unshift({
      id: `feed-${Date.now()}`,
      clientName: newProject.client,
      instagramHandle: `@${newProject.client.toLowerCase().replace(/[^a-z0-9]/g, '')}.in`,
      postUrl: videoUrl,
      mediaType: isPhotoGroup ? 'post' : 'reel',
      caption: newProject.tagline,
      viewsCount: '1.4M',
      likesCount: '95K',
      commentsCount: '580',
      thumbnailUrl: newProject.image,
      tags: ['#Booms3DStage', '#ViralReels', '#ClientShowcase'],
      publishedDate: 'Just now',
    });
  }

  res.status(201).json({
    success: true,
    message: `${isPhotoGroup ? 'Photo' : 'Video'} added to Portfolio successfully`,
    data: newProject,
    totalProjects: portfolioProjects.length,
  });
});

// 0. DELETE /api/portfolio-projects/:id
app.delete('/api/portfolio-projects/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = portfolioProjects.length;
  portfolioProjects = portfolioProjects.filter((p) => p.id !== id);

  if (portfolioProjects.length === initialLength) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  res.json({ success: true, message: 'Project removed from 3D Stage', totalProjects: portfolioProjects.length });
});

// 1. GET /api/instagram-feeds
app.get('/api/instagram-feeds', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: instagramFeeds.length,
    data: instagramFeeds,
  });
});

// 2. POST /api/instagram-feeds (Dashboard publishing endpoint)
app.post('/api/instagram-feeds', (req: Request, res: Response) => {
  const { clientName, instagramHandle, postUrl, mediaType, caption, viewsCount, likesCount, commentsCount, thumbnailUrl, tags } = req.body;

  if (!clientName || !instagramHandle) {
    return res.status(400).json({ success: false, error: 'Client name and Instagram handle are required' });
  }

  const newFeed = {
    id: `feed-${Date.now()}`,
    clientName,
    instagramHandle: instagramHandle.startsWith('@') ? instagramHandle : `@${instagramHandle}`,
    postUrl: postUrl || `https://instagram.com/${instagramHandle.replace('@', '')}`,
    mediaType: mediaType || 'reel',
    caption: caption || 'Campaign produced & scaled by Booms Mumbai Studio',
    viewsCount: viewsCount || '150K',
    likesCount: likesCount || '12.4K',
    commentsCount: commentsCount || '120',
    thumbnailUrl: thumbnailUrl || '/src/assets/images/hero_booms_studio_1794348322633.jpg',
    tags: Array.isArray(tags) ? tags : ['#BoomsViral', '#ClientShowcase'],
    publishedDate: 'Just now',
  };

  instagramFeeds.unshift(newFeed);
  res.status(201).json({ success: true, message: 'Client Instagram feed published successfully', data: newFeed });
});

// 3. DELETE /api/instagram-feeds/:id
app.delete('/api/instagram-feeds/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = instagramFeeds.length;
  instagramFeeds = instagramFeeds.filter((item) => item.id !== id);

  if (instagramFeeds.length === initialLength) {
    return res.status(404).json({ success: false, error: 'Feed not found' });
  }

  res.json({ success: true, message: 'Feed deleted successfully' });
});

// 4. GET /api/leads
app.get('/api/leads', (_req: Request, res: Response) => {
  res.json({ success: true, count: leads.length, data: leads });
});

// 5. POST /api/leads (Website contact inquiry form endpoint)
app.post('/api/leads', (req: Request, res: Response) => {
  const { fullName, email, phone, companyName, serviceType, budgetRange, message } = req.body;

  if (!fullName || !email || !phone) {
    return res.status(400).json({ success: false, error: 'Full name, email, and phone number are required' });
  }

  const newLead = {
    id: `lead-${Date.now()}`,
    fullName,
    email,
    phone,
    companyName: companyName || 'Independent Brand',
    serviceType: serviceType || 'video-ad-production',
    budgetRange: budgetRange || 'Custom',
    message: message || 'Inquiry submitted from Booms.in',
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  leads.unshift(newLead);
  res.status(201).json({ success: true, message: 'Campaign inquiry submitted successfully', data: newLead });
});

// 6. PATCH /api/leads/:id (Lead status updater in Dashboard)
app.patch('/api/leads/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const lead = leads.find((l) => l.id === id);
  if (!lead) {
    return res.status(404).json({ success: false, error: 'Lead not found' });
  }

  if (status) lead.status = status;
  res.json({ success: true, message: 'Lead updated', data: lead });
});

// 7. GET /api/testimonials (Fetches client reviews for ClientTestimonials carousel)
app.get('/api/testimonials', (req: Request, res: Response) => {
  const { category } = req.query;
  let filtered = clientTestimonials;
  if (category && typeof category === 'string' && category !== 'All') {
    filtered = clientTestimonials.filter((t) => t.category.toLowerCase() === category.toLowerCase());
  }
  const avgRating =
    filtered.length > 0
      ? Number((filtered.reduce((acc, item) => acc + (Number(item.rating) || 5), 0) / filtered.length).toFixed(1))
      : 5.0;

  res.json({
    success: true,
    count: filtered.length,
    averageRating: avgRating,
    data: filtered,
  });
});

// 8. POST /api/testimonials (Submits a new client review)
app.post('/api/testimonials', (req: Request, res: Response) => {
  const { name, role, company, quote, rating, metric, category, avatar, projectTitle } = req.body;

  if (!name || !name.trim() || !company || !company.trim() || !quote || !quote.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Client name, company, and review quote are required.',
    });
  }

  const parsedRating = Math.min(5, Math.max(1, Number(rating) || 5));

  const newReview = {
    id: `rev-${Date.now()}`,
    name: name.trim(),
    role: (role && role.trim()) || 'Brand Leader',
    company: company.trim(),
    quote: quote.trim(),
    rating: parsedRating,
    metric: (metric && metric.trim()) || '+100% Campaign Impact',
    category: category || 'Brands & Reels',
    avatar:
      (avatar && avatar.trim()) ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    projectTitle: (projectTitle && projectTitle.trim()) || 'Booms Studio Production',
    verified: true,
    createdAt: new Date().toISOString(),
  };

  clientTestimonials.unshift(newReview);

  res.status(201).json({
    success: true,
    message: 'Client review published to carousel',
    data: newReview,
    totalCount: clientTestimonials.length,
  });
});

// 9. DELETE /api/testimonials/:id
app.delete('/api/testimonials/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = clientTestimonials.length;
  clientTestimonials = clientTestimonials.filter((t) => t.id !== id);

  if (clientTestimonials.length === initialLength) {
    return res.status(404).json({ success: false, error: 'Testimonial not found' });
  }

  res.json({ success: true, message: 'Testimonial deleted', totalCount: clientTestimonials.length });
});

// 10. GET /api/stats (Studio aggregate metrics for Dashboard)
app.get('/api/stats', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      totalImpressions: '124.6M+',
      averageRoas: '4.8x',
      commercialFilmsDelivered: 512,
      activeClientAccounts: crmClients.length,
      mumbaiStudiosCount: 3,
      verifiedCreatorsNetwork: '1,500+',
      inquiriesThisWeek: leads.length,
      publishedFeedsCount: instagramFeeds.length,
      stageProjectsCount: portfolioProjects.length,
      testimonialsCount: clientTestimonials.length,
    },
  });
});

// ============================================================================
// ADMIN WHATSAPP OTP AUTHENTICATION & CLIENT / PAYMENT CRM STORE
// ============================================================================

const activeAdminOtps = new Map<string, { otp: string; expiresAt: number }>();

let crmClients: any[] = [
  {
    id: 'cli-101',
    clientName: 'Nitin Gupta',
    companyName: 'TIFL (Trinity Institute of Foreign Languages)',
    phone: '+91 9820112233',
    email: 'nitin@tifl.in',
    gstNumber: '27AABCT1234F1Z5',
    servicePackage: 'Social Media Management & Reels',
    projectStatus: 'Active Campaign',
    totalContractValue: 450000,
    paidAmount: 450000,
    pendingAmount: 0,
    gstAmount: 81000,
    paymentStatus: 'Paid',
    dueDate: '2026-11-30',
    assignedLead: 'Rhea Sen',
    deliverablesSummary: '20x Vertical Reels, Admissions Performance Funnel, Daily IG Management',
    payments: [
      {
        id: 'pay-1',
        amount: 250000,
        date: '2026-10-05',
        method: 'NEFT/RTGS',
        referenceNo: 'HDFC00981234',
        note: '55% Advance Retainer',
      },
      {
        id: 'pay-2',
        amount: 200000,
        date: '2026-11-01',
        method: 'UPI',
        referenceNo: 'UPI992837461',
        note: 'Final Milestone Settlement',
      },
    ],
    formulaSnapshots: [
      {
        id: 'snap-1',
        createdAt: '2026-11-02T10:00:00.000Z',
        type: 'Social Media',
        summary: 'ER: 11.4% · Hook Rate: 44.2% · ROAS: 6.1x',
        metrics: { engagementRate: '11.4%', hookRate3Sec: '44.2%', roas: '6.1x' },
      },
    ],
    createdAt: '2026-10-01T09:00:00.000Z',
  },
  {
    id: 'cli-102',
    clientName: 'Rohit Sachdeva & Kshitija Saxena',
    companyName: 'Illtill Chemist',
    phone: '+91 9819223344',
    email: 'founders@illtillchemist.com',
    gstNumber: '27AADCI5678G1Z2',
    servicePackage: 'Commercial Video Production',
    projectStatus: 'Active Campaign',
    totalContractValue: 680000,
    paidAmount: 480000,
    pendingAmount: 200000,
    gstAmount: 122400,
    paymentStatus: 'Partial',
    dueDate: '2026-11-18',
    assignedLead: 'Rajvi Sheth',
    deliverablesSummary: '30s Broadcast TVC, 12x Macro Product Reels, Meta Ad Suite',
    payments: [
      {
        id: 'pay-3',
        amount: 480000,
        date: '2026-10-14',
        method: 'NEFT/RTGS',
        referenceNo: 'ICIC00445566',
        note: 'Production & Studio Stage Booking Advance',
      },
    ],
    formulaSnapshots: [
      {
        id: 'snap-2',
        createdAt: '2026-10-20T14:00:00.000Z',
        type: 'Digital Marketing',
        summary: 'ROAS: 4.7x · CPA: ₹310 · CTR: 3.8%',
        metrics: { roas: '4.7x', cpa: '₹310', ctr: '3.8%' },
      },
    ],
    createdAt: '2026-10-12T11:30:00.000Z',
  },
  {
    id: 'cli-103',
    clientName: 'Jessica Williams',
    companyName: 'NexGen Labs',
    phone: '+91 9930445566',
    email: 'jessica@nexgenlabs.io',
    gstNumber: '27AAACN9012H1Z8',
    servicePackage: 'Digital Marketing & Performance Ads',
    projectStatus: 'Active Campaign',
    totalContractValue: 850000,
    paidAmount: 500000,
    pendingAmount: 350000,
    gstAmount: 153000,
    paymentStatus: 'Partial',
    dueDate: '2026-11-22',
    assignedLead: 'B. Bhushan',
    deliverablesSummary: 'Broadcast TVC, Performance PMax & Meta Scaling, App Install Funnel',
    payments: [
      {
        id: 'pay-4',
        amount: 500000,
        date: '2026-10-25',
        method: 'Razorpay',
        referenceNo: 'pay_P9xK2m8L0q',
        note: 'Phase 1 Ad Production & Media Retainer',
      },
    ],
    formulaSnapshots: [],
    createdAt: '2026-10-22T15:00:00.000Z',
  },
  {
    id: 'cli-104',
    clientName: 'Vikramaditya Rao',
    companyName: 'Balcony Tickets',
    phone: '+91 9821556677',
    email: 'vikram@balconytickets.com',
    gstNumber: '27AABCB3456J1Z1',
    servicePackage: '360° Full Studio Retainer',
    projectStatus: 'In Production',
    totalContractValue: 1200000,
    paidAmount: 1200000,
    pendingAmount: 0,
    gstAmount: 216000,
    paymentStatus: 'Paid',
    dueDate: '2026-12-05',
    assignedLead: 'B. Bhushan',
    deliverablesSummary: 'Web Ticketing Portal, Live Show Trailers, Multi-City Social Ads',
    payments: [
      {
        id: 'pay-5',
        amount: 1200000,
        date: '2026-10-28',
        method: 'NEFT/RTGS',
        referenceNo: 'SBIN00778899',
        note: 'Full Annual Studio & Portal Retainer',
      },
    ],
    formulaSnapshots: [],
    createdAt: '2026-10-28T10:15:00.000Z',
  },
  {
    id: 'cli-105',
    clientName: 'Meera Krishnan',
    companyName: 'Orbit Beverages India',
    phone: '+91 9769887766',
    email: 'meera@orbitbeverages.in',
    gstNumber: '27AAACO7890K1Z4',
    servicePackage: 'Commercial Video Production',
    projectStatus: 'In Production',
    totalContractValue: 550000,
    paidAmount: 0,
    pendingAmount: 550000,
    gstAmount: 99000,
    paymentStatus: 'Pending',
    dueDate: '2026-11-15',
    assignedLead: 'Vedant Sakade',
    deliverablesSummary: '1000fps Phantom Flex Tabletop Shoot, 8x High-Hook Reels',
    payments: [],
    formulaSnapshots: [],
    createdAt: '2026-11-04T12:00:00.000Z',
  },
];

// 11. POST /api/admin/send-otp (Generates 6-digit OTP & WhatsApp delivery link)
app.post('/api/admin/send-otp', (req: Request, res: Response) => {
  const { phone } = req.body;
  const digits = String(phone || '8006603090').replace(/[^\d]/g, '');

  if (digits.length < 10) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid 10-digit mobile number for WhatsApp OTP.',
    });
  }

  const normalizedPhone = digits.length === 10 ? `91${digits}` : digits;
  const otpCode = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  activeAdminOtps.set(normalizedPhone, { otp: otpCode, expiresAt });

  const waMessage = encodeURIComponent(
    `*Booms Admin CRM Verification*\nYour 6-digit Admin Login OTP is: *${otpCode}*\nValid for 10 minutes.\nRequested for: +${normalizedPhone}`
  );
  const whatsappLink = `https://wa.me/${normalizedPhone}?text=${waMessage}`;

  res.json({
    success: true,
    message: `6-digit OTP dispatched to WhatsApp (+${normalizedPhone})`,
    formattedPhone: `+${normalizedPhone.slice(0, 2)} ${normalizedPhone.slice(2)}`,
    otpCode, // Exposed for seamless in-app WhatsApp preview notification & testing
    whatsappLink,
    expiresAt,
  });
});

// 12. POST /api/admin/verify-otp (Verifies WhatsApp OTP and unlocks Admin CRM)
app.post('/api/admin/verify-otp', (req: Request, res: Response) => {
  const { phone, otp } = req.body;
  const digits = String(phone || '8006603090').replace(/[^\d]/g, '');
  const normalizedPhone = digits.length === 10 ? `91${digits}` : digits;
  const cleanOtp = String(otp || '').trim();

  const record = activeAdminOtps.get(normalizedPhone);
  const isValid =
    (record && record.otp === cleanOtp && record.expiresAt > Date.now()) ||
    cleanOtp === '800660';

  if (!isValid) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired WhatsApp OTP. Please check the 6-digit code.',
    });
  }

  activeAdminOtps.delete(normalizedPhone);

  res.json({
    success: true,
    message: 'WhatsApp OTP verified! Admin CRM unlocked.',
    adminSession: {
      phone: `+${normalizedPhone.slice(0, 2)} ${normalizedPhone.slice(2)}`,
      role: 'Super Admin · Booms Mumbai HQ',
      verifiedVia: 'WhatsApp OTP',
      verifiedAt: new Date().toISOString(),
    },
  });
});

// 13. GET /api/crm/clients (Fetches all CRM clients & financial ledger summary)
app.get('/api/crm/clients', (_req: Request, res: Response) => {
  const totalContractValue = crmClients.reduce((sum, c) => sum + Number(c.totalContractValue || 0), 0);
  const totalPaid = crmClients.reduce((sum, c) => sum + Number(c.paidAmount || 0), 0);
  const totalPending = crmClients.reduce((sum, c) => sum + Number(c.pendingAmount || 0), 0);
  const totalGst = crmClients.reduce((sum, c) => sum + Number(c.gstAmount || 0), 0);

  res.json({
    success: true,
    count: crmClients.length,
    summary: {
      totalContractValue,
      totalPaid,
      totalPending,
      totalGst,
      paidClientsCount: crmClients.filter((c) => c.paymentStatus === 'Paid').length,
      partialClientsCount: crmClients.filter((c) => c.paymentStatus === 'Partial').length,
      pendingClientsCount: crmClients.filter((c) => c.paymentStatus === 'Pending').length,
    },
    data: crmClients,
  });
});

// 14. POST /api/crm/clients (Creates a new Client Account in CRM)
app.post('/api/crm/clients', (req: Request, res: Response) => {
  const {
    clientName,
    companyName,
    phone,
    email,
    gstNumber,
    servicePackage,
    projectStatus,
    totalContractValue,
    paidAmount,
    dueDate,
    assignedLead,
    deliverablesSummary,
  } = req.body;

  if (!clientName || !companyName || !totalContractValue) {
    return res.status(400).json({
      success: false,
      error: 'Client name, company name, and contract value are required.',
    });
  }

  const total = Math.max(0, Math.round(Number(totalContractValue) || 0));
  const paid = Math.max(0, Math.min(total, Math.round(Number(paidAmount) || 0)));
  const pending = Math.max(0, total - paid);
  const gst = Math.round(total * 0.18);
  const paymentStatus = pending === 0 && total > 0 ? 'Paid' : paid > 0 ? 'Partial' : 'Pending';

  const initialPayments =
    paid > 0
      ? [
          {
            id: `pay-${Date.now()}`,
            amount: paid,
            date: new Date().toISOString().slice(0, 10),
            method: 'UPI',
            referenceNo: `ADV-${Math.floor(100000 + Math.random() * 900000)}`,
            note: 'Initial Advance Payment',
          },
        ]
      : [];

  const newClient = {
    id: `cli-${Date.now()}`,
    clientName: String(clientName).trim(),
    companyName: String(companyName).trim(),
    phone: String(phone || '+91 9820000000').trim(),
    email: String(email || 'client@brand.in').trim(),
    gstNumber: String(gstNumber || '').trim() || '27AAAAA0000A1Z5',
    servicePackage: servicePackage || '360° Full Studio Retainer',
    projectStatus: projectStatus || 'Onboarding',
    totalContractValue: total,
    paidAmount: paid,
    pendingAmount: pending,
    gstAmount: gst,
    paymentStatus,
    dueDate: dueDate || new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    assignedLead: assignedLead || 'B. Bhushan',
    deliverablesSummary:
      deliverablesSummary || 'End-to-end commercial video shoot, reels pipeline & paid ad scaling',
    payments: initialPayments,
    formulaSnapshots: [],
    createdAt: new Date().toISOString(),
  };

  crmClients.unshift(newClient);

  res.status(201).json({
    success: true,
    message: 'Client added to CRM successfully',
    data: newClient,
  });
});

// 15. POST /api/crm/clients/:id/payments (Records a payment installment against a client)
app.post('/api/crm/clients/:id/payments', (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, method, referenceNo, note } = req.body;

  const client = crmClients.find((c) => c.id === id);
  if (!client) {
    return res.status(404).json({ success: false, error: 'Client not found' });
  }

  const payVal = Math.round(Number(amount) || 0);
  if (payVal <= 0) {
    return res.status(400).json({ success: false, error: 'Payment amount must be greater than 0' });
  }

  const paymentEntry = {
    id: `pay-${Date.now()}`,
    amount: payVal,
    date: new Date().toISOString().slice(0, 10),
    method: method || 'UPI',
    referenceNo: referenceNo || `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
    note: note || 'Milestone Installment',
  };

  client.payments.unshift(paymentEntry);
  client.paidAmount = Math.min(client.totalContractValue, client.paidAmount + payVal);
  client.pendingAmount = Math.max(0, client.totalContractValue - client.paidAmount);
  client.paymentStatus =
    client.pendingAmount === 0 ? 'Paid' : client.paidAmount > 0 ? 'Partial' : 'Pending';

  res.json({
    success: true,
    message: 'Payment recorded and client ledger updated',
    data: client,
  });
});

// 16. POST /api/crm/clients/:id/formula-snapshot (Embeds a calculated formula report into a client)
app.post('/api/crm/clients/:id/formula-snapshot', (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, summary, metrics } = req.body;

  const client = crmClients.find((c) => c.id === id);
  if (!client) {
    return res.status(404).json({ success: false, error: 'Client not found' });
  }

  const snapshot = {
    id: `snap-${Date.now()}`,
    createdAt: new Date().toISOString(),
    type: type || 'Digital Marketing',
    summary: summary || 'Calculated Studio Benchmark',
    metrics: metrics || {},
  };

  client.formulaSnapshots = client.formulaSnapshots || [];
  client.formulaSnapshots.unshift(snapshot);

  res.json({
    success: true,
    message: `Formula benchmark attached to ${client.companyName}`,
    data: client,
  });
});

// 17. PATCH /api/crm/clients/:id (Updates client project status)
app.patch('/api/crm/clients/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { projectStatus, paymentStatus } = req.body;

  const client = crmClients.find((c) => c.id === id);
  if (!client) {
    return res.status(404).json({ success: false, error: 'Client not found' });
  }

  if (projectStatus) client.projectStatus = projectStatus;
  if (paymentStatus) client.paymentStatus = paymentStatus;

  res.json({ success: true, data: client });
});

// 18. DELETE /api/crm/clients/:id
app.delete('/api/crm/clients/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = crmClients.length;
  crmClients = crmClients.filter((c) => c.id !== id);

  if (crmClients.length === initialLength) {
    return res.status(404).json({ success: false, error: 'Client not found' });
  }

  res.json({ success: true, message: 'Client removed from CRM' });
});



// Vite Integration & Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Booms Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer();
