'use client';

import { motion } from 'framer-motion';
import { easeOut, fadeUp, maskLine, stagger } from './motion';

export default function PageHero({ eyebrow, lines, intro }) {
  return (
    <section className="page-hero">
      <motion.img
        className="page-hero__chunk page-hero__chunk--left"
        src="/images/ice-cream.png"
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.86, x: -70, rotate: -8 }}
        animate={{ opacity: 0.8, scale: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1.3, ease: easeOut, delay: 0.15 }}
      />
      <motion.img
        className="page-hero__chunk page-hero__chunk--right"
        src="/images/ice-creamm.png"
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.86, x: 70, rotate: 8 }}
        animate={{ opacity: 0.8, scale: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1.3, ease: easeOut, delay: 0.25 }}
      />

      <motion.div
        className="page-hero__inner"
        variants={stagger(0.1)}
        initial="hidden"
        animate="show"
      >
        <motion.p className="page-hero__eyebrow" variants={fadeUp}>
          {eyebrow}
        </motion.p>

        <h1 className="page-hero__title">
          {lines.map((line) => (
            <span className="page-hero__line-wrap" key={line}>
              <motion.span className="page-hero__line" variants={maskLine}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {intro ? (
          <motion.p className="page-hero__intro" variants={fadeUp}>
            {intro}
          </motion.p>
        ) : null}
      </motion.div>
    </section>
  );
}
