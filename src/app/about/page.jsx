'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { name: 'Kupendra', role: 'Project Creator', img: '/images/kupendra.jpg', color: '#667eea' },
  { name: 'Harshitha', role: 'Developer', img: '/images/harshita.jpg', color: '#f093fb' },
  { name: 'Janavi', role: 'Developer', img: '/images/janavi.jpg', color: '#56ab2f' },
  { name: 'Jayanavya', role: 'Developer', img: '/images/jayanavya.jpg', color: '#ffa502' },
  { name: 'Kishore Kumar', role: 'Programmer', img: '/images/kishore.jpg', color: '#ff6b6b' },
  { name: 'Kishore S N', role: 'Data Manager', img: '/images/kishoresn.jpg', color: '#667eea' },
  { name: 'Hemanth Reddy', role: 'Designer', img: '/images/h reddy.jpg', color: '#f7971e' },
  { name: 'Keerthana', role: 'Designer', img: '/images/keer.jpg', color: '#f093fb' },
  { name: 'KKushi', role: 'Designer', img: '/images/kkushi.jpg', color: '#56ab2f' },
];

export default function AboutPage() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const techRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page header
      gsap.from('.page-header > div > *', {
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out', delay: 0.2,
      });

      // Mission cards
      const missionCards = missionRef.current?.querySelectorAll('.about-mission-card');
      if (missionCards?.length) {
        gsap.from(missionCards, {
          scrollTrigger: { trigger: missionRef.current, start: 'top 80%' },
          y: 50, scale: 0.9, opacity: 0,
          stagger: 0.1, duration: 0.7, ease: 'back.out(1.4)',
        });
      }

      // Team cards — staggered 3D entrance
      const teamCards = teamRef.current?.querySelectorAll('.about-team-card');
      if (teamCards?.length) {
        gsap.from(teamCards, {
          scrollTrigger: { trigger: teamRef.current, start: 'top 80%' },
          y: 80, rotateY: 20, scale: 0.85, opacity: 0,
          stagger: 0.1, duration: 0.8, ease: 'back.out(1.2)',
        });
      }

      // Tech stack pills
      const pills = techRef.current?.querySelectorAll('.tech-pill');
      if (pills?.length) {
        gsap.from(pills, {
          scrollTrigger: { trigger: techRef.current, start: 'top 85%' },
          y: 30, scale: 0.8, opacity: 0,
          stagger: 0.06, duration: 0.5, ease: 'back.out(1.7)',
        });
      }

      // Section headers
      document.querySelectorAll('.section-header').forEach(header => {
        gsap.from(header.children, {
          scrollTrigger: { trigger: header, start: 'top 85%' },
          y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="heading-lg">About <span className="text-gradient">FoodLovers</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontSize: 16, maxWidth: 560, margin: '12px auto 0' }}>
            A passionate team of students bringing authentic Indian recipes to the world through beautiful design and modern technology.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div ref={missionRef} className="about-mission-grid">
            <div className="about-mission-card">
              <div className="about-mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To celebrate India&apos;s rich culinary heritage by making authentic recipes accessible to everyone, from beginners to seasoned cooks.</p>
            </div>
            <div className="about-mission-card">
              <div className="about-mission-icon">🌍</div>
              <h3>Our Vision</h3>
              <p>A world where the diverse flavors of Indian cuisine are shared and enjoyed across every kitchen, connecting people through food.</p>
            </div>
            <div className="about-mission-card">
              <div className="about-mission-icon">💡</div>
              <h3>The Project</h3>
              <p>Built as a collaborative mini-project, FoodLovers showcases 28+ recipes across 5 categories with video tutorials and step-by-step guides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-orb" style={{ width: 500, height: 500, background: 'var(--accent-blue)', top: -150, right: -200 }} />
        <div className="gradient-orb" style={{ width: 400, height: 400, background: 'var(--accent-pink)', bottom: -100, left: -150 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <h2 className="heading-lg">Meet the <span className="text-gradient">Team</span></h2>
            <p>The talented people who brought FoodLovers to life</p>
          </div>

          {/* Lead — Kupendra */}
          <div ref={teamRef} className="about-team-grid">
            {teamMembers.map((member) => (
              <div key={member.name} className="about-team-card" style={{ '--card-accent': member.color }}>
                <div className="about-team-img-wrap">
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="about-team-img"
                  />
                  <div className="about-team-ring" />
                </div>
                <h3 className="about-team-name">{member.name}</h3>
                <span className="about-team-role">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="heading-lg">Built <span className="text-gradient">With</span></h2>
            <p>The technologies powering FoodLovers</p>
          </div>
          <div ref={techRef} className="tech-grid">
            {[
              { name: 'Next.js 14', emoji: '▲' },
              { name: 'React 18', emoji: '⚛️' },
              { name: 'GSAP', emoji: '🎬' },
              { name: 'CSS3', emoji: '🎨' },
              { name: 'JavaScript', emoji: '⚡' },
              { name: 'GitHub Pages', emoji: '🚀' },
            ].map(tech => (
              <div key={tech.name} className="tech-pill">
                <span className="tech-emoji">{tech.emoji}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <h2 className="heading-lg" style={{ marginBottom: 16 }}>Hungry Yet?</h2>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 32px' }}>
            Explore our full collection of authentic Indian recipes and start cooking today.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/menu/" className="btn btn-primary">Browse Recipes</Link>
            <Link href="/contact/" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
