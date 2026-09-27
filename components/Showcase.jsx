'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import useAutoplay from './useAutoplay';
import { LogoMark } from './Icons';
import Magnetic from './Magnetic';
import SplitText from './SplitText';
import { easeOut, fadeUp, stagger, viewportOnce } from './motion';

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

function ShowcaseItem({ video, label, note, from, index, progress }) {
  const media = useRef(null);
  useAutoplay(media);

  // Each card turns a full circle as the section passes, the second a little
  // behind the first so they do not move as one block.
  const offset = index * 0.12;
  const rotateY = useTransform(
    progress,
    [0.06 + offset, 0.5 + offset],
    [0, 360]
  );

  return (
    <motion.figure
      className="showcase__item"
      initial={{ x: from * 140, y: 60, opacity: 0, scale: 0.92 }}
      whileInView={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{
        type: 'spring',
        stiffness: 62,
        damping: 16,
        mass: 0.9,
        delay: index * 0.08,
        opacity: { duration: 0.4, delay: index * 0.08 },
      }}
      whileHover={{ y: -10, transition: { type: 'spring', stiffness: 170, damping: 20 } }}
    >
      <div className="showcase__stage">
        <motion.div className="showcase__media" style={{ rotateY }}>
          <div className="showcase__face showcase__face--front">
            <video ref={media} autoPlay muted loop playsInline preload="none" aria-hidden="true">
              <source src={video} type="video/mp4" />
            </video>
            <div className="showcase__veil" aria-hidden="true" />
          </div>

          <div className="showcase__face showcase__face--back" aria-hidden="true">
            <LogoMark className="showcase__mark" />
          </div>
        </motion.div>
      </div>

      <figcaption className="showcase__caption">
        <h3 className="showcase__label">{label}</h3>
        <p className="showcase__note">{note}</p>
      </figcaption>
    </motion.figure>
  );
}

export default function Showcase() {
  const root = useRef(null);

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start end', 'end start'],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.8 });

  return (
    <section className="showcase" id="kitchen" ref={root}>
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

          <SplitText className="showcase__title" lines={['Nothing here is rushed.']} />

          <motion.p className="showcase__intro" variants={fadeUp}>
            Two minutes in our kitchen explains the price better than we ever could.
            This is the whole process, start to finish, with nothing left out.
          </motion.p>
        </motion.div>

        <div className="showcase__grid">
          {items.map((item, i) => (
            <ShowcaseItem key={item.label} {...item} index={i} progress={progress} />
          ))}
        </div>

        <motion.div
          className="showcase__foot"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
        >
          <Magnetic>
            <Link className="showcase__cta" href="/shop">
              Taste the difference
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
