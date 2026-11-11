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
    id: 'music-video-1',
    title: 'Cinematic Music Video I',
    client: 'Pixel Nudge Visuals',
    category: 'Music Videos',
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
    category: 'Ads',
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
    category: 'Ads',
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
    title: 'Short Film Showcase I',
    client: 'Metawork Studios',
    category: 'Films',
    year: '2026',
    image: 'https://img.youtube.com/vi/UF6nPLrCm74/sddefault.jpg',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/UF6nPLrCm74',
    youtubeId: 'UF6nPLrCm74',
    tagline: 'An artistic short film production pushing cinematic boundaries',
    description: 'A high-concept narrative exploring human connection in modern metropolitan Mumbai. Screened across international film circuits.',
    metrics: [
      { label: 'Festival Laurels', value: '4 Awards' },
      { label: 'Audience Reach', value: '1.8M' },
      { label: 'Critic Score', value: '96%' },
      { label: 'Screenings', value: '12 Cities' },
    ],
    deliverables: ['Theatrical DCP Master', 'Behind-the-Scenes Mini-Doc', 'Soundtrack LP'],
    director: 'Kabir Varma',
    location: 'Bandra Soundstage & South Mumbai Sets',
    accentColor: '#10b981',
    duration: '8:20',
  },
  {
    id: 'brands-reels-1',
    title: 'Brands & Reels Showcase I',
    client: 'Trinity Institute of Foreign Languages (TIFL)',
    category: 'Brands & Reels',
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
    title: 'Illtill Chemist Ad Reel I',
    client: 'Illtill Chemist',
    category: 'Brands & Reels',
    year: '2026',
    image: 'https://img.youtube.com/vi/MIGxQHrcJzo/sddefault.jpg',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/MIGxQHrcJzo',
    youtubeId: 'MIGxQHrcJzo',
    tagline: 'Promotional content focusing on customer trust and product benefits',
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
    title: 'Balcony Tickets Official Portal',
    client: 'Balcony Tickets',
    category: 'Films',
    year: '2026',
    image: '/src/assets/images/hero_booms_studio_1794348322633.jpg',
    type: 'link',
    videoUrl: 'https://www.balconytickets.com/',
    tagline: 'Official platform & entertainment video production for Balcony Tickets',
    description: 'Comprehensive digital presence, ticketing UI, and video advertising for premier Indian live cinema and stage shows.',
    metrics: [
      { label: 'Monthly Visitors', value: '1.2M' },
      { label: 'Booking Conversion', value: '+35%' },
      { label: 'Ticket Volume', value: '250K+' },
      { label: 'User Rating', value: '4.9/5' },
    ],
    deliverables: ['Web Portal Development', 'Brand Video Ads', 'Event Trailers'],
    director: 'B. Bhushan',
    location: 'Mumbai Digital Lab',
    accentColor: '#a855f7',
    duration: 'Live Platform',
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

  if (url.includes('instagram.com')) {
    return {
      type: 'instagram' as const,
      embedUrl: url,
      thumbnailUrl: '/src/assets/images/campaign_beverage_1794348323268.jpg',
    };
  }

  return {
    type: 'link' as const,
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

// 0. POST /api/portfolio-projects (Adds video or link directly to 3D Stage & Portfolio)
app.post('/api/portfolio-projects', (req: Request, res: Response) => {
  const { title, client, category, videoUrl, imageUrl, tagline, description, location, duration } = req.body;

  if (!title || (!videoUrl && !imageUrl)) {
    return res.status(400).json({ success: false, error: 'Title and Video URL or Image are required' });
  }

  const media = parseMediaUrl(videoUrl || '');

  const newProject = {
    id: `proj-${Date.now()}`,
    title: title.trim(),
    client: (client && client.trim()) || 'Booms Partner Client',
    category: category || 'Commercial Film',
    year: '2026',
    image: imageUrl || media.thumbnailUrl,
    type: media.type,
    videoUrl: media.embedUrl || videoUrl,
    youtubeId: media.youtubeId,
    tagline: tagline || 'High-impact commercial video scaled by Booms Mumbai Studio',
    description: description || 'Creative visual storytelling and cinema-grade production engineered to stop thumbs and drive client growth.',
    metrics: [
      { label: 'Reel Views', value: '1.2M+' },
      { label: 'Avg ROAS', value: '4.8x' },
      { label: 'Shares', value: '45K+' },
      { label: 'Engagement', value: '8.6%' },
    ],
    deliverables: ['Cinema Commercial Cut', '4K Vertical Reels', 'Color Grade Master', 'Sound Design'],
    director: 'Booms Cine Team',
    location: location || 'Booms Production Hub, Mumbai',
    accentColor: '#38bdf8',
    duration: duration || '0:45',
  };

  // Add immediately to the beginning of the 3D Stage projects list
  portfolioProjects.unshift(newProject);

  // Also auto-add to Instagram feeds if it's a social/reel link
  if (videoUrl && (videoUrl.includes('instagram.com') || videoUrl.includes('shorts') || category === 'Brands & Reels')) {
    instagramFeeds.unshift({
      id: `feed-${Date.now()}`,
      clientName: newProject.client,
      instagramHandle: `@${newProject.client.toLowerCase().replace(/[^a-z0-9]/g, '')}.in`,
      postUrl: videoUrl,
      mediaType: 'reel',
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
    message: 'Video added to Interactive 3D Stage and Portfolio successfully',
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

// 7. GET /api/stats (Studio aggregate metrics for Dashboard)
app.get('/api/stats', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      totalImpressions: '124.6M+',
      averageRoas: '4.8x',
      commercialFilmsDelivered: 512,
      activeClientAccounts: 48,
      mumbaiStudiosCount: 3,
      verifiedCreatorsNetwork: '1,500+',
      inquiriesThisWeek: leads.length,
      publishedFeedsCount: instagramFeeds.length,
      stageProjectsCount: portfolioProjects.length,
    },
  });
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
