import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Film, 
  FileText, 
  AlertTriangle, 
  X, 
  Sparkles, 
  FileCode, 
  Check, 
  Play, 
  FileCheck2 
} from 'lucide-react';

export default function UploadZone({ 
  selectedFile, 
  filePreview, 
  onFileSelected, 
  onFileRemoved, 
  onStartAnalysis, 
  selectedPreset, 
  onPresetChange,
  modality = 'image',
  onModalityChange
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [docInputMode, setDocInputMode] = useState('paste'); // 'paste' | 'file'
  const [pastedText, setPastedText] = useState('');
  const fileInputRef = useRef(null);

  // Accepted formats and size limits per modality
  const MODALITY_CONFIGS = {
    image: {
      accept: 'image/png,image/jpeg,image/webp,image/bmp,image/tiff',
      extensions: ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'tiff'],
      maxSizeMB: 20,
      label: 'Image',
      hint: 'Supports standard image formats: PNG, JPG, JPEG, WEBP, TIFF (up to 20MB)',
      badge: 'Image Modality • Zero Data Retention',
      icon: ImageIcon
    },
    video: {
      accept: 'video/mp4,video/quicktime,video/webm,video/x-msvideo,video/x-matroska',
      extensions: ['mp4', 'mov', 'webm', 'avi', 'mkv'],
      maxSizeMB: 100,
      label: 'Video',
      hint: 'Supports standard video containers: MP4, MOV, WEBM (up to 100MB)',
      badge: 'Video Modality • Keyframe & Optical Flow Analysis',
      icon: Film
    },
    document: {
      accept: 'text/plain,text/markdown,application/pdf',
      extensions: ['txt', 'md', 'pdf', 'doc', 'docx'],
      maxSizeMB: 10,
      label: 'Document',
      hint: 'Supports plain text files (.txt, .md) or direct pasted text',
      badge: 'Document Modality • Stylometric & Perplexity Inspection',
      icon: FileText
    }
  };

  const config = MODALITY_CONFIGS[modality] || MODALITY_CONFIGS.image;

  const validateAndProcessFile = (file) => {
    setErrorMessage(null);
    if (!file) return;

    // Check extension
    const extension = file.name.split('.').pop().toLowerCase();
    const isValidExtension = config.extensions.includes(extension);

    if (!isValidExtension) {
      if (modality === 'image') {
        setErrorMessage(`Invalid file format "${file.name}". Authentix Image analysis strictly accepts image assets (PNG, JPG, WEBP, TIFF). Videos, audio, and documents are rejected.`);
      } else if (modality === 'video') {
        setErrorMessage(`Invalid file format "${file.name}". Authentix Video analysis strictly accepts MP4, MOV, or WEBM containers. Images, audio, and documents are rejected.`);
      } else {
        setErrorMessage(`Invalid file format "${file.name}". Authentix Document analysis accepts text documents (.txt, .md, .pdf) or direct text input.`);
      }
      return;
    }

    // Size limit validation
    if (file.size > config.maxSizeMB * 1024 * 1024) {
      setErrorMessage(`File exceeds the ${config.maxSizeMB}MB forensic processing limit for ${config.label} analysis. Please select a file under ${config.maxSizeMB}MB.`);
      return;
    }

    // Process file based on modality
    if (modality === 'document' && (extension === 'txt' || extension === 'md')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const textContent = e.target.result;
        const words = textContent.trim().split(/\s+/).filter(Boolean);
        if (words.length < 25) {
          setErrorMessage('Uploaded document is too brief for statistical stylometric convergence. Please provide a document with at least 25 words.');
          return;
        }
        onFileSelected(file, textContent);
      };
      reader.onerror = () => {
        setErrorMessage('Failed to read document contents. Please check file permissions.');
      };
      reader.readAsText(file);
    } else if (modality === 'video') {
      // Create an object URL for video preview or create poster
      const videoUrl = URL.createObjectURL(file);
      onFileSelected(file, videoUrl);
    } else {
      // Image reader
      const reader = new FileReader();
      reader.onload = (e) => {
        onFileSelected(file, e.target.result);
      };
      reader.onerror = () => {
        setErrorMessage('Failed to read image file. Please verify file permissions and try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleRemove = () => {
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setPastedText('');
    onFileRemoved();
  };

  const handleModalityToggle = (newModality) => {
    if (newModality === modality) return;
    handleRemove();
    onModalityChange(newModality);
  };

  // Handle direct pasted text submission for Document modality
  const handleStagePastedText = () => {
    setErrorMessage(null);
    const trimmed = pastedText.trim();
    const words = trimmed.split(/\s+/).filter(Boolean);

    if (words.length < 25) {
      setErrorMessage(`Input text is too brief (${words.length} words). Reliable stylometric and perplexity evaluation requires a minimum of 25 words.`);
      return;
    }

    const mockFile = new File(
      [trimmed], 
      'pasted_document_inspection.txt', 
      { type: 'text/plain', lastModified: Date.now() }
    );

    onFileSelected(mockFile, trimmed);
  };

  // Sample quick test files generator for rapid hackathon demo testing
  const handleLoadSample = (type) => {
    setErrorMessage(null);
    onPresetChange(type);

    if (modality === 'video') {
      loadVideoSample(type);
    } else if (modality === 'document') {
      loadDocumentSample(type);
    } else {
      loadImageSample(type);
    }
  };

  const loadImageSample = (type) => {
    let sampleName = '';
    let canvasColor = '#3b82f6';
    let sampleText = 'DSLR Camera Photo - Authentic Capture';

    if (type === 'low') {
      sampleName = 'sample_nikon_d850_dsc4912.jpg';
      canvasColor = '#1e3a5f';
      sampleText = 'Sample: Authentic Camera Capture';
    } else if (type === 'medium') {
      sampleName = 'sample_retouched_portrait_v2.png';
      canvasColor = '#4a2810';
      sampleText = 'Sample: Retouched Portrait / Mixed Artifacts';
    } else if (type === 'uncertain') {
      sampleName = 'sample_compressed_lowres_thumb.jpg';
      canvasColor = '#2b2d42';
      sampleText = 'Sample: Compressed Low-Res Social Media Asset';
    } else {
      sampleName = 'sample_diffusion_sdxl_gen084.png';
      canvasColor = '#3d1624';
      sampleText = 'Sample: Generative Diffusion Synthetic';
    }

    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 420;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(sampleText, canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = '14px JetBrains Mono, monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`Preset Scenario: ${type.toUpperCase()}`, canvas.width / 2, canvas.height / 2 + 25);
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Synthetic Media Forensics Test Bench', canvas.width / 2, canvas.height / 2 + 55);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    const mockBlob = new Blob([dataUrl], { type: 'image/jpeg' });
    const mockFile = new File([mockBlob], sampleName, { type: 'image/jpeg' });
    onFileSelected(mockFile, dataUrl);
  };

  const loadVideoSample = (type) => {
    let sampleName = '';
    let canvasColor = '#102a43';
    let sampleText = 'Authentic 1080p Camera Video';
    let durationText = '00:14 / 00:30 • 30fps';

    if (type === 'low') {
      sampleName = 'sample_cctv_optical_capture_1080p.mp4';
      canvasColor = '#0f2942';
      sampleText = 'Sample: Authentic Camera Capture (1080p)';
    } else if (type === 'medium') {
      sampleName = 'sample_talking_head_lip_sync_v2.mp4';
      canvasColor = '#451a03';
      sampleText = 'Sample: Reenactment / Mixed Temporal Jitter';
    } else if (type === 'uncertain') {
      sampleName = 'sample_whatsapp_compressed_360p.mp4';
      canvasColor = '#242b35';
      sampleText = 'Sample: Transcoded 360p Variable Frame Rate';
    } else {
      sampleName = 'sample_sora_diffusion_cinematic_4k.mp4';
      canvasColor = '#4a0e17';
      sampleText = 'Sample: Generative Video Diffusion';
    }

    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Film strip borders top and bottom
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, canvas.width, 36);
    ctx.fillRect(0, canvas.height - 36, canvas.width, 36);
    
    // Sprocket holes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let x = 12; x < canvas.width; x += 32) {
      ctx.fillRect(x, 8, 16, 20);
      ctx.fillRect(x, canvas.height - 28, 16, 20);
    }

    // Play icon circle
    ctx.fillStyle = 'rgba(2, 132, 199, 0.85)';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2 - 15, 32, 0, 2 * Math.PI);
    ctx.fill();

    // Play triangle
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 8, canvas.height / 2 - 27);
    ctx.lineTo(canvas.width / 2 + 14, canvas.height / 2 - 15);
    ctx.lineTo(canvas.width / 2 - 8, canvas.height / 2 - 3);
    ctx.closePath();
    ctx.fill();

    // Text info
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 17px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(sampleText, canvas.width / 2, canvas.height / 2 + 40);
    ctx.font = '13px JetBrains Mono, monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`${durationText} • GOP: IPPP`, canvas.width / 2, canvas.height / 2 + 62);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    const mockBlob = new Blob([dataUrl], { type: 'video/mp4' });
    const mockFile = new File([mockBlob], sampleName, { type: 'video/mp4' });
    onFileSelected(mockFile, dataUrl);
  };

  const loadDocumentSample = (type) => {
    let sampleName = '';
    let sampleContent = '';

    if (type === 'low') {
      sampleName = 'sample_investigative_journalism_draft.txt';
      sampleContent = `The municipal council's delayed decision regarding the stormwater reclamation easement caught nearly everyone off guard last Thursday. While public works officials had privately conceded that secondary runoff filtration was failing, few expected the subcommittee to shelve the entire remediation package until next autumn. 

As local hydrologist Dr. Maria Chen pointed out during the heated public comment period, delaying the culvert reinforcements past the monsoonal thaw virtually guarantees basement inundation across the lower ward. Her frustration was palpable, punctuated by sharp exchanges with the zoning commissioner over municipal bonding capacities and emergency reserve funds. Several neighborhood representatives walked out after the vote was formalized without an amended environmental impact addendum.`;
    } else if (type === 'medium') {
      sampleName = 'sample_hybrid_edited_executive_summary.txt';
      sampleContent = `Executive Summary: Modernizing Municipal Water Reclamation Pipelines.

The municipal infrastructure is facing unprecedented stress due to shifting climate patterns and increasing urbanization across suburban sectors. In this report, we examine the primary bottlenecks in the current runoff drainage grid.

Furthermore, it is crucial to analyze how localized filtration units operate under peak pressure. A multifaceted approach is required to resolve these systemic hurdles. First, the city should initiate structural repairs across prioritized sectors. Second, advanced telemetry sensors must be installed to monitor flow rates continuously. In conclusion, timely execution of this comprehensive plan will protect municipal equity, prevent civil infrastructure degradation, and optimize civic expenditures.`;
    } else if (type === 'uncertain') {
      sampleName = 'sample_brief_technical_abstract.txt';
      sampleContent = `Telemetry Snapshot: Sensor Array #409. 
Flow velocity: 1.84 m/s. Turbidity: 14.2 NTU. Temperature: 11.4°C. 
Warning: anomalous backpressure detected on auxiliary valve 3-B. 
Manual inspection recommended prior to next high-volume discharge window. Status: PENDING_REVIEW.`;
    } else {
      sampleName = 'sample_llm_generated_policy_paper.txt';
      sampleContent = `In today's rapidly evolving municipal landscape, the management of stormwater reclamation infrastructure stands as a paramount challenge for contemporary governance. It is widely acknowledged that efficient resource allocation serves as the cornerstone of resilient urban planning.

First and foremost, comprehensive infrastructure overhauls facilitate enhanced ecological sustainability. By modernizing filtration pipelines and updating municipal drainage protocols, civic authorities can effectively mitigate the adverse ramifications of severe storm events. Furthermore, by fostering synergistic collaboration among municipal stakeholders, local jurisdictions can achieve optimized logistical outcomes.

In conclusion, it is important to remember that addressing water reclamation is not merely a technical necessity, but a vital imperative for sustainable societal progress. Implementing robust frameworks ensures a brighter and more resilient future for all urban communities.`;
    }

    const mockBlob = new Blob([sampleContent], { type: 'text/plain' });
    const mockFile = new File([mockBlob], sampleName, { type: 'text/plain' });
    onFileSelected(mockFile, sampleContent);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getDocStats = (text) => {
    if (!text || typeof text !== 'string') return { words: 0, chars: 0 };
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const chars = text.length;
    return { words, chars };
  };

  const Icon = config.icon;

  return (
    <div className="upload-zone-wrapper">
      {/* 1. Modality Selector: Simple, unobtrusive 3-option toggle/tab */}
      <div className="modality-selector-container">
        <div className="modality-selector-group" role="tablist" aria-label="Media Modality Selector">
          <button 
            type="button"
            role="tab"
            aria-selected={modality === 'image'}
            className={`modality-tab ${modality === 'image' ? 'active' : ''}`}
            onClick={() => handleModalityToggle('image')}
            id="modality-tab-image"
          >
            <ImageIcon size={15} />
            <span>Image</span>
          </button>

          <button 
            type="button"
            role="tab"
            aria-selected={modality === 'video'}
            className={`modality-tab ${modality === 'video' ? 'active' : ''}`}
            onClick={() => handleModalityToggle('video')}
            id="modality-tab-video"
          >
            <Film size={15} />
            <span>Video</span>
          </button>

          <button 
            type="button"
            role="tab"
            aria-selected={modality === 'document'}
            className={`modality-tab ${modality === 'document' ? 'active' : ''}`}
            onClick={() => handleModalityToggle('document')}
            id="modality-tab-document"
          >
            <FileText size={15} />
            <span>Document</span>
          </button>
        </div>
      </div>

      {/* Inline Validation Error Notification */}
      {errorMessage && (
        <div className="alert-box alert-error" role="alert">
          <AlertTriangle size={20} className="alert-icon" />
          <div className="alert-content">
            <h4 className="alert-title">Forensic Ingestion Notice</h4>
            <p className="alert-description">{errorMessage}</p>
          </div>
          <button 
            className="alert-dismiss-btn"
            onClick={() => setErrorMessage(null)}
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Upload Box / Dropzone / Document Input */}
      {!selectedFile ? (
        modality === 'document' ? (
          /* Document Input: Support pasted text and file upload */
          <div className="document-input-card">
            <div className="document-tab-controls">
              <button 
                type="button"
                className={`doc-mode-btn ${docInputMode === 'paste' ? 'active' : ''}`}
                onClick={() => setDocInputMode('paste')}
              >
                <span>Paste Text Directly</span>
              </button>
              <button 
                type="button"
                className={`doc-mode-btn ${docInputMode === 'file' ? 'active' : ''}`}
                onClick={() => setDocInputMode('file')}
              >
                <span>Upload Text File (.txt, .md)</span>
              </button>
            </div>

            {docInputMode === 'paste' ? (
              <div className="document-paste-wrapper">
                <textarea 
                  className="document-textarea"
                  placeholder="Paste article, essay, or excerpt to inspect for LLM stylometric and structural patterns (minimum 25 words)..."
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  rows={8}
                  id="document-paste-input"
                />
                <div className="document-textarea-footer">
                  <div className="document-counts mono">
                    <span>{getDocStats(pastedText).words} words</span>
                    <span className="count-divider">•</span>
                    <span>{getDocStats(pastedText).chars} characters</span>
                  </div>
                  <button 
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleStagePastedText}
                    disabled={getDocStats(pastedText).words < 5}
                    id="stage-text-btn"
                  >
                    <Sparkles size={14} />
                    <span>Stage Text for Analysis</span>
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className={`dropzone-container doc-dropzone ${isDragging ? 'is-dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept={config.accept}
                  style={{ display: 'none' }}
                  id="authentix-file-input"
                />
                <div className="dropzone-icon-box">
                  <FileText size={36} strokeWidth={1.8} />
                </div>
                <h3 className="dropzone-title">
                  Drag and drop a document here, or <span className="text-action">browse files</span>
                </h3>
                <p className="dropzone-hint">{config.hint}</p>
                <div className="dropzone-modality-badge">
                  <FileText size={14} />
                  <span>{config.badge}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Image and Video Dropzone */
          <div 
            className={`dropzone-container ${isDragging ? 'is-dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept={config.accept}
              style={{ display: 'none' }}
              id="authentix-file-input"
            />

            <div className="dropzone-icon-box">
              <Icon size={36} strokeWidth={1.8} />
            </div>

            <h3 className="dropzone-title">
              Drag and drop a {config.label.toLowerCase()} here, or <span className="text-action">browse files</span>
            </h3>

            <p className="dropzone-hint">{config.hint}</p>

            <div className="dropzone-modality-badge">
              <Icon size={14} />
              <span>{config.badge}</span>
            </div>
          </div>
        )
      ) : (
        /* File Staged / Preview State */
        <div className="file-preview-card">
          <div className="preview-media-row">
            {/* Visual preview according to modality */}
            <div className="preview-thumbnail-wrap">
              {modality === 'document' ? (
                <div className="preview-doc-icon-wrap">
                  <FileCheck2 size={36} className="text-action" />
                </div>
              ) : (
                <img 
                  src={filePreview} 
                  alt="Uploaded media preview" 
                  className="preview-thumbnail-img" 
                />
              )}
            </div>

            <div className="preview-info">
              <div className="preview-header-line">
                <span className="preview-badge">Staged for {config.label} Inspection</span>
                <span className="preview-size mono">
                  {modality === 'document' && typeof filePreview === 'string'
                    ? `${getDocStats(filePreview).words} words • ${formatFileSize(selectedFile.size)}`
                    : formatFileSize(selectedFile.size)}
                </span>
              </div>
              <h4 className="preview-filename">{selectedFile.name}</h4>
              <p className="preview-mimetype mono">{selectedFile.type || `${modality}/standard`}</p>

              {/* Text excerpt preview for document */}
              {modality === 'document' && typeof filePreview === 'string' && (
                <div className="preview-text-snippet">
                  <p className="snippet-quote">"{filePreview.slice(0, 160).trim()}..."</p>
                </div>
              )}
            </div>

            <button 
              className="preview-remove-btn"
              onClick={handleRemove}
              title="Remove and select another file"
              aria-label="Remove asset"
            >
              <X size={18} />
            </button>
          </div>

          {/* Action Trigger */}
          <div className="preview-actions-bar">
            <button 
              className="btn btn-primary"
              onClick={onStartAnalysis}
              id="start-analysis-btn"
            >
              <Sparkles size={16} />
              <span>Begin Forensic Risk Analysis</span>
            </button>
            <button 
              className="btn btn-secondary"
              onClick={handleRemove}
            >
              Change Asset
            </button>
          </div>
        </div>
      )}

      {/* Mock Evaluation Scenario Preset Controls */}
      <div className="demo-preset-panel">
        <div className="preset-panel-header">
          <span className="preset-panel-title">Demo {config.label} Presets:</span>
          <span className="preset-panel-sub">
            Evaluate how Authentix calibrates explainability across different risk tiers
          </span>
        </div>

        <div className="preset-button-group">
          <button 
            className={`preset-btn ${selectedPreset === 'low' ? 'preset-active' : ''}`}
            onClick={() => handleLoadSample('low')}
          >
            <span className="preset-dot dot-low" />
            <span>Low Risk {modality === 'video' ? '(93%)' : modality === 'document' ? '(95%)' : '(94%)'}</span>
          </button>

          <button 
            className={`preset-btn ${selectedPreset === 'medium' ? 'preset-active' : ''}`}
            onClick={() => handleLoadSample('medium')}
          >
            <span className="preset-dot dot-medium" />
            <span>Medium Risk {modality === 'video' ? '(74%)' : modality === 'document' ? '(72%)' : '(76%)'}</span>
          </button>

          <button 
            className={`preset-btn ${selectedPreset === 'uncertain' ? 'preset-active' : ''}`}
            onClick={() => handleLoadSample('uncertain')}
          >
            <span className="preset-dot dot-uncertain" />
            <span>Uncertain {modality === 'video' ? '(53%)' : modality === 'document' ? '(49%)' : '(51%)'}</span>
          </button>

          <button 
            className={`preset-btn ${selectedPreset === 'high' ? 'preset-active' : ''}`}
            onClick={() => handleLoadSample('high')}
          >
            <span className="preset-dot dot-high" />
            <span>High Risk {modality === 'video' ? '(97%)' : modality === 'document' ? '(98%)' : '(98%)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
