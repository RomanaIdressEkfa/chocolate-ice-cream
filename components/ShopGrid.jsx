'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { flavours } from '@/lib/flavours';
import { easeOut, fadeUp, flyIn, stagger, viewportOnce } from './motion';

const perks = [
  { title: 'Packed in dry ice', note: 'Every box leaves frozen solid and arrives that way.' },
  { title: 'Next day delivery', note: 'Order before noon and it lands on your doorstep tomorrow.' },
  { title: 'Made this morning', note: 'Nothing sits in a warehouse. We churn to order.' },
];

export default function ShopGrid() {
  return (
    <>
      <section className="shop">
        <div className="shop__inner">
          <motion.div
            className="section-head"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.p className="section-eyebrow" variants={fadeUp}>
              The range
            </motion.p>
            <motion.h2 className="section-title" variants={fadeUp}>
              Four bars, one obsession.
            </motion.h2>
          </motion.div>

          <div className="shop__grid">
            {flavours.map(({ index, name, note, chunk, price }, i) => (
              <motion.div
                className="card-slot"
                key={index}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
              >
              <motion.article
                className="product"
                variants={flyIn(i)}
                whileHover={{ y: -10, transition: { type: 'spring', stiffness: 220, damping: 18 } }}
              >
                <div className="product__media">
                  <span className="product__index">{index}</span>
                  <motion.img
                    src={chunk}
                    alt=""
                    aria-hidden="true"
                    variants={{ hidden: { scale: 0.86, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { duration: 0.9, delay: 0.3 + i * 0.1, ease: easeOut } } }}
                  />
                </div>

                <div className="product__body">
                  <h3 className="product__name">{name}</h3>
                  <p className="product__note">{note}</p>

                  <div className="product__foot">
                    <span className="product__price">${price}</span>
                    <Link className="product__cta" href="/contact">
                      Order now
                    </Link>
                  </div>
                </div>
              </motion.article>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="perks">
        <motion.div
          className="perks__inner"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {perks.map(({ title, note }) => (
            <motion.div className="perk" key={title} variants={fadeUp}>
              <h3 className="perk__title">{title}</h3>
              <p className="perk__note">{note}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
