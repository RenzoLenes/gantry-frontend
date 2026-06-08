import CountUp from '@/components/ui/CountUp';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Stats() {
  return (
    <section className="lp-sec" style={{ padding: '72px 0' }}>
      <div className="lp-wrap">
        <ScrollReveal className="lp-stats">
          <div className="lp-stat">
            <div className="v">
              1.9<span style={{ fontSize: '28px', letterSpacing: 0 }}>B</span>
            </div>
            <div className="k">Tokens traced per month</div>
          </div>
          <div className="lp-stat is-accent">
            <div className="v acc">
              <CountUp target={34} suffix="%" />
            </div>
            <div className="k">Median spend reduction via Advisor</div>
          </div>
          <div className="lp-stat">
            <div className="v">
              ~0<span style={{ fontSize: '22px', letterSpacing: 0 }}>ms</span>
            </div>
            <div className="k">Added p95 latency overhead</div>
          </div>
          <div className="lp-stat">
            <div className="v">
              60<span style={{ fontSize: '22px', letterSpacing: 0 }}>s</span>
            </div>
            <div className="k">Install to first event in dashboard</div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
