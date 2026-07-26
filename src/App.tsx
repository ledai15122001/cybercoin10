import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Ticker, { MiniStats } from './components/Ticker';
import Hero from './components/Hero';
import About from './components/About';
import CrewDatabase from './components/CrewDatabase';
import Tokenomics from './components/Tokenomics';
import CyberpsychoMeter from './components/CyberpsychoMeter';
import Roadmap from './components/Roadmap';
import HowToBuy from './components/HowToBuy';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PageAtmosphere from './components/PageAtmosphere';
import { useScrollReveal } from './lib/useScrollReveal';
import { useSmoothScroll } from './lib/useSmoothScroll';
import { HeroTimelineProvider } from './lib/heroTimeline';

export default function App() {
  useScrollReveal();
  useSmoothScroll();

  return (
    <HeroTimelineProvider>
      <div className="relative min-h-screen bg-cyber-darker">
        {/* CRT scanlines + vignette — viewport-fixed, covers both stacks */}
        <div className="scanlines vignette" />

        {/* Opaque content sheet — covers the footer until you scroll to the end */}
        <div className="site-content">
          <PageAtmosphere />
          <CursorGlow />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <Ticker />
            <div className="mx-auto max-w-6xl px-5 py-8">
              <MiniStats />
            </div>
            <About />
            <CrewDatabase />
            <Tokenomics />
            <CyberpsychoMeter />
            <Roadmap />
            <HowToBuy />
            <FAQ />
          </main>
        </div>

        {/* Sticky reveal footer — sits below the content stack, revealed as
            the content scrolls away at the end of the page */}
        <Footer />
      </div>
    </HeroTimelineProvider>
  );
}
