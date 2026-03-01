'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { name: 'Harshita', role: 'Lead Developer', img: '/images/harshita.jpg' },
  { name: 'Kishore SN', role: 'Backend Dev', img: '/images/kishoresn.jpg' },
  { name: 'Kushi', role: 'UI Designer', img: '/images/kkushi.jpg' },
  { name: 'Sai', role: 'Content Writer', img: '/images/sai.jpg' },
  { name: 'Kupendra', role: 'Dev Ops', img: '/images/kupendra.jpg' },
  { name: 'Janavi', role: 'Frontend Dev', img: '/images/janavi.jpg' },
  { name: 'Jayanavya', role: 'QA Tester', img: '/images/jayanavya.jpg' },
  { name: 'Keer', role: 'Mobile Dev', img: '/images/keer.jpg' },
];

export default function ContactPage() {
  const pageRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-header > div > *', { y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out', delay: 0.2 });

      const infoItems = document.querySelectorAll('.contact-info-item');
      if (infoItems.length) {
        gsap.from(infoItems, {
          scrollTrigger: { trigger: infoItems[0], start: 'top 85%' },
          x: -30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        });
      }

      gsap.from('.form-card', {
        scrollTrigger: { trigger: '.form-card', start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      const teamCards = document.querySelectorAll('.team-card');
      if (teamCards.length) {
        gsap.from(teamCards, {
          scrollTrigger: { trigger: teamCards[0], start: 'top 85%' },
          y: 40, scale: 0.9, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'back.out(1.7)',
        });
      }
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div ref={pageRef}>
      <div className="page-header">
        <div className="container">
          <h1 className="heading-lg">Get In <span className="text-gradient">Touch</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontSize: 16 }}>
            Have questions or feedback? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <section style={{ paddingBottom: 80 }}>
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: 4 }}>Location</h4>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Bangalore, Karnataka, India</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: 4 }}>Email</h4>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>hello@foodlovers.dev</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72L10 8a2 2 0 0 1-.45 1.34l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27A2 2 0 0 1 16.82 15l4.28.9A2 2 0 0 1 22 17.92z"/></svg>
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: 4 }}>Phone</h4>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>+91 98765 43210</p>
                </div>
              </div>

              {/* Map */}
              <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)', marginTop: 8 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.56659930868!2d77.46612702724652!3d12.953945614498948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1698000000000!5m2!1sen!2sin"
                  width="100%" height="200" style={{ border: 'none' }} loading="lazy" title="Map"
                />
              </div>
            </div>

            {/* Form */}
            <div className="form-card">
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Send us a Message</h3>
              {sent && (
                <div style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: 'rgba(86,171,47,0.15)', color: 'var(--accent-green)', fontSize: 14, marginBottom: 20 }}>
                  ✓ Message sent successfully!
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input className="form-control" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input className="form-control" placeholder="What's this about?" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea className="form-control" placeholder="Your message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="heading-lg">Meet the <span className="text-gradient">Team</span></h2>
            <p>The talented people behind FoodLovers</p>
          </div>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.name} className="team-card">
                <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${member.img}`} alt={member.name} width={80} height={80} className="team-avatar" />
                <div className="team-name">{member.name}</div>
                <div className="team-role">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
