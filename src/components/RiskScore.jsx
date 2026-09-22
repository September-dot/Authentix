import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, AlertOctagon } from 'lucide-react';
import ConfidenceIndicator from './ConfidenceIndicator';

export default function RiskScore({ tier, tierLabel, confidence, status, summary }) {
  // Determine risk indicator styling based on strict 3-tier risk system
  // green: low, amber: medium/uncertain, red: high
  const getRiskIcon = () => {
    switch (status) {
      case 'low':
        return <CheckCircle2 size={24} className="risk-icon" aria-hidden="true" />;
      case 'medium':
        return <AlertTriangle size={24} className="risk-icon" aria-hidden="true" />;
      case 'uncertain':
        return <HelpCircle size={24} className="risk-icon" aria-hidden="true" />;
      case 'high':
      default:
        return <AlertOctagon size={24} className="risk-icon" aria-hidden="true" />;
    }
  };

  return (
    <div className={`risk-score-panel risk-theme-${status}`}>
      <div className="risk-score-header">
        <div className="risk-tier-cluster">
          <div className="risk-badge-and-icon">
            {getRiskIcon()}
            <div className="risk-titles">
              <div className="risk-badge-row">
                <span className="risk-tier-badge">{tier}</span>
                {/* STRICT MANDATE: Confidence score is ALWAYS displayed directly next to the risk tier */}
                <span className="risk-confidence-pill mono">
                  {confidence}% Confidence
                </span>
              </div>
              <h2 className="risk-tier-headline">{tierLabel}</h2>
            </div>
          </div>
        </div>

        {/* Calibrated Confidence Breakdown Bar */}
        <div className="risk-confidence-meter-container">
          <ConfidenceIndicator confidence={confidence} />
          <span className="confidence-caption">
            Calibrated on benchmarked multi-model validation sets
          </span>
        </div>
      </div>

      <div className="risk-summary-divider" />

      <div className="risk-summary-body">
        <h4 className="risk-summary-heading">Evaluation Summary</h4>
        <p className="risk-summary-text">{summary}</p>
      </div>
    </div>
  );
}
