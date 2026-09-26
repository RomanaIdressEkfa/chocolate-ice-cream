'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from './motion';

const details = [
  {
    label: 'Email',
    value: 'romanaidressekfa@gmail.com',
    href: 'mailto:romanaidressekfa@gmail.com',
  },
  { label: 'Phone', value: '01307957682', href: 'tel:+8801307957682' },
  { label: 'Kitchen', value: 'Mirpur, Dhaka, Bangladesh' },
  { label: 'Open', value: 'Tue to Sun, 10:00 until the trays are empty' },
];

export default function ContactPanel() {
  return (
    <section className="contact-page">
      <div className="contact-page__inner">
        <motion.div
          className="contact-form-wrap"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
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

            <motion.div className="field" variants={fadeUp}>
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" type="text" required autoComplete="name" />
            </motion.div>

            <motion.div className="field" variants={fadeUp}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </motion.div>

            <motion.div className="field" variants={fadeUp}>
              <label htmlFor="subject">What is it about</label>
              <select id="subject" name="subject" defaultValue="An order">
                <option>An order</option>
                <option>Wholesale</option>
                <option>Something else</option>
              </select>
            </motion.div>

            <motion.div className="field" variants={fadeUp}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required />
            </motion.div>

            <motion.button
              className="contact-form__submit"
              type="submit"
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Send it over
            </motion.button>
          </form>
        </motion.div>

        <motion.aside
          className="contact-details"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.p className="section-eyebrow" variants={fadeUp}>
            Find us
          </motion.p>

          <dl className="contact-details__list">
            {details.map(({ label, value, href }) => (
              <motion.div className="contact-details__row" key={label} variants={fadeUp}>
                <dt>{label}</dt>
                <dd>{href ? <a href={href}>{value}</a> : value}</dd>
              </motion.div>
            ))}
          </dl>

          <motion.p className="contact-details__note" variants={fadeUp}>
            Wholesale and press enquiries are answered within two working days. For an
            order already on its way, reply to your confirmation email and it will reach
            the right person faster.
          </motion.p>
        </motion.aside>
      </div>
    </section>
  );
}
