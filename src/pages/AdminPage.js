import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, addProject, updateProject, deleteProject, categories } from '../data/projects';

const categoryOptions = categories.filter(c => c.id !== 'all');

/* ── IMAGE UPLOAD UTIL ─────────────────────────────────── */
const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

/* ── EMPTY FORM ────────────────────────────────────────── */
const emptyForm = {
  title: '',
  category: 'generator',
  tags: '',
  description: '',
  details: '',
  featured: false,
  price: '',
  image: null,
};

/* ── PROJECT ROW ─────────────────────────────────────────── */
const ProjectRow = ({ project, onEdit, onDelete }) => {
  const catColors = {
    generator: '#f0a500',
    vehicle: '#2196f3',
    mechanical: '#ab47bc',
    electrical: '#00bcd4',
    panels: '#43a047',
  };
  const color = catColors[project.category] || '#888';

  return (
    <div className="admin-row">
      <div className="admin-row__img">
        {project.image
          ? <img src={project.image} alt={project.title} />
          : <span>🔩</span>
        }
      </div>
      <div className="admin-row__info">
        <div className="admin-row__title">{project.title}</div>
        <div className="admin-row__meta">
          <span className="admin-row__cat" style={{ color }}>{project.category.toUpperCase()}</span>
          <span className="admin-row__date">{project.date}</span>
          {project.featured && <span className="admin-row__featured">FEATURED</span>}
          {project.price && <span className="admin-row__price">{project.price}</span>}
        </div>
        <div className="admin-row__desc">{project.description?.slice(0, 100)}{project.description?.length > 100 ? '…' : ''}</div>
      </div>
      <div className="admin-row__actions">
        <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => onEdit(project)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(project.id)}>
          Delete
        </button>
      </div>

      <style>{`
        .admin-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 4px;
          transition: border-color 0.2s;
        }
        .admin-row:hover { border-color: var(--border-accent); }
        .admin-row__img {
          width: 60px; height: 60px;
          background: var(--bg-panel);
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          flex-shrink: 0;
          overflow: hidden;
        }
        .admin-row__img img { width: 100%; height: 100%; object-fit: cover; }
        .admin-row__info { flex: 1; min-width: 0; }
        .admin-row__title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--text);
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .admin-row__meta { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; flex-wrap: wrap; }
        .admin-row__cat {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
        }
        .admin-row__date { font-family: var(--font-mono); font-size: 10px; color: var(--text-dim); }
        .admin-row__featured {
          font-family: var(--font-mono);
          font-size: 9px;
          background: var(--accent);
          color: #000;
          padding: 1px 6px;
          border-radius: 2px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }
        .admin-row__price { font-family: var(--font-mono); font-size: 11px; color: var(--accent); }
        .admin-row__desc { font-size: 12px; color: var(--text-dim); line-height: 1.4; }
        .admin-row__actions { display: flex; gap: 8px; flex-shrink: 0; }
      `}</style>
    </div>
  );
};

/* ── PROJECT FORM ────────────────────────────────────────── */
const ProjectForm = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial || emptyForm);
  const [preview, setPreview] = useState(initial?.image || null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setPreview(b64);
    set('image', b64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      details: form.details ? form.details.split('\n').map(d => d.trim()).filter(Boolean) : [],
    };
    await new Promise(r => setTimeout(r, 300));
    onSave(payload);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="proj-form">
      <div className="proj-form__grid">
        <div className="proj-form__field proj-form__field--full">
          <label className="proj-form__label">PROJECT TITLE *</label>
          <input
            className="proj-form__input"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            placeholder="e.g. 100kVa Genset Commissioning"
            required
          />
        </div>

        <div className="proj-form__field">
          <label className="proj-form__label">CATEGORY *</label>
          <select className="proj-form__input" value={form.category} onChange={e => set('category', e.target.value)}>
            {categoryOptions.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="proj-form__field">
          <label className="proj-form__label">PRICE / VALUE (optional)</label>
          <input
            className="proj-form__input"
            value={form.price}
            onChange={e => set('price', e.target.value)}
            placeholder="e.g. LKR 265,000"
          />
        </div>

        <div className="proj-form__field proj-form__field--full">
          <label className="proj-form__label">TAGS (comma-separated)</label>
          <input
            className="proj-form__input"
            value={form.tags}
            onChange={e => set('tags', e.target.value)}
            placeholder="e.g. Generator, Commissioning, 100kVa"
          />
        </div>

        <div className="proj-form__field proj-form__field--full">
          <label className="proj-form__label">DESCRIPTION *</label>
          <textarea
            className="proj-form__input proj-form__textarea"
            value={form.description}
            onChange={e => set('description', e.target.value)}
            placeholder="Brief overview of the project..."
            rows={3}
            required
          />
        </div>

        <div className="proj-form__field proj-form__field--full">
          <label className="proj-form__label">WORK DETAILS (one per line)</label>
          <textarea
            className="proj-form__input proj-form__textarea"
            value={form.details}
            onChange={e => set('details', e.target.value)}
            placeholder={"Full commissioning procedure executed\nLoad testing at rated capacity\nPerformance report issued"}
            rows={5}
          />
        </div>

        <div className="proj-form__field proj-form__field--full">
          <label className="proj-form__label">PROJECT IMAGE</label>
          <div
            className="proj-form__upload"
            onClick={() => fileRef.current.click()}
          >
            {preview ? (
              <div className="proj-form__preview-wrap">
                <img src={preview} alt="Preview" className="proj-form__preview" />
                <div className="proj-form__preview-overlay">Click to change</div>
              </div>
            ) : (
              <div className="proj-form__upload-placeholder">
                <span className="proj-form__upload-icon">📷</span>
                <span className="proj-form__upload-text">Click to upload image</span>
                <span className="proj-form__upload-hint">JPG, PNG, WEBP up to 5MB</span>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImage} />
        </div>

        <div className="proj-form__field">
          <label className="proj-form__check-label">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={e => set('featured', e.target.checked)}
              className="proj-form__check"
            />
            <span className="proj-form__check-text">Mark as Featured Project</span>
          </label>
        </div>
      </div>

      <div className="proj-form__actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : (initial ? 'Update Project' : 'Add Project')}
        </button>
      </div>

      <style>{`
        .proj-form { padding: 24px; }
        .proj-form__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        .proj-form__field { display: flex; flex-direction: column; gap: 6px; }
        .proj-form__field--full { grid-column: 1 / -1; }
        .proj-form__label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-dim);
          letter-spacing: 0.15em;
        }
        .proj-form__input {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 2px;
          padding: 10px 14px;
          color: var(--text);
          font-size: 14px;
          transition: border-color 0.2s;
          outline: none;
          width: 100%;
          font-family: var(--font-body);
        }
        .proj-form__input:focus { border-color: var(--accent); }
        select.proj-form__input option { background: var(--bg-card); }
        .proj-form__textarea { resize: vertical; min-height: 80px; }
        .proj-form__upload {
          border: 2px dashed var(--border-accent);
          border-radius: 4px;
          cursor: pointer;
          transition: border-color 0.2s;
          overflow: hidden;
          min-height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .proj-form__upload:hover { border-color: var(--accent); }
        .proj-form__upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 32px;
        }
        .proj-form__upload-icon { font-size: 36px; }
        .proj-form__upload-text {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }
        .proj-form__upload-hint {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-dim);
        }
        .proj-form__preview-wrap {
          position: relative;
          width: 100%;
          max-height: 240px;
          overflow: hidden;
        }
        .proj-form__preview { width: 100%; object-fit: cover; }
        .proj-form__preview-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: white;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .proj-form__upload:hover .proj-form__preview-overlay { opacity: 1; }
        .proj-form__check-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          padding-top: 8px;
        }
        .proj-form__check { accent-color: var(--accent); width: 16px; height: 16px; }
        .proj-form__check-text {
          font-size: 14px;
          color: var(--text-muted);
        }
        .proj-form__actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }
        @media (max-width: 640px) {
          .proj-form__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </form>
  );
};

/* ── ADMIN PAGE ──────────────────────────────────────────── */
const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (payload) => {
    if (editing) {
      const updated = updateProject(editing.id, payload);
      setProjects(updated);
      showToast('Project updated successfully!');
    } else {
      const updated = addProject(payload);
      setProjects(updated);
      showToast('Project added successfully!');
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleEdit = (project) => {
    setEditing({
      ...project,
      tags: (project.tags || []).join(', '),
      details: (project.details || []).join('\n'),
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    const updated = deleteProject(id);
    setProjects(updated);
    showToast('Project deleted.', 'error');
  };

  const filtered = projects.filter(p => {
    const matchCat = filterCat === 'all' || p.category === filterCat;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="admin">
      {/* Toast */}
      {toast && (
        <div className={`admin__toast admin__toast--${toast.type}`}>
          {toast.msg}
        </div>
      )}

      {/* Topbar */}
      <div className="admin__topbar">
        <div className="admin__topbar-inner">
          <div className="admin__topbar-logo">
            <span className="admin__topbar-x">X</span>
            <div>
              <div className="admin__topbar-main">SERIOUS ENGINEERING</div>
              <div className="admin__topbar-sub">ADMIN PANEL</div>
            </div>
          </div>
          <Link to="/" className="btn btn-outline" style={{ padding: '7px 16px', fontSize: 13 }}>
            ← View Site
          </Link>
        </div>
      </div>

      <div className="admin__body">
        {/* Sidebar stats */}
        <aside className="admin__sidebar">
          <div className="admin__stat-card">
            <div className="admin__stat-val">{projects.length}</div>
            <div className="admin__stat-label">Total Projects</div>
          </div>
          <div className="admin__stat-card">
            <div className="admin__stat-val">{projects.filter(p => p.featured).length}</div>
            <div className="admin__stat-label">Featured</div>
          </div>
          <div className="admin__stat-card">
            <div className="admin__stat-val">{projects.filter(p => p.image).length}</div>
            <div className="admin__stat-label">With Images</div>
          </div>

          <div className="admin__cat-breakdown">
            <div className="admin__cat-title">BY CATEGORY</div>
            {categories.filter(c => c.id !== 'all').map(cat => {
              const count = projects.filter(p => p.category === cat.id).length;
              return (
                <div key={cat.id} className="admin__cat-row">
                  <span className="admin__cat-label">{cat.label}</span>
                  <span className="admin__cat-count">{count}</span>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main content */}
        <main className="admin__main">
          {/* Add / Edit Form */}
          {showForm ? (
            <div className="admin__form-card">
              <div className="admin__form-header">
                <h2 className="admin__form-title">
                  {editing ? 'EDIT PROJECT' : 'ADD NEW PROJECT'}
                </h2>
                <button className="admin__form-close" onClick={() => { setShowForm(false); setEditing(null); }}>✕</button>
              </div>
              <ProjectForm
                initial={editing}
                onSave={handleSave}
                onCancel={() => { setShowForm(false); setEditing(null); }}
              />
            </div>
          ) : (
            <div className="admin__actions-bar">
              <div className="admin__search-wrap">
                <span className="admin__search-icon">🔍</span>
                <input
                  className="admin__search"
                  placeholder="Search projects..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="admin__filter-wrap">
                <select
                  className="admin__filter-sel"
                  value={filterCat}
                  onChange={e => setFilterCat(e.target.value)}
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
              <button className="btn btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}>
                + Add Project
              </button>
            </div>
          )}

          {/* Project list */}
          {!showForm && (
            <div className="admin__list">
              <div className="admin__list-header">
                <span className="admin__list-count">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</span>
              </div>
              {filtered.length === 0 ? (
                <div className="admin__empty">
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📂</div>
                  <p>No projects found.</p>
                </div>
              ) : (
                <div className="admin__rows">
                  {filtered.map(p => (
                    <ProjectRow key={p.id} project={p} onEdit={handleEdit} onDelete={handleDelete} />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <style>{`
        .admin {
          min-height: 100vh;
          background: var(--bg);
          padding-top: 0;
        }
        .admin__toast {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9000;
          padding: 12px 20px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.08em;
          animation: fadeUp 0.3s ease;
        }
        .admin__toast--success {
          background: rgba(67, 160, 71, 0.15);
          border: 1px solid rgba(67, 160, 71, 0.4);
          color: var(--green);
        }
        .admin__toast--error {
          background: rgba(229, 57, 53, 0.1);
          border: 1px solid rgba(229, 57, 53, 0.3);
          color: var(--red);
        }
        .admin__topbar {
          background: var(--bg-panel);
          border-bottom: 1px solid var(--border);
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .admin__topbar-inner {
          max-width: 1400px;
          margin: 0 auto;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .admin__topbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .admin__topbar-x {
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 900;
          color: var(--accent);
          line-height: 1;
          letter-spacing: -2px;
        }
        .admin__topbar-main {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text);
          line-height: 1;
        }
        .admin__topbar-sub {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--accent);
          letter-spacing: 0.2em;
        }
        .admin__body {
          max-width: 1400px;
          margin: 0 auto;
          padding: 32px 24px;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 32px;
        }
        .admin__sidebar { display: flex; flex-direction: column; gap: 12px; }
        .admin__stat-card {
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 16px;
          text-align: center;
        }
        .admin__stat-val {
          font-family: var(--font-display);
          font-size: 40px;
          font-weight: 900;
          color: var(--accent);
          line-height: 1;
        }
        .admin__stat-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-dim);
          letter-spacing: 0.15em;
          margin-top: 4px;
        }
        .admin__cat-breakdown {
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 16px;
          margin-top: 8px;
        }
        .admin__cat-title {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-dim);
          letter-spacing: 0.15em;
          margin-bottom: 12px;
        }
        .admin__cat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 7px 0;
          border-bottom: 1px solid var(--border);
          font-size: 12px;
        }
        .admin__cat-row:last-child { border-bottom: none; }
        .admin__cat-label { color: var(--text-muted); }
        .admin__cat-count {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent);
          font-weight: 600;
        }
        .admin__main { display: flex; flex-direction: column; gap: 20px; min-width: 0; }
        .admin__form-card {
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
        }
        .admin__form-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid var(--border);
          background: var(--bg-card);
        }
        .admin__form-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--accent);
        }
        .admin__form-close {
          background: none;
          border: none;
          color: var(--text-dim);
          font-size: 18px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 2px;
          transition: all 0.2s;
        }
        .admin__form-close:hover { color: var(--text); background: var(--bg-card-hover); }
        .admin__actions-bar {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }
        .admin__search-wrap {
          flex: 1;
          min-width: 200px;
          position: relative;
        }
        .admin__search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
        }
        .admin__search {
          width: 100%;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 2px;
          padding: 9px 14px 9px 36px;
          color: var(--text);
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
          font-family: var(--font-body);
        }
        .admin__search:focus { border-color: var(--accent); }
        .admin__filter-sel {
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 2px;
          padding: 9px 14px;
          color: var(--text);
          font-size: 14px;
          outline: none;
          font-family: var(--font-body);
          cursor: pointer;
        }
        .admin__filter-sel option { background: var(--bg-card); }
        .admin__list { display: flex; flex-direction: column; gap: 12px; }
        .admin__list-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .admin__list-count {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-dim);
          letter-spacing: 0.12em;
        }
        .admin__rows { display: flex; flex-direction: column; gap: 10px; }
        .admin__empty {
          text-align: center;
          padding: 60px 0;
          color: var(--text-dim);
          font-size: 14px;
        }
        @media (max-width: 768px) {
          .admin__body { grid-template-columns: 1fr; }
          .admin__sidebar { flex-direction: row; flex-wrap: wrap; }
          .admin__stat-card { flex: 1; min-width: 100px; }
          .admin__cat-breakdown { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default AdminPage;
