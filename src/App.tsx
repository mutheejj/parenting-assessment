import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AssessmentProvider } from './contexts/AssessmentContext';
import LandingPage from './pages/LandingPage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';

const App: React.FC = () => {
  return (
    <Router>
      <AssessmentProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </AssessmentProvider>
    </Router>
  );
};

export default App;
