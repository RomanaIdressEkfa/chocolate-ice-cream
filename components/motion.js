// Shared Framer Motion variants so every section moves with the same hand.

export const easeOut = [0.22, 1, 0.36, 1];

export const viewportOnce = { once: true, amount: 0.2 };

export const fadeUp = {
  hidden: { y: 44, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1.05, ease: easeOut } },
};

export const stagger = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const maskLine = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 1.15, ease: easeOut } },
};

/**
 * Cards sail in from off screen: the first pair from the left, the second from
 * the right, each pair split between above and below, then settle on a spring.
 */
export const flyIn = (i) => {
  const fromLeft = i % 4 < 2;
  const fromTop = i % 2 === 0;

  return {
    hidden: {
      x: fromLeft ? -440 : 440,
      y: fromTop ? -210 : 210,
      rotate: fromLeft ? -16 : 16,
      scale: 0.84,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 40,
        damping: 17,
        mass: 1.2,
        delay: i * 0.14,
        opacity: { duration: 0.6, delay: i * 0.14 },
      },
    },
  };
};
