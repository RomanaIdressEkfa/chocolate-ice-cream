'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useAutoplay from './useAutoplay';
import { easeOut, fadeUp, maskLine, stagger, viewportOnce } from './motion';

const items = [
  {
    video: '/videos/showcase-1.mp4',
    label: 'Made by hand',
    note: 'No production line and no conveyor belt. A small team, a cold room and a great deal of patience.',
    from: -1,
  },
  {
    video: '/videos/showcase-2.mp4',
    label: 'Made to be eaten today',
    note: 'We churn in the morning and ship the same afternoon, because freshness is the entire point of it.',
    from: 1,
  },
];

function ShowcaseItem({ video, label, note, from, index }) {
  const media = useRef(null);
  useAutoplay(media);

  return (
    <motion.figure
      className="showcase__item"
      initial={{ x: from * 140, y: 60, opacity: 0, scale: 0.92 }}
      whileInView={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{
        type: 'spring',
        stiffness: 42,
        damping: 18,
        mass: 1.2,
        delay: index * 0.16,
        opacity: { duration: 0.6, delay: index * 0.12 },
      }}
      whileHover={{ y: -10, transition: { type: 'spring', stiffness: 170, damping: 20 } }}
    >
      <div className="showcase__media">
        <video ref={media} autoPlay muted loop playsInline preload="none" aria-hidden="true">
          <source src={video} type="video/mp4" />
        </video>
        <div className="showcase__veil" aria-hidden="true" />
      </div>

      <figcaption className="showcase__caption">
        <h3 className="showcase__label">{label}</h3>
        <p className="showcase__note">{note}</p>
      </figcaption>
    </motion.figure>
  );
}

export default function Showcase() {
  return (
    <section className="showcase" id="kitchen">
      <div className="showcase__inner">
        <motion.div
          className="showcase__head"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.p className="section-eyebrow" variants={fadeUp}>
            Straight from the kitchen
          </motion.p>

          <h2 className="showcase__title">
            <span className="showcase__line-wrap">
              <motion.span className="showcase__line" variants={maskLine}>
                Nothing here is rushed.
              </motion.span>
            </span>
          </h2>

          <motion.p className="showcase__intro" variants={fadeUp}>
            Two minutes in our kitchen explains the price better than we ever could.
            This is the whole process, start to finish, with nothing left out.
          </motion.p>
        </motion.div>

        <div className="showcase__grid">
          {items.map((item, i) => (
            <ShowcaseItem key={item.label} {...item} index={i} />
          ))}
        </div>

        <motion.div
          className="showcase__foot"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
        >
          <Link className="showcase__cta" href="/shop">
            Taste the difference
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
