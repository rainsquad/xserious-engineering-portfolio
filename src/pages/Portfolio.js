import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';
import { getProjects, categories } from '../data/projects';

/* ── HERO ────────────────────────────────────────────────── */
const Hero = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 100);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero">
      <div className="hero__grid-bg" />
      <div className="hero__scan-line" />

      <div className="container hero__inner">
        <div className="hero__eyebrow">
          <span className="hero__status-dot" />
          <span className="hero__eyebrow-text">XSERIOUS ENGINEERING WORKS · EST. GAMPAHA, SRI LANKA</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line1">ENGINEERING</span>
          <span className="hero__title-line2">
            <span className="hero__title-accent">EXCELLENCE</span>
          </span>
          <span className="hero__title-line3">SINCE DAY ONE</span>
        </h1>

        <p className="hero__desc">
          Specialist generator repair, vehicle engineering, and industrial electrical works.<br />
          Serving Gampaha &amp; Colombo with qualified technicians at the highest standard.
        </p>

        <div className="hero__cta">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-outline">Get a Quote</a>
        </div>

        <div className="hero__stats">
          {[
            { val: '10+', label: 'Years Experience' },
            { val: '500+', label: 'Projects Completed' },
            { val: '100kVa+', label: 'Max Generator Capacity' },
            { val: '24/7', label: 'Emergency Service' },
          ].map(s => (
            <div key={s.label} className="hero__stat">
              <div className="hero__stat-val">{s.val}</div>
              <div className="hero__stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__scroll-hint">
        <div className="hero__scroll-line" />
        <span>SCROLL</span>
      </div>

      <style>{`
        .hero {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: 70px;
        }
        .hero__grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(240,165,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240,165,0,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent);
        }
        .hero__scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(240,165,0,0.3), transparent);
          animation: scan 6s linear infinite;
          pointer-events: none;
        }
        .hero__inner {
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding-top: 60px;
          padding-bottom: 60px;
          position: relative;
          z-index: 2;
        }
        .hero__eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          animation: fadeUp 0.6s ease both;
        }
        .hero__status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
          animation: pulse 2s ease infinite;
        }
        .hero__eyebrow-text {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-dim);
          letter-spacing: 0.15em;
        }
        .hero__title {
          display: flex;
          flex-direction: column;
          gap: 0;
          animation: fadeUp 0.7s 0.1s ease both;
        }
        .hero__title-line1,
        .hero__title-line3 {
          font-family: var(--font-display);
          font-size: clamp(56px, 9vw, 120px);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 0.9;
          color: var(--text);
          text-transform: uppercase;
        }
        .hero__title-line2 {
          font-family: var(--font-display);
          font-size: clamp(56px, 9vw, 120px);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 0.9;
        }
        .hero__title-accent {
          color: transparent;
          -webkit-text-stroke: 2px var(--accent);
          text-stroke: 2px var(--accent);
          text-shadow: 0 0 40px rgba(240,165,0,0.2);
        }
        .hero__desc {
          font-size: 16px;
          color: var(--text-muted);
          max-width: 600px;
          line-height: 1.7;
          animation: fadeUp 0.7s 0.2s ease both;
        }
        .hero__cta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          animation: fadeUp 0.7s 0.3s ease both;
        }
        .hero__stats {
          display: grid;
          grid-template-columns: repeat(4, auto);
          gap: 32px;
          margin-top: 16px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
          width: fit-content;
          animation: fadeUp 0.7s 0.4s ease both;
        }
        .hero__stat-val {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 900;
          color: var(--accent);
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .hero__stat-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-top: 4px;
        }
        .hero__scroll-hint {
          position: absolute;
          bottom: 32px;
          right: 40px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-dim);
          letter-spacing: 0.2em;
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .hero__scroll-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, transparent, var(--border-accent));
        }
        @media (max-width: 768px) {
          .hero__stats { grid-template-columns: repeat(2, auto); gap: 20px; }
          .hero__scroll-hint { display: none; }
        }
      `}</style>
    </section>
  );
};

/* ── SERVICES ────────────────────────────────────────────── */
const services = [
  {
    icon: '⚡',
    title: 'Generator Works',
    desc: 'Repair, service, maintenance, parts replacement, and installation of all kinds of new & used generators across Sri Lanka.',
    items: ['Generator Repair', 'Annual Service', 'Load Testing', 'Parts Supply', 'Commissioning'],
  },
  {
    icon: '🔧',
    title: 'Vehicle Engineering',
    desc: 'Complete vehicle engineering solutions from engine overhauling to electronic diagnostics and full body restoration.',
    items: ['Engine Overhauling', 'ECU & EPS Repair', 'Cluster Repair', 'Full Restoration', 'Body & Paint'],
  },
  {
    icon: '🔌',
    title: 'Electrical & Electronic',
    desc: 'PCB recovery, wiring repairs, electronic module diagnostics, and all types of automotive and industrial electrical works.',
    items: ['PCB Recovery', 'Wiring Repair', 'Module Diagnostics', 'Sensor Repair', 'Switch Repair'],
  },
  {
    icon: '📊',
    title: 'Meter Panel Repair',
    desc: 'Specialist repair and servicing of industrial and commercial meter panels, control panels, and distribution boards.',
    items: ['Panel Repair', 'Control Boards', 'Distribution Boards', 'Rewiring', 'Testing & Certification'],
  },
  {
    icon: '⚙️',
    title: 'Mechanical Works',
    desc: 'Industrial mechanical services including compressor overhauling, shaft modification, carburettor restoration, and more.',
    items: ['Compressor Overhaul', 'Shaft Modification', 'Carburettor Restore', 'Fuel System', 'Machining'],
  },
  {
    icon: '🔩',
    title: 'Restoration Works',
    desc: 'Full vehicle and generator restoration services bringing equipment back to factory standard or better.',
    items: ['Generator Restore', 'Vehicle Restore', 'Tinkering & Paint', 'Chrome & Polish', 'Full Rebuild'],
  },
];

const Services = () => (
  <section className="services" id="services">
    <div className="container">
      <div className="section-header">
        <span className="section-eyebrow">// WHAT WE DO</span>
        <h2 className="section-title">Our Services</h2>
        <p className="section-sub">End-to-end engineering solutions for generators, vehicles, and industrial equipment.</p>
      </div>

      <div className="services__grid">
        {services.map((s, i) => (
          <div key={s.title} className="service-card" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="service-card__icon">{s.icon}</div>
            <h3 className="service-card__title">{s.title}</h3>
            <p className="service-card__desc">{s.desc}</p>
            <ul className="service-card__items">
              {s.items.map(item => (
                <li key={item}>
                  <span className="service-card__bullet">▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      .services { padding: 100px 0; }
      .section-header { text-align: center; margin-bottom: 64px; }
      .section-eyebrow {
        font-family: var(--font-mono);
        font-size: 12px;
        color: var(--accent);
        letter-spacing: 0.2em;
        display: block;
        margin-bottom: 12px;
      }
      .section-title {
        font-family: var(--font-display);
        font-size: clamp(36px, 5vw, 56px);
        font-weight: 900;
        letter-spacing: -0.02em;
        color: var(--text);
        text-transform: uppercase;
        line-height: 1;
        margin-bottom: 16px;
      }
      .section-sub {
        font-size: 15px;
        color: var(--text-muted);
        max-width: 500px;
        margin: 0 auto;
      }
      .services__grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        background: var(--border);
        border: 1px solid var(--border);
        border-radius: 4px;
        overflow: hidden;
      }
      .service-card {
        background: var(--bg-panel);
        padding: 32px;
        transition: background 0.2s;
        animation: fadeUp 0.5s ease both;
      }
      .service-card:hover { background: var(--bg-card-hover); }
      .service-card__icon { font-size: 32px; margin-bottom: 16px; }
      .service-card__title {
        font-family: var(--font-display);
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text);
        margin-bottom: 10px;
      }
      .service-card__desc {
        font-size: 13px;
        color: var(--text-muted);
        line-height: 1.6;
        margin-bottom: 16px;
      }
      .service-card__items {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .service-card__items li {
        font-size: 12px;
        color: var(--text-dim);
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-mono);
      }
      .service-card__bullet { color: var(--accent); font-size: 10px; }
      @media (max-width: 1024px) { .services__grid { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 640px) { .services__grid { grid-template-columns: 1fr; } }
    `}</style>
  </section>
);

/* ── PROJECTS ────────────────────────────────────────────── */
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">// OUR WORK</span>
          <h2 className="section-title">Project Catalog</h2>
          <p className="section-sub">Real work, real results. Browse our completed engineering projects.</p>
        </div>

        <div className="projects__filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`projects__filter-btn${activeCategory === cat.id ? ' projects__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
              <span className="projects__filter-count">
                {cat.id === 'all' ? projects.length : projects.filter(p => p.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="projects__empty">
            <div className="projects__empty-icon">📂</div>
            <p>No projects in this category yet.</p>
          </div>
        ) : (
          <div className="projects__grid">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .projects { padding: 100px 0; }
        .projects__filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 40px;
        }
        .projects__filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 2px;
          transition: all 0.2s;
        }
        .projects__filter-btn:hover {
          color: var(--text);
          border-color: var(--border-accent);
        }
        .projects__filter-btn--active {
          color: var(--accent);
          border-color: var(--accent);
          background: var(--accent-glow);
        }
        .projects__filter-count {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-dim);
          background: var(--bg-card);
          padding: 1px 6px;
          border-radius: 10px;
        }
        .projects__filter-btn--active .projects__filter-count { color: var(--accent); }
        .projects__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .projects__empty {
          text-align: center;
          padding: 80px 0;
          color: var(--text-dim);
        }
        .projects__empty-icon { font-size: 48px; margin-bottom: 16px; }
        @media (max-width: 1024px) { .projects__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .projects__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

/* ── ABOUT ───────────────────────────────────────────────── */
const About = () => (
  <section className="about" id="about">
    <div className="container about__inner">
      <div className="about__content">
        <span className="section-eyebrow">// ABOUT US</span>
        <h2 className="section-title" style={{ textAlign: 'left' }}>Who We Are</h2>
        <p className="about__text">
          Xserious Engineering Works is a specialist generator repair service based in Gampaha and Colombo. We provide all kinds of new &amp; used generator repairs, generator services, generator maintenance works, generator parts replacement and generator installation works across Sri Lanka.
        </p>
        <p className="about__text">
          Our generator repair service is staffed by qualified and well-experienced technicians who perform their duty at the highest standard. With several years in the generator repair sector in Sri Lanka, we have built a reputation for reliability, precision, and excellence.
        </p>
        <div className="about__badges">
          {['Gampaha', 'Colombo', 'Island-Wide Service', 'Emergency Available'].map(b => (
            <span key={b} className="about__badge">{b}</span>
          ))}
        </div>
      </div>

      <div className="about__panel">
        <div className="about__panel-header">
          <span className="about__panel-title">CAPABILITIES</span>
          <span className="about__panel-mono">v2.0.0</span>
        </div>
        {[
          { label: 'Generator Repair', pct: 98 },
          { label: 'Vehicle Engineering', pct: 95 },
          { label: 'Electronic Diagnostics', pct: 90 },
          { label: 'Mechanical Works', pct: 92 },
          { label: 'Panel Repair', pct: 88 },
          { label: 'Restoration Works', pct: 85 },
        ].map(({ label, pct }) => (
          <div key={label} className="about__skill">
            <div className="about__skill-top">
              <span className="about__skill-label">{label}</span>
              <span className="about__skill-pct">{pct}%</span>
            </div>
            <div className="about__skill-bar">
              <div className="about__skill-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      .about { padding: 100px 0; }
      .about__inner {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 64px;
        align-items: start;
      }
      .about__text {
        font-size: 15px;
        color: var(--text-muted);
        line-height: 1.8;
        margin-bottom: 16px;
      }
      .about__badges {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 24px;
      }
      .about__badge {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--accent);
        padding: 4px 12px;
        border: 1px solid rgba(240,165,0,0.3);
        border-radius: 2px;
        background: var(--accent-glow);
        letter-spacing: 0.08em;
      }
      .about__panel {
        background: var(--bg-panel);
        border: 1px solid var(--border);
        border-radius: 4px;
        padding: 28px;
        position: sticky;
        top: 90px;
      }
      .about__panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--border);
      }
      .about__panel-title {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.15em;
        color: var(--text-dim);
      }
      .about__panel-mono {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--accent);
      }
      .about__skill { margin-bottom: 18px; }
      .about__skill-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
      }
      .about__skill-label {
        font-family: var(--font-display);
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--text-muted);
      }
      .about__skill-pct {
        font-family: var(--font-mono);
        font-size: 12px;
        color: var(--accent);
      }
      .about__skill-bar {
        height: 3px;
        background: var(--border);
        border-radius: 2px;
        overflow: hidden;
      }
      .about__skill-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--accent-dim), var(--accent));
        border-radius: 2px;
      }
      @media (max-width: 768px) {
        .about__inner { grid-template-columns: 1fr; gap: 40px; }
        .about__panel { position: static; }
      }
    `}</style>
  </section>
);

/* ── CONTACT ─────────────────────────────────────────────── */
const Contact = () => (
  <section className="contact" id="contact">
    <div className="container contact__inner">
      <div className="contact__left">
        <span className="section-eyebrow">// GET IN TOUCH</span>
        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '16px' }}>Ready to Start<br />Your Project?</h2>
        <p className="contact__sub">Contact us via WhatsApp for the fastest response. We're available for emergencies.</p>

        <div className="contact__cards">
          <a href="https://wa.me/94XXXXXXXXX" className="contact__card contact__card--wa" target="_blank" rel="noopener noreferrer">
            <span className="contact__card-icon">📱</span>
            <div>
              <div className="contact__card-label">WHATSAPP</div>
              <div className="contact__card-val">+94 XXX XXX XXX</div>
            </div>
          </a>
          <div className="contact__card">
            <span className="contact__card-icon">📍</span>
            <div>
              <div className="contact__card-label">LOCATION</div>
              <div className="contact__card-val">Gampaha & Colombo, Sri Lanka</div>
            </div>
          </div>
          <div className="contact__card">
            <span className="contact__card-icon">⏰</span>
            <div>
              <div className="contact__card-label">HOURS</div>
              <div className="contact__card-val">Mon–Sat: 8AM – 6PM<br />Emergency: 24/7</div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact__form-wrap">
        <div className="contact__form-header">
          <span className="contact__form-title">QUICK ENQUIRY</span>
        </div>
        <form className="contact__form" onSubmit={e => { e.preventDefault(); alert('Message sent! We will contact you shortly.'); }}>
          <div className="contact__field">
            <label className="contact__label">YOUR NAME</label>
            <input className="contact__input" type="text" placeholder="John Silva" required />
          </div>
          <div className="contact__field">
            <label className="contact__label">PHONE / WHATSAPP</label>
            <input className="contact__input" type="tel" placeholder="+94 77X XXX XXX" required />
          </div>
          <div className="contact__field">
            <label className="contact__label">SERVICE REQUIRED</label>
            <select className="contact__input">
              <option>Generator Repair/Service</option>
              <option>Vehicle Engineering</option>
              <option>Electronic/PCB Repair</option>
              <option>Meter Panel Repair</option>
              <option>Mechanical Works</option>
              <option>Restoration Works</option>
              <option>Other</option>
            </select>
          </div>
          <div className="contact__field">
            <label className="contact__label">DESCRIPTION</label>
            <textarea className="contact__input contact__textarea" placeholder="Describe your issue or project..." rows={4} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Send Enquiry
          </button>
        </form>
      </div>
    </div>

    <style>{`
      .contact { padding: 100px 0; }
      .contact__inner {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 64px;
        align-items: start;
      }
      .contact__sub {
        font-size: 15px;
        color: var(--text-muted);
        margin-bottom: 32px;
        line-height: 1.7;
      }
      .contact__cards { display: flex; flex-direction: column; gap: 12px; }
      .contact__card {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 20px;
        background: var(--bg-panel);
        border: 1px solid var(--border);
        border-radius: 4px;
        transition: border-color 0.2s;
        text-decoration: none;
        color: inherit;
      }
      .contact__card--wa { border-color: rgba(37, 211, 102, 0.3); }
      .contact__card--wa:hover { border-color: #25d366; background: rgba(37, 211, 102, 0.05); }
      .contact__card-icon { font-size: 28px; }
      .contact__card-label {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--text-dim);
        letter-spacing: 0.15em;
        margin-bottom: 2px;
      }
      .contact__card-val { font-size: 14px; color: var(--text); font-weight: 500; }
      .contact__form-wrap {
        background: var(--bg-panel);
        border: 1px solid var(--border);
        border-radius: 4px;
        overflow: hidden;
      }
      .contact__form-header {
        padding: 16px 24px;
        border-bottom: 1px solid var(--border);
        background: var(--bg-card);
      }
      .contact__form-title {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--text-dim);
        letter-spacing: 0.2em;
      }
      .contact__form {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .contact__field { display: flex; flex-direction: column; gap: 6px; }
      .contact__label {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--text-dim);
        letter-spacing: 0.15em;
      }
      .contact__input {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 2px;
        padding: 10px 14px;
        color: var(--text);
        font-size: 14px;
        transition: border-color 0.2s;
        outline: none;
        width: 100%;
      }
      .contact__input:focus { border-color: var(--accent); }
      .contact__textarea { resize: vertical; min-height: 100px; }
      select.contact__input option { background: var(--bg-card); }
      @media (max-width: 768px) {
        .contact__inner { grid-template-columns: 1fr; gap: 40px; }
      }
    `}</style>
  </section>
);

/* ── PAGE ────────────────────────────────────────────────── */
const Portfolio = () => (
  <>
    <Navbar />
    <Hero />
    <Services />
    <Projects />
    <About />
    <Contact />
    <Footer />
  </>
);

export default Portfolio;
