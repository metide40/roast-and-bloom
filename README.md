# Roast & Bloom — Coffee Shop Website

A modern coffee shop website built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Full storefront: Home, Menu, Product details, Cart, Checkout, Order confirmation
- Account flows: Sign up, Login, Forgot password, Profile, Order history, Favorites, Loyalty points
- About, Locations, and Contact pages
- Client-side cart, favorites, and order state persisted to `localStorage` (no backend required)
- Responsive, animated UI (Framer Motion) with a custom coffee-toned design system

## Tech Stack

- ⚡️ **Vite** — build tool and dev server
- ⚛️ **React 19** + **TypeScript**
- 🎨 **Tailwind CSS v4** (CSS-based theme config, see `src/index.css`)
- 🎞️ **Framer Motion** — animations
- 🧭 **React Router** — routing
- 🔔 **Sonner** — toast notifications
- 🎯 **Phosphor Icons** — iconography

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── Layout.tsx        # Navbar, Footer, shared UI (buttons, headings, reveal animation)
├── pages/
│   ├── Home.tsx           # Landing page + ProductCard
│   ├── Shop.tsx           # Menu, product details, cart, checkout, confirmation
│   └── Account.tsx        # Login, signup, profile, orders, favorites, loyalty, locations, about, contact
├── data.ts                 # Product catalog, locations, testimonials
├── store.tsx                # Global app state (cart/favorites/orders/user) via Context + localStorage
├── App.tsx                  # Routes
├── index.css                # Tailwind v4 theme + design tokens
└── main.tsx                 # Entry point
```

## Notes

- Product/hero images currently live in `src/data.ts` and `public/` — replace with your own photography before going live.
- Login/signup is a client-side demo only (no real authentication or backend yet).
- Cart, favorites, and orders persist to the browser's `localStorage`, so data is per-device, not synced to an account server.

## Roadmap Ideas

- Real backend/auth (e.g. Supabase) for accounts and order persistence
- Payment integration (e.g. Stripe) at checkout
- Dark mode toggle
- Order status tracking
- SEO metadata per route
