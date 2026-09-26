'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SiteFooter() {
  const root = useRef(null);

  useEffect(() => {
    const bar = document.querySelector('.bottom-bar');
    if (!bar) return;

    // The floating bar would sit on top of the footer, so hand the screen over.
    const trigger = ScrollTrigger.create({
      trigger: root.current,
      start: 'top 92%',
      onEnter: () => gsap.to(bar, { autoAlpha: 0, duration: 0.4 }),
      onLeaveBack: () => gsap.to(bar, { autoAlpha: 1, duration: 0.4 }),
    });

    return () => {
      trigger.kill();
      gsap.set(bar, { autoAlpha: 1 });
    };
  }, []);

  return (
    <footer className="site-footer" ref={root}>
      <div className="site-footer__inner">
        <span>&copy; {new Date().getFullYear()} Chocolate. All rights reserved.</span>

        <span className="site-footer__credit">
          Built by{' '}
          <a href="https://github.com/RomanaIdressEkfa" target="_blank" rel="noopener noreferrer">
            Romana Idress Ekfa
          </a>
        </span>

        <nav className="site-footer__links" aria-label="Footer">
          <a
            href="https://www.instagram.com/romana.idress.ekfa/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About us</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
