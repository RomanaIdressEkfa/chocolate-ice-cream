'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import useAutoplay from './useAutoplay';
import Magnetic from './Magnetic';
import { fadeUp, maskLine, stagger, viewportOnce } from './motion';

/**
 * A full bleed strip of footage with copy over it, used to break up the inner
 * pages the way the video sections break up the home page.
 */
export default function MediaBand({ video, eyebrow, lines, body, cta }) {
  const root = useRef(null);
  const media = useRef(null);

  useAutoplay(media);

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section className="band" ref={root}>
      <motion.video
        ref={media}
        className="band__video"
        style={{ scale, y }}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src={video} type="video/mp4" />
      </motion.video>

      <div className="band__veil" aria-hidden="true" />

      <motion.div
        className="band__copy"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.p className="band__eyebrow" variants={fadeUp}>
          {eyebrow}
        </motion.p>

        <h2 className="band__title">
          {lines.map((line) => (
            <span className="band__line-wrap" key={line}>
              <motion.span className="band__line" variants={maskLine}>
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        {body ? (
          <motion.p className="band__body" variants={fadeUp}>
            {body}
          </motion.p>
        ) : null}

        {cta ? (
          <motion.div variants={fadeUp}>
            <Magnetic>
              <Link className="band__cta" href={cta.href}>
                {cta.label}
              </Link>
            </Magnetic>
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
