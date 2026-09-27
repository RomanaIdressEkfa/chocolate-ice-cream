'use client';

import { motion } from 'framer-motion';

export default function ScrollCues() {
  return (
    <>
      <motion.span
        className="scroll-cue scroll-cue--left"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.6 }}
      >
        Scroll Down
      </motion.span>
      <motion.span
        className="scroll-cue scroll-cue--right"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.72 }}
      >
        Scroll Down
      </motion.span>
    </>
  );
}
