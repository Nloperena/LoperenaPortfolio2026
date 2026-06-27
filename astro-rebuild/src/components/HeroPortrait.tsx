import React from 'react';
import { siteProfile } from '../data/site';

type HeroPortraitProps = {
  label?: string;
};

export const HeroPortrait = ({ label = 'Profile / About' }: HeroPortraitProps) => (
  <div className="hero-portrait relative w-full max-w-[240px] sm:max-w-[260px] lg:max-w-[300px] mx-auto lg:mx-0">
    <div className="border-2 border-foreground bg-concrete shadow-brutal-lg">
      <div className="border-b-2 border-foreground bg-foreground px-3 py-2">
        <span className="brutal-label text-background">{label}</span>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden bg-concrete">
        <img
          src={siteProfile.profilePhotoWebp}
          alt={siteProfile.name}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-[center_20%] grayscale contrast-110"
          onError={(e) => {
            const el = e.currentTarget;
            if (!el.src.endsWith('.jpg')) el.src = siteProfile.profilePhotoJpg;
          }}
        />
      </div>
      <div className="border-t-2 border-foreground bg-highlight px-3 py-2">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]">{siteProfile.title}</p>
      </div>
    </div>
  </div>
);
