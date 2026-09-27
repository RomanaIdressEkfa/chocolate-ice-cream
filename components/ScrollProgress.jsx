'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** A hairline across the top that fills as you move through the page. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
