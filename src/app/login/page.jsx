'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoginPage() {
  const cardRef = useRef(null);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.login-card', {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.2,
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    gsap.to('.login-card', {
      scale: 0.97,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
      onComplete: () => setSubmitted(true),
    });
  };

  const toggleMode = () => {
    gsap.to('.login-card', {
      rotateY: 90,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setIsRegister(prev => !prev);
        setSubmitted(false);
        setForm({ name: '', email: '', password: '' });
        gsap.to('.login-card', { rotateY: 0, duration: 0.25, ease: 'power2.out' });
      },
    });
  };

  return (
    <div ref={cardRef} className="login-wrapper">
      <div className="login-card" style={{ perspective: 800 }}>
        {/* decorative orbs */}
        <div style={{ position: 'absolute', width: 200, height: 200, background: 'var(--accent-primary)', borderRadius: '50%', opacity: 0.08, top: -60, right: -60, filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 150, height: 150, background: 'var(--accent-secondary)', borderRadius: '50%', opacity: 0.06, bottom: -40, left: -40, filter: 'blur(50px)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="heading-md" style={{ textAlign: 'center', marginBottom: 6 }}>
            {submitted ? '🎉' : isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>
            {submitted
              ? `You're all set! Enjoy exploring recipes.`
              : isRegister
                ? 'Join FoodLovers and discover amazing recipes'
                : 'Sign in to your FoodLovers account'}
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {isRegister && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
                {isRegister ? 'Create Account' : 'Sign In'}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', password: '' }); }} style={{ marginTop: 12 }}>
                Back to {isRegister ? 'Register' : 'Login'}
              </button>
            </div>
          )}

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--text-secondary)' }}>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={toggleMode}
              style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 600, fontSize: 14, textDecoration: 'underline', padding: 0 }}
            >
              {isRegister ? 'Sign In' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
