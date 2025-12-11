import Navbar from '@/components/Navbar';
import NewHero from '@/components/NewHero';
import StatsBar from '@/components/StatsBar';
import TrustBar from '@/components/TrustBar';
import AboutMeSection from '@/components/AboutMeSection';
import TechArsenal from '@/components/TechArsenal';
import SelectedWorks from '@/components/SelectedWorks';
import AtelierCTA from '@/components/AtelierCTA';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4 md:py-12 md:px-8">
      {/* 3D Book Container - The "Paper" on the "Desk" - Wider for Broadsheet feel */}
      <div 
        className="max-w-[1600px] mx-auto bg-[#F2F0E6] bg-paper-grain relative"
        style={{
          borderRadius: '3px',
          border: '10px solid #F2F0E6',
          boxShadow: `
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 40px 80px rgba(0, 0, 0, 0.3),
            0 60px 120px rgba(0, 0, 0, 0.2),
            inset 0 0 100px rgba(0, 0, 0, 0.05)
          `
        }}
      >
        {/* Book Spine/Gutter - Subtle vertical gradient down center */}
        <div 
          className="absolute left-1/2 top-0 bottom-0 w-px pointer-events-none hidden lg:block"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.05) 20%, rgba(0, 0, 0, 0.08) 50%, rgba(0, 0, 0, 0.05) 80%, transparent)',
            transform: 'translateX(-50%)'
          }}
        />
        
        <main className="relative z-10">
          <CustomCursor />
          <Navbar />
          <NewHero />
          <StatsBar />
          <TrustBar />
          <div className="ornamental-divider text-[#1C1B1A]/20 dark:text-white/20"></div>
          <AboutMeSection />
          <div className="ornamental-divider text-[#1C1B1A]/20 dark:text-white/20"></div>
          <TechArsenal />
          <div className="ornamental-divider text-[#1C1B1A]/20 dark:text-white/20"></div>
          <SelectedWorks />
          <div className="ornamental-divider text-[#1C1B1A]/20 dark:text-white/20"></div>
          <AtelierCTA />
          <Footer />
        </main>
      </div>
    </div>
  );
}
