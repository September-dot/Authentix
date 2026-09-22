import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function ConfidenceIndicator({ confidence, compact = false }) {
  // Confidence is a calibrated percentage (0 - 100)
  return (
    <div className={`confidence-indicator ${compact ? 'compact' : ''}`}>
      <div className="confidence-value-wrap">
        <span className="confidence-label">Confidence</span>
        <span className="confidence-number mono">{confidence}%</span>
      </div>
      {!compact && (
        <div className="confidence-meter-track" title={`Calibrated model confidence: ${confidence}%`}>
          <div 
            className="confidence-meter-fill" 
            style={{ width: `${confidence}%` }}
            aria-valuenow={confidence}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          />
        </div>
      )}
    </div>
  );
}
