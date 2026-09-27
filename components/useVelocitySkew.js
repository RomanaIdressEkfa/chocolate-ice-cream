'use client';

import { useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

/**
 * Leans content very slightly with the speed of the scroll and straightens it
 * the moment you stop. Kept small on purpose: it should be felt, not seen.
 */
export default function useVelocitySkew({ max = 4, divisor = 260 } = {}) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  const smooth = useSpring(velocity, { stiffness: 90, damping: 30, mass: 0.7 });

  const skewY = useTransform(smooth, (v) => {
    const skew = v / divisor;
    return Math.max(-max, Math.min(max, skew));
  });

  return skewY;
}
