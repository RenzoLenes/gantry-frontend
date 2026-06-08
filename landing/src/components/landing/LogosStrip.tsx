const logos = [
  { name: 'Northwind',   shape: 'square' },
  { name: 'Cohere Labs', shape: 'round'  },
  { name: 'Quanta',      shape: 'diag'   },
  { name: 'Replicate IO',shape: 'square' },
  { name: 'Helix',       shape: 'round'  },
  { name: 'Vector',      shape: 'diag'   },
];

export default function LogosStrip() {
  return (
    <div className="lp-logos">
      <div className="lp-wrap">
        <div className="lp-logos-lab">Used by engineering teams shipping LLM features in production</div>
        <div className="lp-logos-row">
          {logos.map((l) => (
            <span key={l.name} className="lp-logo">
              <span className={`gl${l.shape === 'round' ? ' round' : l.shape === 'diag' ? ' diag' : ''}`} />
              {l.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
