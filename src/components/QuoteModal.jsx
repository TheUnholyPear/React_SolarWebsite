import { useState, useEffect } from 'react';
import { Icon, Button, Input } from './primitives';

export default function QuoteModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ postcode: "", property: "House", interest: "Solar panels", name: "", email: "", phone: "" });
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  useEffect(() => {
    if (open) {
      setStep(0);
      setData({ postcode: "", property: "House", interest: "Solar panels", name: "", email: "", phone: "" });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const steps = ["Your postcode", "Your property", "Your details", "Done"];
  const pct = ((step + 1) / steps.length) * 100;
  const canNext = step === 0 ? data.postcode.trim().length >= 3 : step === 2 ? (data.name && data.email) : true;

  const choices = (k, opts) => (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {opts.map((o) => (
        <button key={o} className="kit-tab" aria-selected={data[k] === o} onClick={() => set(k, o)}>{o}</button>
      ))}
    </div>
  );

  return (
    <div className="kit-overlay" onClick={onClose}>
      <div className="kit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="kit-progress" style={{ width: pct + "%" }} />
        <div style={{ padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span className="text-small" style={{ color: "var(--color-neutral)", fontWeight: 600 }}>
              {step < 3 ? `Step ${step + 1} of 3` : "Free quote"}
            </span>
            <button onClick={onClose} style={{ background: "none", border: 0, cursor: "pointer", padding: 4, lineHeight: 0 }} aria-label="Close"><Icon name="close" size={22} /></button>
          </div>

          {step === 0 && (
            <div>
              <h3 className="h4" style={{ marginBottom: 8 }}>Get a free quote</h3>
              <p className="text-regular" style={{ marginBottom: 24, color: "var(--color-neutral)" }}>Pop in your postcode and we'll check coverage and typical savings for your area.</p>
              <label className="text-small" style={{ fontWeight: 600 }}>Postcode</label>
              <Input autoFocus value={data.postcode} placeholder="e.g. OX25 5NS" onChange={(e) => set("postcode", e.target.value)} style={{ marginTop: 4 }} />
            </div>
          )}
          {step === 1 && (
            <div>
              <h3 className="h4" style={{ marginBottom: 24 }}>Tell us about your property</h3>
              <label className="text-small" style={{ fontWeight: 600, display: "block", marginBottom: 10 }}>Property type</label>
              {choices("property", ["House", "Bungalow", "Flat", "Commercial"])}
              <label className="text-small" style={{ fontWeight: 600, display: "block", margin: "24px 0 10px" }}>What are you interested in?</label>
              {choices("interest", ["Solar panels", "Battery storage", "EV charging", "Not sure yet"])}
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="h4" style={{ marginBottom: 24 }}>Where shall we send it?</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div><label className="text-small" style={{ fontWeight: 600 }}>Full name</label><Input autoFocus value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Smith" style={{ marginTop: 4 }} /></div>
                <div><label className="text-small" style={{ fontWeight: 600 }}>Email</label><Input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@example.co.uk" style={{ marginTop: 4 }} /></div>
                <div><label className="text-small" style={{ fontWeight: 600 }}>Phone (optional)</label><Input value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="07700 900000" style={{ marginTop: 4 }} /></div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--color-selective-yellow)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <Icon name="check" size={30} />
              </div>
              <h3 className="h4" style={{ marginBottom: 8 }}>Thanks, {data.name.split(" ")[0] || "there"}!</h3>
              <p className="text-regular" style={{ color: "var(--color-neutral)", maxWidth: 320, margin: "0 auto" }}>
                We've received your enquiry for <b style={{ color: "var(--color-neutral-darkest)" }}>{data.interest}</b> at <b style={{ color: "var(--color-neutral-darkest)" }}>{data.postcode.toUpperCase()}</b>. A surveyor will be in touch within one working day to book your free survey.
              </p>
            </div>
          )}

          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            {step > 0 && step < 3 && <Button variant="secondary" onClick={() => setStep(step - 1)}>Back</Button>}
            {step < 2 && <Button variant="primary" full onClick={() => setStep(step + 1)} disabled={!canNext}>Continue</Button>}
            {step === 2 && <Button variant="primary" full onClick={() => setStep(3)} disabled={!canNext}>Get my quote</Button>}
            {step === 3 && <Button variant="primary" full onClick={onClose}>Done</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}
