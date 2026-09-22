import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p style={{ color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '4px' }}>
            Authentix — Explainable AI Risk Detection System
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', maxWidth: '580px' }}>
            Designed for transparent media risk evaluation. Authentix delivers explainable feature diagnostics, 
            calibrated confidence intervals, and explicit limitations for high-integrity workflows.
          </p>
        </div>

        <div className="footer-meta">
          <button 
            className="nav-link" 
            onClick={() => onNavigate('landing')} 
            style={{ padding: '4px 8px', fontSize: '0.8125rem' }}
          >
            Overview
          </button>
          <button 
            className="nav-link" 
            onClick={() => onNavigate('upload')} 
            style={{ padding: '4px 8px', fontSize: '0.8125rem' }}
          >
            Analyze
          </button>
          <button 
            className="nav-link" 
            onClick={() => onNavigate('methodology')} 
            style={{ padding: '4px 8px', fontSize: '0.8125rem' }}
          >
            Methodology & Limitations
          </button>
        </div>
      </div>
    </footer>
  );
}
