import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon, Button, Badge, Input, Card, Stars, Logo, scrollToId } from './primitives';

export function CaseStudies({ onQuote }) {
  const cats = ["View all", "Residential", "Commercial", "Battery"];
  const [cat, setCat] = useState("View all");
  const all = [
    { tag: "Residential", sys: "2.7kW system", title: "Oxfordshire home halves its summer electricity bills", body: "All-black monocrystalline panels with Tigo optimisers on a concrete-tile roof — bills cut by 50% over summer.", img: "flat-roof.jpg" },
    { tag: "Commercial", sys: "52.8kW system", title: "Betty Layward Primary School achieves 50% energy self-sufficiency", body: "120 Trina panels generating 45MWh yearly, saving 8.69 tonnes of CO₂ — the equivalent of 399 trees.", img: "case-study-1.jpg" },
    { tag: "Commercial", sys: "32kW system", title: "Hackney Empire cuts electricity demand by 50%", body: "Rooftop array on the iconic East London theatre reduces grid reliance by 25%, with full site monitoring.", img: "case-study-2.jpg" },
    { tag: "Commercial", sys: "150kW system", title: "Holiday Inn Huntingdon saves £14,000 a year", body: "526 panels generating 140,000kWh annually, cutting the hotel's utility bills by around 20%.", img: "hotel-install.jpg" },
    { tag: "Battery", sys: "9kW + 10kWh battery", title: "Homeowner cuts electricity bills by 60% in five months", body: "27 all-black Panasonic panels paired with a 10kWh LG battery, generating 8,500kWh a year.", img: "case-study-0.jpg" },
  ];
  const shown = cat === "View all" ? all : all.filter((c) => c.tag === cat);
  return (
    <section id="projects" className="kit-section scheme-5">
      <div className="kit-container">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
          <p className="kit-eyebrow text-regular">Projects</p>
          <h2 className="h1" style={{ marginBottom: 20 }}>Real systems, real savings</h2>
          <p className="text-medium" style={{ color: "rgba(255,255,255,.6)" }}>See what we've built across the region.</p>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 48, flexWrap: "wrap" }}>
          {cats.map((c) => <button key={c} className="kit-tab" aria-selected={cat === c} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="kit-3col kit-stagger">
          {shown.length ? shown.map((c) => (
            <div key={c.title} className="kit-card-hover" style={{ background: "#fff", borderRadius: "var(--radius-card)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative" }}>
                <img src={"/assets/images/" + c.img} alt=""
                  style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6, alignItems: "center" }}>
                  <Badge>{c.tag}</Badge>
                  <span style={{ fontSize: 11, fontWeight: 700, background: "rgba(0,0,0,.6)", color: "#fff", padding: "3px 8px", borderRadius: "var(--radius-badge)", backdropFilter: "blur(4px)" }}>{c.sys}</span>
                </div>
              </div>
              <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column", color: "#191919" }}>
                <h3 style={{ fontSize: "var(--text-medium)", fontWeight: 700, lineHeight: 1.3, marginBottom: 8, color: "#191919" }}>{c.title}</h3>
                <p className="text-small" style={{ color: "#666", flex: 1, lineHeight: 1.5 }}>{c.body}</p>
                <div style={{ marginTop: 16 }}>
                  <Button variant="link" iconRight={<Icon name="chevron_right" size={18} />} onClick={onQuote}>View case study</Button>
                </div>
              </div>
            </div>
          )) : <p className="text-medium" style={{ gridColumn: "1/-1", textAlign: "center", color: "rgba(255,255,255,.5)" }}>No projects in this category yet — check back soon.</p>}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const reviews = [
    { quote: "From the first survey to switch-on, the team were professional and tidy. Our bills have dropped by nearly half and the app makes it easy to see what we're generating.", name: "Sarah Mitchell", role: "Homeowner, Oxford", img: "testimonial-0.jpg" },
    { quote: "We added battery storage to an existing array. The advice was honest, the install was quick, and we now run the evenings on stored solar. Couldn't be happier.", name: "James Whitfield", role: "Homeowner, Bicester", img: "benefits-1.jpg" },
    { quote: "UKSG handled our commercial install end to end, including all the paperwork. The savings on our energy bill have been exactly what they projected.", name: "Priya Anand", role: "Operations, Kidlington", img: "benefits-0.jpg" },
  ];
  return (
    <section id="reviews" className="kit-section scheme-1">
      <div className="kit-container">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
          <h2 className="h2" style={{ marginBottom: 20 }}>What our customers say</h2>
          <p className="text-medium">Over 1,500 installations and a five-star reputation across Oxfordshire.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }} className="kit-3col kit-stagger">
          {reviews.map((r) => (
            <Card key={r.name} className="kit-card-hover" style={{ padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <Stars n={5} />
                <p className="text-medium" style={{ marginTop: 24 }}>&ldquo;{r.quote}&rdquo;</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24 }}>
                <img src={"/assets/images/" + r.img} alt="" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <p className="text-regular" style={{ fontWeight: 600 }}>{r.name}</p>
                  <p className="text-regular">{r.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing({ onQuote, eyebrow, title, subtitle, tiers }) {
  tiers = tiers || [
    { name: "5kWh system", sub: "Entry-level storage", price: "£4,500", feats: ["Suitable for smaller homes", "Lithium LiFePO4 chemistry", "10-year manufacturer warranty"] },
    { name: "10kWh system", sub: "Most popular choice", price: "£8,500", feats: ["Ideal for family homes", "Maximises self-consumption", "Backup power capability", "Expandable to 20kWh"] },
    { name: "15kWh system", sub: "Premium capacity", price: "£12,000", feats: ["Larger homes and businesses", "Extended off-grid capability", "Multiple-day autonomy", "Finance options available"] },
  ];
  return (
    <section id="pricing" className="kit-section scheme-3">
      <div className="kit-container">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <p className="kit-eyebrow text-regular">{eyebrow || "Investment"}</p>
          <h2 className="h2" style={{ marginBottom: 20 }}>{title || "Battery storage costs"}</h2>
          <p className="text-medium">{subtitle || "Typical systems start from £4,000 to £12,000, installed and guaranteed."}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, alignItems: "start" }} className="kit-3col kit-stagger">
          {tiers.map((t, idx) => {
            const featured = idx === 1;
            return (
              <Card key={t.name} className="kit-card-hover" style={{ padding: 0, position: "relative", border: featured ? "1.5px solid var(--color-selective-yellow)" : undefined }}>
                <div style={{ height: 5, background: featured ? "var(--color-selective-yellow)" : "var(--color-neutral-lighter)" }} />
                <div style={{ padding: 32 }}>
                  {featured && <span style={{ position: "absolute", top: 24, right: 24, background: "var(--color-selective-yellow)", color: "#191919", fontSize: 11, fontWeight: 700, padding: "5px 11px", borderRadius: 999, letterSpacing: ".02em" }}>Most popular</span>}
                  <h3 className="h6" style={{ fontWeight: 600 }}>{t.name}</h3>
                  <p className="text-regular" style={{ color: "var(--color-neutral)" }}>{t.sub}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "20px 0 2px" }}>
                    <div className="h1" style={{ fontSize: "var(--text-h2)" }}>{t.price}</div>
                  </div>
                  <p className="text-small" style={{ color: "var(--color-neutral)" }}>Installed and guaranteed</p>
                  <Button variant="primary" full style={{ marginTop: 22 }} onClick={onQuote}>Get quote</Button>
                  <div className="uksg-divider" style={{ margin: "26px 0" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {t.feats.map((f) => (
                      <div key={f} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--color-selective-yellow)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                          <Icon name="check" size={13} style={{ filter: "brightness(0)" }} />
                        </span>
                        <span className="text-regular">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ q, a, open, onToggle }) {
  const ref = useRef(null);
  const [h, setH] = useState(0);
  useEffect(() => { setH(open && ref.current ? ref.current.scrollHeight : 0); }, [open]);
  return (
    <div className="kit-acc">
      <button className="kit-acc-q h6" onClick={onToggle}>
        {q}
        <Icon name="keyboard_arrow_down" size={24} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .25s", flex: "none" }} />
      </button>
      <div className="kit-acc-a" style={{ height: h }}>
        <p ref={ref} className="text-regular" style={{ paddingBottom: 22 }}>{a}</p>
      </div>
    </div>
  );
}

export function Faq({ onQuote }) {
  const navigate = useNavigate();
  const qs = [
    { q: "How much will I save?", a: "Most homeowners save between £800 and £1,500 in their first year, depending on system size, how much electricity you use, and whether you add battery storage. With a typical 4kWp system and average bills, savings of around £1,000 a year are common. Use our savings calculator above for a personalised estimate, or we'll calculate your exact figures during the free survey." },
    { q: "What about SEG payments?", a: "The Smart Export Guarantee lets you earn money when your system generates more power than you need. Surplus electricity flows to the grid and you receive payments from your energy supplier. Rates vary by supplier but add up over time." },
    { q: "How long is payback?", a: "Most systems pay for themselves in 8 to 12 years through bill savings and export income. After that, you benefit from free electricity for the remaining 15 to 20 years of panel life. Government grants and finance options can shorten payback further." },
    { q: "Do I need planning permission?", a: "Most residential solar installations are permitted development and need no planning permission. We handle all checks and paperwork to ensure your system complies with building regulations. Commercial projects may require formal approval, which we manage for you." },
    { q: "What warranty do you offer?", a: "All our systems come with manufacturer warranties on panels and inverters, plus an insurance-backed guarantee covering workmanship and performance. We're MCS certified, so you benefit from full consumer protection and long-term peace of mind." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="kit-section scheme-3">
      <div className="kit-container kit-2col" style={{ display: "grid", gridTemplateColumns: ".75fr 1fr", gap: 80 }}>
        <div>
          <h2 className="h2" style={{ marginBottom: 20 }}>Questions</h2>
          <p className="text-medium">Find answers to common questions about solar installation and savings.</p>
          <div style={{ marginTop: 32 }}>
            <Button variant="primary" onClick={() => {
              if (document.getElementById("contact")) scrollToId("contact");
              else navigate("/#contact");
            }}>Contact us</Button>
          </div>
        </div>
        <div>
          {qs.map((item, i) => <AccordionItem key={i} {...item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}
        </div>
      </div>
    </section>
  );
}

export function Cta({ onQuote }) {
  return (
    <section className="kit-section scheme-3">
      <div className="kit-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 768, marginBottom: 64 }}>
          <h2 className="h2" style={{ marginBottom: 20 }}>Ready to go solar?</h2>
          <p className="text-medium">Get a free quote and discover how much you could save.</p>
          <div style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="primary" onClick={onQuote}>Get a free quote</Button>
            <Button variant="blue" onClick={onQuote}>Book a survey</Button>
          </div>
        </div>
        <img className="kit-img" src="/assets/images/visual-graphic.jpg" alt="" style={{ height: 420 }} />
      </div>
    </section>
  );
}

export function Contact() {
  const items = [
    { icon: "mail", h: "Email", sub: "Send us a message", link: "info@uksolargeneration.co.uk" },
    { icon: "call", h: "Phone", sub: "Call us during business hours", link: "01869 347 007" },
    { icon: "location_on", h: "Office", sub: "Lower Heyford, Oxfordshire, OX25 5NS", link: null },
  ];
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const canSend = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <section id="contact" className="kit-section scheme-5" style={{ paddingBottom: 56 }}>
      <div className="kit-container">
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <p className="kit-eyebrow text-regular">Contact</p>
          <h2 className="h2" style={{ marginBottom: 20 }}>Get in touch</h2>
          <p className="text-medium">We're here to answer your questions and arrange a free survey.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="kit-2col">
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {items.map((it) => (
              <div key={it.h}>
                <Icon name={it.icon} size={32} style={{ marginBottom: 16 }} />
                <h3 className="h6" style={{ marginBottom: 8 }}>{it.h}</h3>
                <p className="text-regular" style={{ marginBottom: 8 }}>{it.sub}</p>
                {it.link
                  ? <a href={it.h === "Phone" ? "tel:" + it.link.replace(/\s/g, "") : "mailto:" + it.link} style={{ color: "inherit", textDecoration: "underline" }}>{it.link}</a>
                  : <Button variant="link" iconRight={<Icon name="chevron_right" size={20} invert />} onClick={() => window.open("https://maps.google.com/maps?q=Lower+Heyford+Oxfordshire+OX25+5NS", "_blank")}>Get directions</Button>}
              </div>
            ))}
          </div>
          <div>
            {sent ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--color-selective-yellow)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="check" size={26} />
                </div>
                <h3 className="h5">Message sent!</h3>
                <p className="text-regular" style={{ color: "var(--color-white-50)" }}>Thanks for getting in touch. We'll get back to you within one working day.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <h3 className="h5" style={{ marginBottom: 8 }}>Send us a message</h3>
                <div>
                  <label className="text-small" style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>Full name</label>
                  <Input value={form.name} onChange={(e) => setF("name", e.target.value)} placeholder="Jane Smith" />
                </div>
                <div>
                  <label className="text-small" style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>Email</label>
                  <Input type="email" value={form.email} onChange={(e) => setF("email", e.target.value)} placeholder="jane@example.co.uk" />
                </div>
                <div>
                  <label className="text-small" style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>Message</label>
                  <textarea className="uksg-input" rows={4} value={form.message} onChange={(e) => setF("message", e.target.value)}
                    placeholder="Tell us about your property and what you're interested in…"
                    style={{ resize: "vertical", minHeight: 100, fontFamily: "var(--font-body)", fontSize: "var(--text-regular)" }} />
                </div>
                <Button variant="primary" disabled={!canSend} onClick={() => canSend && setSent(true)}>Send message</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// MapEmbed inline (avoids circular import from primitives)
function MapEmbed({ lat, lon, z = 13, query, label }) {
  const n = Math.pow(2, z);
  const xf = (lon + 180) / 360 * n;
  const latRad = lat * Math.PI / 180;
  const yf = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n;
  const cx = Math.floor(xf), cy = Math.floor(yf);
  const span = 2;
  const locPxX = (xf - (cx - span)) * 256;
  const locPxY = (yf - (cy - span)) * 256;
  const tiles = [];
  for (let j = 0; j <= span * 2; j++) for (let i = 0; i <= span * 2; i++) {
    tiles.push({ i, j, x: ((cx - span + i) % n + n) % n, y: cy - span + j });
  }
  const href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
  return (
    <a href={href} target="_blank" rel="noreferrer" title={"Open " + (label || query) + " in Google Maps"}
      className="kit-img" style={{ position: "relative", display: "block", aspectRatio: "3 / 2", width: "100%", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: (span * 2 + 1) * 256, height: (span * 2 + 1) * 256, left: `calc(50% - ${locPxX}px)`, top: `calc(50% - ${locPxY}px)` }}>
        {tiles.map((t) => (
          <img key={t.i + "-" + t.j} src={`https://mt${(t.x + t.y) % 4}.google.com/vt/lyrs=m&x=${t.x}&y=${t.y}&z=${z}`}
            alt="" draggable="false" style={{ position: "absolute", left: t.i * 256, top: t.j * 256, width: 256, height: 256 }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-100%)", zIndex: 2 }}>
        <svg width="30" height="40" viewBox="0 0 30 40" aria-hidden="true">
          <path d="M15 1C7.3 1 1 7.3 1 15c0 10 14 24 14 24s14-14 14-24C29 7.3 22.7 1 15 1z" fill="var(--color-selective-yellow)" stroke="#191919" strokeWidth="1.5" />
          <circle cx="15" cy="15" r="5" fill="#191919" />
        </svg>
      </div>
      <span style={{ position: "absolute", right: 10, bottom: 10, background: "rgba(255,255,255,.92)", color: "#191919", fontSize: 11, fontWeight: 600, padding: "5px 9px", borderRadius: 6, zIndex: 2 }}>Open in Google Maps ›</span>
    </a>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const handleSubscribe = () => {
    if (email.trim()) setSubscribed(true);
  };
  const cols = [
    ["Services", ["Solar panels", "Battery storage", "EV charging", "Commercial solar", "Other products"]],
    ["Company", ["About us", "Case studies", "Reviews", "FAQ", "Blog"]],
    ["Follow us", ["Facebook", "Instagram", "X", "LinkedIn", "YouTube"]],
  ];
  const social = { Facebook: "facebook", Instagram: "instagram", X: "x", LinkedIn: "linkedin", YouTube: "youtube" };
  const HREFS = {
    "Solar panels": "/solar-pv", "Battery storage": "/battery-storage", "EV charging": "/solar-pv",
    "Commercial solar": "/commercial-solar", "Other products": "/",
    "About us": "/", "Case studies": "/case-studies", "Reviews": "/#reviews", "FAQ": "/#faq", "Blog": "/blog",
  };
  return (
    <footer className="scheme-5" style={{ padding: "80px 5% 40px" }}>
      <div className="kit-container">
        <div style={{ display: "grid", gridTemplateColumns: ".75fr 1fr", gap: "8vw", paddingBottom: 80 }} className="kit-2col">
          <div>
            <div style={{ marginBottom: 24 }}><Logo dark /></div>
            <p className="text-regular" style={{ marginBottom: 24 }}>Get solar insights and renewable energy updates delivered monthly.</p>
            <div style={{ maxWidth: 420 }}>
              {subscribed ? (
                <p className="text-small" style={{ color: "var(--color-selective-yellow)", fontWeight: 600 }}>Thanks! You're subscribed.</p>
              ) : (
                <>
                  <div style={{ display: "flex", gap: 16 }}>
                    <Input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1 }} />
                    <Button variant="secondary" size="sm" onClick={handleSubscribe}>Subscribe</Button>
                  </div>
                  <p className="text-tiny" style={{ marginTop: 12 }}>By subscribing you agree to our Privacy Policy and consent to receive updates from UK Solar Generation.</p>
                </>
              )}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="kit-3col">
            {cols.map(([h, links]) => (
              <div key={h}>
                <h3 className="text-regular" style={{ fontWeight: 600, marginBottom: 16, fontFamily: "var(--font-body)" }}>{h}</h3>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {links.map((l) => (
                    <li key={l} style={{ padding: "8px 0" }}>
                      {h === "Follow us" ? (
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-small" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
                          <img className="uksg-i uksg-i--invert" src={"/assets/icons/brand/" + social[l] + ".svg"} alt="" style={{ width: 20, height: 20 }} />{l}
                        </a>
                      ) : (
                        <Link to={HREFS[l] || "/"} className="text-small" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
                          {l}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "40px 0", borderTop: "1px solid rgba(255,255,255,.12)", marginBottom: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 48, alignItems: "center" }} className="kit-2col">
            <div>
              <p className="text-small" style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 20, color: "rgba(255,255,255,.45)" }}>Find us</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <Icon name="location_on" size={18} invert style={{ marginTop: 2, flexShrink: 0 }} />
                  <span className="text-small">Lower Heyford<br />Oxfordshire, OX25 5NS</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Icon name="call" size={18} invert />
                  <a href="tel:+441869347007" className="text-small" style={{ color: "inherit", textDecoration: "none" }}>01869 347 007</a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Icon name="mail" size={18} invert />
                  <a href="mailto:info@uksolargeneration.co.uk" className="text-small" style={{ color: "inherit", textDecoration: "none" }}>info@uksolargeneration.co.uk</a>
                </div>
              </div>
            </div>
            <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", height: 200, position: "relative" }}>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, transform: "translateY(-50%)" }}>
                <MapEmbed lat={51.9198} lon={-1.2921} z={13} query="Lower Heyford, Oxfordshire OX25 5NS" label="our office" />
              </div>
            </div>
          </div>
        </div>
        <div className="uksg-divider" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, flexWrap: "wrap", gap: 16 }}>
          <p className="text-small">© 2026 UK Solar Generation. All rights reserved.</p>
          <ul style={{ listStyle: "none", display: "flex", gap: 24, margin: 0, padding: 0 }}>
            {["Privacy policy", "Terms of service", "Cookies settings"].map((l) => (
              <li key={l} className="text-small" style={{ textDecoration: "underline" }}><a href="#" onClick={(e) => e.preventDefault()} style={{ color: "inherit" }}>{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
