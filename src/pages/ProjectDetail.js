import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getProjects } from '../data/projects';

const categoryLabels = {
  generator: 'Generator Works',
  vehicle: 'Vehicle Engineering',
  mechanical: 'Mechanical Works',
  electrical: 'Electrical & Electronic',
  panels: 'Meter Panels',
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const projects = getProjects();
    const found = projects.find(p => p.id === id);
    if (!found) { navigate('/'); return; }
    setProject(found);
    setRelated(projects.filter(p => p.id !== id && p.category === found.category).slice(0, 3));
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!project) return null;

  return (
    <>
      <Navbar />
      <main className="detail">
        <div className="detail__hero" style={project.image ? { backgroundImage: `url(${project.image})` } : {}}>
          <div className="detail__hero-overlay" />
          <div className="container detail__hero-inner">
            <Link to="/#projects" className="detail__back">
              ← Back to Projects
            </Link>
            <div className="detail__cat-badge">{categoryLabels[project.category] || project.category}</div>
            <h1 className="detail__title">{project.title}</h1>
            <div className="detail__meta">
              <span className="detail__date">{project.date}</span>
              {project.price && <span className="detail__price">{project.price}</span>}
            </div>
          </div>
        </div>

        <div className="container detail__body">
          <div className="detail__main">
            <div className="detail__section">
              <h2 className="detail__section-title">Project Overview</h2>
              <p className="detail__desc">{project.description}</p>
            </div>

            {project.details && project.details.length > 0 && (
              <div className="detail__section">
                <h2 className="detail__section-title">Work Performed</h2>
                <ul className="detail__list">
                  {project.details.map((item, i) => (
                    <li key={i} className="detail__list-item">
                      <span className="detail__list-bullet">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.image && (
              <div className="detail__section">
                <h2 className="detail__section-title">Project Images</h2>
                <div className="detail__images">
                  <img src={project.image} alt={project.title} className="detail__image" />
                </div>
              </div>
            )}

            {project.tags && (
              <div className="detail__section">
                <h2 className="detail__section-title">Tags</h2>
                <div className="detail__tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="detail__sidebar">
            <div className="detail__info-card">
              <h3 className="detail__info-title">Project Info</h3>
              <div className="detail__info-row">
                <span className="detail__info-label">Category</span>
                <span className="detail__info-val">{categoryLabels[project.category] || project.category}</span>
              </div>
              <div className="detail__info-row">
                <span className="detail__info-label">Date</span>
                <span className="detail__info-val">{project.date}</span>
              </div>
              {project.price && (
                <div className="detail__info-row">
                  <span className="detail__info-label">Value</span>
                  <span className="detail__info-val detail__info-price">{project.price}</span>
                </div>
              )}
              {project.featured && (
                <div className="detail__info-row">
                  <span className="detail__info-label">Status</span>
                  <span className="detail__info-val" style={{ color: 'var(--accent)' }}>Featured</span>
                </div>
              )}
            </div>

            <div className="detail__cta-card">
              <h3 className="detail__cta-title">Need Similar Work?</h3>
              <p className="detail__cta-text">Get in touch with our team for a free consultation and quote.</p>
              <a href="/#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get a Quote</a>
              <a href="https://wa.me/94XXXXXXXXX" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="container detail__related">
            <h2 className="detail__section-title" style={{ marginBottom: 24 }}>Related Projects</h2>
            <div className="detail__related-grid">
              {related.map(p => (
                <Link key={p.id} to={`/project/${p.id}`} className="detail__related-card">
                  <div className="detail__related-img">
                    {p.image ? <img src={p.image} alt={p.title} /> : <span>🔧</span>}
                  </div>
                  <div className="detail__related-info">
                    <div className="detail__related-title">{p.title}</div>
                    <div className="detail__related-cat">{categoryLabels[p.category]}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />

      <style>{`
        .detail { padding-top: 70px; }
        .detail__hero {
          min-height: 420px;
          background: var(--bg-panel);
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: flex-end;
        }
        .detail__hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8,11,15,0.98) 30%, rgba(8,11,15,0.5) 100%);
        }
        .detail__hero-inner {
          position: relative;
          z-index: 2;
          padding-top: 60px;
          padding-bottom: 60px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .detail__back {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-dim);
          letter-spacing: 0.1em;
          transition: color 0.2s;
          width: fit-content;
        }
        .detail__back:hover { color: var(--accent); }
        .detail__cat-badge {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .detail__title {
          font-family: var(--font-display);
          font-size: clamp(32px, 5vw, 64px);
          font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--text);
          line-height: 1;
        }
        .detail__meta { display: flex; align-items: center; gap: 16px; }
        .detail__date {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-dim);
        }
        .detail__price {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--accent);
          font-weight: 600;
        }
        .detail__body {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 48px;
          padding-top: 60px;
          padding-bottom: 60px;
        }
        .detail__section { margin-bottom: 40px; }
        .detail__section-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
        }
        .detail__desc {
          font-size: 16px;
          color: var(--text-muted);
          line-height: 1.8;
        }
        .detail__list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .detail__list-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .detail__list-bullet {
          color: var(--accent);
          font-size: 12px;
          margin-top: 3px;
          flex-shrink: 0;
        }
        .detail__images { display: grid; gap: 12px; }
        .detail__image {
          width: 100%;
          border-radius: 4px;
          border: 1px solid var(--border);
        }
        .detail__tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .detail__sidebar { display: flex; flex-direction: column; gap: 20px; }
        .detail__info-card, .detail__cta-card {
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 24px;
          position: sticky;
          top: 90px;
        }
        .detail__info-title, .detail__cta-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text);
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        .detail__info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
        }
        .detail__info-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-dim);
          letter-spacing: 0.1em;
        }
        .detail__info-val {
          font-size: 13px;
          color: var(--text-muted);
          text-align: right;
        }
        .detail__info-price { color: var(--accent) !important; font-weight: 600; }
        .detail__cta-text {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 16px;
          line-height: 1.6;
        }
        .detail__related { padding-bottom: 80px; }
        .detail__related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .detail__related-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 4px;
          transition: all 0.2s;
          text-decoration: none;
          color: inherit;
        }
        .detail__related-card:hover {
          border-color: var(--border-accent);
          background: var(--bg-card-hover);
        }
        .detail__related-img {
          width: 48px; height: 48px;
          background: var(--bg-card);
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
          overflow: hidden;
        }
        .detail__related-img img { width: 100%; height: 100%; object-fit: cover; }
        .detail__related-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--text);
          margin-bottom: 3px;
        }
        .detail__related-cat {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-dim);
          letter-spacing: 0.1em;
        }
        @media (max-width: 900px) {
          .detail__body { grid-template-columns: 1fr; }
          .detail__related-grid { grid-template-columns: 1fr; }
          .detail__info-card, .detail__cta-card { position: static; }
        }
      `}</style>
    </>
  );
};

export default ProjectDetail;
