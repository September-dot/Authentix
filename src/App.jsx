import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import MethodologyPage from './pages/MethodologyPage';
import { MOCK_RESULTS } from './data/mockResults';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [activeResult, setActiveResult] = useState(null);

  // Scroll to top upon page navigation
  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisComplete = (resultPayload) => {
    setActiveResult(resultPayload);
    setCurrentPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyzeAnother = () => {
    setCurrentPage('upload');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewMethodology = () => {
    setCurrentPage('methodology');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout">
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        hasActiveResult={Boolean(activeResult)}
      />

      <main className="app-main-content">
        {currentPage === 'landing' && (
          <LandingPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'upload' && (
          <UploadPage onAnalysisComplete={handleAnalysisComplete} />
        )}

        {currentPage === 'results' && (
          <ResultsPage 
            resultData={activeResult || MOCK_RESULTS.low}
            onAnalyzeAnother={handleAnalyzeAnother}
            onViewMethodology={handleViewMethodology}
          />
        )}

        {currentPage === 'methodology' && (
          <MethodologyPage onNavigate={handleNavigate} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
