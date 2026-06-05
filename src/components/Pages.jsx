import { Link } from 'react-router-dom';
import { Icon, Button, Badge, Card } from './primitives';
import { HowItWorks, Benefits, TrustBar } from './SectionsA';
import { CaseStudies, Testimonials, Pricing, Faq, Cta, Footer } from './SectionsB';

export function PageHeader({ eyebrow, title, body, onQuote, secondary = "Book a survey", crumb, img }) {
  return (
    <section className="scheme-6" style={{
      padding: "0 5%",
      ...(img && {
        backgroundImage: `linear-gradient(rgba(0,0,0,.62), rgba(0,0,0,.62)), url(/assets/images/${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      })
    }}>
      <div className="kit-container">
        <div style={{ maxWidth: 820, padding: "112px 0 96px" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: 24, fontSize: "var(--text-small)", display: "flex", alignItems: "center", gap: 8 }}>
            <Link to="/" style={{ color: "rgba(255,255,255,.6)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,.4)" }}>/</span>
            <span style={{ color: "#fff" }}>{crumb || title}</span>
          </nav>
          {eyebrow && <p className="kit-eyebrow text-regular" style={{ color: "var(--color-selective-yellow)" }}>{eyebrow}</p>}
          <h1 className="h1" style={{ marginBottom: 24 }}>{title}</h1>
          <p className="text-medium" style={{ maxWidth: 640 }}>{body}</p>
          <div style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Button variant="primary" onClick={onQuote}>Get a free quote</Button>
            <Button variant="secondary-alt" onClick={onQuote}>{secondary}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeatureSplit({ eyebrow, title, body, bullets, img, reverse, scheme = "scheme-3" }) {
  return (
    <section className={"kit-section " + scheme}>
      <div className="kit-container kit-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div style={{ order: reverse ? 2 : 1 }}>
          {eyebrow && <p className="kit-eyebrow text-regular">{eyebrow}</p>}
          <h2 className="h3" style={{ marginBottom: 20 }}>{title}</h2>
          <p className="text-medium">{body}</p>
          {bullets && (
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              {bullets.map((b) => (
                <div key={b} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <Icon name="check" size={22} style={{ flex: "none" }} /><span className="text-regular">{b}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <img className="kit-img" src={"/assets/images/" + img} alt="" style={{ height: 460, order: reverse ? 1 : 2 }} />
      </div>
    </section>
  );
}

export function Stats({ scheme = "scheme-5", items }) {
  return (
    <section className={"kit-section " + scheme}>
      <div className="kit-container kit-3col" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
        {items.map((s) => (
          <div key={s.label}>
            <div className="h1" style={{ fontSize: "var(--text-h2)", color: "var(--color-selective-yellow)" }}>{s.value}</div>
            <p className="text-medium" style={{ marginTop: 8 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SolarPVPage({ onQuote }) {
  return (
    <>
      <PageHeader eyebrow="Solar panels · Residential" crumb="Solar panels"
        title="Solar panels for your home"
        body="Generate your own clean electricity and cut your bills from day one. We design and install bespoke rooftop solar systems across Oxfordshire and beyond, handling everything from survey to switch-on."
        onQuote={onQuote} img="features-0.jpg" />
      <HowItWorks onQuote={onQuote} />
      <Benefits />
      <FeatureSplit eyebrow="How it works"
        title="Daylight in, savings out"
        body="Your panels convert daylight into electricity that powers your home first; any surplus charges a battery or earns you money through the Smart Export Guarantee."
        bullets={["Works on cloudy days, not just sunshine", "Silent, with no moving parts", "25-year panel performance warranty"]}
        img="features-0.jpg" reverse />
      <Pricing onQuote={onQuote} eyebrow="Investment" title="Typical system costs"
        subtitle="Most homes invest between £5,000 and £11,000, with finance options available."
        tiers={[
          { name: "3.5kW system", sub: "Smaller homes & flats", price: "£5,200", feats: ["8–9 panels", "Ideal for 1–2 bedrooms", "MCS-certified install"] },
          { name: "5kW system", sub: "Most popular choice", price: "£7,800", feats: ["12–13 panels", "Ideal for family homes", "Battery-ready inverter", "Smart monitoring app"] },
          { name: "6.5kW system", sub: "Larger homes", price: "£10,500", feats: ["16+ panels", "Maximum generation", "Battery storage included", "Finance from £99/mo"] },
        ]} />
      <Cta onQuote={onQuote} />
      <Footer />
    </>
  );
}

export function BatteryPage({ onQuote }) {
  return (
    <>
      <PageHeader eyebrow="Battery storage" crumb="Battery storage"
        title="Maximise your solar savings & energy independence"
        body="Store the surplus energy your panels make and use it when you need it — after dark, during peak rates, or when the grid goes down. Boost self-consumption, gain backup power, and stay flexible."
        onQuote={onQuote} img="battery-install.jpg" />
      <FeatureSplit eyebrow="Self-consumption"
        title="Use your own power, day and night"
        body="Batteries store surplus solar energy so you draw less from the grid when the sun goes down. Most households lift self-consumption from around 30% to over 70%."
        bullets={["Cut peak-rate grid imports", "Charge cheaply on off-peak tariffs", "See it all in the monitoring app"]}
        img="powerwall-full.jpg" />
      <FeatureSplit eyebrow="Backup power"
        title="Keep the lights on through outages"
        body="With backup-ready batteries your home keeps running during a power cut — fridge, router, and essentials stay on automatically."
        img="benefits-2.jpg" reverse scheme="scheme-1" />
      <FeatureSplit eyebrow="Flexible options"
        title="Scalable systems that grow with you"
        body="From compact 5kWh units to whole-home 15kWh+ setups, we fit leading battery brands and retrofit to existing solar arrays."
        bullets={["Retrofit or new-install compatible", "Expandable capacity", "Leading LiFePO4 chemistry"]}
        img="visual-graphic.jpg" />
      <Testimonials />
      <Pricing onQuote={onQuote} />
      <Cta onQuote={onQuote} />
      <Faq onQuote={onQuote} />
      <Footer />
    </>
  );
}

export function CommercialPage({ onQuote }) {
  return (
    <>
      <PageHeader eyebrow="Commercial solar" crumb="Commercial solar"
        title="Solar power for your business"
        body="A trusted local partner for commercial solar since 2010. We help schools, hospitality, agriculture and offices cut overheads, hit sustainability targets, and improve EPC ratings."
        onQuote={onQuote} secondary="Book a site survey" img="hotel-install.jpg" />
      <FeatureSplit eyebrow="Sectors we serve"
        title="Tailored systems for every site"
        body="From classroom roofs to warehouse acreage, we design commercial arrays matched to your load profile and tariffs."
        bullets={["Schools & education", "Hospitality & retail", "Agriculture & industrial", "Offices & workspaces"]}
        img="features-2.jpg" reverse />
      <Benefits />
      <HowItWorks onQuote={onQuote} />
      <Pricing onQuote={onQuote} eyebrow="Investment" title="Commercial project guidance"
        subtitle="Indicative pricing — every commercial project is quoted after a free site survey."
        tiers={[
          { name: "30kW system", sub: "Small business", price: "from £28k", feats: ["~75 panels", "Offsets daytime load", "Typical 5–7yr payback"] },
          { name: "100kW system", sub: "Mid-size site", price: "from £85k", feats: ["~250 panels", "Half-hourly tariff savings", "Optional battery", "Finance & PPA options"] },
          { name: "250kW+ system", sub: "Industrial / estate", price: "Bespoke", feats: ["Ground or roof mount", "Export & grid services", "Full monitoring", "Dedicated account manager"] },
        ]} />
      <Cta onQuote={onQuote} />
      <TrustBar />
      <Testimonials />
      <Footer />
    </>
  );
}

export function CaseStudiesPage({ onQuote }) {
  return (
    <>
      <PageHeader eyebrow="Case studies" crumb="Case studies"
        title="Real systems, real savings"
        body="Over 1,500 installations across Oxfordshire and the surrounding counties. Browse projects by type and see the system sizes, savings, and outcomes for real customers."
        onQuote={onQuote} secondary="Start your project" />
      <CaseStudies onQuote={onQuote} />
      <Stats items={[
        { value: "1,500+", label: "Systems installed" },
        { value: "£480", label: "Average annual saving" },
        { value: "15 yrs", label: "In business since 2010" },
        { value: "4 sectors", label: "Residential to industrial" },
      ]} />
      <Cta onQuote={onQuote} />
      <Testimonials />
      <Footer />
    </>
  );
}

function ArticleCard({ img, cat, title, excerpt, date, read }) {
  return (
    <a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <Card>
        <img className="kit-img" src={"/assets/images/" + img} alt="" style={{ aspectRatio: "16 / 10", borderRadius: 0 }} />
        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
            <Badge>{cat}</Badge>
            <span className="text-small" style={{ color: "var(--color-neutral)" }}>{read}</span>
          </div>
          <h3 className="h5" style={{ marginBottom: 10 }}>{title}</h3>
          <p className="text-regular" style={{ color: "var(--color-neutral)" }}>{excerpt}</p>
          <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="text-small" style={{ color: "var(--color-neutral)" }}>{date}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-heading)", fontWeight: 600 }}>Read article <Icon name="chevron_right" size={18} /></span>
          </div>
        </div>
      </Card>
    </a>
  );
}

export function BlogPage({ onQuote }) {
  const posts = [
    { img: "benefits-0.jpg", cat: "Guides", read: "6 min read", date: "28 May 2026", title: "Is solar worth it in the UK in 2026?", excerpt: "We crunch the numbers on payback, SEG rates and rising energy prices for a typical Oxfordshire home." },
    { img: "case-study-2.jpg", cat: "Savings", read: "4 min read", date: "14 May 2026", title: "SEG explained: getting paid to export solar", excerpt: "How the Smart Export Guarantee works, and how to pick the best-paying tariff for your exports." },
    { img: "features-1.jpg", cat: "Battery", read: "5 min read", date: "2 May 2026", title: "Solar batteries: do you really need one?", excerpt: "When a battery pays for itself, and when you're genuinely better off without one." },
    { img: "features-2.jpg", cat: "Guides", read: "3 min read", date: "21 Apr 2026", title: "How cold weather affects panel output", excerpt: "Why your panels can actually perform better on a crisp, bright winter day than a hot summer one." },
    { img: "benefits-2.jpg", cat: "Guides", read: "4 min read", date: "9 Apr 2026", title: "5 signs your roof is right for solar", excerpt: "Orientation, pitch, shading and more — a quick checklist before you book a free survey." },
    { img: "case-study-1.jpg", cat: "Commercial", read: "7 min read", date: "27 Mar 2026", title: "How an Oxford school cut energy bills 40%", excerpt: "Inside a 15kW commercial install that's powering classrooms and lowering overheads." },
  ];
  return (
    <>
      <PageHeader eyebrow="Blog" crumb="Blog"
        title="Solar news & guides"
        body="Practical advice on saving money with solar, battery storage and EV charging — written by our Oxfordshire install team."
        onQuote={onQuote} secondary="Get a free survey" />
      <section className="kit-section scheme-3">
        <div className="kit-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }} className="kit-3col">
            {posts.map((p) => <ArticleCard key={p.title} {...p} />)}
          </div>
        </div>
      </section>
      <Cta onQuote={onQuote} />
      <Footer />
    </>
  );
}
