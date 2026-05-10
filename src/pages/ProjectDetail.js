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

/* ── IMAGE GALLERY ─────────────────────────────────────── */
const ImageGallery = ({ images }) => {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!images?.length) return null;

  const current = images[active];

  return (
    <div className="gallery">
      {/* Main viewer */}
      <div
        className={`gallery__main gallery__main--${current.orientation || 'landscape'}`}
        onClick={() => setLightbox(true)}
        title="Click to enlarge"
      >
        <img src={current.src} alt={`project-${active + 1}`} />
        <div className="gallery__main-hint">🔍 Click to enlarge</div>
        {images.length > 1 && (
          <>
            <button
              className="gallery__nav gallery__nav--prev"
              onClick={e => { e.stopPropagation(); setActive(a => (a - 1 + images.length) % images.length); }}
              aria-label="Previous image"
            >‹</button>
            <button
              className="gallery__nav gallery__nav--next"
              onClick={e => { e.stopPropagation(); setActive(a => (a + 1) % images.length); }}
              aria-label="Next image"
            >›</button>
          </>
        )}
        <div className="gallery__counter">{active + 1} / {images.length}</div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="gallery__thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`gallery__thumb gallery__thumb--${img.orientation || 'landscape'}${i === active ? ' gallery__thumb--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Image ${i + 1}`}
            >
              <img src={img.src} alt={`thumb-${i + 1}`} />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="gallery__lightbox" onClick={() => setLightbox(false)}>
          <button className="gallery__lightbox-close" onClick={() => setLightbox(false)}>✕</button>
          {images.length > 1 && (
            <>
              <button
                className="gallery__lightbox-nav gallery__lightbox-nav--prev"
                onClick={e => { e.stopPropagation(); setActive(a => (a - 1 + images.length) % images.length); }}
              >‹</button>
              <button
                className="gallery__lightbox-nav gallery__lightbox-nav--next"
                onClick={e => { e.stopPropagation(); setActive(a => (a + 1) % images.length); }}
              >›</button>
            </>
          )}
          <div className="gallery__lightbox-inner" onClick={e => e.stopPropagation()}>
            <img src={current.src} alt={`project-${active + 1}`} />
          </div>
          <div className="gallery__lightbox-counter">{active + 1} / {images.length}</div>
        </div>
      )}

      <style>{`
        .gallery { display: flex; flex-direction: column; gap: 10px; }

        /* ── Main viewer ── */
        .gallery__main {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--bg-panel);
          cursor: zoom-in;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* Aspect-ratio driven heights */
        .gallery__main--landscape { aspect-ratio: 16/9; max-height: 520px; }
        .gallery__main--portrait  { aspect-ratio: 3/4;  max-height: 640px; max-width: 480px; margin: 0 auto; }
        .gallery__main--square    { aspect-ratio: 1/1;  max-height: 520px; }

        .gallery__main img {
          width: 100%;
          height: 100%;
          object-fit: contain; /* show full image, no crop */
          display: block;
          transition: opacity 0.2s;
        }
        .gallery__main:hover img { opacity: 0.94; }
        .gallery__main-hint {
          position: absolute;
          bottom: 10px;
          right: 12px;
          background: rgba(0,0,0,0.55);
          color: rgba(255,255,255,0.75);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          padding: 4px 8px;
          border-radius: 3px;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .gallery__main:hover .gallery__main-hint { opacity: 1; }

        /* Nav arrows */
        .gallery__nav {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          font-size: 28px;
          width: 44px; height: 44px;
          border-radius: 3px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
          z-index: 2;
        }
        .gallery__nav:hover { background: rgba(0,0,0,0.8); }
        .gallery__nav--prev { left: 10px; }
        .gallery__nav--next { right: 10px; }

        /* Counter badge */
        .gallery__counter {
          position: absolute;
          top: 10px; right: 12px;
          background: rgba(0,0,0,0.55);
          color: rgba(255,255,255,0.8);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          padding: 3px 8px;
          border-radius: 3px;
        }

        /* ── Thumbnails ── */
        .gallery__thumbs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: flex-end;
        }
        .gallery__thumb {
          border: 2px solid var(--border);
          border-radius: 3px;
          overflow: hidden;
          background: var(--bg-panel);
          cursor: pointer;
          padding: 0;
          transition: border-color 0.15s, opacity 0.15s;
          flex-shrink: 0;
          opacity: 0.65;
        }
        .gallery__thumb--active { border-color: var(--accent); opacity: 1; }
        .gallery__thumb:hover   { border-color: var(--border-accent); opacity: 0.9; }

        /* Thumb sizing by orientation */
        .gallery__thumb--landscape { width: 120px; height: 72px; }
        .gallery__thumb--portrait  { width: 60px;  height: 88px; }
        .gallery__thumb--square    { width: 72px;  height: 72px; }

        .gallery__thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* ── Lightbox ── */
        .gallery__lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.93);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: zoom-out;
        }
        .gallery__lightbox-inner {
          max-width: 94vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: default;
        }
        .gallery__lightbox-inner img {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 3px;
          box-shadow: 0 0 80px rgba(0,0,0,0.8);
        }
        .gallery__lightbox-close {
          position: fixed;
          top: 18px; right: 20px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          width: 40px; height: 40px;
          border-radius: 3px;
          font-size: 18px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 10001;
          transition: background 0.15s;
        }
        .gallery__lightbox-close:hover { background: rgba(255,255,255,0.25); }
        .gallery__lightbox-nav {
          position: fixed;
          top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          font-size: 36px;
          width: 52px; height: 52px;
          border-radius: 3px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 10001;
          transition: background 0.15s;
        }
        .gallery__lightbox-nav:hover { background: rgba(255,255,255,0.25); }
        .gallery__lightbox-nav--prev { left: 12px; }
        .gallery__lightbox-nav--next { right: 12px; }
        .gallery__lightbox-counter {
          position: fixed;
          bottom: 20px;
          left: 50%; transform: translateX(-50%);
          background: rgba(0,0,0,0.5);
          color: rgba(255,255,255,0.7);
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.15em;
          padding: 5px 14px;
          border-radius: 20px;
        }

        @media (max-width: 640px) {
          .gallery__main--landscape { aspect-ratio: 4/3; }
          .gallery__nav { width: 36px; height: 36px; font-size: 22px; }
          .gallery__thumb--landscape { width: 80px; height: 48px; }
          .gallery__thumb--portrait  { width: 44px; height: 64px; }
          .gallery__thumb--square    { width: 56px; height: 56px; }
        }
      `}</style>
    </div>
  );
};

/* ── PROJECT DETAIL ────────────────────────────────────── */
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

  // normalise images: support both new `images[]` and legacy single `image`
  const images = project.images?.length
    ? project.images
    : project.image
      ? [{ src: project.image, orientation: 'landscape' }]
      : [];

  // resolve display label for category (custom or preset)
  const catLabel = project.customCategory
    || categoryLabels[project.category]
    || project.category;

  return (
    <>
      <Navbar />
      <main className="detail">
        <div className="detail__hero" style={images[0] ? { backgroundImage: `url(${images[0].src})` } : {}}>
          <div className="detail__hero-overlay" />
          <div className="container detail__hero-inner">
            <Link to="/#projects" className="detail__back">← Back to Projects</Link>
            <div className="detail__cat-badge">{catLabel}</div>
            <h1 className="detail__title">{project.title}</h1>
            <div className="detail__meta">
              <span className="detail__date">{project.date}</span>
              {project.price && <span className="detail__price">{project.price}</span>}
              {images.length > 1 && (
                <span className="detail__img-count">{images.length} photos</span>
              )}
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

            {images.length > 0 && (
              <div className="detail__section">
                <h2 className="detail__section-title">
                  Project Images
                  {images.length > 1 && (
                    <span className="detail__section-count"> ({images.length})</span>
                  )}
                </h2>
                <ImageGallery images={images} />
              </div>
            )}

            {project.tags && project.tags.length > 0 && (
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
                <span className="detail__info-val">{catLabel}</span>
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
              {images.length > 0 && (
                <div className="detail__info-row">
                  <span className="detail__info-label">Photos</span>
                  <span className="detail__info-val">{images.length}</span>
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
              {related.map(p => {
                const thumb = p.images?.[0]?.src || p.image || null;
                const rLabel = p.customCategory || categoryLabels[p.category] || p.category;
                return (
                  <Link key={p.id} to={`/project/${p.id}`} className="detail__related-card">
                    <div className="detail__related-img">
                      {thumb ? <img src={thumb} alt={p.title} /> : <span>🔧</span>}
                    </div>
                    <div className="detail__related-info">
                      <div className="detail__related-title">{p.title}</div>
                      <div className="detail__related-cat">{rLabel}</div>
                    </div>
                  </Link>
                );
              })}
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
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(8,11,15,0.98) 30%, rgba(8,11,15,0.5) 100%);
        }
        .detail__hero-inner {
          position: relative; z-index: 2;
          padding-top: 60px; padding-bottom: 60px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .detail__back {
          font-family: var(--font-mono); font-size: 12px; color: var(--text-dim);
          letter-spacing: 0.1em; transition: color 0.2s; width: fit-content;
        }
        .detail__back:hover { color: var(--accent); }
        .detail__cat-badge {
          font-family: var(--font-mono); font-size: 11px; color: var(--accent);
          letter-spacing: 0.15em; text-transform: uppercase;
        }
        .detail__title {
          font-family: var(--font-display);
          font-size: clamp(32px, 5vw, 64px);
          font-weight: 900; letter-spacing: -0.02em;
          text-transform: uppercase; color: var(--text); line-height: 1;
        }
        .detail__meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .detail__date  { font-family: var(--font-mono); font-size: 12px; color: var(--text-dim); }
        .detail__price { font-family: var(--font-mono); font-size: 14px; color: var(--accent); font-weight: 600; }
        .detail__img-count {
          font-family: var(--font-mono); font-size: 11px;
          color: rgba(255,255,255,0.4); letter-spacing: 0.1em;
        }
        .detail__body {
          display: grid; grid-template-columns: 1fr 320px;
          gap: 48px; padding-top: 60px; padding-bottom: 60px;
        }
        .detail__section { margin-bottom: 40px; }
        .detail__section-title {
          font-family: var(--font-display); font-size: 13px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-dim);
          margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid var(--border);
        }
        .detail__section-count {
          font-size: 12px; color: var(--accent);
          font-family: var(--font-mono); letter-spacing: 0.1em;
        }
        .detail__desc { font-size: 16px; color: var(--text-muted); line-height: 1.8; }
        .detail__list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .detail__list-item { display: flex; align-items: flex-start; gap: 12px; font-size: 15px; color: var(--text-muted); line-height: 1.5; }
        .detail__list-bullet { color: var(--accent); font-size: 12px; margin-top: 3px; flex-shrink: 0; }
        .detail__tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .detail__sidebar { display: flex; flex-direction: column; gap: 20px; }
        .detail__info-card, .detail__cta-card {
          background: var(--bg-panel); border: 1px solid var(--border);
          border-radius: 4px; padding: 24px; position: sticky; top: 90px;
        }
        .detail__info-title, .detail__cta-title {
          font-family: var(--font-display); font-size: 14px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--text);
          margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border);
        }
        .detail__info-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 0; border-bottom: 1px solid var(--border);
        }
        .detail__info-label { font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); letter-spacing: 0.1em; }
        .detail__info-val { font-size: 13px; color: var(--text-muted); text-align: right; }
        .detail__info-price { color: var(--accent) !important; font-weight: 600; }
        .detail__cta-text { font-size: 13px; color: var(--text-muted); margin-bottom: 16px; line-height: 1.6; }
        .detail__related { padding-bottom: 80px; }
        .detail__related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .detail__related-card {
          display: flex; align-items: center; gap: 12px; padding: 14px;
          background: var(--bg-panel); border: 1px solid var(--border);
          border-radius: 4px; transition: all 0.2s; text-decoration: none; color: inherit;
        }
        .detail__related-card:hover { border-color: var(--border-accent); background: var(--bg-card-hover); }
        .detail__related-img {
          width: 48px; height: 48px; background: var(--bg-card); border-radius: 3px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; flex-shrink: 0; overflow: hidden;
        }
        .detail__related-img img { width: 100%; height: 100%; object-fit: cover; }
        .detail__related-title { font-family: var(--font-display); font-size: 14px; font-weight: 600; letter-spacing: 0.04em; color: var(--text); margin-bottom: 3px; }
        .detail__related-cat   { font-family: var(--font-mono); font-size: 10px; color: var(--text-dim); letter-spacing: 0.1em; }
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
