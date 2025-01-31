import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AssessmentState, Answer, AssessmentResult, ParentingStyle } from '../types';

interface AssessmentContextType {
  state: AssessmentState;
  submitAnswer: (answer: Answer) => void;
  goToPreviousQuestion: () => void;
  calculateResult: () => void;
  resetAssessment: () => void;
}

const initialState: AssessmentState = {
  currentQuestionIndex: 0,
  answers: [],
  result: null,
};

type Action =
  | { type: 'SUBMIT_ANSWER'; payload: Answer }
  | { type: 'GO_TO_PREVIOUS' }
  | { type: 'SET_RESULT'; payload: AssessmentResult }
  | { type: 'RESET' };

const calculateParentingStyle = (answers: Answer[]): AssessmentResult => {
  const scores = {
    authoritative: 0,
    authoritarian: 0,
    permissive: 0,
    neglectful: 0,
  };

  answers.forEach((answer) => {
    scores[answer.category] += answer.score;
  });

  const maxScore = Math.max(...Object.values(scores));
  const predominantStyle = Object.entries(scores).find(
    ([_, score]) => score === maxScore
  )![0] as ParentingStyle;

  const threshold = maxScore - 2;
  const blendedStyles = Object.entries(scores)
    .filter(([style, score]) => score >= threshold && style !== predominantStyle)
    .map(([style]) => style as ParentingStyle);

  return {
    predominantStyle,
    scores,
    blendedStyles,
  };
};

const assessmentReducer = (state: AssessmentState, action: Action): AssessmentState => {
  switch (action.type) {
    case 'SUBMIT_ANSWER':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answers: [
          ...state.answers.filter((a) => a.questionId !== action.payload.questionId),
          action.payload,
        ],
      };
    case 'GO_TO_PREVIOUS':
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
      };
    case 'SET_RESULT':
      return {
        ...state,
        result: action.payload,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const submitAnswer = (answer: Answer) => {
    dispatch({ type: 'SUBMIT_ANSWER', payload: answer });
  };

  const goToPreviousQuestion = () => {
    dispatch({ type: 'GO_TO_PREVIOUS' });
  };

  const calculateResult = () => {
    const result = calculateParentingStyle(state.answers);
    dispatch({ type: 'SET_RESULT', payload: result });
  };

  const resetAssessment = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <AssessmentContext.Provider
      value={{
        state,
        submitAnswer,
        goToPreviousQuestion,
        calculateResult,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
