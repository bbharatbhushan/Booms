import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ThreeBackground } from './components/ThreeBackground';
import { HeroSection } from './components/HeroSection';
import { ThreePortfolioPlayer } from './components/ThreePortfolioPlayer';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { RoiEstimator } from './components/RoiEstimator';
import { MumbaiStudioSection } from './components/MumbaiStudioSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { DashboardModal } from './components/DashboardModal';
import { InstagramFeedItem, PortfolioProject } from './types';
import { INITIAL_INSTAGRAM_FEEDS, PORTFOLIO_PROJECTS } from './utils/portfolioData';
import { soundFx } from './utils/soundEffects';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [inquiryService, setInquiryService] = useState('video-ad-production');
  const [inquiryBudget, setInquiryBudget] = useState('₹2,50,000');
  
  // Dashboard & Real-Time Sync State
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<'videos' | 'feeds' | 'leads' | 'stats'>('videos');
  const [feeds, setFeeds] = useState<InstagramFeedItem[]>(INITIAL_INSTAGRAM_FEEDS);
  const [projects, setProjects] = useState<PortfolioProject[]>(PORTFOLIO_PROJECTS);

  // Fetch Feeds from Backend
  const fetchFeeds = async () => {
    try {
      const res = await fetch('/api/instagram-feeds');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setFeeds(data.data);
      }
    } catch {
      // Kept fallback in state
    }
  };

  // Fetch 3D Stage & Portfolio Projects from Backend
  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/portfolio-projects');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProjects(data.data);
      }
    } catch {
      // Kept fallback in state
    }
  };

  useEffect(() => {
    fetchFeeds();
    fetchProjects();
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    soundFx.enabled = next;
    setSoundEnabled(next);
    if (next) soundFx.playClick(800);
  };

  const handleApplyPlanToForm = (service: string, budget: string) => {
    setInquiryService(service);
    setInquiryBudget(budget);
  };

  const handleOpenAddFeed = () => {
    setDashboardTab('feeds');
    setIsDashboardOpen(true);
  };

  const handleOpenDashboard = (tab: 'videos' | 'feeds' | 'leads' | 'stats' = 'videos') => {
    setDashboardTab(tab);
    setIsDashboardOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-[#0F172A] selection:text-white">
      {/* Dynamic 3D Three.js Ambient & Scroll Reaction Canvas */}
      <ThreeBackground />

      {/* Top Bar Header with Navigation & About Section Link */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenDashboard={() => handleOpenDashboard('videos')}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />

        {/* Interactive 3D Stage with dynamic projects sync & real video playback */}
        <ThreePortfolioPlayer
          projects={projects}
          feeds={feeds}
          onOpenAddFeed={handleOpenAddFeed}
          onOpenDashboard={handleOpenDashboard}
        />

        {/* Core Capabilities & Deliverables */}
        <ServicesSection />

        {/* Dedicated About Section referenced from pixelnudge.in */}
        <AboutSection />

        {/* Campaign ROI & Reach Estimator */}
        <RoiEstimator onApplyPlanToForm={handleApplyPlanToForm} />

        {/* Mumbai Production Studio & Hardware Vault */}
        <MumbaiStudioSection />

        {/* Contact Inquiry & Pitch Request */}
        <ContactSection initialService={inquiryService} initialBudget={inquiryBudget} />
      </main>

      {/* 3D Interactive WhatsApp Button with Direct Chat (+91 8006603090) */}
      <WhatsAppButton />

      {/* Studio & Portfolio Dashboard Modal (Live Backend API) */}
      <DashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        projects={projects}
        onRefreshProjects={fetchProjects}
        feeds={feeds}
        onRefreshFeeds={fetchFeeds}
        defaultTab={dashboardTab}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
