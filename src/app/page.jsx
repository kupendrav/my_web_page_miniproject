'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/components/Hero';
import RecipeCard from '@/components/RecipeCard';
import { recipes, categories, getRecipesByCategory } from '@/data/recipes';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const catRef = useRef(null);
  const statsRef = useRef(null);
  const featuredRef = useRef(null);

  const featured = recipes.filter(r => r.image).slice(0, 6);
  const catCounts = categories.filter(c => c.id !== 'all').map(c => ({
    ...c,
    count: getRecipesByCategory(c.id).length,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Category cards entrance
      const cards = catRef.current?.querySelectorAll('.category-card');
      if (cards?.length) {
        gsap.from(cards, {
          scrollTrigger: { trigger: catRef.current, start: 'top 80%' },
          y: 50,
          scale: 0.9,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'back.out(1.7)',
        });
      }

      // Stats counter animation
      const vals = statsRef.current?.querySelectorAll('.stat-value');
      if (vals?.length) {
        vals.forEach(el => {
          const target = parseInt(el.dataset.value, 10);
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 85%' },
            textContent: 0,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate() { el.textContent = Math.round(parseFloat(el.textContent)) + (el.dataset.suffix || ''); },
          });
        });
      }

      // Section headers
      document.querySelectorAll('.section-header').forEach(header => {
        gsap.from(header.children, {
          scrollTrigger: { trigger: header, start: 'top 85%' },
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Hero />

      {/* Categories */}
      <section className="section" style={{ background: 'var(--bg-primary)', position: 'relative', zIndex: 3 }}>
        <div className="container">
          <div className="section-header">
            <h2 className="heading-lg">Explore <span className="text-gradient">Cuisines</span></h2>
            <p>Browse by category to find your next culinary adventure</p>
          </div>
          <div ref={catRef} className="category-showcase">
            {catCounts.map(cat => (
              <Link key={cat.id} href={`/menu/?cat=${cat.id}`}>
                <div className="category-card">
                  <span className="category-emoji">{cat.emoji}</span>
                  <div className="category-label">{cat.label}</div>
                  <div className="category-count">{cat.count} recipes</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-primary)', position: 'relative', zIndex: 3 }}>
        <div className="container" ref={statsRef}>
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-value" data-value="28" data-suffix="+">0</div>
              <div className="stat-label">Recipes</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" data-value="5">0</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" data-value="15" data-suffix="+">0</div>
              <div className="stat-label">Indian States</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" data-value="100" data-suffix="%">0</div>
              <div className="stat-label">Authentic</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="section" ref={featuredRef} style={{ background: 'var(--bg-primary)', position: 'relative', zIndex: 3 }}>
        <div className="container">
          <div className="section-header">
            <h2 className="heading-lg">Featured <span className="text-gradient">Recipes</span></h2>
            <p>Hand-picked favourites from our collection</p>
          </div>
          <div className="featured-grid">
            {featured.map((recipe, i) => (
              <RecipeCard key={recipe.slug} recipe={recipe} index={i} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/menu/" className="btn btn-outline">
              View All Recipes
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)', zIndex: 3 }}>
        <div className="gradient-orb" style={{ width: 400, height: 400, background: 'var(--accent-blue)', top: -100, left: -100 }} />
        <div className="gradient-orb" style={{ width: 300, height: 300, background: 'var(--accent-pink)', bottom: -80, right: -80 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="heading-lg" style={{ marginBottom: 16 }}>Ready to Cook?</h2>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 32px' }}>
            Dive into our full collection of authentic Indian recipes and bring the flavors of India to your kitchen.
          </p>
          <Link href="/menu/" className="btn btn-primary">
            Browse All Recipes
          </Link>
        </div>
      </section>
    </>
  );
}
