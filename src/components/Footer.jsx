import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="nav-logo" style={{ fontSize: 24 }}>
              Food<span style={{ color: 'var(--accent-blue)' }}>Lovers</span>
            </Link>
            <p>Discover authentic Indian recipes from every corner of the subcontinent. From royal Mughlai curries to humble street food.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <Link href="/menu/">All Recipes</Link>
            <Link href="/menu/?cat=vegetarian">Vegetarian</Link>
            <Link href="/menu/?cat=non-vegetarian">Non-Veg</Link>
            <Link href="/menu/?cat=desserts">Desserts</Link>
          </div>
          <div className="footer-col">
            <h4>Categories</h4>
            <Link href="/menu/?cat=beverages">Beverages</Link>
            <Link href="/menu/?cat=street-food">Street Food</Link>
            <Link href="/about/">About Us</Link>
            <Link href="/contact/">Contact Us</Link>
            <Link href="/faq/">FAQ</Link>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} FoodLovers. All rights reserved.</span>
          <span>Made with ❤️ in India</span>
        </div>
      </div>
    </footer>
  );
}
