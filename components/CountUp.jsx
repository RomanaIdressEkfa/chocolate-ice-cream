'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

/** Counts up to its value the first time it is seen, keeping any leading zero. */
export default function CountUp({ value, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [shown, setShown] = useState('0');

  useEffect(() => {
    if (!inView) return undefined;

    const target = Number(value);
    const pad = String(value).length;

    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(String(Math.round(v)).padStart(pad, '0')),
    });

    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
