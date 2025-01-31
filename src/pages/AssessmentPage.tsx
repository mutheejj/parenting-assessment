import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { useAssessment } from '../contexts/AssessmentContext';
import ProgressBar from '../components/ProgressBar';
import LikertScale from '../components/LikertScale';

const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, submitAnswer, goToPreviousQuestion, calculateResult } = useAssessment();
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);

  const currentQuestion = questions[state.currentQuestionIndex];
  const previousAnswer = state.answers.find(
    (a) => a.questionId === currentQuestion.id
  )?.score;

  React.useEffect(() => {
    setCurrentAnswer(previousAnswer || null);
  }, [state.currentQuestionIndex, previousAnswer]);

  const handleNext = () => {
    if (currentAnswer === null) return;

    submitAnswer({
      questionId: currentQuestion.id,
      score: currentAnswer,
      category: currentQuestion.category,
    });

    if (state.currentQuestionIndex === questions.length - 1) {
      calculateResult();
      navigate('/results');
    }
  };

  const containerVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        <ProgressBar
          current={state.currentQuestionIndex + 1}
          total={questions.length}
        />

        <motion.div
          key={currentQuestion.id}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            {currentQuestion.text}
          </h2>

          <div className="mb-8">
            <LikertScale
              value={currentAnswer || 0}
              onChange={(value) => setCurrentAnswer(value)}
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={goToPreviousQuestion}
              disabled={state.currentQuestionIndex === 0}
              className={`px-6 py-2 rounded-md text-sm font-medium
                ${
                  state.currentQuestionIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={currentAnswer === null}
              className={`px-6 py-2 rounded-md text-sm font-medium
                ${
                  currentAnswer === null
                    ? 'bg-primary-300 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }
              `}
            >
              {state.currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AssessmentPage;
