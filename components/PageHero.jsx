'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useAutoplay from './useAutoplay';
import { easeOut, fadeUp, maskLine, stagger } from './motion';

export default function PageHero({ eyebrow, lines, intro, video = '/videos/1-1.mp4' }) {
  const root = useRef(null);
  const media = useRef(null);

  useAutoplay(media);

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0.72, 0.92]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section className="page-hero" ref={root}>
      <motion.video
        ref={media}
        className="page-hero__video"
        style={{ scale: videoScale }}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src={video} type="video/mp4" />
      </motion.video>

      <motion.div className="page-hero__veil" style={{ opacity: veilOpacity }} aria-hidden="true" />

      <motion.img
        className="page-hero__chunk page-hero__chunk--left"
        src="/images/ice-cream.png"
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.86, x: -70, rotate: -8 }}
        animate={{ opacity: 0.85, scale: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1.3, ease: easeOut, delay: 0.15 }}
      />
      <motion.img
        className="page-hero__chunk page-hero__chunk--right"
        src="/images/ice-creamm.png"
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.86, x: 70, rotate: 8 }}
        animate={{ opacity: 0.85, scale: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1.3, ease: easeOut, delay: 0.25 }}
      />

      <motion.div
        className="page-hero__inner"
        style={{ y: copyY }}
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
