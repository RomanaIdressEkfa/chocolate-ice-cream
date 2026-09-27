'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import useAutoplay from './useAutoplay';
import CountUp from './CountUp';
import SplitText from './SplitText';
import useVelocitySkew from './useVelocitySkew';
import { motion as m } from 'framer-motion';
import { fadeUp, flyIn, stagger, viewportOnce } from './motion';

const proof = [
  {
    value: '72',
    label: 'hours of conching before a single bar is dipped',
    kind: 'video',
    src: '/videos/nuts.mp4',
  },
  {
    value: '04',
    label: 'ingredients on the label, and nothing else',
    kind: 'image',
    src: '/images/ice-cream.png',
  },
  {
    value: '01',
    label: 'small kitchen, churning again every morning',
    kind: 'image',
    src: '/images/ice-creamm.png',
  },
];

export default function Craft() {
  const media = useRef(null);
  const skewY = useVelocitySkew();

  useAutoplay(media);

  return (
    <section className="proof">
      <div className="proof__inner">
        <motion.div
          className="proof__head"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.p className="section-eyebrow" variants={fadeUp}>
            The craft
          </motion.p>

          <SplitText className="proof__title" lines={['Made slowly, on purpose.']} />

          <motion.p className="proof__intro" variants={fadeUp}>
            No factory line, no shortcuts and no ingredient we cannot name. Here is
            what that actually costs us, and why it is worth it.
          </motion.p>
        </motion.div>

        <m.div className="proof__grid" style={{ skewY }}>
          {proof.map(({ value, label, kind, src }, i) => (
            <motion.div
              className="card-slot"
              key={value}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <motion.article
                className="proof-card"
                variants={flyIn(i)}
                whileHover={{ y: -10, transition: { type: 'spring', stiffness: 170, damping: 20 } }}
              >
                <div className="proof-card__media">
                  {kind === 'video' ? (
                    <video ref={media} autoPlay muted loop playsInline preload="none" aria-hidden="true">
                      <source src={src} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={src} alt="" aria-hidden="true" />
                  )}
                </div>

                <div className="proof-card__body">
                  <CountUp value={value} className="proof-card__value" />
                  <span className="proof-card__label">{label}</span>
                </div>
              </motion.article>
            </motion.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
