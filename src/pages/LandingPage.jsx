import React from 'react';
import { ShieldCheck, ArrowRight, BookOpen, CheckCircle, AlertTriangle, Eye, Lock, Cpu, Sliders } from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="landing-page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge-row">
            <span className="badge badge-hero">
              <ShieldCheck size={14} />
              <span>Explainable AI Risk Detection System</span>
            </span>
          </div>

          <h1 className="hero-headline">
            Detect synthetic media risk.<br />
            Understand exactly why.
          </h1>

          <p className="hero-subhead">
            Authentix replaces black-box "percent-fake" scores with rigorous, explainable forensic signals, 
            calibrated confidence bounds, and explicit operational limitations.
          </p>

          <div className="hero-cta-group">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('upload')}
              id="hero-analyze-cta"
            >
              <span>Analyze an Image</span>
              <ArrowRight size={18} />
            </button>

            <button 
              className="btn btn-secondary btn-lg"
              onClick={() => onNavigate('methodology')}
            >
              <BookOpen size={18} />
              <span>Read Detection Methodology</span>
            </button>
          </div>

          {/* Quick Pillars Row */}
          <div className="hero-pillars-grid">
            <div className="pillar-item">
              <div className="pillar-header">
                <Sliders size={18} className="text-action" />
                <span className="pillar-title">Coupled Confidence</span>
              </div>
              <p className="pillar-desc">
                Risk tiers are strictly paired with calibrated confidence scores, preventing false certitude.
              </p>
            </div>

            <div className="pillar-item">
              <div className="pillar-header">
                <Cpu size={18} className="text-action" />
                <span className="pillar-title">Explainable Evidence</span>
              </div>
              <p className="pillar-desc">
                Multi-domain signal breakdown detailing frequency grids, sensor noise, and anatomical physics.
              </p>
            </div>

            <div className="pillar-item">
              <div className="pillar-header">
                <AlertTriangle size={18} className="text-action" />
                <span className="pillar-title">Mandatory Limitations</span>
              </div>
              <p className="pillar-desc">
                Detection boundaries and compression vulnerabilities remain permanently visible on every report.
              </p>
            </div>

            <div className="pillar-item">
              <div className="pillar-header">
                <Lock size={18} className="text-action" />
                <span className="pillar-title">Zero Image Retention</span>
              </div>
              <p className="pillar-desc">
                Processing occurs entirely in your current session; images are never retained or indexed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Black Box vs Authentix */}
      <section className="comparison-section">
        <div className="container">
          <div className="section-intro">
            <h2 className="section-title">Why Explainability Matters in Synthetic Media Detection</h2>
            <p className="section-description">
              Conventional detectors output an uncalibrated number with zero reasoning. In sensitive journalism, 
              legal scrutiny, and threat intelligence, an unexplained percentage is not actionable evidence.
            </p>
          </div>

          <div className="comparison-grid">
            <div className="card comparison-card conventional-card">
              <div className="comparison-card-header">
                <span className="comparison-label label-flawed">Conventional AI Detectors</span>
                <h3 className="comparison-h3">Opaque Black-Box Verdict</h3>
              </div>
              <ul className="comparison-list">
                <li className="comparison-item negative">
                  <span className="comp-bullet comp-bullet-neg">✕</span>
                  <span><strong>Arbitrary single metric:</strong> Displays "87% Fake" without clarifying whether confidence is 50% or 99%.</span>
                </li>
                <li className="comparison-item negative">
                  <span className="comp-bullet comp-bullet-neg">✕</span>
                  <span><strong>Zero forensic rationale:</strong> Provides no evidence of which pixels, frequencies, or artifacts triggered the result.</span>
                </li>
                <li className="comparison-item negative">
                  <span className="comp-bullet comp-bullet-neg">✕</span>
                  <span><strong>Hides algorithmic failure modes:</strong> Conceals how compression, downscaling, or sharpening skew the output.</span>
                </li>
                <li className="comparison-item negative">
                  <span className="comp-bullet comp-bullet-neg">✕</span>
                  <span><strong>No operational guidance:</strong> Leaves analysts guessing on whether to reject, verify, or archive.</span>
                </li>
              </ul>
            </div>

            <div className="card comparison-card authentix-card">
              <div className="comparison-card-header">
                <span className="comparison-label label-positive">Authentix Approach</span>
                <h3 className="comparison-h3">Explainable Multi-Vector Architecture</h3>
              </div>
              <ul className="comparison-list">
                <li className="comparison-item positive">
                  <span className="comp-bullet comp-bullet-pos">✓</span>
                  <span><strong>Coupled Risk & Confidence:</strong> Risk tiers are never presented without their calibrated statistical confidence.</span>
                </li>
                <li className="comparison-item positive">
                  <span className="comp-bullet comp-bullet-pos">✓</span>
                  <span><strong>Concrete Evidence Breakdown:</strong> Inspects Fourier spectrums, PRNU sensor noise, and specular light vectors.</span>
                </li>
                <li className="comparison-item positive">
                  <span className="comp-bullet comp-bullet-pos">✓</span>
                  <span><strong>Uncollapsible Limitations:</strong> System constraints and risk of false signals are prominently declared on every report.</span>
                </li>
                <li className="comparison-item positive">
                  <span className="comp-bullet comp-bullet-pos">✓</span>
                  <span><strong>Actionable Next Protocols:</strong> Prescribes clear verification steps tailored to the observed risk severity.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Forensic Inspection Modules */}
      <section className="modules-section">
        <div className="container">
          <div className="section-intro">
            <h2 className="section-title">Forensic Signal Extraction Pipeline</h2>
            <p className="section-description">
              Authentix evaluates visual assets across four complementary forensic dimensions:
            </p>
          </div>

          <div className="modules-grid">
            <div className="card module-card">
              <span className="module-number mono">01</span>
              <h3 className="module-title">Frequency Spectrum Analysis</h3>
              <p className="module-text">
                Calculates Fast Fourier Transforms (FFT) to uncover periodic grid peaks and checkerboard patterns left by generative upsampling layers.
              </p>
            </div>

            <div className="card module-card">
              <span className="module-number mono">02</span>
              <h3 className="module-title">Sensor Noise (PRNU) Residuals</h3>
              <p className="module-text">
                Extracts physical photo-response non-uniformity noise left by camera silicon sensors to identify synthetic or spliced regions.
              </p>
            </div>

            <div className="card module-card">
              <span className="module-number mono">03</span>
              <h3 className="module-title">Anatomical & Optical Physics</h3>
              <p className="module-text">
                Assesses geometric consistency of corneal eye reflections, dental symmetries, and lighting vectors against real-world optical laws.
              </p>
            </div>

            <div className="card module-card">
              <span className="module-number mono">04</span>
              <h3 className="module-title">DCT Compression Quantization</h3>
              <p className="module-text">
                Analyzes 8x8 block grid alignments and quantization tables to detect double-compression traces, re-saving, and local boundary manipulation.
              </p>
            </div>
          </div>

          <div className="landing-bottom-cta">
            <div className="card bottom-cta-card">
              <div>
                <h3 className="bottom-cta-title">Ready to evaluate an image?</h3>
                <p className="bottom-cta-sub">
                  Upload an image for instant explainable forensic inspection with zero data storage.
                </p>
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => onNavigate('upload')}
              >
                <span>Launch Analysis Console</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
