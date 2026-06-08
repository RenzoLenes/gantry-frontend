import Nav from '@/components/landing/Nav';
import Hero from '@/components/landing/Hero';
import Problem from '@/components/landing/Problem';
import VisionCode from '@/components/landing/VisionCode';
import Features from '@/components/landing/Features';
import MathTrust from '@/components/landing/MathTrust';
import WaitlistRepeatCTA from '@/components/landing/WaitlistRepeatCTA';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="lp">
      <Nav />
      <Hero />
      <hr className="lp-rule" />
      <Problem />
      <hr className="lp-rule" />
      <VisionCode />
      <hr className="lp-rule" />
      <Features />
      <hr className="lp-rule" />
      <MathTrust />
      <hr className="lp-rule" />
      <FAQ />
      <hr className="lp-rule" />
      <WaitlistRepeatCTA />
      <Footer />
    </div>
  );
}
