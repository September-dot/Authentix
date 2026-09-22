import React from 'react';
import { Check, AlertCircle, HelpCircle, X } from 'lucide-react';

export default function EvidenceCard({ evidence }) {
  const { title, finding, detail, status, statusLabel } = evidence;

  const getStatusBadge = () => {
    switch (status) {
      case 'pass':
        return (
          <span className="evidence-badge evidence-badge-pass">
            <Check size={13} strokeWidth={2.5} />
            <span>{statusLabel || 'Natural / Normal'}</span>
          </span>
        );
      case 'warning':
        return (
          <span className="evidence-badge evidence-badge-warning">
            <AlertCircle size={13} strokeWidth={2.5} />
            <span>{statusLabel || 'Anomaly Detected'}</span>
          </span>
        );
      case 'fail':
        return (
          <span className="evidence-badge evidence-badge-fail">
            <X size={13} strokeWidth={2.5} />
            <span>{statusLabel || 'Synthetic Marker'}</span>
          </span>
        );
      case 'inconclusive':
      default:
        return (
          <span className="evidence-badge evidence-badge-inconclusive">
            <HelpCircle size={13} strokeWidth={2.5} />
            <span>{statusLabel || 'Inconclusive Signal'}</span>
          </span>
        );
    }
  };

  return (
    <div className={`evidence-card status-${status}`}>
      <div className="evidence-header">
        <h4 className="evidence-title">{title}</h4>
        {getStatusBadge()}
      </div>

      <div className="evidence-finding-box">
        <span className="evidence-finding-label">Observed Signal:</span>
        <span className="evidence-finding-text">{finding}</span>
      </div>

      <p className="evidence-detail-text">{detail}</p>
    </div>
  );
}
