import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function LimitationsNotice({ limitations }) {
  const defaultLimitations = [
    'Authentix operates probabilistically; a risk assessment is not a mathematical proof of synthetic origin or camera authenticity.',
    'Heavy re-compression, social media filters, downscaling, or screenshotting may destroy latent forensic signals or trigger false positive anomalies.',
    'This report is engineered as decision support for human investigators and must not be used as an autonomous gatekeeper or sole legal determination.'
  ];

  const items = (limitations && limitations.length > 0) ? limitations : defaultLimitations;

  return (
    <div className="limitations-notice-panel" role="region" aria-label="System Limitations">
      <div className="limitations-header">
        <div className="limitations-icon-box">
          <AlertCircle size={20} strokeWidth={2} />
        </div>
        <div>
          <h3 className="limitations-title">System Limitations & Forensic Boundaries</h3>
          <p className="limitations-subtitle">
            Always visible by design. Automated detection metrics must be interpreted within operational constraints.
          </p>
        </div>
      </div>

      <ul className="limitations-list">
        {items.map((item, index) => (
          <li key={index} className="limitations-item">
            <span className="limitations-bullet" aria-hidden="true" />
            <span className="limitations-text">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
