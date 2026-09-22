'use client';

import { useRef } from 'react';
import useReveal from './useReveal';

const details = [
  { label: 'Email', value: 'hello@chocolate.com', href: 'mailto:hello@chocolate.com' },
  { label: 'Phone', value: '+880 1000 000000', href: 'tel:+8801000000000' },
  { label: 'Kitchen', value: '12 Cocoa Lane, Dhaka 1205' },
  { label: 'Open', value: 'Tue to Sun, 10:00 until the trays are empty' },
];

export default function ContactPanel() {
  const root = useRef(null);
  useReveal(root);

  return (
    <section className="contact-page" ref={root}>
      <div className="contact-page__inner">
        <div className="contact-form-wrap" data-reveal>
          {/* Posts straight to Netlify Forms; no client side handler needed. */}
          <form
            className="contact-form"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="contact-form__hp">
              <label>
                Leave this empty <input name="bot-field" />
              </label>
            </p>

            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" type="text" required autoComplete="name" />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>

            <div className="field">
              <label htmlFor="subject">What is it about</label>
              <select id="subject" name="subject" defaultValue="An order">
                <option>An order</option>
                <option>Wholesale</option>
                <option>Something else</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required />
            </div>

            <button className="contact-form__submit" type="submit">
              Send it over
            </button>
          </form>
        </div>

        <aside className="contact-details" data-reveal>
          <p className="section-eyebrow">Find us</p>

          <dl className="contact-details__list">
            {details.map(({ label, value, href }) => (
              <div className="contact-details__row" key={label}>
                <dt>{label}</dt>
                <dd>{href ? <a href={href}>{value}</a> : value}</dd>
              </div>
            ))}
          </dl>

          <p className="contact-details__note">
            Wholesale and press enquiries are answered within two working days. For an
            order already on its way, reply to your confirmation email and it will reach
            the right person faster.
          </p>
        </aside>
      </div>
    </section>
  );
}
