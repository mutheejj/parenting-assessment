import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <motion.div
        className="h-2.5 rounded-full bg-primary-600"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
      <p className="text-sm text-gray-600 mt-2 text-center">
        Question {current} of {total}
      </p>
    </div>
  );
};

export default ProgressBar;
