'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Leans toward the pointer while it is nearby, then springs back. */
export default function Magnetic({ children, className = '', strength = 0.35 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const config = { stiffness: 220, damping: 18, mass: 0.6 };
  const sx = useSpring(x, config);
  const sy = useSpring(y, config);

  const follow = (event) => {
    const r = ref.current.getBoundingClientRect();
    x.set((event.clientX - (r.left + r.width / 2)) * strength);
    y.set((event.clientY - (r.top + r.height / 2)) * strength);
  };

  const release = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={follow}
      onMouseLeave={release}
    >
      {children}
    </motion.div>
  );
}
