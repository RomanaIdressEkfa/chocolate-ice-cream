'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import useAutoplay from './useAutoplay';
import { easeOut, fadeUp, maskLine, stagger, viewportOnce } from './motion';

const stats = [
  { value: '72', label: 'hours of conching before a single bar is dipped' },
  { value: '04', label: 'ingredients on the label, and nothing else' },
  { value: '01', label: 'small kitchen, churning again every morning' },
];

const values = [
  {
    title: 'Cocoa first',
    note: 'We buy single origin beans direct, at a price the farm sets rather than the market.',
  },
  {
    title: 'Nothing spare',
    note: 'No stabilisers, no emulsifiers, no shelf life tricks. It melts because it should.',
  },
  {
    title: 'Small on purpose',
    note: 'We could churn more. We would rather churn better, and stop when it is right.',
  },
];

export default function AboutPanels() {
  const video = useRef(null);
  useAutoplay(video);

  return (
    <>
      <section className="story story--flat">
        <div className="story__inner">
          <motion.div
            className="story__media"
            initial={{ x: -70, opacity: 0, scale: 0.94 }}
            whileInView={{ x: 0, opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: easeOut }}
          >
            <div className="story__card">
              <video ref={video} autoPlay muted loop playsInline preload="none" aria-hidden="true">
                <source src="/videos/1-1.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>

          <motion.div
            className="story__text"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.p className="story__eyebrow" variants={fadeUp}>
              How we started
            </motion.p>

            <h2 className="story__title">
              {['One churn,', 'one recipe.'].map((line) => (
                <span className="story__line-wrap" key={line}>
                  <motion.span className="story__line" variants={maskLine}>
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.p className="story__body" variants={fadeUp}>
              It began with a second hand churn in a kitchen too small for it, and a
              stubborn idea that a chocolate bar should taste of cocoa rather than sugar.
              Ten years later the kitchen is a little bigger, the churn is the same one,
              and the recipe has not moved an inch.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="craft craft--flat">
        <div className="craft__body">
          <motion.div
            className="section-head"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.p className="section-eyebrow" variants={fadeUp}>
              By the numbers
            </motion.p>
            <motion.h2 className="section-title" variants={fadeUp}>
              Made slowly, on purpose.
            </motion.h2>
          </motion.div>

          <motion.div
            className="craft__stats"
            variants={stagger(0.14)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {stats.map(({ value, label }) => (
              <motion.div className="craft__stat" key={value} variants={fadeUp}>
                <span className="craft__num">{value}</span>
                <span className="craft__label">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="values">
        <div className="values__inner">
          <motion.div
            className="section-head"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.p className="section-eyebrow" variants={fadeUp}>
              What we hold to
            </motion.p>
            <motion.h2 className="section-title" variants={fadeUp}>
              Three rules we do not bend.
            </motion.h2>
          </motion.div>

          <motion.div
            className="values__grid"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {values.map(({ title, note }) => (
              <motion.article
                className="value"
                key={title}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 220, damping: 18 } }}
              >
                <h3 className="value__title">{title}</h3>
                <p className="value__note">{note}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
