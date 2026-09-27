'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import useAutoplay from './useAutoplay';
import { LogoMark } from './Icons';

/**
 * A card that turns a full circle as you scroll, sitting beside its copy in
 * the shared container so it lines up with every other section.
 *
 * On a wide screen the section sticks, which gives the turn room to play out.
 * On a narrow one it is a normal block and the card stays square, simply
 * making its turn as it passes through.
 */
function Panel({ id, eyebrow, lines, body, note, video, compact }) {
  const root = useRef(null);
  const media = useRef(null);

  useAutoplay(media);

  const { scrollYProgress } = useScroll({
    target: root,
    offset: compact ? ['start end', 'end start'] : ['start start', 'end end'],
  });

  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.9 });

  // A full turn that eases in, carries through, then settles.
  const rotateY = useTransform(
    p,
    compact ? [0.12, 0.88] : [0, 0.12, 0.38, 0.6],
    compact ? [0, 360] : [0, 55, 250, 360]
  );

  // Wide screens also get the tilt, the depth and a little settling.
  const rotateX = useTransform(p, [0, 0.38, 0.64], [18, 13, 0]);
  const rotateZ = useTransform(p, [0, 0.38, 0.64], [-8, -5, 0]);
  const z = useTransform(p, [0, 0.32, 0.64], [-220, 50, 0]);
  const scale = useTransform(p, [0, 0.64], [1.04, 1]);

  const copyOpacity = useTransform(p, [0.42, 0.6], [0, 1]);
  const copyY = useTransform(p, [0.42, 0.6], [40, 0]);

  const cardStyle = compact ? { rotateY } : { rotateY, rotateX, rotateZ, z, scale };

  return (
    <section className="focus-wrap focus-wrap--3d" ref={root}>
      <div className="focus focus--3d" id={id}>
        <div className="focus__inner">
          <div className="focus3d__stage">
            <motion.div className="focus3d__card" style={cardStyle}>
              <div className="focus3d__face focus3d__face--front">
                <video
                  ref={media}
                  className="focus3d__video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden="true"
                >
                  <source src={video} type="video/mp4" />
                </video>
              </div>

              <div className="focus3d__face focus3d__face--back" aria-hidden="true">
                <LogoMark className="focus3d__mark" />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="focus__copy"
            style={compact ? undefined : { opacity: copyOpacity, y: copyY }}
          >
            <p className="focus__eyebrow">{eyebrow}</p>

            <h2 className="focus__title">
              {lines.map((line) => (
                <span className="focus__line-wrap" key={line}>
                  <span className="focus__line">{line}</span>
                </span>
              ))}
            </h2>

            <p className="focus__body">{body}</p>
            {note ? <p className="focus__note">{note}</p> : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Focus3D(props) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1080px)');
    const update = () => setCompact(mq.matches);

    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Remount on the switch so the scroll range is measured afresh.
  return <Panel key={compact ? 'compact' : 'wide'} compact={compact} {...props} />;
}
