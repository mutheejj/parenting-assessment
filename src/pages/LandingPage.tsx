import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { parentingStyles } from '../data/questions';

const LandingPage: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Parenting Style Assessment
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover your parenting style and get personalized insights to enhance your
              parenting journey.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
            {Object.entries(parentingStyles).map(([key, style]) => (
              <div
                key={key}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {style.title}
                </h3>
                <p className="text-gray-600 text-sm">{style.description}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Link
              to="/assessment"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
            >
              Start Assessment
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Takes about 5-10 minutes to complete
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Why Take This Assessment?
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Understand your natural parenting tendencies</li>
              <li>• Identify areas for growth and improvement</li>
              <li>• Get personalized recommendations</li>
              <li>• Learn about different parenting approaches</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
