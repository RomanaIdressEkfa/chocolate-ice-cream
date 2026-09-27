'use client';

import { motion } from 'framer-motion';
import { flavours } from '@/lib/flavours';
import SplitText from './SplitText';
import useVelocitySkew from './useVelocitySkew';
import { easeOut, fadeUp, flyIn, stagger, viewportOnce } from './motion';

export default function Flavours() {
  const skewY = useVelocitySkew();

  return (
    <section className="flavours" id="shop">
      <motion.div
        className="flavours__head"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.p className="flavours__eyebrow" variants={fadeUp}>
          Our flavours
        </motion.p>

        <SplitText className="flavours__title" lines={['Four ways to melt.']} />
      </motion.div>

      <motion.div className="flavours__track" style={{ skewY }}>
        {flavours.map(({ index, name, note, chunk }, i) => (
          // The slot never moves, so the viewport observer always sees it and
          // the card inside is free to start far off screen.
          <motion.div
            className="card-slot"
            key={index}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.article
              className="flavour"
              variants={flyIn(i)}
              whileHover={{ y: -10, transition: { type: 'spring', stiffness: 170, damping: 20 } }}
            >
              <span className="flavour__index">{index}</span>

              <motion.img
                className="flavour__chunk"
                src={chunk}
                alt=""
                aria-hidden="true"
                variants={{
                  hidden: { scale: 0.86, opacity: 0 },
                  show: {
                    scale: 1,
                    opacity: 1,
                    transition: { duration: 0.9, delay: 0.3 + i * 0.1, ease: easeOut },
                  },
                }}
              />

              <div className="flavour__foot">
                <h3 className="flavour__name">{name}</h3>
                <p className="flavour__note">{note}</p>
              </div>
            </motion.article>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
