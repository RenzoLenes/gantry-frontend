import ScrollReveal from '@/components/ui/ScrollReveal';
import WaitlistForm from '@/components/ui/WaitlistForm';

export default function WaitlistRepeatCTA() {
  return (
    <section className="lp-sec lp-cta-repeat">
      <div className="lp-wrap lp-cta-repeat-in">
        <ScrollReveal>
          <p className="lp-section-label">Early access · Limited to 500</p>
          <h2 className="lp-h2 lp-cta-repeat-h2">
            Find out what you&apos;re actually spending —<br />before the next invoice does.
          </h2>
          <p className="lp-lead lp-cta-repeat-sub">
            One line of code. Every token, every model, every feature — traced. Join the first 500
            engineers to get access at launch.
          </p>
          <div className="lp-cta-repeat-form">
            <WaitlistForm />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
