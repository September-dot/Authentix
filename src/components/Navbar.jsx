import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Navbar({ currentPage, onNavigate, hasActiveResult }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button 
          className="brand-link" 
          onClick={() => onNavigate('landing')}
          aria-label="Authentix Home"
        >
          <div className="brand-icon">
            <ShieldCheck size={18} strokeWidth={2.2} />
          </div>
          <span>Authentix</span>
          <span className="brand-badge">Forensic Risk</span>
        </button>

        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <button
                className={`nav-link ${currentPage === 'landing' ? 'active' : ''}`}
                onClick={() => onNavigate('landing')}
              >
                Overview
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${currentPage === 'upload' ? 'active' : ''}`}
                onClick={() => onNavigate('upload')}
              >
                Analyze Image
              </button>
            </li>
            {hasActiveResult && (
              <li>
                <button
                  className={`nav-link ${currentPage === 'results' ? 'active' : ''}`}
                  onClick={() => onNavigate('results')}
                >
                  Latest Report
                </button>
              </li>
            )}
            <li>
              <button
                className={`nav-link ${currentPage === 'methodology' ? 'active' : ''}`}
                onClick={() => onNavigate('methodology')}
              >
                Methodology
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
