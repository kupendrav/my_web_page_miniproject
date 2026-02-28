'use client';
import { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import RecipeCard from '@/components/RecipeCard';
import { recipes, categories } from '@/data/recipes';

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';
  const [activeCat, setActiveCat] = useState(initialCat);
  const [search, setSearch] = useState('');
  const gridRef = useRef(null);

  const filtered = useMemo(() => {
    let list = activeCat === 'all' ? recipes : recipes.filter(r => r.category === activeCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCat, search]);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.card');
      gsap.from(cards, { y: 40, opacity: 0, scale: 0.95, stagger: 0.04, duration: 0.5, ease: 'power3.out' });
    }
  }, [activeCat, search]);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="heading-lg">Our <span className="text-gradient">Menu</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontSize: 16 }}>
            {recipes.length} recipes across {categories.length - 1} categories
          </p>
        </div>
      </div>

      <section style={{ paddingBottom: 80 }}>
        <div className="container">
          {/* Search */}
          <div className="search-wrapper">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search recipes, regions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 48 }}
            />
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-tab${activeCat === cat.id ? ' active' : ''}`}
                onClick={() => setActiveCat(cat.id)}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div ref={gridRef} className="featured-grid">
            {filtered.map((recipe, i) => (
              <RecipeCard key={recipe.slug} recipe={recipe} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: 48, marginBottom: 16 }}>🍽️</p>
              <p>No recipes found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <MenuContent />
    </Suspense>
  );
}
