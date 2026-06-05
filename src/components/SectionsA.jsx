import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Button, Card, scrollToId, asset } from './primitives';

function useCountUp(target, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setVal(Math.round(ease * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return [val, ref];
}

export function Hero({ onQuote, headline }) {
  const imgRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="scheme-1" style={{ position: "relative", padding: "0 5%", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img ref={imgRef} src={asset("/assets/images/cta.jpg")} alt="" style={{ width: "100%", height: "115%", objectFit: "cover", willChange: "transform" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,var(--hero-overlay,.55))" }} />
      </div>
      <div className="kit-container" style={{ position: "relative", zIndex: 1, maxWidth: 768 }}>
        <div style={{ minHeight: "82vh", maxHeight: 900, display: "flex", alignItems: "center", padding: "96px 0" }}>
          <div style={{ textAlign: "center", color: "#fff" }}>
            <h1 className="h1" style={{ color: "#fff", marginBottom: 24 }}>{headline || "Solar power for homes and businesses across Oxfordshire"}</h1>
            <p className="text-medium" style={{ color: "#fff", maxWidth: 620, marginInline: "auto" }}>
              UK Solar Generation has installed over 1,500 systems since 2010. We design and fit solar panels, battery storage, EV chargers and more across Oxfordshire, the surrounding counties and North-West London.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Button variant="primary" onClick={onQuote}>Get a free quote</Button>
              <Button variant="secondary-alt" onClick={() => scrollToId("services")}>Learn more</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCount({ value, suffix = "", prefix = "", label }) {
  const [count, ref] = useCountUp(value);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div className="h2" style={{ fontVariantNumeric: "tabular-nums", color: "var(--color-selective-yellow-dark)" }}>
        {prefix}{count.toLocaleString("en-GB")}{suffix}
      </div>
      <p className="text-small" style={{ color: "var(--color-neutral)", marginTop: 4 }}>{label}</p>
    </div>
  );
}

export function TrustBar() {
  const accreditations = ["MCS Certified", "TrustMark", "RECC", "Insurance-Backed Guarantee", "HIES"];
  return (
    <section className="scheme-2" style={{ padding: "48px 5%" }}>
      <div className="kit-container">
        <div className="kit-stats-grid kit-stagger">
          <StatCount value={1500} suffix="+" label="Systems installed" />
          <StatCount value={2010} label="Established" />
          <StatCount value={5} suffix="★" label="Customer rating" />
          <StatCount value={25} suffix=" yrs" label="Panel warranty" />
        </div>
        <div style={{ borderTop: "1px solid var(--color-black-10)", paddingTop: 32 }}>
          <h2 className="h6" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 28px" }}>Trusted by homeowners and businesses across the region</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            {accreditations.map((a) => (
              <span key={a} className="kit-accred"><Icon name="verified" size={20} /> {a}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features({ onQuote }) {
  const navigate = useNavigate();
  const items = [
    { n: "01", eyebrow: "Installation", title: "Photovoltaic systems for homes and businesses",
      body: "We design and install bespoke solar PV systems tailored to your property. Our engineers handle everything from survey to commissioning, ensuring maximum output and long-term performance.", img: "features-0.jpg", to: "/solar-pv" },
    { n: "02", eyebrow: "Backup power", title: "Store energy and use it when you need it",
      body: "Pair solar with battery storage to maximise self-consumption and gain energy independence. Keep the lights on even when the grid goes down.", img: "powerwall-full.jpg", to: "/battery-storage" },
    { n: "03", eyebrow: "Clean transport", title: "Charge your vehicle with solar energy",
      body: "Install a home or workplace EV charger and power your electric vehicle with clean solar energy. We integrate chargers with your solar system for seamless operation.", img: "features-2.jpg", to: "/ev-charging" },
  ];
  return (
    <section id="services" className="scheme-3">
      {items.map((it) => (
        <div key={it.n} style={{ borderTop: "1px solid var(--color-scheme-border)", padding: "0 5%" }}>
          <div className="kit-container">
            <div style={{ padding: "56px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="kit-2col">
              <div>
                <p className="kit-eyebrow text-regular">{it.eyebrow}</p>
                <h2 className="h2" style={{ marginBottom: 20 }}>{it.title}</h2>
                <p className="text-medium">{it.body}</p>
                <div style={{ marginTop: 32, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                  <Button variant="primary" onClick={onQuote}>Get a quote</Button>
                  <Button variant="link" iconRight={<Icon name="chevron_right" size={20} />} onClick={() => navigate(it.to)}>Learn more</Button>
                </div>
              </div>
              <img className="kit-img" src={asset("/assets/images/" + it.img)} alt="" style={{ height: 440 }} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function buildSmoothPath(pts) {
  if (!pts.length) return '';
  let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const cpx = ((pts[i - 1][0] + pts[i][0]) / 2).toFixed(1);
    d += ` C ${cpx},${pts[i - 1][1].toFixed(1)} ${cpx},${pts[i][1].toFixed(1)} ${pts[i][0].toFixed(1)},${pts[i][1].toFixed(1)}`;
  }
  return d;
}

export function Benefits() {
  const [bill, setBill] = useState(120);
  const [mode, setMode] = useState("Solar + battery");
  const battery = mode === "Solar + battery";

  const annualBill = bill * 12;
  const offset = battery ? 0.7 : 0.5;
  const exportEarn = battery ? 90 : 160;
  const annualSaving = Math.round(annualBill * offset + exportEarn);
  const systemCost = Math.round(Math.min(13000, Math.max(5000, annualBill * 4)) + (battery ? 4000 : 0));

  const years = 25, inflation = 1.05;
  let cum = 0;
  const data = [];
  for (let y = 1; y <= years; y++) {
    cum += annualSaving * Math.pow(inflation, y - 1);
    data.push(cum);
  }
  const lifetime = Math.round(cum - systemCost);

  // Fractional payback index (0–24 chart space) — no integer snapping
  let paybackIdx = null, paybackYear = null;
  for (let i = 0; i < years; i++) {
    const before = i === 0 ? 0 : data[i - 1];
    const after = data[i];
    if (before < systemCost && after >= systemCost) {
      const frac = (systemCost - before) / (after - before);
      paybackIdx = Math.max(0, (i - 1) + frac);
      paybackYear = i + 1;
      break;
    }
  }

  const max = data[data.length - 1];
  const chartH = 300, chartW = 520, topPad = 20;
  const px = (i) => (i / (years - 1)) * chartW;
  const py = (v) => chartH - (v / max) * (chartH - topPad);
  const pts = data.map((v, i) => [px(i), py(v)]);
  const lineD = buildSmoothPath(pts);
  const areaD = lineD + ` L ${chartW},${chartH} L 0,${chartH} Z`;
  const beY = py(systemCost);
  const gbp = (n) => "£" + Math.round(n).toLocaleString("en-GB");
  const T = "0.45s cubic-bezier(0.25,0.46,0.45,0.94)";

  return (
    <section id="benefits" className="kit-section scheme-3">
      <div className="kit-container">
        <div style={{ maxWidth: 620, marginBottom: 56 }}>
          <p className="kit-eyebrow text-regular">Savings calculator</p>
          <h2 className="h2" style={{ marginBottom: 20 }}>See what you could save</h2>
          <p className="text-medium">Match the slider to your current electricity bill and watch how solar pays back over 25 years.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 64, alignItems: "center" }} className="kit-2col">
          <div>
            <label className="text-small" style={{ fontWeight: 600, display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span>Your monthly electricity bill</span>
              <span style={{ fontFamily: "var(--font-heading)" }}>£{bill}/mo</span>
            </label>
            <input className="kit-range" type="range" min="40" max="400" step="5" value={bill}
              onChange={(e) => setBill(+e.target.value)} aria-label="Monthly electricity bill" />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }} className="text-tiny">
              <span style={{ color: "var(--color-neutral)" }}>£40</span><span style={{ color: "var(--color-neutral)" }}>£400</span>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
              {["Solar only", "Solar + battery"].map((m) => (
                <button key={m} className="kit-tab" aria-selected={mode === m} onClick={() => setMode(m)}>{m}</button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 36 }}>
              {[
                { v: gbp(annualSaving), l: "Saved in year 1" },
                { v: gbp(lifetime), l: "Net 25-year saving" },
                { v: paybackYear ? paybackYear + " yrs" : "25+ yrs", l: "Payback period" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="h3" style={{ fontSize: "var(--text-h4)", color: "var(--color-selective-yellow-dark)" }}>{s.v}</div>
                  <p className="text-small" style={{ color: "var(--color-neutral)", marginTop: 4 }}>{s.l}</p>
                </div>
              ))}
            </div>
            <p className="text-tiny" style={{ color: "var(--color-neutral)", marginTop: 24 }}>
              Estimates based on a typical Oxfordshire install with 5% energy inflation. Your free survey gives exact figures.
            </p>
            <div style={{ marginTop: 24 }}>
              <Button variant="primary" onClick={() => scrollToId("pricing")}>See system prices</Button>
            </div>
          </div>

          <Card style={{ padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
              <h3 className="h6">Cumulative savings</h3>
              <span className="text-small" style={{ color: "var(--color-neutral)" }}>{mode} · {gbp(systemCost)} system</span>
            </div>
            <div style={{ position: "relative" }}>
              <svg viewBox={`0 0 ${chartW} ${chartH}`} width="100%" height="auto" style={{ display: "block", overflow: "visible" }}>
                <defs>
                  <linearGradient id="savgrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-selective-yellow)" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="var(--color-selective-yellow)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1={chartH} x2={chartW} y2={chartH} stroke="var(--color-black-10)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <path d={areaD} fill="url(#savgrad)" style={{ transition: `d ${T}` }} />
                {systemCost <= max && (
                  <g>
                    <line x1="0" y1={beY} x2={chartW} y2={beY} stroke="var(--color-neutral-light)" strokeWidth="1.5" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" />
                    <text x={chartW} y={beY - 9} textAnchor="end" fontSize="13" fill="var(--color-neutral)" style={{ fontFamily: "var(--font-body)" }}>Break-even {gbp(systemCost)}</text>
                  </g>
                )}
                <path d={lineD} fill="none" stroke="var(--color-selective-yellow)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ transition: `d ${T}` }} />
                <circle cx={px(years - 1)} cy={py(data[years - 1])} r="4.5" fill="var(--color-selective-yellow)" stroke="#fff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                {paybackIdx !== null && <circle cx={px(paybackIdx)} cy={beY} r="6" fill="#fff" stroke="var(--color-selective-yellow-dark)" strokeWidth="3" vectorEffect="non-scaling-stroke" />}
                {paybackIdx !== null && <text x={px(paybackIdx)} y={beY - 16} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--color-neutral-darkest)" style={{ fontFamily: "var(--font-heading)" }}>Year {paybackYear}</text>}
              </svg>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }} className="text-tiny">
              <span style={{ color: "var(--color-neutral)" }}>Year 1</span><span style={{ color: "var(--color-neutral)" }}>Year 25</span>
            </div>
            <p className="text-small" style={{ color: "var(--color-neutral)", marginTop: 14 }}>
              {paybackYear ? `Pays for itself in year ${paybackYear} — everything after is money in your pocket.` : "Builds steady savings across the system's life."}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks({ onQuote }) {
  const steps = [
    { icon: "design_services", title: "Free survey and design", body: "We assess your roof, consumption and budget to create a tailored proposal." },
    { icon: "approval", title: "Approval and planning", body: "We handle all paperwork, permissions and MCS registration on your behalf." },
    { icon: "engineering", title: "Installation and testing", body: "Our engineers install your system and run full performance checks before handover." },
  ];
  return (
    <section id="how" className="kit-section scheme-3">
      <div className="kit-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 80 }} className="kit-2col">
          <div>
            <p className="kit-eyebrow text-regular">Process</p>
            <h2 className="h2">From survey to switch-on in three steps</h2>
          </div>
          <p className="text-medium" style={{ alignSelf: "end" }}>We handle the entire journey. Our team visits your property, designs a system matched to your needs, installs it professionally, and ensures everything runs smoothly from day one.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 48 }} className="kit-3col">
          {steps.map((s) => (
            <div key={s.title}>
              <Icon name={s.icon} size={48} style={{ marginBottom: 24 }} />
              <h3 className="h4" style={{ marginBottom: 20 }}>{s.title}</h3>
              <p className="text-regular">{s.body}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 80, display: "flex", gap: 16, alignItems: "center" }}>
          <Button variant="primary" onClick={onQuote}>Get started</Button>
        </div>
      </div>
    </section>
  );
}
