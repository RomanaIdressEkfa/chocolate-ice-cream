'use client';

import { useRef } from 'react';
import useReveal from './useReveal';
import useAutoplay from './useAutoplay';

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
  const root = useRef(null);
  const video = useRef(null);

  useReveal(root);
  useAutoplay(video);

  return (
    <div ref={root}>
      <section className="story story--flat">
        <div className="story__inner">
          <div className="story__media" data-reveal>
            <div className="story__card">
              <video ref={video} autoPlay muted loop playsInline preload="auto" aria-hidden="true">
                <source src="/videos/1-1.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="story__text" data-reveal>
            <p className="story__eyebrow">How we started</p>
            <h2 className="story__title">
              <span className="story__line-wrap">
                <span className="story__line">One churn,</span>
              </span>
              <span className="story__line-wrap">
                <span className="story__line">one recipe.</span>
              </span>
            </h2>
            <p className="story__body">
              It began with a second hand churn in a kitchen too small for it, and a
              stubborn idea that a chocolate bar should taste of cocoa rather than sugar.
              Ten years later the kitchen is a little bigger, the churn is the same one,
              and the recipe has not moved an inch.
            </p>
          </div>
        </div>
      </section>

      <section className="craft craft--flat">
        <div className="craft__body">
          <div className="section-head" data-reveal>
            <p className="section-eyebrow">By the numbers</p>
            <h2 className="section-title">Made slowly, on purpose.</h2>
          </div>

          <div className="craft__stats" data-reveal-group>
            {stats.map(({ value, label }) => (
              <div className="craft__stat" key={value}>
                <span className="craft__num">{value}</span>
                <span className="craft__label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="values">
        <div className="values__inner">
          <div className="section-head" data-reveal>
            <p className="section-eyebrow">What we hold to</p>
            <h2 className="section-title">Three rules we do not bend.</h2>
          </div>

          <div className="values__grid" data-reveal-group>
            {values.map(({ title, note }) => (
              <article className="value" key={title}>
                <h3 className="value__title">{title}</h3>
                <p className="value__note">{note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
