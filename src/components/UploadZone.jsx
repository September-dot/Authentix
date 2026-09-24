import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Film, 
  FileText, 
  AlertTriangle, 
  X, 
  Sparkles, 
  FileCheck2 
} from 'lucide-react';

export default function UploadZone({ 
  selectedFile, 
  filePreview, 
  onFileSelected, 
  onFileRemoved, 
  onStartAnalysis, 
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
                  placeholder="Paste article, essay, or document excerpt to inspect for LLM stylometric and structural patterns (minimum 25 words)..."
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
    </div>
  );
}
