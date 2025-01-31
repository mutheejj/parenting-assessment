import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../contexts/AssessmentContext';
import { parentingStyles } from '../data/questions';
import { pdf, PDFDownloadLink } from '@react-pdf/renderer';
import ResultsPDF from '../components/ResultsPDF';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, resetAssessment } = useAssessment();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  const [pdfGenerating, setPdfGenerating] = useState(false);

  React.useEffect(() => {
    if (!state.result) {
      navigate('/');
    }
  }, [state.result, navigate]);

  if (!state.result) return null;

  const { predominantStyle, scores, blendedStyles } = state.result;
  const mainStyle = parentingStyles[predominantStyle];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const handleRetake = () => {
    resetAssessment();
    navigate('/');
  };

  const handleShare = () => {
    const subject = 'My Parenting Style Assessment Results';
    const body = `
      My predominant parenting style is: ${mainStyle.title}
      
      Key characteristics:
      ${mainStyle.characteristics.join('\n')}
      
      Personal recommendations:
      ${mainStyle.recommendations.join('\n')}
    `;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result?.toString().split(',')[1];
        if (base64data) {
          resolve(base64data);
        } else {
          reject(new Error('Failed to convert PDF to base64'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read PDF file'));
      reader.readAsDataURL(blob);
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setEmailError('');
    setEmailSuccess('');
    
    // Validate email
    if (!email) {
      setEmailError('Please enter an email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      setSending(true);
      setPdfGenerating(true);
      
      // Generate PDF
      const pdfBlob = await pdf(
        <ResultsPDF 
          predominantStyle={mainStyle}
          blendedStyles={blendedStyles.map(style => parentingStyles[style])}
          scores={scores}
        />
      ).toBlob();

      // Convert blob to base64
      const base64data = await convertBlobToBase64(pdfBlob);
      setPdfGenerating(false);
      
      // Send to backend
      const response = await fetch('http://localhost:3001/send-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail: email,
          pdfBuffer: base64data,
          subject: 'Your Parenting Assessment Results',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send email');
      }

      setEmailSuccess('Results sent successfully!');
      setEmail('');
    } catch (error) {
      console.error('Email sending error:', error);
      setEmailError(error instanceof Error ? error.message : 'Failed to send results. Please try again.');
    } finally {
      setSending(false);
      setPdfGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      <motion.div
        className="max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Your Parenting Style Results
          </h1>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-600 mb-4">
              {mainStyle.title}
            </h2>
            <p className="text-gray-600 mb-4">{mainStyle.description}</p>
            
            {blendedStyles.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  You also show traits of:
                  {blendedStyles.map((style) => (
                    <span key={style} className="ml-2 inline-block bg-primary-100 text-primary-800 px-2 py-1 rounded">
                      {parentingStyles[style].title}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Key Characteristics</h3>
              <ul className="space-y-2">
                {mainStyle.characteristics.map((trait, index) => (
                  <li key={index} className="text-gray-600">• {trait}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
              <ul className="space-y-2">
                {mainStyle.recommendations.map((rec, index) => (
                  <li key={index} className="text-gray-600">• {rec}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center space-x-4">
            <button
              onClick={handleRetake}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Retake Assessment
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Share Results
            </button>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-4">Score Breakdown</h3>
          <div className="space-y-4">
            {Object.entries(scores).map(([style, score]) => (
              <div key={style}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {parentingStyles[style].title}
                  </span>
                  <span className="text-sm text-gray-500">{score}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-primary-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / 30) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8">
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Results
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter email address"
                />
              </div>
              {emailError && (
                <p className="mt-2 text-sm text-red-600">{emailError}</p>
              )}
              {emailSuccess && (
                <p className="mt-2 text-sm text-green-600">{emailSuccess}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={sending || pdfGenerating}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                (sending || pdfGenerating) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {pdfGenerating ? 'Generating PDF...' : sending ? 'Sending...' : 'Send Results'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <PDFDownloadLink
              document={
                <ResultsPDF
                  predominantStyle={mainStyle}
                  blendedStyles={blendedStyles.map(style => parentingStyles[style])}
                  scores={scores}
                />
              }
              fileName="parenting-assessment-results.pdf"
              className="text-primary-600 hover:text-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download Results as PDF
            </PDFDownloadLink>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
