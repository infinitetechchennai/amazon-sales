import React, { useEffect, useRef, useState } from 'react';

export function Background3D() {
  const topVideoRef = useRef<HTMLVideoElement>(null);
  const middleVideoRef = useRef<HTMLVideoElement>(null);
  const bottomVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  useEffect(() => {
    let animationFrameId: number;

    const playVideos = async () => {
      try {
        const promises = [
          topVideoRef.current?.play(),
          middleVideoRef.current?.play(),
          bottomVideoRef.current?.play()
        ].filter(Boolean);
        
        if (promises.length > 0) {
          await Promise.all(promises);
          setIsVideoPlaying(true);
        }
      } catch (err) {
        console.warn("Autoplay blocked by browser. User interaction needed.", err);
        setIsVideoPlaying(false);
      }
    };

    // Attempt to play on mount
    playVideos();
    
    // Add interaction listeners as fallback
    const handleInteraction = () => {
      playVideos();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
    
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('scroll', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });

    const renderLoop = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight || 1;
      const maxScroll = Math.max(1, document.body.scrollHeight - vh);
      
      const scrollVH = scrollY / vh;
      const scrollFromBottomVH = (maxScroll - scrollY) / vh;

      let topOpacity = 0;
      let middleOpacity = 0;
      let bottomOpacity = 0;

      // 1. Top to Middle fade (between 0.2 vh and 1.2 vh)
      if (scrollVH < 1.2) {
        const progress = Math.max(0, (scrollVH - 0.2) / 1.0);
        topOpacity = 1 - progress;
        middleOpacity = progress;
      } 
      // 2. Middle to Bottom fade (starts 2.0 vh from the bottom)
      else if (scrollFromBottomVH < 2.0) {
        const progress = 1 - Math.max(0, (scrollFromBottomVH - 0.5) / 1.5);
        middleOpacity = 1 - Math.min(1, Math.max(0, progress));
        bottomOpacity = Math.min(1, Math.max(0, progress));
      } 
      // 3. Middle stays fully visible otherwise
      else {
        middleOpacity = 1;
      }

      if (topVideoRef.current) topVideoRef.current.style.opacity = topOpacity.toString();
      if (middleVideoRef.current) middleVideoRef.current.style.opacity = middleOpacity.toString();
      if (bottomVideoRef.current) bottomVideoRef.current.style.opacity = bottomOpacity.toString();

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      
      {/* 3. Bottom Video */}
      <video
        ref={bottomVideoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover will-change-opacity scale-110 origin-center"
        style={{ opacity: 0, width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh' }}
        src="/background_bottom.mp4"
      />

      {/* 2. Middle Video */}
      <video
        ref={middleVideoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover will-change-opacity scale-110 origin-center"
        style={{ opacity: 0, width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh' }}
        src="/background_middle.mp4"
      />

      {/* 1. Top Video */}
      <video
        ref={topVideoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover will-change-opacity scale-110 origin-center"
        style={{ opacity: 1, width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh' }}
        src="/background_top.mp4"
      />

      {/* Subtle Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
        }} 
      />
      
      {!isVideoPlaying && (
         <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto cursor-pointer" onClick={() => window.dispatchEvent(new Event('click'))}>
            <div className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full font-medium backdrop-blur-md">
               Click to Enable Video Background
            </div>
         </div>
      )}
    </div>
  );
}
