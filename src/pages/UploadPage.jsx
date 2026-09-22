import React, { useState } from 'react';
import UploadZone from '../components/UploadZone';
import AnalysisProgress from '../components/AnalysisProgress';
import { MODALITY_RESULTS, MOCK_RESULTS } from '../data/mockResults';

export default function UploadPage({ onAnalysisComplete }) {
  const [selectedModality, setSelectedModality] = useState('image');
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('low');

  const handleModalityChange = (newModality) => {
    setSelectedModality(newModality);
    setSelectedFile(null);
    setFilePreview(null);
    setSelectedPreset('low');
  };

  const handleFileSelected = (file, previewUrl) => {
    setSelectedFile(file);
    setFilePreview(previewUrl);

    // Auto-select preset based on filename if it contains keywords
    const lower = file.name.toLowerCase();
    if (lower.includes('fake') || lower.includes('diffusion') || lower.includes('ai') || lower.includes('sora') || lower.includes('llm') || lower.includes('synth')) {
      setSelectedPreset('high');
    } else if (lower.includes('retouch') || lower.includes('edit') || lower.includes('medium') || lower.includes('hybrid') || lower.includes('sync')) {
      setSelectedPreset('medium');
    } else if (lower.includes('compress') || lower.includes('lowres') || lower.includes('thumb') || lower.includes('uncertain') || lower.includes('brief')) {
      setSelectedPreset('uncertain');
    }
  };

  const handleFileRemoved = () => {
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleStartAnalysis = () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
  };

  const handleProgressComplete = () => {
    // Select the mock result corresponding to the active modality and preset
    const modalityCatalog = MODALITY_RESULTS[selectedModality] || MODALITY_RESULTS.image;
    const resultTemplate = modalityCatalog[selectedPreset] || modalityCatalog.low;
    
    // Package analyzed asset data
    const analysisPayload = {
      ...resultTemplate,
      modality: selectedModality,
      assetMeta: {
        filename: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type || (selectedModality === 'document' ? 'text/plain' : selectedModality === 'video' ? 'video/mp4' : 'image/jpeg'),
        previewUrl: filePreview,
        analyzedAt: new Date().toISOString()
      }
    };

    setIsAnalyzing(false);
    onAnalysisComplete(analysisPayload);
  };

  const getPageSubtitle = () => {
    switch (selectedModality) {
      case 'video':
        return 'Upload a video file for temporal coherence and frame artifact assessment. Supported formats include MP4, MOV, and WEBM.';
      case 'document':
        return 'Analyze written documents or pasted text for stylometric and structural LLM indicators. Supports TXT, MD, or direct text input.';
      case 'image':
      default:
        return 'Upload an image for automated explainable risk assessment. Supported formats include PNG, JPG, JPEG, WEBP, and TIFF.';
    }
  };

  return (
    <div className="upload-page-container">
      <div className="container">
        <header className="page-header">
          <span className="badge" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', marginBottom: '8px' }}>
            Forensic Ingestion Console
          </span>
          <h1 className="page-title">Forensic Media Inspection</h1>
          <p className="page-subtitle">
            {getPageSubtitle()}
          </p>
        </header>

        {isAnalyzing ? (
          <AnalysisProgress 
            selectedFileName={selectedFile ? selectedFile.name : ''}
            modality={selectedModality}
            onAnalysisComplete={handleProgressComplete}
          />
        ) : (
          <UploadZone
            selectedFile={selectedFile}
            filePreview={filePreview}
            onFileSelected={handleFileSelected}
            onFileRemoved={handleFileRemoved}
            onStartAnalysis={handleStartAnalysis}
            selectedPreset={selectedPreset}
            onPresetChange={setSelectedPreset}
            modality={selectedModality}
            onModalityChange={handleModalityChange}
          />
        )}
      </div>
    </div>
  );
}
