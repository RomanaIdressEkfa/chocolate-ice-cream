'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { LogoMark } from './Icons';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About us', href: '/about', hideOnMobile: true },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <motion.header
      className="nav"
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav__inner">
        <Link className="nav__brand" href="/">
          <LogoMark className="nav__brand-icon" />
          <span>Chocolate</span>
        </Link>

        <nav className="nav__links" aria-label="Main">
          {links.map((link) => {
            const classes = ['nav__link'];
            if (link.hideOnMobile) classes.push('nav__link--desktop');
            if (isActive(link.href)) classes.push('nav__link--active');

            return (
              <Link
                key={link.label}
                href={link.href}
                className={classes.join(' ')}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
