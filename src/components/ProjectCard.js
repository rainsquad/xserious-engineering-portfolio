import React from 'react';
import { Link } from 'react-router-dom';

const categoryColors = {
  generator: { bg: 'rgba(240, 165, 0, 0.08)', border: 'rgba(240, 165, 0, 0.3)', text: '#f0a500', label: 'GENERATOR' },
  vehicle: { bg: 'rgba(33, 150, 243, 0.08)', border: 'rgba(33, 150, 243, 0.3)', text: '#2196f3', label: 'VEHICLE' },
  mechanical: { bg: 'rgba(156, 39, 176, 0.08)', border: 'rgba(156, 39, 176, 0.3)', text: '#ab47bc', label: 'MECHANICAL' },
  electrical: { bg: 'rgba(0, 188, 212, 0.08)', border: 'rgba(0, 188, 212, 0.3)', text: '#00bcd4', label: 'ELECTRICAL' },
  panels: { bg: 'rgba(76, 175, 80, 0.08)', border: 'rgba(76, 175, 80, 0.3)', text: '#43a047', label: 'PANELS' },
};

const categoryIcons = {
  generator: '⚡',
  vehicle: '🔧',
  mechanical: '⚙️',
  electrical: '🔌',
  panels: '📊',
};

const PlaceholderImage = ({ category, title }) => {
  const colors = categoryColors[category] || categoryColors.mechanical;
  return (
    <div className="project-card__placeholder">
      <div className="project-card__placeholder-icon">{categoryIcons[category] || '🔩'}</div>
      <div className="project-card__placeholder-text">{title}</div>
      <style>{`
        .project-card__placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          gap: 12px;
          padding: 20px;
        }
        .project-card__placeholder-icon { font-size: 48px; opacity: 0.4; }
        .project-card__placeholder-text {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-dim);
          text-align: center;
        }
      `}</style>
    </div>
  );
};

const ProjectCard = ({ project, index = 0 }) => {
  const colors = categoryColors[project.category] || categoryColors.mechanical;

  return (
    <Link to={`/project/${project.id}`} className="project-card" style={{ animationDelay: `${index * 0.06}s` }}>
      <div className="project-card__image-wrap">
        {project.image ? (
          <img src={project.image} alt={project.title} className="project-card__image" />
        ) : (
          <PlaceholderImage category={project.category} title={project.title} />
        )}
        <div className="project-card__cat-badge" style={{
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          color: colors.text,
        }}>
          {categoryIcons[project.category]} {colors.label}
        </div>
        {project.featured && (
          <div className="project-card__featured">FEATURED</div>
        )}
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>
        <div className="project-card__tags">
          {project.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        {project.price && (
          <div className="project-card__price">{project.price}</div>
        )}
        <div className="project-card__cta">
          <span>View Details</span>
          <span className="project-card__arrow">→</span>
        </div>
      </div>

      <style>{`
        .project-card {
          display: flex;
          flex-direction: column;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.25s;
          text-decoration: none;
          color: inherit;
          animation: fadeUp 0.5s ease both;
          position: relative;
        }
        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 4px;
          opacity: 0;
          transition: opacity 0.25s;
          background: linear-gradient(135deg, var(--accent-glow), transparent);
          pointer-events: none;
          z-index: 0;
        }
        .project-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(240,165,0,0.1);
        }
        .project-card:hover::before { opacity: 1; }
        .project-card__image-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .project-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }
        .project-card:hover .project-card__image { transform: scale(1.04); }
        .project-card__cat-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 3px 8px;
          border-radius: 2px;
        }
        .project-card__featured {
          position: absolute;
          top: 12px;
          right: 12px;
          background: var(--accent);
          color: #000;
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 3px 8px;
          border-radius: 2px;
        }
        .project-card__body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
          position: relative;
          z-index: 1;
        }
        .project-card__title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--text);
          line-height: 1.2;
        }
        .project-card__desc {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .project-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .project-card__price {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--accent);
          font-weight: 600;
        }
        .project-card__cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--border);
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-dim);
          transition: color 0.2s;
        }
        .project-card:hover .project-card__cta { color: var(--accent); }
        .project-card__arrow {
          transition: transform 0.2s;
          font-size: 16px;
        }
        .project-card:hover .project-card__arrow { transform: translateX(4px); }
      `}</style>
    </Link>
  );
};

export default ProjectCard;
