import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, CheckCircle, RefreshCw, Instagram, Users, BarChart3, AlertCircle, Film, Sparkles, Phone, Mail, Calendar, Video, ExternalLink } from 'lucide-react';
import { InstagramFeedItem, LeadItem, PortfolioProject } from '../types';
import { soundFx } from '../utils/soundEffects';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects?: PortfolioProject[];
  onRefreshProjects?: () => void;
  feeds: InstagramFeedItem[];
  onRefreshFeeds: () => void;
  defaultTab?: 'videos' | 'feeds' | 'leads' | 'stats';
}

export const DashboardModal: React.FC<DashboardModalProps> = ({
  isOpen,
  onClose,
  projects = [],
  onRefreshProjects = () => {},
  feeds,
  onRefreshFeeds,
  defaultTab = 'videos',
}) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'feeds' | 'leads' | 'stats'>(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // Form State for Adding New Video/Project to 3D Stage
  const [projectTitle, setProjectTitle] = useState('');
  const [projectClient, setProjectClient] = useState('');
  const [projectCategory, setProjectCategory] = useState('Commercial Film');
  const [projectVideoUrl, setProjectVideoUrl] = useState('');
  const [projectTagline, setProjectTagline] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);
  const [projectMessage, setProjectMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State for Adding New Client Instagram Feed
  const [clientName, setClientName] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [mediaType, setMediaType] = useState<'reel' | 'post'>('reel');
  const [caption, setCaption] = useState('');
  const [viewsCount, setViewsCount] = useState('1.2M');
  const [likesCount, setLikesCount] = useState('85K');
  const [commentsCount, setCommentsCount] = useState('420');
  const [selectedThumb, setSelectedThumb] = useState('/src/assets/images/hero_booms_studio_1794348322633.jpg');
  const [isSubmittingFeed, setIsSubmittingFeed] = useState(false);
  const [feedMessage, setFeedMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Leads State
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  // Studio Stats State
  const [stats, setStats] = useState<any>(null);

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setLeads(data.data);
      }
    } catch {
      // Keep existing leads
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch {
      // Handled gracefully
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (activeTab === 'leads') fetchLeads();
      if (activeTab === 'stats') fetchStats();
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  // Handle Adding Video to 3D Stage & Portfolio
  const handleAddProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim() || !projectVideoUrl.trim()) {
      setProjectMessage({ type: 'error', text: 'Please provide both Project Title and Video URL or Link' });
      return;
    }

    setIsSubmittingProject(true);
    setProjectMessage(null);

    try {
      const res = await fetch('/api/portfolio-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: projectTitle.trim(),
          client: projectClient.trim() || 'Booms Brand Partner',
          category: projectCategory,
          videoUrl: projectVideoUrl.trim(),
          tagline: projectTagline.trim() || 'Produced and scaled by Booms Mumbai Studio',
          description: projectDescription.trim() || 'High-end cinema production engineered for viral retention and measurable business growth.',
        }),
      });

      const data = await res.json();
      if (data.success) {
        soundFx.playBoom();
        setProjectMessage({
          type: 'success',
          text: 'Video added! It is now live on the Interactive 3D Stage and Portfolio!',
        });
        setProjectTitle('');
        setProjectClient('');
        setProjectVideoUrl('');
        setProjectTagline('');
        setProjectDescription('');
        onRefreshProjects();
        onRefreshFeeds();
      } else {
        setProjectMessage({ type: 'error', text: data.error || 'Failed to add project' });
      }
    } catch {
      setProjectMessage({ type: 'error', text: 'Network error connecting to backend' });
    } finally {
      setIsSubmittingProject(false);
    }
  };

  // Handle Deleting Video from 3D Stage
  const handleDeleteProject = async (id: string) => {
    soundFx.playClick(500);
    try {
      const res = await fetch(`/api/portfolio-projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        onRefreshProjects();
      }
    } catch {
      // Handled
    }
  };

  // Handle Form Submission for New Feed
  const handleAddFeedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !instagramHandle.trim()) {
      setFeedMessage({ type: 'error', text: 'Please fill in client name and Instagram handle' });
      return;
    }

    setIsSubmittingFeed(true);
    setFeedMessage(null);

    try {
      const res = await fetch('/api/instagram-feeds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName.trim(),
          instagramHandle: instagramHandle.trim(),
          postUrl: postUrl.trim() || `https://instagram.com/${instagramHandle.replace('@', '')}`,
          mediaType,
          caption: caption.trim() || 'Produced and scaled by Booms Mumbai Studio',
          viewsCount,
          likesCount,
          commentsCount,
          thumbnailUrl: selectedThumb,
          tags: ['#BoomsViral', '#ClientCampaign', '#MumbaiProduction'],
        }),
      });

      const data = await res.json();
      if (data.success) {
        soundFx.playBoom();
        setFeedMessage({ type: 'success', text: 'Feed published successfully to portfolio!' });
        setClientName('');
        setInstagramHandle('');
        setPostUrl('');
        setCaption('');
        onRefreshFeeds();
      } else {
        setFeedMessage({ type: 'error', text: data.error || 'Failed to add feed' });
      }
    } catch {
      setFeedMessage({ type: 'error', text: 'Network error connecting to backend' });
    } finally {
      setIsSubmittingFeed(false);
    }
  };

  // Handle Feed Deletion
  const handleDeleteFeed = async (id: string) => {
    soundFx.playClick(500);
    try {
      const res = await fetch(`/api/instagram-feeds/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        onRefreshFeeds();
      }
    } catch {
      // Handled
    }
  };

  // Handle Lead Status Change
  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: newStatus as any } : l)));
      }
    } catch {
      // Handled
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0b0f19] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0d121f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0F172A] border border-slate-700 flex items-center justify-center text-sky-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Booms Studio &amp; Portfolio Dashboard
                </h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                  Live Backend API
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage 3D stage videos, client Instagram feeds, incoming client inquiries &amp; telemetry
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick(600);
              onClose();
            }}
            aria-label="Close dashboard modal"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800/80 bg-[#090d16] overflow-x-auto">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick(700);
              setActiveTab('videos');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'videos'
                ? 'bg-[#0F172A] text-white border-sky-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Video className="w-4 h-4 text-sky-400" />
            <span>3D Stage Videos ({projects.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick(700);
              setActiveTab('feeds');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'feeds'
                ? 'bg-[#0F172A] text-white border-sky-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Instagram className="w-4 h-4 text-sky-400" />
            <span>Client Feeds ({feeds.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick(700);
              setActiveTab('leads');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'leads'
                ? 'bg-[#0F172A] text-white border-sky-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>Inquiries &amp; Leads CRM ({leads.length || '...'})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick(700);
              setActiveTab('stats');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'stats'
                ? 'bg-[#0F172A] text-white border-sky-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-sky-400" />
            <span>Studio Analytics</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: 3D Stage Videos & Projects Management */}
          {activeTab === 'videos' && (
            <div className="space-y-8">
              {/* Add Video to 3D Stage Card */}
              <div className="bg-[#0e1320] border border-slate-700/70 rounded-xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <h4 className="text-sm font-bold text-white font-display">
                      Add Video or Link to Interactive 3D Stage
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Directly syncs to 3D cylinder stage
                  </span>
                </div>

                {projectMessage && (
                  <div
                    className={`mb-4 p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
                      projectMessage.type === 'success'
                        ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                        : 'bg-rose-950/80 border border-rose-800 text-rose-300'
                    }`}
                  >
                    {projectMessage.type === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span>{projectMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleAddProjectSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Video URL or Link *
                      </label>
                      <input
                        type="text"
                        required
                        value={projectVideoUrl}
                        onChange={(e) => setProjectVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=... or reel"
                        className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                      <span className="text-[10px] text-slate-500 mt-0.5 block">
                        Auto-extracts YouTube thumbnail &amp; embed player
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Campaign Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="e.g. Cinematic Music Video IV"
                        className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Client / Brand Name
                      </label>
                      <input
                        type="text"
                        value={projectClient}
                        onChange={(e) => setProjectClient(e.target.value)}
                        placeholder="e.g. Illtill Chemist"
                        className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Category
                      </label>
                      <select
                        value={projectCategory}
                        onChange={(e) => setProjectCategory(e.target.value)}
                        className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                      >
                        <option value="Commercial Film">Commercial Film</option>
                        <option value="Music Videos">Music Videos</option>
                        <option value="Ads">Ads</option>
                        <option value="Brands &amp; Reels">Brands &amp; Reels</option>
                        <option value="Films">Films</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Tagline / Hook
                      </label>
                      <input
                        type="text"
                        value={projectTagline}
                        onChange={(e) => setProjectTagline(e.target.value)}
                        placeholder="e.g. Stunning visual rhythm celebrating nature and city lights"
                        className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmittingProject}
                      className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-slate-800 border border-slate-600 hover:border-sky-500 rounded-lg transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {isSubmittingProject ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-400" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-sky-400" />
                      )}
                      <span>+ Add Video to 3D Stage &amp; Portfolio</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Active Projects on 3D Stage */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
                    Active Projects on Interactive 3D Stage ({projects.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => onRefreshProjects()}
                    className="flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 font-mono"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Refresh</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-[#0e1320] border border-slate-800 hover:border-slate-700 rounded-xl p-3 flex items-start justify-between gap-3 shadow transition-all group"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          referrerPolicy="no-referrer"
                          className="w-16 h-12 rounded object-cover border border-slate-700 shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-white truncate font-display">
                            {proj.title}
                          </h5>
                          <div className="text-[11px] text-slate-400 truncate">
                            {proj.client} · {proj.category}
                          </div>
                          <div className="text-[10px] font-mono text-sky-400 mt-0.5 flex items-center gap-1 truncate">
                            {proj.videoUrl ? (
                              <>
                                <Video className="w-3 h-3 shrink-0" />
                                <span className="truncate">{proj.videoUrl}</span>
                              </>
                            ) : (
                              <span>3D Texture Render</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteProject(proj.id)}
                        title="Delete project from 3D stage"
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Manage Client Feeds */}
          {activeTab === 'feeds' && (
            <div className="space-y-8">
              {/* Publishing Form */}
              <div className="bg-[#0e1320] border border-slate-700/70 rounded-xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <h4 className="text-sm font-bold text-white font-display">
                      Publish New Client Instagram Feed
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Directly syncs to Portfolio section
                  </span>
                </div>

                {feedMessage && (
                  <div
                    className={`mb-4 p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
                      feedMessage.type === 'success'
                        ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                        : 'bg-rose-950/80 border border-rose-800 text-rose-300'
                    }`}
                  >
                    {feedMessage.type === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span>{feedMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleAddFeedSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Client Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Orbit Beverages"
                        className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Instagram Handle *
                      </label>
                      <input
                        type="text"
                        required
                        value={instagramHandle}
                        onChange={(e) => setInstagramHandle(e.target.value)}
                        placeholder="e.g. @orbitbeverages.in"
                        className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Format Type
                      </label>
                      <select
                        value={mediaType}
                        onChange={(e) => setMediaType(e.target.value as 'reel' | 'post')}
                        className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                      >
                        <option value="reel">Instagram Reel (Vertical 9:16)</option>
                        <option value="post">Standard Post / Carousel</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Instagram Post URL
                      </label>
                      <input
                        type="url"
                        value={postUrl}
                        onChange={(e) => setPostUrl(e.target.value)}
                        placeholder="https://instagram.com/p/..."
                        className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Campaign Caption / Hook
                      </label>
                      <input
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="e.g. 1000fps citrus splash commercial shoot..."
                        className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Views Count
                      </label>
                      <input
                        type="text"
                        value={viewsCount}
                        onChange={(e) => setViewsCount(e.target.value)}
                        className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Likes Count
                      </label>
                      <input
                        type="text"
                        value={likesCount}
                        onChange={(e) => setLikesCount(e.target.value)}
                        className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Comments
                      </label>
                      <input
                        type="text"
                        value={commentsCount}
                        onChange={(e) => setCommentsCount(e.target.value)}
                        className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Visual Asset
                      </label>
                      <select
                        value={selectedThumb}
                        onChange={(e) => setSelectedThumb(e.target.value)}
                        className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                      >
                        <option value="/src/assets/images/campaign_beverage_1794348323268.jpg">Beverage Commercial</option>
                        <option value="/src/assets/images/campaign_tech_1794348325154.jpg">Tech / Fintech Studio</option>
                        <option value="/src/assets/images/hero_booms_studio_1794348322633.jpg">Sea Link Night Shoot</option>
                        <option value="/src/assets/images/production_gear_1794348325098.jpg">Cinema Gear Lab</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmittingFeed}
                      className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-slate-800 border border-slate-600 hover:border-sky-500 rounded-lg transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {isSubmittingFeed ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-400" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-sky-400" />
                      )}
                      <span>+ Add to Client Feeds</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Active Feeds in Portfolio */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
                    Active Client Feeds in Portfolio ({feeds.length})
                  </h4>
                  <button
                    type="button"
                    onClick={onRefreshFeeds}
                    className="flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 font-mono"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Refresh</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {feeds.map((feed) => (
                    <div
                      key={feed.id}
                      className="bg-[#0e1320] border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3 shadow"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={feed.thumbnailUrl}
                          alt={feed.clientName}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-white truncate font-display">
                            {feed.clientName}
                          </h5>
                          <div className="text-[11px] font-mono text-sky-400 truncate">
                            {feed.instagramHandle}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {feed.viewsCount} views · {feed.mediaType}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteFeed(feed.id)}
                        aria-label={`Delete feed for ${feed.clientName}`}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Leads CRM */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    Incoming Inquiries from Booms.in
                  </h4>
                  <p className="text-xs text-slate-400">
                    Real inquiries captured from the website contact &amp; proposal forms
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fetchLeads}
                  disabled={loadingLeads}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#0F172A] border border-slate-700 text-sky-400 rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingLeads ? 'animate-spin' : ''}`} />
                  <span>Refresh Leads</span>
                </button>
              </div>

              {leads.length === 0 ? (
                <div className="p-12 text-center bg-[#0e1320] rounded-xl border border-slate-800 text-slate-400 text-sm">
                  No inquiries recorded yet. Submit the contact form on Booms.in to test!
                </div>
              ) : (
                <div className="space-y-3">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-[#0e1320] border border-slate-800 rounded-xl p-4 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div>
                          <span className="text-sm font-bold text-white font-display">
                            {lead.fullName}
                          </span>
                          {lead.companyName && (
                            <span className="text-xs text-slate-400 ml-2">
                              ({lead.companyName})
                            </span>
                          )}
                          <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                            Service: {lead.serviceType} · Budget: {lead.budgetRange}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400 font-mono">Status:</span>
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            className="bg-[#090d16] border border-slate-700 text-xs text-white rounded px-2.5 py-1 focus:outline-none focus:border-sky-500 cursor-pointer"
                          >
                            <option value="new">New Inquiry</option>
                            <option value="contacted">Contacted</option>
                            <option value="proposal_sent">Proposal Sent</option>
                            <option value="closed">Closed Deal</option>
                          </select>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 bg-[#090d16] p-2.5 rounded-lg border border-slate-800/80 mb-3 italic">
                        "{lead.message}"
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                        <div className="flex items-center gap-4">
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1.5 text-sky-400 hover:underline font-mono"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{lead.phone}</span>
                          </a>
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1.5 text-slate-300 hover:text-white"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{lead.email}</span>
                          </a>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(lead.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Studio Analytics */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-white font-display mb-1">
                  Booms Studio Telemetry &amp; Impact
                </h4>
                <p className="text-xs text-slate-400">
                  Aggregated cross-campaign metrics across commercial clients
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#0e1320] border border-slate-800 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold font-mono text-sky-400">
                    {stats?.totalImpressions || '124.6M+'}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Cross-Channel Views</div>
                </div>

                <div className="bg-[#0e1320] border border-slate-800 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold font-mono text-sky-400">
                    {stats?.averageRoas || '4.8x'}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Blended Client ROAS</div>
                </div>

                <div className="bg-[#0e1320] border border-slate-800 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold font-mono text-sky-400">
                    {stats?.commercialFilmsDelivered || 512}+
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Films &amp; TVCs Delivered</div>
                </div>

                <div className="bg-[#0e1320] border border-slate-800 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold font-mono text-sky-400">
                    {projects.length}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">3D Stage Projects Active</div>
                </div>
              </div>

              <div className="bg-[#0e1320] border border-slate-800 p-5 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400">
                  <Film className="w-4 h-4" />
                  <span>Production Capabilities Summary</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                  <div className="p-3 bg-[#090d16] rounded-lg border border-slate-800">
                    <span className="font-bold text-white block mb-1">Studio 01: Bandra Soundstage</span>
                    3,200 sq.ft acoustically treated studio with 24ft motorized lighting grid &amp; liquid rigs.
                  </div>
                  <div className="p-3 bg-[#090d16] rounded-lg border border-slate-800">
                    <span className="font-bold text-white block mb-1">Studio 02: Andheri Creator Lab</span>
                    Optimized for vertical 9:16 Instagram Reels, multi-cam podcasting &amp; live switching.
                  </div>
                  <div className="p-3 bg-[#090d16] rounded-lg border border-slate-800">
                    <span className="font-bold text-white block mb-1">Studio 03: Lower Parel Suite</span>
                    DaVinci Resolve Advanced Panel, DCI-P3 calibrated displays &amp; 7.1.4 Dolby Atmos mastering.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
