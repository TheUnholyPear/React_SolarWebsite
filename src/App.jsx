import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import QuoteModal from './components/QuoteModal';
import {
  TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakSlider, TweakText, useTweaks,
} from './components/TweaksPanel';
import { Hero, TrustBar, Features, Benefits, HowItWorks } from './components/SectionsA';
import { CaseStudies, Testimonials, Pricing, Faq, Cta, Contact, Footer } from './components/SectionsB';
import { SolarPVPage, BatteryPage, CommercialPage, CaseStudiesPage, BlogPage } from './components/Pages';
import { scrollToId } from './components/primitives';

const TWEAK_DEFAULTS = {
  accent: "#FFB400",
  buttonFont: "Manrope",
  radius: 6,
  heroOverlay: 55,
  headline: "Solar power for homes and businesses across Oxfordshire",
};

function darken(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.round(r * (1 - amt)); g = Math.round(g * (1 - amt)); b = Math.round(b * (1 - amt));
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

const PAGE_TITLES = {
  '/': 'UK Solar Generation — Solar Panels, Battery Storage & EV Charging',
  '/solar-pv': 'Solar Panels | UK Solar Generation',
  '/battery-storage': 'Battery Storage | UK Solar Generation',
  '/commercial-solar': 'Commercial Solar | UK Solar Generation',
  '/case-studies': 'Case Studies | UK Solar Generation',
  '/blog': 'Blog | UK Solar Generation',
};

function PageTitle() {
  const location = useLocation();
  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] || 'UK Solar Generation';
  }, [location.pathname]);
  return null;
}

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => scrollToId(location.hash.slice(1)), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);
  return null;
}

function ScrollReveal() {
  const location = useLocation();
  useEffect(() => {
    let sectionObs, staggerObs;
    const timers = [];

    const timer = setTimeout(() => {
      // Section-level fade-up
      const sections = document.querySelectorAll('.kit-section');
      sections.forEach((el) => el.classList.add('kit-reveal'));
      sectionObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('kit-revealed');
            sectionObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
      sections.forEach((el) => sectionObs.observe(el));

      // Staggered children
      const staggerContainers = document.querySelectorAll('.kit-stagger');
      staggerContainers.forEach((container) => {
        Array.from(container.children).forEach((child) => child.classList.add('kit-reveal'));
      });
      staggerObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            Array.from(e.target.children).forEach((child, i) => {
              const t = setTimeout(() => child.classList.add('kit-revealed'), i * 110);
              timers.push(t);
            });
            staggerObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      staggerContainers.forEach((el) => staggerObs.observe(el));
    }, 60);

    return () => {
      clearTimeout(timer);
      timers.forEach(clearTimeout);
      if (sectionObs) sectionObs.disconnect();
      if (staggerObs) staggerObs.disconnect();
      document.querySelectorAll('.kit-reveal').forEach((el) => {
        el.classList.remove('kit-reveal', 'kit-revealed');
      });
    };
  }, [location.pathname]);
  return null;
}

function NotFound() {
  return (
    <>
      <main style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 5%" }}>
        <h1 className="h2" style={{ marginBottom: 16 }}>Page not found</h1>
        <p className="text-medium" style={{ marginBottom: 32, color: "var(--color-neutral)" }}>The page you're looking for doesn't exist.</p>
        <a href="/" className="uksg-btn uksg-btn--primary">Back to home</a>
      </main>
    </>
  );
}

function HomePage({ onQuote, headline }) {
  return (
    <>
      <main>
        <Hero onQuote={onQuote} headline={headline} />
        <TrustBar />
        <Features onQuote={onQuote} />
        <Benefits />
        <HowItWorks onQuote={onQuote} />
        <CaseStudies onQuote={onQuote} />
        <Pricing onQuote={onQuote} />
        <Testimonials />
        <Faq onQuote={onQuote} />
        <Cta onQuote={onQuote} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const onQuote = () => setQuoteOpen(true);

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--color-selective-yellow", t.accent);
    root.setProperty("--color-selective-yellow-dark", darken(t.accent, 0.18));
    root.setProperty("--uksg-btn-font", t.buttonFont === "Inter" ? "var(--font-body)" : "var(--font-heading)");
    root.setProperty("--radius-button", t.radius + "px");
    root.setProperty("--radius-card", (Number(t.radius) + 2) + "px");
    root.setProperty("--radius-image", (Number(t.radius) + 2) + "px");
    root.setProperty("--radius-badge", t.radius + "px");
    root.setProperty("--hero-overlay", (t.heroOverlay / 100).toString());
  }, [t.accent, t.buttonFont, t.radius, t.heroOverlay]);

  return (
    <div>
      <Navbar onQuote={onQuote} />
      <PageTitle />
      <ScrollToHash />
      <ScrollReveal />
      <Routes>
        <Route path="/" element={<HomePage onQuote={onQuote} headline={t.headline} />} />
        <Route path="/solar-pv" element={<SolarPVPage onQuote={onQuote} />} />
        <Route path="/battery-storage" element={<BatteryPage onQuote={onQuote} />} />
        <Route path="/commercial-solar" element={<CommercialPage onQuote={onQuote} />} />
        <Route path="/case-studies" element={<CaseStudiesPage onQuote={onQuote} />} />
        <Route path="/blog" element={<BlogPage onQuote={onQuote} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      <TweaksPanel>
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={["#FFB400", "#FF8A3D", "#2A6FDB", "#1F8A5B"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakRadio label="Button font" value={t.buttonFont}
          options={["Manrope", "Inter"]}
          onChange={(v) => setTweak("buttonFont", v)} />
        <TweakSection label="Shape & depth" />
        <TweakSlider label="Corner radius" value={t.radius} min={0} max={16} unit="px"
          onChange={(v) => setTweak("radius", v)} />
        {isHome && <TweakSlider label="Hero overlay" value={t.heroOverlay} min={20} max={80} unit="%"
          onChange={(v) => setTweak("heroOverlay", v)} />}
        {isHome && <TweakSection label="Copy" />}
        {isHome && <TweakText label="Hero headline" value={t.headline}
          onChange={(v) => setTweak("headline", v)} />}
      </TweaksPanel>
    </div>
  );
}
