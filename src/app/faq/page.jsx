'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: 'What is FoodLovers?', a: 'FoodLovers is a curated platform showcasing authentic Indian recipes from diverse regions — covering vegetarian, non-vegetarian, beverages, desserts and street food. All recipes include detailed ingredients, step-by-step instructions, and video tutorials.' },
  { q: 'Are the recipes beginner-friendly?', a: 'Absolutely! Each recipe is tagged with a difficulty level (Easy, Medium, Hard). We include clear step-by-step instructions so even first-time cooks can follow along confidently.' },
  { q: 'How many recipes are available?', a: 'We currently have 28+ authentic Indian recipes across 5 categories, with more being added regularly. Each recipe includes prep time, cook time, serving size and a video tutorial.' },
  { q: 'Can I contribute a recipe?', a: 'We love community contributions! You can reach out to us via the Contact page with your recipe details, and our team will review and publish it with proper credit.' },
  { q: 'Are nutritional values provided?', a: 'Currently, we provide ingredient quantities and serving sizes. Detailed nutritional breakdowns are planned for a future update.' },
  { q: 'Is this project open source?', a: 'Yes! FoodLovers is an open-source project hosted on GitHub. You can fork, contribute, or use it as a reference for your own projects.' },
  { q: 'What technologies power this site?', a: 'FoodLovers is built with Next.js 14, React 18, GSAP (GreenSock Animation Platform) for high-end animations, and deployed on GitHub Pages with static export.' },
  { q: 'Do you have a mobile app?', a: 'Not yet, but FoodLovers is fully responsive and works beautifully on all mobile devices. Bookmark it on your phone\'s home screen for an app-like experience!' },
  { q: 'How can I report a bug or issue?', a: 'Please create an issue on our GitHub repository or contact us through the Contact page. We actively monitor and fix reported issues.' },
  { q: 'Can I use these recipes commercially?', a: 'The recipes themselves are traditional and in the public domain. However, the specific content, photos, and code on this site are under the project\'s license. Please check our GitHub repository for licensing details.' },
];

export default function FaqPage() {
  const pageRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');

  const filteredFaqs = search.trim()
    ? faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : faqs;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-header > div > *', { y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out', delay: 0.2 });
      const items = document.querySelectorAll('.faq-item');
      if (items.length) {
        gsap.from(items, {
          scrollTrigger: { trigger: items[0], start: 'top 85%' },
          y: 30, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out',
        });
      }
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const toggle = (i) => {
    if (openIndex === i) {
      setOpenIndex(null);
    } else {
      setOpenIndex(i);
    }
  };

  return (
    <div ref={pageRef}>
      <div className="page-header">
        <div className="container">
          <h1 className="heading-lg">Frequently Asked <span className="text-gradient">Questions</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontSize: 16 }}>
            Find answers to common questions about FoodLovers
          </p>
        </div>
      </div>

      <section style={{ paddingBottom: 100 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {/* Search */}
          <div className="search-wrapper">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search FAQs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 48, maxWidth: '100%' }}
            />
          </div>

          {filteredFaqs.map((faq, i) => (
            <div key={i} className={`faq-item${openIndex === i ? ' open' : ''}`}>
              <div className="faq-question" onClick={() => toggle(i)}>
                <span>{faq.q}</span>
                <svg className="faq-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
              <div className="faq-answer" style={{ maxHeight: openIndex === i ? 300 : 0 }}>
                <div className="faq-answer-inner">{faq.a}</div>
              </div>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              <p>No matching questions found. Try a different search term.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
