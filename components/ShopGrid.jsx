'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { flavours } from '@/lib/flavours';
import useReveal from './useReveal';

const perks = [
  { title: 'Packed in dry ice', note: 'Every box leaves frozen solid and arrives that way.' },
  { title: 'Next day delivery', note: 'Order before noon and it lands on your doorstep tomorrow.' },
  { title: 'Made this morning', note: 'Nothing sits in a warehouse. We churn to order.' },
];

export default function ShopGrid() {
  const root = useRef(null);
  useReveal(root);

  return (
    <div ref={root}>
      <section className="shop">
        <div className="shop__inner">
          <div className="section-head" data-reveal>
            <p className="section-eyebrow">The range</p>
            <h2 className="section-title">Four bars, one obsession.</h2>
          </div>

          <div className="shop__grid" data-reveal-group>
            {flavours.map(({ index, name, note, chunk, price }) => (
              <article className="product" key={index}>
                <div className="product__media">
                  <span className="product__index">{index}</span>
                  <img src={chunk} alt="" aria-hidden="true" />
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="perks">
        <div className="perks__inner" data-reveal-group>
          {perks.map(({ title, note }) => (
            <div className="perk" key={title}>
              <h3 className="perk__title">{title}</h3>
              <p className="perk__note">{note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
