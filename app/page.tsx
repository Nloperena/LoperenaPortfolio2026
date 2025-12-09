import Navbar from '@/components/Navbar';
import NewHero from '@/components/NewHero';
import StatsBar from '@/components/StatsBar';
import TrustBar from '@/components/TrustBar';
import AboutMeSection from '@/components/AboutMeSection';
import TechArsenal from '@/components/TechArsenal';
import SelectedWorks from '@/components/SelectedWorks';
import CredibilityStrip from '@/components/CredibilityStrip';
import TheLedger from '@/components/TheLedger';
import AtelierCTA from '@/components/AtelierCTA';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-arch-white selection:bg-arch-green selection:text-white">
      <CustomCursor />
      <Navbar />
      <NewHero />
      <StatsBar />
      <TrustBar />
      <AboutMeSection />
      <TechArsenal />
      <SelectedWorks />
      <CredibilityStrip />
      <TheLedger />
      <AtelierCTA />
      <Footer />
    </main>
  );
}
