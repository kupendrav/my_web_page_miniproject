# 🍛 FoodLovers — Authentic Indian Recipes

A modern, animated recipe showcase built with **Next.js 14**, **React 18**, and **GSAP** — featuring 28+ authentic Indian recipes across 5 cuisines.

## 🌐 Live Demo

👉 **[https://kupendrav.github.io/my_web_page_miniproject/](https://<kupendrav>.github.io/my_web_page_miniproject/)**

## ✨ Features

- **28+ Recipes** across Vegetarian, Non-Vegetarian, Beverages, Desserts & Street Food
- **High-end GSAP animations** — 3D card tilts, character-by-character reveals, floating particles, staggered entrances, ScrollTrigger effects, counter animations
- **Fully responsive** dark-theme design with glassmorphism
- **Search & filter** recipes by name, region and category
- **Dynamic recipe pages** with ingredients, step-by-step instructions & YouTube tutorials
- **Static export** optimised for GitHub Pages deployment
- **GitHub Actions CI/CD** — auto-deploys on push to `main`

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | App Router, static export, file-based routing |
| React 18 | Component architecture, hooks |
| GSAP 3.12 | ScrollTrigger, 3D transforms, stagger animations |
| CSS Variables | Dark theme, responsive design, glassmorphism |
| GitHub Actions | Automated build & deploy to GitHub Pages |

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.jsx          # Root layout (Navbar + Footer)
│   ├── page.jsx             # Home — hero, categories, stats, featured
│   ├── menu/page.jsx        # Combined menu with search & category filters
│   ├── recipe/[slug]/       # Dynamic recipe pages (28 routes)
│   ├── contact/page.jsx     # Contact form, map, team section
│   ├── faq/page.jsx         # Searchable accordion FAQ
│   └── login/page.jsx       # UI-only auth page
├── components/
│   ├── Navbar.jsx           # Scroll-aware fixed navbar
│   ├── Footer.jsx           # 4-column footer
│   ├── Hero.jsx             # Video hero with floating particles
│   └── RecipeCard.jsx       # 3D tilt card with ScrollTrigger
├── data/
│   └── recipes.js           # 28 recipes with full metadata
└── globals.css              # Comprehensive dark theme styles
```

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/kupendrav/my_web_page_miniproject.git
cd my_web_page_miniproject

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export → ./out)
npm run build
```

## 🌍 Deploy to GitHub Pages

1. Push the code to a GitHub repository
2. Go to **Settings → Pages → Source → GitHub Actions**
3. The included workflow (`.github/workflows/deploy.yml`) will automatically build and deploy on every push to `main`

## 🍽️ Recipe Categories

| Category | Count | Highlights |
|----------|-------|-----------|
| 🥬 Vegetarian | 8 | Palak Paneer, Masala Dosa, Dhokla, Chole Bhature |
| 🍗 Non-Vegetarian | 8 | Butter Chicken, Hyderabadi Biryani, Laal Maas |
| 🥤 Beverages | 5 | Mango Lassi, Masala Chai, Filter Coffee |
| 🍮 Desserts | 4 | Gulab Jamun, Rasgulla, Jalebi, Gajar Halwa |
| 🥘 Street Food | 3 | Samosa, Pav Bhaji, Vada Pav |

## 👥 Team

Harshita • Kishore SN • Kushi • Sai Srethan • Kupendra • Janavi • Jayanavya • Keerthana DC • Kishore Kumar 

## 📄 License

This project is open source. See the [LICENSE](LICENSE) file for details.
