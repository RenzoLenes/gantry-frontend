import ScrollReveal from '@/components/ui/ScrollReveal';
import { GantryFeatures } from '@/components/blocks/features-gantry';

export default function Features() {
  return (
    <section id="features" className="lp-sec" style={{ paddingBottom: 0 }}>
      <div className="lp-wrap">
        <ScrollReveal>
          <h2 className="lp-h2">What you&apos;re getting<br />early access to.</h2>
          <p className="lp-lead" style={{ marginTop: '12px' }}>
            Six capabilities shipping at launch. One SDK, one integration line.
          </p>
        </ScrollReveal>
      </div>
      <div className="lp-wrap">
        <ScrollReveal>
          <GantryFeatures />
        </ScrollReveal>
      </div>
    </section>
  );
}
