/* ============================================================
   GANTRY Dashboard — app shell (sidebar, topbar, root)
   ============================================================ */

const NAV = [
  { group: 'Monitor', items: [
    { id: 'overview', label: 'Overview', icon: Ico.grid },
    { id: 'usage', label: 'Usage', icon: Ico.chart },
    { id: 'alerts', label: 'Alerts', icon: Ico.bell, badge: 2 },
  ]},
  { group: 'Control', items: [
    { id: 'budgets', label: 'Budgets', icon: Ico.shield },
    { id: 'advisor', label: 'Advisor', icon: Ico.bolt, accent: true },
  ]},
  { group: 'Workspace', items: [
    { id: 'settings', label: 'Settings', icon: Ico.cog },
    { id: 'docs', label: 'Docs', icon: Ico.book },
  ]},
];

const PAGE_TITLE = {
  overview: 'Overview', usage: 'Usage', alerts: 'Alerts', budgets: 'Budgets',
  advisor: 'Model Advisor', settings: 'Settings', docs: 'Docs',
};

function Sidebar({ active, setActive }) {
  const [proj, setProj] = useState(DATA.project.name);
  const [open, setOpen] = useState(false);
  return (
    <aside className="sidebar">
      <div className="side-logo">
        <a href="Gantry Hub.html" className="row gap-2" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="logo-tile"><Mark size={20} accent /></div>
          <span style={{ fontWeight: 700, letterSpacing: '0.22em', fontSize: 14 }}>GANTRY</span>
        </a>
      </div>

      {/* project switcher */}
      <div className="proj-switch" onClick={() => setOpen((o) => !o)}>
        <div className="row gap-2" style={{ minWidth: 0 }}>
          <span className="proj-dot" />
          <div style={{ minWidth: 0 }}>
            <div className="proj-name mono">{proj}</div>
            <div className="proj-env">{DATA.project.env} · {DATA.project.region}</div>
          </div>
        </div>
        <Ico.chev width={15} height={15} style={{ color: 'var(--text-3)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .18s' }} />
        {open && (
          <div className="proj-menu" onClick={(e) => e.stopPropagation()}>
            {DATA.projects.map((p) => (
              <div key={p} className={'proj-opt mono' + (p === proj ? ' active' : '')} onClick={() => { setProj(p); setOpen(false); }}>
                <span className="proj-dot" style={{ opacity: p === proj ? 1 : 0.35 }} />{p}
                {p === proj && <Ico.check width={14} height={14} style={{ marginLeft: 'auto', color: 'var(--accent)' }} />}
              </div>
            ))}
            <div className="proj-opt mono" style={{ color: 'var(--text-2)', borderTop: '1px solid var(--border)' }}><Ico.plus width={14} height={14} />New project</div>
          </div>
        )}
      </div>

      <nav className="side-nav">
        {(() => { let n = 0; return NAV.map((g) => (
          <div key={g.group} className="nav-group">
            <div className="nav-grouplabel">{g.group}</div>
            {g.items.map((it) => { n++; const ix = String(n).padStart(2, '0'); return (
              <button key={it.id} className={'nav-i' + (active === it.id ? ' active' : '')} onClick={() => setActive(it.id)}>
                <span className="nav-ix">{ix}</span>
                <span>{it.label}</span>
                {it.badge && <span className="nav-badge">{it.badge}</span>}
              </button>
            ); })}
          </div>
        )); })()}
      </nav>

      <div className="side-foot">
        <div className="usage-mini">
          <div className="row spread" style={{ marginBottom: 7 }}><span className="eyebrow" style={{ fontSize: 11, whiteSpace: 'nowrap' }}>Scale plan</span><span className="mono" style={{ fontSize: 11, color: 'var(--text-2)' }}>86%</span></div>
          <div className="bar-track" style={{ height: 5 }}><div className="bar-fill" style={{ width: '86%', height: 5, background: 'var(--accent)' }} /></div>
        </div>
      </div>
    </aside>
  );
}

function DatePicker({ range, setRange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="datepick" style={{ position: 'relative' }}>
      <button className="btn btn-secondary btn-sm" onClick={() => setOpen((o) => !o)} style={{ height: 34 }}>
        <Ico.cal width={15} height={15} />{RANGES[range].label}
        <Ico.chev width={14} height={14} style={{ color: 'var(--text-3)' }} />
      </button>
      {open && (
        <div className="date-menu">
          {Object.keys(RANGES).map((k) => (
            <div key={k} className={'date-opt' + (k === range ? ' active' : '')} onClick={() => { setRange(k); setOpen(false); }}>
              {RANGES[k].label}{k === range && <Ico.check width={14} height={14} style={{ marginLeft: 'auto', color: 'var(--accent)' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Topbar({ title, range, setRange }) {
  return (
    <header className="topbar">
      <div className="row gap-3">
        <h1 className="topbar-title">{title}</h1>
        <span className="coord">§ payments-api · prod · us-east-1</span>
      </div>
      <div className="row gap-3">
        <div className="search-box">
          <Ico.search width={15} height={15} style={{ color: 'var(--text-3)' }} />
          <input placeholder="Search models, features…" />
          <span className="kbd mono">⌘K</span>
        </div>
        <DatePicker range={range} setRange={setRange} />
        <button className="btn btn-secondary btn-sm" style={{ height: 34 }}><Ico.dl width={15} height={15} />Export</button>
      </div>
      <div className="tb-ticks">{Array.from({ length: 49 }).map((_, i) => <i key={i} />)}</div>
    </header>
  );
}

/* ---- Toasts ---- */
function ToastHost({ toasts, dismiss }) {
  return (
    <div className="toast-host">
      {toasts.map((t) => (
        <div key={t.id} className={'toast ' + (t.kind === 'ok' ? 'ok' : '')}>
          <div className="toast-ic">{t.kind === 'ok' ? <Ico.check width={17} height={17} /> : <Ico.warn width={17} height={17} />}</div>
          <div style={{ flex: 1 }}>
            <div className="toast-title">{t.title}</div>
            <div className="toast-body" dangerouslySetInnerHTML={{ __html: t.body }} />
          </div>
          <button className="toast-x" onClick={() => dismiss(t.id)}><Ico.x width={14} height={14} /></button>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [active, setActive] = useState('overview');
  const [range, setRange] = useState('30d');
  const [applied, setApplied] = useState([]);
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(1);

  const push = (t) => {
    const id = idRef.current++;
    setToasts((x) => [...x, { ...t, id }]);
    setTimeout(() => setToasts((x) => x.filter((y) => y.id !== id)), 6000);
  };
  const dismiss = (id) => setToasts((x) => x.filter((y) => y.id !== id));

  const onApply = (feature, rec, savings) => {
    setApplied((a) => [...a, feature.id]);
    push({ kind: 'ok', title: 'Recommendation applied', body: `<span class="mono">${feature.tag}</span> now routes to <span class="mono" style="color:var(--accent)">${rec.model}</span> · est. <span class="mono" style="color:var(--accent)">−${fmtUSD(savings)}/mo</span>` });
  };

  // demo: fire a spike alert shortly after load
  useEffect(() => {
    const t = setTimeout(() => push({ kind: 'error', title: 'Cost spike · payments-api', body: 'GPT-4o spend up <span class="mono" style="color:var(--error)">+31%</span> in the last hour.' }), 2600);
    return () => clearTimeout(t);
  }, []);

  const view = active === 'overview' ? <OverviewPage range={range} onApply={onApply} applied={applied} />
    : active === 'advisor' ? <div className="page"><ModelAdvisor onApply={onApply} applied={applied} /></div>
    : active === 'usage' ? <UsagePage range={range} />
    : active === 'budgets' ? <BudgetsPage />
    : active === 'alerts' ? <AlertsPage />
    : active === 'settings' ? <SettingsPage />
    : <div className="page"><div className="card card-pad" style={{ color: 'var(--text-2)' }}>Docs — see the <a href="Gantry Onboarding.html" style={{ color: 'var(--accent)' }}>onboarding flow</a>.</div></div>;

  return (
    <div className="shell">
      <Sidebar active={active} setActive={setActive} />
      <div className="main">
        <Topbar title={PAGE_TITLE[active]} range={range} setRange={setRange} />
        <div className="content">{view}</div>
      </div>
      <ToastHost toasts={toasts} dismiss={dismiss} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
