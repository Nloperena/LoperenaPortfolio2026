import React from 'react';
import NewHeader from '@/components/NewHeader';
import NewHero from '@/components/NewHero';
import CredibilityStrip from '@/components/CredibilityStrip';
import TechStackStrip from '@/components/TechStackStrip';
import AboutMeSection from '@/components/AboutMeSection';
import LatestProjectSection from '@/components/LatestProjectSection';
import VITOCaseStudyTeaser from '@/components/VITOCaseStudyTeaser';
import SimplifiedCTA from '@/components/SimplifiedCTA';
import FooterV2 from '@/components/FooterV2';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nico Loperena - Digital Architect',
  description: 'Crafting digital foundations for tomorrow\'s enterprises. Architecture, Innovation, Deployment.',
  openGraph: {
    title: 'Nico Loperena - Digital Architect',
    description: 'Crafting digital foundations for tomorrow\'s enterprises. Architecture, Innovation, Deployment.',
    type: 'website',
    url: '/',
  },
};

export default function Home() {
  return (
    <div className="relative overflow-x-hidden bg-[#f5f5f0]">
      <NewHeader />

      {/* Hero Section */}
      <NewHero />

      {/* Credibility Strip */}
      <CredibilityStrip />

      {/* Tech Stack Strip */}
      <TechStackStrip />

      {/* About Me / Story Section */}
      <AboutMeSection />

      {/* Latest Project Section */}
      <LatestProjectSection />

      {/* VITO Case Study Teaser */}
      <VITOCaseStudyTeaser />

      {/* Simplified CTA Section */}
      <SimplifiedCTA />

      {/* Footer */}
      <FooterV2 />
    </div>
  );
}

