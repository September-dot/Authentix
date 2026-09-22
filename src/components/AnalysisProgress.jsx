import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, ShieldAlert, Cpu, Activity, FileSearch, Film, FileText } from 'lucide-react';

const MODALITY_STAGES = {
  image: [
    {
      id: 1,
      title: 'Image Structure & EXIF Inspection',
      description: 'Verifying discrete cosine transform (DCT) blocks, quantization tables, and compression consistency...',
      icon: FileSearch
    },
    {
      id: 2,
      title: 'Spatial & Fourier Frequency Artifact Extraction',
      description: 'Computing 2D Fast Fourier Transform (FFT) to scan for generative upsampling grid anomalies...',
      icon: Activity
    },
    {
      id: 3,
      title: 'Latent Diffusion Signature Analysis',
      description: 'Cross-referencing residual noise variance against known diffusion model de-noising distributions...',
      icon: Cpu
    },
    {
      id: 4,
      title: 'Risk Synthesis & Confidence Calibration',
      description: 'Aggregating heuristic evidence, calibrating confidence bounds, and formulating explainability report...',
      icon: ShieldAlert
    }
  ],

  video: [
    {
      id: 1,
      title: 'Container & Metadata Verification',
      description: 'Reading video container atoms, checking codec headers, and verifying camera hardware cadence...',
      icon: FileSearch
    },
    {
      id: 2,
      title: 'Frame-Level & Pixel Artifact Inspection',
      description: 'Extracting keyframes, analyzing spatial PRNU noise residuals, and scanning for diffusion smoothing...',
      icon: Cpu
    },
    {
      id: 3,
      title: 'Temporal Consistency & Optical Flow Tracking',
      description: 'Measuring inter-frame motion vectors, facial landmark coherence, and temporal flickering...',
      icon: Activity
    },
    {
      id: 4,
      title: 'Scoring Evidence & Forensic Calibration',
      description: 'Correlating temporal discontinuities, synthesizing multi-frame findings, and calibrating confidence...',
      icon: ShieldAlert
    }
  ],

  document: [
    {
      id: 1,
      title: 'Text Ingestion & Syntactic Tokenization',
      description: 'Reading document input, normalizing whitespace, and extracting grammatical token boundaries...',
      icon: FileSearch
    },
    {
      id: 2,
      title: 'Stylometric Irregularity Analysis',
      description: 'Analyzing sentence-length variance (burstiness), vocabulary diversity, and formulaic repetitions...',
      icon: Activity
    },
    {
      id: 3,
      title: 'Structural & Perplexity Profiling',
      description: 'Computing n-gram perplexity distributions, evaluating rhetorical symmetry, and transition entropy...',
      icon: Cpu
    },
    {
      id: 4,
      title: 'Scoring Evidence & Forensic Calibration',
      description: 'Correlating linguistic anomalies, scoring evidence, and calibrating model confidence bounds...',
      icon: ShieldAlert
    }
  ]
};

export default function AnalysisProgress({ 
  onAnalysisComplete, 
  selectedFileName, 
  modality = 'image' 
}) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const stages = MODALITY_STAGES[modality] || MODALITY_STAGES.image;

  useEffect(() => {
    // Delay between each stage: 1200ms
    const timer = setTimeout(() => {
      if (currentStageIndex < stages.length - 1) {
        setCurrentStageIndex(prev => prev + 1);
      } else {
        // Final stage completed, brief hold before navigating to results
        setTimeout(() => {
          onAnalysisComplete();
        }, 750);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [currentStageIndex, stages.length, onAnalysisComplete]);

  const progressPercent = Math.round(((currentStageIndex + 1) / stages.length) * 100);

  const getHeadline = () => {
    switch (modality) {
      case 'video':
        return 'Evaluating Video Frames & Temporal Flow';
      case 'document':
        return 'Evaluating Stylometric & Structural Patterns';
      case 'image':
      default:
        return 'Evaluating Image Artifacts';
    }
  };

  const getFooterNote = () => {
    switch (modality) {
      case 'video':
        return 'Authentix processes video frames and temporal vectors entirely within this session. No video data is retained.';
      case 'document':
        return 'Authentix evaluates text tokens and entropy distributions entirely within this session. No text data is retained.';
      case 'image':
      default:
        return 'Authentix processes feature extraction entirely within this session. No image data is retained or transmitted to external storage.';
    }
  };

  return (
    <div className="analysis-progress-panel">
      <div className="progress-header">
        <div className="progress-title-row">
          <div>
            <span className="badge" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', marginBottom: '8px' }}>
              Forensic Inspection in Progress • {modality.toUpperCase()}
            </span>
            <h2 className="progress-headline">{getHeadline()}</h2>
          </div>
          <div className="progress-percentage mono">
            {progressPercent}%
          </div>
        </div>

        {selectedFileName && (
          <p className="progress-target-file">
            Target Asset: <span className="mono text-primary">{selectedFileName}</span>
          </p>
        )}

        {/* Linear progress bar */}
        <div className="progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </div>

      {/* Stepper Stages List */}
      <div className="stages-list">
        {stages.map((stage, idx) => {
          const isCompleted = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const isPending = idx > currentStageIndex;

          let statusClass = 'stage-pending';
          if (isCompleted) statusClass = 'stage-completed';
          if (isCurrent) statusClass = 'stage-active';

          return (
            <div key={stage.id} className={`stage-item ${statusClass}`}>
              <div className="stage-icon-indicator">
                {isCompleted ? (
                  <CheckCircle2 size={20} className="icon-completed" />
                ) : isCurrent ? (
                  <Loader2 size={20} className="icon-spinner" />
                ) : (
                  <div className="icon-pending-dot" />
                )}
              </div>

              <div className="stage-content">
                <div className="stage-title-wrap">
                  <span className="stage-step-num mono">Stage 0{stage.id}</span>
                  <h4 className="stage-title">{stage.title}</h4>
                </div>
                <p className="stage-description">
                  {isCurrent ? stage.description : (isCompleted ? 'Analysis complete. Signal metrics recorded.' : 'Queued for inspection.')}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="progress-footer-note">
        <p>{getFooterNote()}</p>
      </div>
    </div>
  );
}
