'use client';

import { motion } from 'framer-motion';
import { FaDribbble, FaBehance, FaInstagram, FaFacebookF } from 'react-icons/fa6';

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/romanaidressekfa', Icon: FaFacebookF },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/romana.idress.ekfa/',
    Icon: FaInstagram,
  },
  { label: 'Behance', href: 'https://www.behance.net/romanaidress', Icon: FaBehance },
  { label: 'Dribbble', href: 'https://dribbble.com/romanaidressekfa', Icon: FaDribbble },
];

export default function BottomBar() {
  return (
    <motion.div
      className="bottom-bar"
      initial={{ y: 28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
    >
      <div className="bottom-bar__inner">
        <ul className="socials">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                <Icon />
              </a>
            </li>
          ))}
        </ul>

        <a className="contact-link" href="#contact">
          Contact us
        </a>
      </div>
    </motion.div>
  );
}
