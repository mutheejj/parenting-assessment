import React from 'react';
import { motion } from 'framer-motion';

interface LikertScaleProps {
  value: number;
  onChange: (value: number) => void;
}

const LikertScale: React.FC<LikertScaleProps> = ({ value, onChange }) => {
  const options = [
    { value: 1, label: 'Strongly Disagree' },
    { value: 2, label: 'Disagree' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Agree' },
    { value: 5, label: 'Strongly Agree' },
  ];

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center items-center">
      {options.map((option) => (
        <motion.button
          key={option.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto
            ${
              value === option.value
                ? 'bg-primary-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }
            transition-colors duration-200`}
        >
          {option.label}
        </motion.button>
      ))}
    </div>
  );
};

export default LikertScale;
