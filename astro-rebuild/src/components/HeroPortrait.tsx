import React, { useState } from 'react';

const HERO_VIDEO_SRC = '/Still-motion_of_me.webm';
const HERO_IMAGE_WEBP = '/professional-photo.webp';
const HERO_IMAGE_FALLBACK = '/professional-photo.jpg';

export const HeroPortrait = () => {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div className="hero-video relative w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[340px] mx-auto lg:mx-0">
      <div className="absolute -inset-3 border border-accent/25 pointer-events-none" aria-hidden />
      <div className="absolute -top-5 left-4 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-accent/80 bg-background px-2">
        Portrait // Live
      </div>

      <div className="relative aspect-[9/16] max-h-[min(70vh,640px)] lg:max-h-[78vh] overflow-hidden bg-[#eceae4] border border-accent/30 shadow-[0_24px_80px_rgba(44,42,39,0.12)]">
        {!videoReady && (
          <img
            src={HERO_IMAGE_WEBP}
            alt="Nico Loperena"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[center_18%] grayscale contrast-125"
            onError={(e) => {
              const el = e.currentTarget;
              if (el.src.endsWith('.webp')) {
                el.src = HERO_IMAGE_FALLBACK;
              }
            }}
          />
        )}
        <video
          src={HERO_VIDEO_SRC}
          poster={HERO_IMAGE_WEBP}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className={`absolute inset-0 h-full w-full object-cover object-[center_18%] grayscale contrast-125 ${
            videoReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        >
          <track kind="captions" src="" label="English" default />
        </video>
      </div>
    </div>
  );
};
