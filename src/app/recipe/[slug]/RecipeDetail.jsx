'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categoryEmojis = {
  vegetarian: '🥬',
  'non-vegetarian': '🍗',
  beverages: '🥤',
  desserts: '🍮',
  'street-food': '🌮',
};

export default function RecipeDetail({ recipe, related }) {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.recipe-hero img, .recipe-hero-placeholder', { scale: 1.1, opacity: 0, duration: 1.2, ease: 'power3.out' });
      gsap.from('.recipe-header > *', { y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out', delay: 0.3 });
      gsap.from('.recipe-meta-item', { x: -20, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.6 });

      document.querySelectorAll('.recipe-block').forEach(block => {
        gsap.from(block, {
          scrollTrigger: { trigger: block, start: 'top 85%' },
          y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
        });
      });

      const ingredients = document.querySelectorAll('.ingredient-item');
      if (ingredients.length) {
        gsap.from(ingredients, {
          scrollTrigger: { trigger: ingredients[0], start: 'top 85%' },
          x: -20, opacity: 0, stagger: 0.04, duration: 0.4, ease: 'power2.out',
        });
      }

      const steps = document.querySelectorAll('.step-item');
      if (steps.length) {
        gsap.from(steps, {
          scrollTrigger: { trigger: steps[0], start: 'top 85%' },
          x: -30, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out',
        });
      }

      const video = document.querySelector('.video-embed');
      if (video) {
        gsap.from(video, {
          scrollTrigger: { trigger: video, start: 'top 85%' },
          y: 40, opacity: 0, scale: 0.95, duration: 0.8, ease: 'power3.out',
        });
      }

      const relatedCards = document.querySelectorAll('.related-card');
      if (relatedCards.length) {
        gsap.from(relatedCards, {
          scrollTrigger: { trigger: relatedCards[0], start: 'top 90%' },
          y: 30, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out',
        });
      }
    }, pageRef);
    return () => ctx.revert();
  }, [recipe.slug]);

  return (
    <div ref={pageRef}>
      {/* Hero Image */}
      <div className="recipe-hero">
        {recipe.image ? (
          <Image src={recipe.image} alt={recipe.name} width={1200} height={500} style={{ objectFit: 'cover', width: '100%', height: 500 }} priority />
        ) : (
          <div className="recipe-hero-placeholder">{categoryEmojis[recipe.category] || '🍽️'}</div>
        )}
        <div className="recipe-hero-overlay" />
      </div>

      {/* Header */}
      <div className="recipe-header container">
        <Link href="/menu/" className="back-link" style={{ paddingTop: 0 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Menu
        </Link>
        <span className={`card-category cat-${recipe.category}`} style={{ marginBottom: 12, display: 'inline-block' }}>
          {recipe.category.replace('-', ' ')}
        </span>
        <h1 className="heading-lg">{recipe.name}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>{recipe.region}</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginTop: 12, lineHeight: 1.7 }}>{recipe.description}</p>

        <div className="recipe-meta-bar">
          <div className="recipe-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Prep: {recipe.prepTime}
          </div>
          <div className="recipe-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
            Cook: {recipe.cookTime}
          </div>
          <div className="recipe-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Serves {recipe.servings}
          </div>
          <div className="recipe-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            {recipe.difficulty}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="recipe-content">
        {/* Ingredients */}
        <div className="recipe-block">
          <h2><span>🧾</span> Ingredients</h2>
          <div className="ingredient-list">
            {recipe.ingredients.map((ing, i) => (
              <div key={i} className="ingredient-item">
                <span className="ingredient-dot" />
                {ing}
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="recipe-block">
          <h2><span>👨‍🍳</span> Instructions</h2>
          <div className="step-list">
            {recipe.instructions.map((step, i) => (
              <div key={i} className="step-item">
                <div className="step-number">{i + 1}</div>
                <div className="step-text">{step}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Video */}
        {recipe.youtubeId && (
          <div className="video-section">
            <h2 className="heading-sm" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 24 }}>🎬</span> Video Tutorial
            </h2>
            <div className="video-embed">
              <iframe
                src={`https://www.youtube.com/embed/${recipe.youtubeId}`}
                title={`${recipe.name} Recipe Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="related-section" style={{ padding: '48px 0 0' }}>
            <h2 className="heading-sm" style={{ marginBottom: 24 }}>More {recipe.category.replace('-', ' ')} recipes</h2>
            <div className="related-grid">
              {related.map(r => (
                <Link key={r.slug} href={`/recipe/${r.slug}/`}>
                  <div className="related-card">
                    <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                      {r.image ? (
                        <Image src={r.image} alt={r.name} width={300} height={188} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      ) : (
                        <div className="card-placeholder" style={{ height: '100%' }}>{categoryEmojis[r.category] || '🍽️'}</div>
                      )}
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.region}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
