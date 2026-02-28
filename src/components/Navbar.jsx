'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu/', label: 'Menu' },
  { href: '/contact/', label: 'Contact' },
  { href: '/faq/', label: 'FAQ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    gsap.from(navRef.current, { y: -60, opacity: 0, duration: 0.8, ease: 'power4.out', delay: 0.1 });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const links = mobileRef.current?.querySelectorAll('a');
      if (links) gsap.from(links, { y: 40, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav ref={navRef} className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link href="/" className="nav-logo">Food<span>Lovers</span></Link>
          <div className="nav-links">
            {links.map(l => (
              <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>{l.label}</Link>
            ))}
          </div>
          <Link href="/login/" className="nav-cta">Sign In</Link>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} role="button" aria-label="Toggle menu">
            <span style={menuOpen ? { transform: 'rotate(45deg) translateY(7px)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translateY(-7px)' } : {}} />
          </div>
        </div>
      </nav>
      <div ref={mobileRef} className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <Link key={l.href} href={l.href}>{l.label}</Link>
        ))}
        <Link href="/login/" className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>Sign In</Link>
      </div>
    </>
  );
}
