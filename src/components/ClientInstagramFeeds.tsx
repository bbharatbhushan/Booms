import React, { useState } from 'react';
import { Instagram, Play, Heart, MessageCircle, Eye, Plus, ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import { InstagramFeedItem } from '../types';
import { soundFx } from '../utils/soundEffects';

interface ClientInstagramFeedsProps {
  feeds: InstagramFeedItem[];
  onOpenAddModal: () => void;
  onOpenDashboard?: () => void;
}

export const ClientInstagramFeeds: React.FC<ClientInstagramFeedsProps> = ({
  feeds,
  onOpenAddModal,
  onOpenDashboard,
}) => {
  const [filter, setFilter] = useState<'all' | 'reel' | 'post'>('all');

  const filteredFeeds = feeds.filter((feed) => {
    if (filter === 'all') return true;
    return feed.mediaType === filter;
  });

  return (
    <div className="mt-14 pt-10 border-t border-slate-800/80">
      {/* Header with Title and Dashboard CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-2">
            <Instagram className="w-4 h-4 text-rose-400" />
            <span>Clients&apos; Instagram Feeds &amp; Live Viral Reels</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Live Client Feeds Scaled by Booms
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
            Real-time viral reach, high-speed macro product shots, and creator-led campaigns driving engagement across client Instagram handles.
          </p>
        </div>

        {/* Action Buttons: Add Client Feed & Open Feeds Dashboard */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Pills */}
          <div className="flex items-center p-1 rounded-lg bg-[#0F172A] border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick(600);
                setFilter('all');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-slate-800 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Feeds ({feeds.length})
            </button>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick(650);
                setFilter('reel');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filter === 'reel' ? 'bg-slate-800 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Reels
            </button>
          </div>

          {/* Add Client Feed Button */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick(850);
              onOpenAddModal();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0F172A] hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-sky-400" />
            <span>Add Client Feed</span>
          </button>

          {/* Open Full Dashboard */}
          {onOpenDashboard && (
            <button
              type="button"
              onClick={() => {
                soundFx.playClick(750);
                onOpenDashboard();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all cursor-pointer"
            >
              <span>Feeds Dashboard</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of Instagram Feed Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredFeeds.map((feed) => (
          <div
            key={feed.id}
            className="group relative rounded-2xl bg-[#0F172A]/70 border border-slate-800 hover:border-slate-700 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl"
          >
            {/* Top Handle Header */}
            <div className="p-3.5 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 p-0.5 shrink-0">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                    <Instagram className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate font-display">
                    {feed.clientName}
                  </div>
                  <div className="text-[11px] font-mono text-sky-400 truncate">
                    {feed.instagramHandle}
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 shrink-0 uppercase">
                {feed.mediaType}
              </span>
            </div>

            {/* Media Thumbnail Container with simulated Reel Player */}
            <div className="relative aspect-4/5 overflow-hidden bg-slate-950">
              <img
                src={feed.thumbnailUrl}
                alt={feed.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Center Play badge for Reels */}
              {feed.mediaType === 'reel' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-sky-500 transition-all">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
              )}

              {/* Live Views Counter */}
              {feed.viewsCount && (
                <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-white flex items-center gap-1">
                  <Eye className="w-3 h-3 text-sky-400" />
                  <span>{feed.viewsCount} views</span>
                </div>
              )}

              {/* Bottom Metrics Pill */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-white bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-400 fill-current" />
                  <span>{feed.likesCount || '45K'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3 text-sky-400" />
                  <span>{feed.commentsCount || '320'}</span>
                </span>
                <span className="text-slate-400 text-[10px]">{feed.publishedDate}</span>
              </div>
            </div>

            {/* Caption & Post Link */}
            <div className="p-3.5 space-y-2.5">
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {feed.caption}
              </p>

              {feed.tags && feed.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {feed.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <a
                  href={feed.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <span>View on Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <span className="text-[10px] text-slate-400 font-mono">Booms Verified</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
