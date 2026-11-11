import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { Play, Pause, SkipForward, SkipBack, Eye, Sparkles, MapPin, Film, CheckCircle2, X, Plus, ExternalLink, Video } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../utils/portfolioData';
import { PortfolioProject, InstagramFeedItem } from '../types';
import { soundFx } from '../utils/soundEffects';
import { ClientInstagramFeeds } from './ClientInstagramFeeds';

interface ThreePortfolioPlayerProps {
  projects?: PortfolioProject[];
  feeds?: InstagramFeedItem[];
  onOpenAddFeed?: () => void;
  onOpenDashboard?: (tab?: 'videos' | 'feeds' | 'leads' | 'stats') => void;
}

export const ThreePortfolioPlayer: React.FC<ThreePortfolioPlayerProps> = ({
  projects = PORTFOLIO_PROJECTS,
  feeds = [],
  onOpenAddFeed = () => {},
  onOpenDashboard = () => {},
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(15);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [videoModalProject, setVideoModalProject] = useState<PortfolioProject | null>(null);

  // Filter projects by category
  const activeProjects = useMemo(() => {
    if (!projects || projects.length === 0) return PORTFOLIO_PROJECTS;
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [projects, selectedCategory]);

  // Ensure index remains in bounds when projects change
  useEffect(() => {
    if (currentIndex >= activeProjects.length) {
      setCurrentIndex(0);
    }
  }, [activeProjects.length, currentIndex]);

  const mountRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  activeIndexRef.current = currentIndex;

  const currentProject = activeProjects[currentIndex] || activeProjects[0] || PORTFOLIO_PROJECTS[0];

  const categories = ['All', 'Music Videos', 'Ads', 'Films', 'Brands & Reels'];

  // Next / Previous Navigation
  const handleNext = useCallback(() => {
    soundFx.playTransition();
    setCurrentIndex((prev) => (prev + 1) % activeProjects.length);
    setPlaybackProgress(0);
  }, [activeProjects.length]);

  const handlePrev = useCallback(() => {
    soundFx.playTransition();
    setCurrentIndex((prev) => (prev - 1 + activeProjects.length) % activeProjects.length);
    setPlaybackProgress(0);
  }, [activeProjects.length]);

  const togglePlay = () => {
    soundFx.playClick(isPlaying ? 500 : 750);
    // If project has real video, open video player modal
    if (currentProject.videoUrl && currentProject.type === 'video') {
      setVideoModalProject(currentProject);
      return;
    }
    if (currentProject.type === 'link' && currentProject.videoUrl) {
      window.open(currentProject.videoUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setIsPlaying((prev) => !prev);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, togglePlay]);

  // Simulated video playback progression
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPlaybackProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 1.25;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, handleNext]);

  // Three.js 3D Player Stage with Dynamic Mesh updates
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.025);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Studio 3-Point Lighting
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.5);
    keyLight.position.set(5, 8, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    scene.add(ambientLight);

    // Carousel 3D Cards Group
    const numProjects = Math.max(1, activeProjects.length);
    const radius = Math.max(5.0, (numProjects * 1.6) / Math.PI); // cylinder radius scales dynamically
    const carouselGroup = new THREE.Group();
    carouselGroup.position.set(0, 0, -radius);
    scene.add(carouselGroup);

    const cardMeshes: THREE.Mesh[] = [];
    const cardMaterials: THREE.MeshStandardMaterial[] = [];
    const cardGeometries: THREE.BufferGeometry[] = [];

    // Helper to generate dynamic procedural texture for each 3D card
    const createProjectTexture = (project: PortfolioProject) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 680;
      const ctx = canvas.getContext('2d')!;

      const renderCardContent = (imageElement?: HTMLImageElement) => {
        ctx.fillStyle = '#0b0f19';
        ctx.fillRect(0, 0, 1024, 680);

        if (imageElement && imageElement.complete && imageElement.naturalWidth > 0) {
          ctx.drawImage(imageElement, 0, 0, 1024, 480);
        } else {
          // Fallback stylish gradient
          const fallbackGrad = ctx.createLinearGradient(0, 0, 1024, 480);
          fallbackGrad.addColorStop(0, '#0F172A');
          fallbackGrad.addColorStop(1, '#1e293b');
          ctx.fillStyle = fallbackGrad;
          ctx.fillRect(0, 0, 1024, 480);
        }

        // Dark cinematic bottom scrim
        const scrim = ctx.createLinearGradient(0, 260, 0, 680);
        scrim.addColorStop(0, 'rgba(11, 15, 25, 0)');
        scrim.addColorStop(0.5, 'rgba(11, 15, 25, 0.94)');
        scrim.addColorStop(1, '#0b0f19');
        ctx.fillStyle = scrim;
        ctx.fillRect(0, 260, 1024, 420);

        // Header brand accent (Cool sky blue)
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(48, 490, 8, 48);

        ctx.font = 'bold 36px Outfit, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(project.title.slice(0, 28), 72, 525);

        ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`${project.client} · Mumbai 2026`, 72, 565);

        // Key Metric (Sky 400 highlight)
        const primaryMetric = project.metrics?.[0] || { label: 'Reel Views', value: '1.2M+' };
        ctx.font = 'bold 36px "JetBrains Mono", monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(primaryMetric.value, 760, 525);

        ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText(primaryMetric.label, 760, 560);
      };

      renderCardContent();

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      if (project.image) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = project.image;
        img.onload = () => {
          renderCardContent(img);
          texture.needsUpdate = true;
        };
      }

      return texture;
    };

    // Build 3D curved cards around cylinder
    activeProjects.forEach((project, idx) => {
      const cardGeom = new THREE.PlaneGeometry(4.2, 2.8, 4, 4);
      const texture = createProjectTexture(project);

      const cardMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.2,
        metalness: 0.15,
        side: THREE.DoubleSide,
      });

      const cardMesh = new THREE.Mesh(cardGeom, cardMat);

      // Position in 3D circle around group center
      const angle = (idx / numProjects) * Math.PI * 2;
      cardMesh.position.x = Math.sin(angle) * radius;
      cardMesh.position.z = Math.cos(angle) * radius;
      cardMesh.rotation.y = angle;

      // Add border trim (Sky-blue for active, slate for others)
      const edgeGeom = new THREE.EdgesGeometry(cardGeom);
      const edgeMat = new THREE.LineBasicMaterial({
        color: idx === 0 ? 0x38bdf8 : 0x1e293b,
        linewidth: 2,
      });
      const edgeLine = new THREE.LineSegments(edgeGeom, edgeMat);
      cardMesh.add(edgeLine);

      cardMeshes.push(cardMesh);
      cardMaterials.push(cardMat);
      cardGeometries.push(cardGeom);
      carouselGroup.add(cardMesh);
    });

    // Ambient floating 3D stage ring base
    const ringGeom = new THREE.TorusGeometry(radius + 0.1, 0.03, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x334155, wireframe: true });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0, -1.8, -radius);
    scene.add(ringMesh);

    // Mouse / Touch Dragging on 3D Stage
    let isDragging = false;
    let startPointerX = 0;
    let targetCarouselRotationY = 0;
    let currentCarouselRotationY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      startPointerX = e.clientX;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = (e.clientX - startPointerX) * 0.005;
      targetCarouselRotationY += deltaX;
      startPointerX = e.clientX;
    };

    const onPointerUp = () => {
      isDragging = false;
      const anglePerProject = (Math.PI * 2) / numProjects;
      const normalizedAngle = (-targetCarouselRotationY) % (Math.PI * 2);
      const positiveAngle = normalizedAngle < 0 ? normalizedAngle + Math.PI * 2 : normalizedAngle;
      const closestIndex = Math.round(positiveAngle / anglePerProject) % numProjects;
      setCurrentIndex(closestIndex);
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation render loop
    let frameId = 0;
    let isRunning = true;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      gl.flush();
      const poll = () => {
        if (!isRunning) return;
        const state = sync && gl.getSyncParameter ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.ALREADY_SIGNALED;
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 10);
        } else {
          if (sync && gl.deleteSync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 60);
        }
      };
      frameId = window.setTimeout(poll, 10);
    }

    const animate = () => {
      if (!isRunning) return;
      const delta = Math.min(clock.getDelta(), 0.1);

      const targetAngle = -(activeIndexRef.current / numProjects) * Math.PI * 2;
      if (!isDragging) {
        targetCarouselRotationY = targetAngle;
      }

      currentCarouselRotationY = THREE.MathUtils.damp(
        currentCarouselRotationY,
        targetCarouselRotationY,
        8,
        delta
      );
      carouselGroup.rotation.y = currentCarouselRotationY;

      cardMeshes.forEach((mesh, idx) => {
        const isActive = idx === activeIndexRef.current;
        const targetScale = isActive ? 1.05 : 0.88;
        mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, targetScale, 6, delta));

        const line = mesh.children[0] as THREE.LineSegments | undefined;
        if (line && line.material instanceof THREE.LineBasicMaterial) {
          line.material.color.setHex(isActive ? 0x38bdf8 : 0x1e293b);
        }
      });

      ringMesh.rotation.z += delta * 0.05;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      isRunning = false;
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);

      cardGeometries.forEach((g) => g.dispose());
      cardMaterials.forEach((m) => {
        if (m.map) m.map.dispose();
        m.dispose();
      });
      ringGeom.dispose();
      ringMat.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeProjects]);

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-2">
            <Film className="w-4 h-4" />
            <span>Interactive 3D Stage · Mumbai Productions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Portfolio Reel &amp; Commercial Campaigns
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Featuring cinematic music videos, broadcast ads, and viral brand reels referenced from <span className="text-slate-300 font-mono">pixelnudge.in</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick(800);
              onOpenDashboard('videos');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0F172A] hover:bg-slate-800 border border-slate-700 hover:border-sky-500/60 rounded-xl transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-sky-400" />
            <span>Add Video to 3D Stage</span>
          </button>

          <div className="text-xs text-slate-400 font-mono flex items-center gap-2 bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-800">
            <span>Project {currentIndex + 1} of {activeProjects.length}</span>
            <span className="text-slate-600">/</span>
            <span>3D Stage Active</span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              soundFx.playClick(700);
              setSelectedCategory(cat);
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#0F172A] text-white border border-slate-600 shadow-md ring-1 ring-sky-500/40'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D WebGL Player Stage Viewport */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0e131d] to-[#07090e] border border-slate-800 shadow-2xl">
        {/* Top Info Bar inside player */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="px-3 py-1 rounded-md text-xs font-semibold bg-[#0F172A] border border-slate-700/80 text-sky-400">
              {currentProject.category}
            </span>
            <span className="text-xs text-slate-300 font-medium bg-black/60 backdrop-blur px-2.5 py-1 rounded-md">
              {currentProject.duration}
            </span>
            {currentProject.type === 'video' && (
              <span className="text-[11px] text-sky-400 font-mono bg-sky-950/60 border border-sky-800/80 px-2 py-0.5 rounded flex items-center gap-1">
                <Video className="w-3 h-3" />
                <span>Video Reel</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick(850);
                setSelectedProject(currentProject);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-[#0F172A] hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Full Case Study</span>
            </button>
          </div>
        </div>

        {/* 3D Canvas Mount (Interactive Stage) */}
        <div
          ref={mountRef}
          className="w-full h-[420px] sm:h-[480px] lg:h-[540px] cursor-grab active:cursor-grabbing relative"
          title="Drag left/right to rotate portfolio stage"
        />

        {/* Video Scrubber / Timeline Progress */}
        <div className="absolute bottom-22 left-6 right-6 z-20">
          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden backdrop-blur">
            <div
              className="bg-sky-400 h-full transition-all duration-100 ease-linear"
              style={{ width: `${playbackProgress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mt-1">
            <span>Reel Simulation · 00:0{Math.floor(playbackProgress * 0.45)}</span>
            <span>{currentProject.duration}</span>
          </div>
        </div>

        {/* Unified Sleek Bottom Control Dock */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-[#0a0e17]/90 backdrop-blur-md border border-slate-800/90 rounded-xl px-4 py-3">
          {/* Current Project Title */}
          <div className="min-w-0 pr-2">
            <h3 className="text-base font-bold text-white truncate font-display">
              {currentProject.title}
            </h3>
            <p className="text-xs text-slate-400 truncate">
              {currentProject.client} · {currentProject.location}
            </p>
          </div>

          {/* Central Playback & Next / Back Buttons */}
          <div className="flex items-center gap-2">
            {/* Back Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous portfolio project"
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-all active:scale-95 cursor-pointer"
              title="Previous Campaign (Left Arrow)"
            >
              <SkipBack className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            {/* Play / Pause Reel Button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause reel simulation' : 'Play reel'}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0F172A] hover:bg-slate-800 border border-slate-700 hover:border-sky-500/60 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {currentProject.videoUrl && currentProject.type === 'video' ? (
                <>
                  <Play className="w-4 h-4 fill-current text-sky-400" />
                  <span>Watch Video</span>
                </>
              ) : currentProject.type === 'link' ? (
                <>
                  <ExternalLink className="w-4 h-4 text-sky-400" />
                  <span>Open Link</span>
                </>
              ) : isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current text-sky-400" />
                  <span>Pause Reel</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current text-sky-400" />
                  <span>Play Reel</span>
                </>
              )}
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next portfolio project"
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-all active:scale-95 cursor-pointer"
              title="Next Campaign (Right Arrow)"
            >
              <span className="hidden sm:inline">Next</span>
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-slate-300 border-l border-slate-800 pl-4">
            {currentProject.metrics?.slice(0, 2).map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="text-sky-400 font-bold">{m.value}</span>
                <span className="text-[10px] text-slate-400">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal Player (Plays Real YouTube Embed or Reel) */}
      {videoModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#090d16] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-[#0F172A] border border-slate-700 text-sky-400">
                  {videoModalProject.category}
                </span>
                <h3 className="text-base font-bold text-white font-display">
                  {videoModalProject.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close video modal"
                onClick={() => setVideoModalProject(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black relative">
              {videoModalProject.videoUrl ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`${videoModalProject.videoUrl.replace('watch?v=', 'embed/').split('&')[0]}?autoplay=1&rel=0`}
                  title={videoModalProject.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  Video preview not available
                </div>
              )}
            </div>

            <div className="p-4 bg-[#0a0e17] flex flex-wrap items-center justify-between gap-4 text-xs">
              <p className="text-slate-300">
                {videoModalProject.tagline}
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(videoModalProject);
                    setVideoModalProject(null);
                  }}
                  className="px-3 py-1.5 bg-[#0F172A] hover:bg-slate-800 border border-slate-700 text-sky-400 rounded-lg cursor-pointer font-medium"
                >
                  View Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Client Instagram Feeds & Reels Showcase */}
      <ClientInstagramFeeds
        feeds={feeds}
        onOpenAddModal={onOpenAddFeed}
        onOpenDashboard={onOpenDashboard}
      />

      {/* Campaign Details Deep Dive Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0d121c] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick(600);
                setSelectedProject(null);
              }}
              aria-label="Close project modal"
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{selectedProject.category} · Case Study</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-2">
              {selectedProject.title}
            </h3>
            <p className="text-sm text-slate-300 mb-6">
              Client: <span className="font-semibold text-white">{selectedProject.client}</span> · Mumbai, {selectedProject.year}
            </p>

            <div className="rounded-xl overflow-hidden mb-6 border border-slate-800 aspect-video relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end justify-between p-4">
                <p className="text-sm text-slate-200 font-medium max-w-xl">
                  {selectedProject.tagline}
                </p>
                {selectedProject.videoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setVideoModalProject(selectedProject);
                      setSelectedProject(null);
                    }}
                    className="px-3 py-1.5 bg-[#0F172A] hover:bg-slate-800 border border-slate-700 text-sky-400 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Video</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {selectedProject.metrics?.map((m) => (
                <div key={m.label} className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg text-center">
                  <div className="text-xl font-bold font-mono text-sky-400">{m.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-sm text-slate-300 mb-6">
              <p>{selectedProject.description}</p>
              
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2 font-mono">
                  Production Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.deliverables?.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 pt-3 border-t border-slate-800">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Production Location: {selectedProject.location} (Director: {selectedProject.director})</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <a
                href="#contact"
                onClick={() => {
                  soundFx.playClick(900);
                  setSelectedProject(null);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0F172A] hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg transition-colors cursor-pointer"
              >
                Inquire Similar Campaign
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
