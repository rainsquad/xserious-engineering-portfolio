import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-x">X</span>
          <span className="navbar__logo-text">
            <span className="navbar__logo-main">SERIOUS</span>
            <span className="navbar__logo-sub">ENGINEERING WORKS</span>
          </span>
        </Link>

        <div className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          <a href="/#services" className="navbar__link">Services</a>
          <a href="/#projects" className="navbar__link">Projects</a>
          <a href="/#about" className="navbar__link">About</a>
          <a href="/#contact" className="navbar__link">Contact</a>
          <Link to="/admin" className="navbar__admin-btn">
            <span>Admin</span>
          </Link>
        </div>

        <button
          className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: background 0.3s, border-color 0.3s;
          border-bottom: 1px solid transparent;
        }
        .navbar--scrolled {
          background: rgba(8, 11, 15, 0.96);
          backdrop-filter: blur(12px);
          border-color: var(--border);
        }
        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .navbar__logo-x {
          font-family: var(--font-display);
          font-size: 42px;
          font-weight: 900;
          color: var(--accent);
          line-height: 1;
          letter-spacing: -2px;
          text-shadow: 0 0 20px rgba(240, 165, 0, 0.5);
        }
        .navbar__logo-text {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .navbar__logo-main {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text);
          line-height: 1;
        }
        .navbar__logo-sub {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-muted);
          letter-spacing: 0.2em;
        }
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .navbar__link {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .navbar__link:hover { color: var(--text); }
        .navbar__admin-btn {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          padding: 6px 16px;
          border: 1px solid rgba(240, 165, 0, 0.4);
          border-radius: 2px;
          transition: all 0.2s;
        }
        .navbar__admin-btn:hover {
          background: var(--accent-glow);
          border-color: var(--accent);
        }
        .navbar__burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 4px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .navbar__burger span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--text);
          transition: all 0.3s;
          transform-origin: center;
        }
        .navbar__burger--open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .navbar__burger--open span:nth-child(2) { opacity: 0; }
        .navbar__burger--open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
        @media (max-width: 768px) {
          .navbar__burger { display: flex; }
          .navbar__links {
            display: none;
            position: absolute;
            top: 70px; left: 0; right: 0;
            flex-direction: column;
            gap: 0;
            background: rgba(8, 11, 15, 0.98);
            border-bottom: 1px solid var(--border);
            padding: 16px 0;
          }
          .navbar__links--open { display: flex; }
          .navbar__link, .navbar__admin-btn {
            padding: 14px 24px;
            width: 100%;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
