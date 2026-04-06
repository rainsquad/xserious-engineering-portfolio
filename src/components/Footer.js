import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="container footer__inner">
      <div className="footer__brand">
        <div className="footer__logo">
          <span className="footer__logo-x">X</span>
          <div> 
            <div className="footer__logo-main">SERIOUS ENGINEERING</div>
            <div className="footer__logo-sub">WORKS</div>
          </div>
        </div>
        <p className="footer__tagline">Specialist generator repair & engineering works in Gampaha & Colombo, Sri Lanka.</p>
      </div>

      <div className="footer__col">
        <h4 className="footer__heading">Services</h4>
        <ul className="footer__list">
          <li>Generator Repair & Service</li>
          <li>Generator Commissioning</li>
          <li>Vehicle Engineering</li>
          <li>Engine Overhauling</li>
          <li>Electronic & PCB Repair</li>
          <li>Meter Panel Repair</li>
        </ul>
      </div>

      <div className="footer__col">
        <h4 className="footer__heading">Contact</h4>
        <ul className="footer__list footer__list--contact">
          <li>
            <span className="footer__contact-label">Location</span>
            <span>Gampaha & Colombo, Sri Lanka</span>
          </li>
          <li>
            <span className="footer__contact-label">WhatsApp</span>
            <a href="https://wa.me/94XXXXXXXXX" className="footer__link">+94 XXX XXX XXX</a>
          </li>
          <li>
            <span className="footer__contact-label">Email</span>
            <a href="mailto:info@xseriousengineering.lk" className="footer__link">info@xseriousengineering.lk</a>
          </li>
        </ul>
      </div>
    </div>

    <div className="footer__bottom">
      <div className="container footer__bottom-inner">
        <span className="footer__copy">© {new Date().getFullYear()} Xserious Engineering Works. All rights reserved.</span>
        <div className="footer__bottom-links">
          <Link to="/" className="footer__link">Portfolio</Link>
          <Link to="/admin" className="footer__link">Admin</Link>
        </div>
      </div>
    </div>

    <style>{`
      .footer {
        background: var(--bg-panel);
        border-top: 1px solid var(--border);
        margin-top: 100px;
      }
      .footer__inner {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 48px;
        padding: 64px 24px 48px;
      }
      .footer__logo {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 16px;
      }
      .footer__logo-x {
        font-family: var(--font-display);
        font-size: 48px;
        font-weight: 900;
        color: var(--accent);
        line-height: 1;
        letter-spacing: -2px;
      }
      .footer__logo-main {
        font-family: var(--font-display);
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.15em;
        color: var(--text);
        line-height: 1.1;
      }
      .footer__logo-sub {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--text-dim);
        letter-spacing: 0.3em;
      }
      .footer__tagline {
        font-size: 13px;
        color: var(--text-dim);
        line-height: 1.6;
        max-width: 280px;
      }
      .footer__heading {
        font-family: var(--font-display);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--accent);
        margin-bottom: 16px;
      }
      .footer__list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .footer__list li {
        font-size: 13px;
        color: var(--text-muted);
      }
      .footer__list--contact li {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .footer__contact-label {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--text-dim);
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
      .footer__link {
        color: var(--text-muted);
        font-size: 13px;
        transition: color 0.2s;
      }
      .footer__link:hover { color: var(--accent); }
      .footer__bottom {
        border-top: 1px solid var(--border);
        padding: 16px 0;
      }
      .footer__bottom-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .footer__copy {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--text-dim);
      }
      .footer__bottom-links {
        display: flex;
        gap: 24px;
      }
      @media (max-width: 768px) {
        .footer__inner { grid-template-columns: 1fr; gap: 32px; padding: 40px 24px 32px; }
        .footer__bottom-inner { flex-direction: column; gap: 8px; text-align: center; }
      }
    `}</style>
  </footer>
);

export default Footer;
