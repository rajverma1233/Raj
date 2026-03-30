import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import Features from '@/components/Features';
import LivePreview from '@/components/LivePreview';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <LivePreview />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
