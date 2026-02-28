'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const foodEmojis = ['🍛', '🍜', '🥘', '🍲', '🧁', '🥤', '🍵', '☕', '🍰', '🥙', '🌶️', '🫘', '🧈', '🥥', '🍋'];

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const actionsRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Spawn floating particles
      const container = particlesRef.current;
      if (container) {
        foodEmojis.forEach((emoji, i) => {
          const el = document.createElement('span');
          el.className = 'particle';
          el.textContent = emoji;
          el.style.left = `${Math.random() * 100}%`;
          el.style.top = `${Math.random() * 100}%`;
          el.style.fontSize = `${18 + Math.random() * 20}px`;
          container.appendChild(el);

          gsap.to(el, {
            y: -80 - Math.random() * 120,
            x: (Math.random() - 0.5) * 60,
            opacity: 0.25 + Math.random() * 0.2,
            duration: 4 + Math.random() * 6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.3,
          });
        });
      }

      // Title animation – split characters
      const titleEl = titleRef.current;
      if (titleEl) {
        const text = titleEl.textContent;
        titleEl.innerHTML = '';
        text.split('').forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          titleEl.appendChild(span);
        });
        gsap.from(titleEl.children, {
          y: 80,
          rotateX: -90,
          opacity: 0,
          stagger: 0.03,
          duration: 0.9,
          ease: 'back.out(1.7)',
          delay: 0.4,
        });
      }

      gsap.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 });
      gsap.from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.1 });
      gsap.from(actionsRef.current?.children || [], { y: 30, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out', delay: 1.4 });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-bg">
        <video autoPlay muted loop playsInline poster="">
          <source src="/images/lover.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay" />
      <div ref={particlesRef} className="particles" />
      <div className="hero-content">
        <div ref={badgeRef} className="hero-badge">✨ 28+ Authentic Indian Recipes</div>
        <h1 ref={titleRef} className="heading-xl hero-title">FoodLovers</h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Explore the rich tapestry of Indian cuisine — from royal Mughlai feasts to humble street-side flavors.
        </p>
        <div ref={actionsRef} className="hero-actions">
          <Link href="/menu/" className="btn btn-primary">
            Explore Recipes
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
          <Link href="/contact/" className="btn btn-outline">Get In Touch</Link>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
