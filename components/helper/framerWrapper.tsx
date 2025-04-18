'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface MoveProps {
  children: React.ReactNode;
}

export const RightToLeftMove: React.FC<MoveProps> = ({ children }) => {
  return (
    <motion.div
      className="move"
      initial={{ x: '100px' }}  // Start 100px to the right
      animate={{ x: 0 }}        // Move to its natural position
      transition={{ duration: 1, ease: 'easeInOut' }} // Set the duration and easing
    >
      {children}
    </motion.div>
  );
};

export const LeftToRightMove: React.FC<MoveProps> = ({ children }) => {
  return (
    <motion.div
      className="move"
      initial={{ x: '-400px' }} // Start 100px to the left
      animate={{ x: 0 }}        // Move to its natural position
      transition={{ duration: 3, ease: 'easeInOut' }} // Set the duration and easing
    >
      {children}
    </motion.div>
  );
};

export const TopToBottomMove: React.FC<MoveProps> = ({ children }) => {
  return (
    <motion.div
      className="move"
      initial={{ y: '-100px' }} // Start 100px above
      animate={{ y: 0 }}        // Move to its natural position
      transition={{ duration: 1, ease: 'easeInOut' }} // Set the duration and easing
    >
      {children}
    </motion.div>
  );
};

export const BottomToTopMove: React.FC<MoveProps> = ({ children }) => {
  return (
    <motion.div
      className="move"
      initial={{ y: '100px' }}  // Start 100px below
      animate={{ y: 0 }}        // Move to its natural position
      transition={{ duration: 1, ease: 'easeInOut' }} // Set the duration and easing
    >
      {children}
    </motion.div>
  );
};
