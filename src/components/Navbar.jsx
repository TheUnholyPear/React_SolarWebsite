import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon, Button, Logo } from './primitives';

export default function Navbar({ onQuote }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeT = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const products = [
    { icon: "tools_installation_kit", name: "Solar panels", desc: "Residential solar panel installation", to: "/solar-pv" },
    { icon: "storage", name: "Battery storage", desc: "Store energy and maximise savings", to: "/battery-storage" },
    { icon: "add_business", name: "Commercial solar", desc: "Large-scale systems for businesses", to: "/commercial-solar" },
    { icon: "workspaces", name: "EV charging", desc: "Home and workplace charging solutions", to: "/solar-pv" },
  ];
  const company = [
    { icon: "history", name: "About us", desc: "Our story since 2010", to: "/" },
    { icon: "savings", name: "Case studies", desc: "Real installations and savings", to: "/case-studies" },
    { icon: "reviews", name: "Reviews", desc: "What our customers say", to: "/#reviews" },
    { icon: "contacts", name: "Contact", desc: "Get in touch with us", to: "/#contact" },
  ];

  const openMore = () => { clearTimeout(closeT.current); setMoreOpen(true); };
  const delayClose = () => { closeT.current = setTimeout(() => setMoreOpen(false), 160); };

  const links = [
    { label: "Solar panels", to: "/solar-pv" },
    { label: "Battery storage", to: "/battery-storage" },
    { label: "Commercial", to: "/commercial-solar" },
  ];
  const mobileLinks = [...links,
    { label: "EV charging", to: "/solar-pv" },
    { label: "Case studies", to: "/case-studies" },
    { label: "Reviews", to: "/#reviews" },
    { label: "Contact", to: "/#contact" },
  ];

  const isActive = (to) => location.pathname === to.split('#')[0];

  return (
    <header className="kit-nav">
      <div className="kit-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 72, padding: "0 5%" }}>
        <Link to="/" aria-label="UK Solar Generation — home" style={{ display: "flex", alignItems: "center" }}><Logo /></Link>

        {/* desktop nav */}
        <nav className="kit-desktop-nav" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {links.map((l) => (
            <Link key={l.label} to={l.to} className="kit-navlink"
              aria-current={isActive(l.to) ? "page" : undefined}
              style={{ display: "inline-flex", alignItems: "center" }}>
              {l.label}
            </Link>
          ))}
          <div style={{ position: "relative" }} onMouseEnter={openMore} onMouseLeave={delayClose}>
            <button className="kit-navlink" style={{ display: "inline-flex", alignItems: "center", gap: 6 }} onClick={() => setMoreOpen((o) => !o)}>
              More <Icon name="keyboard_arrow_down" size={18} style={{ transform: moreOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
            </button>
            {moreOpen && (
              <div className="kit-mega" onMouseEnter={openMore} onMouseLeave={delayClose}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
                  {[["Products", products], ["Company", company]].map(([heading, items]) => (
                    <div key={heading}>
                      <p className="text-small" style={{ fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: ".04em", color: "var(--color-neutral)" }}>{heading}</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {items.map((it) => (
                          <Link key={it.name} to={it.to} className="kit-mega-item" onClick={() => setMoreOpen(false)}>
                            <Icon name={it.icon} size={24} style={{ marginTop: 2 }} />
                            <span>
                              <span style={{ fontWeight: 600, display: "block", fontSize: "var(--text-regular)" }}>{it.name}</span>
                              <span className="text-small" style={{ color: "var(--color-neutral)" }}>{it.desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="kit-desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Link to="/blog" className="kit-navlink"
            aria-current={location.pathname === '/blog' ? 'page' : undefined}
            style={{ display: "inline-flex", alignItems: "center" }}>Blog</Link>
          <Button variant="primary" size="sm" onClick={onQuote} style={{ marginLeft: 8 }}>Get a quote</Button>
        </div>

        {/* mobile toggle */}
        <button className="kit-mobile-toggle" onClick={() => setMobileOpen((o) => !o)}
          style={{ display: "none", background: "none", border: 0, cursor: "pointer", padding: 8 }} aria-label="Menu">
          <Icon name={mobileOpen ? "close" : "menu"} size={26} />
        </button>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="kit-mobile-menu" style={{ borderTop: "1px solid var(--color-black-10)", padding: "12px 5% 24px" }}>
          {mobileLinks.map((l) => (
            <Link key={l.label} to={l.to} className="kit-navlink"
              aria-current={isActive(l.to) ? "page" : undefined}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 0" }}
              onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div style={{ marginTop: 12 }}>
            <Button variant="primary" size="sm" full onClick={() => { setMobileOpen(false); onQuote(); }}>Get a quote</Button>
          </div>
        </div>
      )}
    </header>
  );
}
