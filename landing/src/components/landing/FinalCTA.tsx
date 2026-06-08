import Image from 'next/image';

export default function FinalCTA() {
  return (
    <section className="lp-final">
      <div className="lp-grid" />
      <div className="lp-wrap lp-final-in">
        <div
          className="lp-tile"
          style={{ width: '46px', height: '46px', margin: '0 auto 26px', borderRadius: 'var(--r-2)' }}
        >
          <Image src="/gantry-icon-green.svg" alt="Gantry" width={28} height={28} />
        </div>
        <h2>
          Open Gantry at 11pm.<br />
          See your data immediately.
        </h2>
        <p>
          Invisible infrastructure for AI. Free to start, no card required — your first event is
          60 seconds away.
        </p>
        <div className="row gap-3" style={{ justifyContent: 'center' }}>
          <a className="btn btn-primary btn-lg" href="#" rel="noopener noreferrer">Start with GitHub</a>
          <a className="btn btn-secondary btn-lg" href="#" rel="noopener noreferrer">Explore the dashboard</a>
        </div>
      </div>
    </section>
  );
}
