import React from 'react';
import { ArrowRight, RotateCcw, BookOpen, CheckCircle2 } from 'lucide-react';

export default function NextActions({ 
  actions, 
  onAnalyzeAnother, 
  onViewMethodology,
  actionLabel = 'Analyze Another Asset'
}) {
  return (
    <div className="next-actions-panel">
      <h3 className="next-actions-title">Recommended Next Operational Actions</h3>
      <p className="next-actions-subtitle">
        Actionable protocol based on current risk level and forensic confidence:
      </p>

      <ul className="next-actions-list">
        {actions && actions.map((action, index) => (
          <li key={index} className="next-action-item">
            <span className="next-action-step-num mono">{index + 1}</span>
            <span className="next-action-text">{action}</span>
          </li>
        ))}
      </ul>

      <div className="next-actions-button-row">
        <button 
          className="btn btn-primary"
          onClick={onAnalyzeAnother}
        >
          <RotateCcw size={16} />
          <span>{actionLabel}</span>
        </button>

        <button 
          className="btn btn-secondary"
          onClick={onViewMethodology}
        >
          <BookOpen size={16} />
          <span>Inspect Methodology & Signals</span>
        </button>
      </div>
    </div>
  );
}
