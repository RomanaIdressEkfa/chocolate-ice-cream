'use client';

import { motion } from 'framer-motion';
import { viewportOnce } from './motion';

/**
 * A headline that arrives word by word from behind its own baseline, each
 * word masked by its own wrapper so nothing shows above the line.
 */
export default function SplitText({ as = 'h2', className = '', lines, delay = 0 }) {
  const Tag = motion[as] ?? motion.h2;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.045, delayChildren: delay } },
      }}
    >
      {lines.map((line, li) => (
        <span className="split__line" key={line}>
          {line.split(' ').map((word, wi) => (
            <span className="split__word" key={`${li}-${wi}-${word}`}>
              <motion.span
                className="split__inner"
                variants={{
                  hidden: { y: '110%', rotate: 4 },
                  show: {
                    y: '0%',
                    rotate: 0,
                    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
