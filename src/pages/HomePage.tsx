import { Navbar } from '@/components/navbar/Navbar';
import { StarfieldBackground } from '@/components/background/StarfieldBackground';
import { Hero } from '@/components/hero/Hero';
import { MissionDashboard } from '@/components/dashboard/MissionDashboard';
import { TelemetrySection } from '@/components/telemetry/TelemetrySection';
import { MissionTimeline } from '@/components/timeline/MissionTimeline';
import { SatelliteConstellation } from '@/components/dashboard/SatelliteConstellation';
import { GlobalCoverage } from '@/components/dashboard/GlobalCoverage';
import { AIAnalytics } from '@/components/dashboard/AIAnalytics';
import { Footer } from '@/components/footer/Footer';

export function HomePage() {
  return (
    <div className="relative min-h-screen">
      <StarfieldBackground />
      <Navbar />
      <main>
        <Hero />
        <MissionDashboard />
        <TelemetrySection />
        <MissionTimeline />
        <SatelliteConstellation />
        <GlobalCoverage />
        <AIAnalytics />
      </main>
      <Footer />
    </div>
  );
}
