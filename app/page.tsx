"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

function IconBase({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}
const ArrowRight = (props: { className?: string }) => <IconBase {...props}><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></IconBase>;
const Building2 = (props: { className?: string }) => <IconBase {...props}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></IconBase>;
const CalendarDays = (props: { className?: string }) => <IconBase {...props}><path d="M8 2v4" /><path d="M16 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" /></IconBase>;
const CheckCircle2 = (props: { className?: string }) => <IconBase {...props}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></IconBase>;
const ClipboardCheck = (props: { className?: string }) => <IconBase {...props}><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-5" /></IconBase>;
const DollarSign = (props: { className?: string }) => <IconBase {...props}><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" /></IconBase>;
const Gauge = (props: { className?: string }) => <IconBase {...props}><path d="M12 14l4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></IconBase>;
const LineChart = (props: { className?: string }) => <IconBase {...props}><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></IconBase>;
const Menu = (props: { className?: string }) => <IconBase {...props}><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></IconBase>;
const PackageIcon = (props: { className?: string }) => <IconBase {...props}><path d="m21 8-9-5-9 5 9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></IconBase>;
const Play = (props: { className?: string }) => <IconBase {...props}><path d="m8 5 11 7-11 7V5Z" /></IconBase>;
const ShieldCheck = (props: { className?: string }) => <IconBase {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></IconBase>;
const Sparkles = (props: { className?: string }) => <IconBase {...props}><path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" /><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" /></IconBase>;
const Users = (props: { className?: string }) => <IconBase {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /></IconBase>;
const X = (props: { className?: string }) => <IconBase {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></IconBase>;
const Zap = (props: { className?: string }) => <IconBase {...props}><path d="M13 2 3 14h8l-1 8 11-14h-8l0-6Z" /></IconBase>;
const TrashIcon = (props: { className?: string }) => <IconBase {...props}><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /></IconBase>;
const CartIcon = (props: { className?: string }) => <IconBase {...props}><circle cx="9" cy="20" r="1" /><circle cx="17" cy="20" r="1" /><path d="M3 4h2l2.2 10.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 8H6" /></IconBase>;

const modules = [
  { tag: "Revenue", icon: DollarSign, title: "Sales Command", copy: "Food, beverage, discounts, refunds, comps, and net sales entered by operating day so the P&L starts from clean revenue." },
  { tag: "COGS", icon: CartIcon, title: "Purchase Command", copy: "Invoice capture, vendor spend, category cost, and review status for operators who need control before accounting closes." },
  { tag: "Counts", icon: PackageIcon, title: "Inventory Command", copy: "Mobile count flow, storage areas, category views, low-stock indicators, and order-list readiness for kitchen teams." },
  { tag: "Loss", icon: TrashIcon, title: "Waste Command", copy: "Log spoilage, over-prep, quality issues, and estimated cost so waste becomes a margin-management signal." },
  { tag: "People", icon: Users, title: "Labor Command", copy: "Worked days grouped by employee, location, hours, role, and payroll readiness without duplicated summary rows." },
  { tag: "Payroll", icon: ClipboardCheck, title: "Payroll Review", copy: "Review employee labor, selected date ranges, and unsubmitted items before locking a payroll package." },
  { tag: "P&L", icon: LineChart, title: "Live P&L", copy: "Sales, purchases, labor, waste, and operating entries roll into a real-time view of prime cost, margin, and net profit." },
  { tag: "AI", icon: Sparkles, title: "AI owner briefs", copy: "Manager and owner readouts summarize margin pressure, wins, risks, and recommended actions from visible operating cards." },
];

const pricing = [
  { title: "Operator", price: "Coming soon", copy: "For single-location restaurants preparing for structured daily operating control.", features: ["Sales, purchasing, waste, inventory, and labor modules", "Live P&L dashboard", "AI manager and owner briefs", "Inquiry and onboarding workflow"] },
  { title: "Restaurant Group", price: "Coming soon", copy: "For multi-location groups that need location comparison and clean close workflows.", features: ["All Operator modules", "All-location performance views", "Payroll review workspace", "Role-based operating process"] },
  { title: "Launching Soon", price: "Coming soon", copy: "For larger food service teams that need deeper integrations and implementation support.", features: ["POS, accounting, payroll, and vendor connection planning", "Custom operating day setup", "Multi-concept reporting", "Implementation roadmap"] },
];

function Logo() {
  return (
    <a href="#top" className="logoLink" aria-label="InHouseOS home">
      <img src="/logo.png" className="logoImage" alt="InHouseOS logo" />
      <span className="logoText"><span className="logoWord">InHouseOS</span><span className="logoSub">Restaurant back office OS</span></span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Platform", "#platform", ""],
    ["Modules", "#modules", "modulesButton"],
    ["AI Briefs", "#ai", ""],
    ["Pricing", "#pricing", ""],
    ["Contact", "#contact", ""],
    ["Admin", "/admin", ""],
  ];
  return (
    <header className="header">
      <div className="container headerInner">
        <Logo />
        <nav className="nav" aria-label="Primary navigation">
          {links.map(([label, href, className]) => <a key={label} href={href} className={`navLink ${className}`}>{label}</a>)}
        </nav>
        <div className="headerActions">
          <a href="#contact" className="btn btnPrimary btnTiny">Request access</a>
          <button className="btn btnTiny mobileToggle" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <X className="icon" /> : <Menu className="icon" />}
          </button>
        </div>
      </div>
      {open && <div className="container mobileMenu">{links.map(([label, href, className]) => <a key={label} href={href} onClick={() => setOpen(false)} className={`navLink ${className}`}>{label}</a>)}</div>}
    </header>
  );
}

function HeroMock() {
  return (
    <div className="browserStage" aria-label="Animated InHouseOS app preview">
      <motion.div className="appMock" initial={{ opacity: 0, y: 50, rotateX: 10 }} animate={{ opacity: 1, y: 0, rotateX: 7 }} transition={{ duration: 0.8 }}>
        <div className="appTop"><div className="dots"><span className="dot" /><span className="dot" /><span className="dot" /></div><span className="miniPill green">Live command center</span></div>
        <div className="appBody">
          <aside className="sideRail">
            <div className="sideCard"><div className="sideTitle">InHouseOS</div><div className="sideSmall">Ember Row Hospitality</div></div>
            {['Command Center','Live P&L','Sales','Purchases','Inventory','Waste','Labor'].map((item, index) => <div key={item} className={`sideItem ${index === 1 ? 'active' : ''}`}><LineChart className="icon" />{item}</div>)}
          </aside>
          <main className="screen">
            <section className="commandHero">
              <div>
                <div className="miniPillRow"><span className="miniPill green">Realtime P&L</span><span className="miniPill">All locations</span><span className="miniPill">Month to date</span></div>
                <h2>Margin leaks visible before close.</h2>
                <p>Sales, purchasing, inventory, waste, vendors, labor, and expenses connected in one operating view.</p>
              </div>
              <div className="pulseCard"><div className="pulseLabel">Today&apos;s close</div><div className="pulseMetric">63.3%</div><div className="progress"><span /></div><p className="floatCopy">Prime cost pressure detected across prep, vendor spend, and scheduling.</p></div>
            </section>
            <div className="metricGrid">
              <div className="metricCard"><div className="metricLabel">Net Sales</div><div className="metricValue">$128,450</div></div>
              <div className="metricCard"><div className="metricLabel">Prime Cost</div><div className="metricValue">63.3%</div></div>
              <div className="metricCard"><div className="metricLabel">Est. Net Profit</div><div className="metricValue">$44,486</div></div>
              <div className="metricCard"><div className="metricLabel">Margin Impact</div><div className="metricValue">-$2,680</div></div>
            </div>
            <div className="workflow">
              {['Vendors','Purchases','Inventory','Waste','Live P&L'].map((item, index) => <div key={item} className={`workflowStep ${index === 4 ? 'active' : ''}`}><span>{index + 1}</span><strong>{item}</strong><span>Operating workflow</span></div>)}
            </div>
          </main>
        </div>
      </motion.div>
      <motion.div className="floatCard floatSales" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
        <div className="floatCardTop"><span>Sales card</span><DollarSign className="icon" /></div><div className="floatNumber">$77,120</div><div className="floatCopy">Daily sales by category, location, and operating date.</div>
      </motion.div>
      <motion.div className="floatCard floatLabor" initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.58 }}>
        <div className="floatCardTop"><span>Labor card</span><Users className="icon" /></div><div className="floatNumber">735 hrs</div><div className="floatCopy">Worked days grouped for cleaner payroll review.</div>
      </motion.div>
      <motion.div className="floatCard floatAi" initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }}>
        <div className="floatCardTop"><span>AI owner brief</span><Sparkles className="icon" /></div><div className="floatNumber">4 actions</div><div className="floatCopy">Wins, risks, and next steps from the visible P&L cards.</div>
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container heroGrid">
        <motion.div className="heroCopy" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="eyebrow"><span className="eyebrowDot" />Restaurant back office OS</div>
          <h1>Operate food service margins <span className="gradientText">before month-end.</span></h1>
          <p className="heroLead">InHouseOS turns sales, purchasing, inventory, waste, labor, payroll review, vendors, and AI briefs into one command center for restaurants and food service companies.</p>
          <div className="heroCtas"><a href="#contact" className="btn btnPrimary">Request early access <ArrowRight className="icon" /></a><a href="#platform" className="btn"><Play className="icon" /> View platform flow</a></div>
          <div className="trustLine"><span className="trustPill">Built for operators</span><span className="trustPill">Designed for managers</span><span className="trustPill">Readable for owners</span></div>
        </motion.div>
        <HeroMock />
      </div>
    </section>
  );
}

function Platform() {
  return (
    <section id="platform" className="section">
      <div className="container">
        <div className="headingGrid"><div><div className="eyebrow"><span className="eyebrowDot" />Operating layer</div><h2 className="sectionTitle">A daily workflow that becomes the P&L.</h2></div><p className="sectionCopy">Most restaurant software records one slice of the operation. InHouseOS is built around the back office workflow itself: what managers enter, what owners need to know, and what finance needs clean before close.</p></div>
        <div className="showcase">
          <div className="showcaseGrid">
            <div className="panel">
              <div className="panelHeader"><div className="panelTitle">All-location performance</div><span className="miniPill">Week to date</span></div>
              <div className="tableWrap"><table className="table"><thead><tr><th>Location</th><th>Net Sales</th><th>Food Cost</th><th>Labor</th><th>Prime</th><th>Margin</th></tr></thead><tbody>
                {[['Cedar Hall','$50,000','30%','24%','54%','4%'],['Bluebird Market','$64,000','31%','25%','56%','5%'],['Northline Commissary','$78,000','32%','26%','58%','6%']].map((row) => <tr key={row[0]}>{row.map((cell, i) => <td key={cell} className={i > 3 ? (i === 4 ? 'warn' : 'good') : ''}>{cell}</td>)}</tr>)}
              </tbody></table></div>
            </div>
            <div className="aiBrief"><div className="eyebrow"><span className="eyebrowDot" />AI Manager & Owner Brief</div><h3>Live P&L owner readout</h3><p>Estimated net profit is holding, but prime cost is above target. The largest current pressure is vendor spend variance combined with labor pacing at two locations.</p><ul><li>Investigate produce and protein categories.</li><li>Review schedule pacing before the weekend.</li><li>Confirm waste logs are complete before close.</li></ul><a href="#ai" className="btn btnPrimary">Explore AI briefs</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section id="modules" className="section">
      <div className="container">
        <div className="headingGrid"><div><div className="eyebrow"><span className="eyebrowDot" />Modules</div><h2 className="sectionTitle">Every back office card has a job.</h2></div><p className="sectionCopy">Cards sit flat in the workflow until an operator needs them. Hover a module to see the interaction lift forward.</p></div>
        <div className="modulesGrid">{modules.map(({ tag, icon: Icon, title, copy }) => <article key={title} className="popCard"><span className="popTag">{tag}</span><span className="popIcon"><Icon className="iconLg" /></span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div>
    </section>
  );
}

function AISection() {
  const aiFeatures = [
    { icon: Sparkles, title: "Manager and owner briefs", copy: "Generate plain-English readouts for store managers and ownership that summarize margin pressure, wins, risks, and recommended actions." },
    { icon: Gauge, title: "Exception-first summaries", copy: "Surface what needs attention instead of making leaders hunt through every table, ledger, and location card." },
    { icon: ShieldCheck, title: "Read-only by design", copy: "AI briefs explain visible operating data. They do not submit payroll, overwrite ledgers, or change financial records." },
  ];
  return (
    <section id="ai" className="section">
      <div className="container aiGrid">
        <div><div className="eyebrow"><span className="eyebrowDot" />AI layer</div><h2 className="sectionTitle">Brief the manager. Brief the owner. Protect the record.</h2><p className="sectionCopy">InHouseOS AI is designed to help managers and owners understand what is happening inside the business while there is still time to correct the period.</p></div>
        <div className="aiCards">{aiFeatures.map(({ icon: Icon, title, copy }) => <div className="aiFeature" key={title}><span className="popIcon"><Icon className="icon" /></span><div><strong>{title}</strong><span>{copy}</span></div></div>)}</div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="headingGrid"><div><div className="eyebrow"><span className="eyebrowDot" />Pricing</div><h2 className="sectionTitle">Launching soon.</h2></div><p className="sectionCopy">Pricing is intentionally held until launch readiness. Use the inquiry form to join the early-access pipeline and define the implementation scope.</p></div>
        <div className="pricingGrid">{pricing.map((plan, index) => <article key={plan.title} className={`priceCard ${index === 1 ? 'featured' : ''}`}><h3>{plan.title}</h3><p className="priceSub">{plan.copy}</p><div className="price">{plan.price}</div><a href="#contact" className={`btn ${index === 1 ? 'btnPrimary' : ''}`}>Request access</a><ul className="featureList">{plan.features.map((item) => <li key={item}><CheckCircle2 className="icon" />{item}</li>)}</ul></article>)}</div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Sending inquiry...");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) { setStatus(body.error || "Unable to send inquiry."); return; }
    form.reset();
    setStatus("Inquiry received. The CRM has captured it for follow-up.");
  }
  return (
    <section id="contact" className="section">
      <div className="container contactGrid">
        <div><div className="eyebrow"><span className="eyebrowDot" />Early access</div><h2 className="sectionTitle">Start the conversation.</h2><p className="sectionCopy">Tell us what kind of restaurant or food service operation you run. The CRM behind this form is ready for Supabase once you connect credentials.</p></div>
        <form className="panel form" onSubmit={submit}>
          <div className="fieldGrid"><label>Company<input className="input" name="company" required placeholder="Maple & Marrow Group" /></label><label>Contact<input className="input" name="contact" required placeholder="Jordan Vale" /></label></div>
          <div className="fieldGrid"><label>Email<input className="input" type="email" name="email" required placeholder="jordan@example.com" /></label><label>Phone<input className="input" name="phone" placeholder="(555) 017-2481" /></label></div>
          <div className="fieldGrid"><label>Locations<input className="input" name="locations" placeholder="4" /></label><label>Segment<select className="select" name="segment"><option>Restaurant group</option><option>Independent restaurant</option><option>Food service company</option><option>Catering / commissary</option><option>Other hospitality operator</option></select></label></div>
          <label>What should InHouseOS help with?<textarea className="textarea" name="message" required placeholder="We need better visibility into purchasing, labor, waste, and P&L before month-end." /></label>
          <button className="btn btnPrimary" type="submit">Submit inquiry <ArrowRight className="icon" /></button>
          <div className="formStatus" role="status">{status}</div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="footer"><div className="container footerInner"><Logo /><div className="footerLinks"><a href="#modules">Modules</a><a href="#ai">AI Briefs</a><a href="#pricing">Pricing</a><a href="/admin">Admin</a></div></div></footer>;
}

export default function HomePage() {
  return (
    <main className="siteShell">
      <div className="noise" /><div className="orb orbOne" /><div className="orb orbTwo" /><div className="orb orbThree" />
      <Header />
      <Hero />
      <Platform />
      <Modules />
      <AISection />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
