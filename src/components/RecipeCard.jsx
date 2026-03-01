'use client';
import { useRef, useEffect } from 'react';
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

export default function RecipeCard({ recipe, index = 0 }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: { trigger: cardRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        delay: index * 0.05,
        ease: 'power3.out',
      });
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 18;
    const rotateY = (centerX - x) / 18;
    gsap.to(card, { rotateX, rotateY, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <div ref={cardRef} className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transformStyle: 'preserve-3d' }}>
      <Link href={`/recipe/${recipe.slug}/`} className="card-link" aria-label={recipe.name} />
      <div className="card-image">
        {recipe.image ? (
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${recipe.image}`} alt={recipe.name} width={400} height={250} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        ) : (
          <div className="card-placeholder">{categoryEmojis[recipe.category] || '🍽️'}</div>
        )}
      </div>
      <div className="card-body">
        <span className={`card-category cat-${recipe.category}`}>{recipe.category.replace('-', ' ')}</span>
        <h3 className="card-title">{recipe.name}</h3>
        <p className="card-desc">{recipe.description}</p>
        <div className="card-meta">
          <span>⏱ {recipe.prepTime}</span>
          <span>🔥 {recipe.cookTime}</span>
          <span>👥 {recipe.servings}</span>
        </div>
      </div>
    </div>
  );
}
