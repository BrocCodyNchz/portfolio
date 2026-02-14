# Portfolio

A modern portfolio website with an xAI, SpaceX, and Starlink-inspired aesthetic. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Dark theme** with high contrast and spring green accents
- **Responsive design** with mobile-first hamburger navigation
- **Glass morphism** effects and smooth transitions
- **Contact form** with Cloudflare Turnstile (bot protection) and Resend (email delivery)
- **Sections**: Hero, About, Contact

## Tech Stack

- React 18
- TypeScript
- Vite 5
- Tailwind CSS 3
- Resend (email)
- Cloudflare Turnstile (form protection)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Contact Form Setup

The contact form uses **Resend** for email delivery and **Cloudflare Turnstile** for bot protection.

1. **Resend**: Sign up at [resend.com](https://resend.com), create an API key, and verify your domain (or use `onboarding@resend.dev` for testing).
2. **Cloudflare Turnstile**: Get free keys at [Cloudflare Dashboard → Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile).
3. Add environment variables in Vercel (Project → Settings → Environment Variables):

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Your Resend API key |
| `RESEND_FROM_EMAIL` | Sender email (e.g. `onboarding@resend.dev`) |
| `RESEND_TO_EMAIL` | Where to receive contact form messages |
| `VITE_TURNSTILE_SITE_KEY` | Turnstile site key (public) |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key (server-only) |

For local development, copy `.env.example` to `.env` and fill in your values. Use `vercel dev` to test the API locally.

## Customization

1. **About**: Update `src/components/features/AboutSection.tsx` with your bio
2. **Contact**: Change social links in `src/components/features/ContactSection.tsx`
3. **Branding**: Update the site title in `index.html` and header in `Header.tsx`

## Design

The design follows a space-tech aesthetic inspired by SpaceX, xAI, and Starlink:

- Pure black backgrounds (#000000)
- Near-white text (#FEFEFE)
- Spring green accent (#00FF7F) for CTAs and highlights
- Subtle grid overlay for depth
- Clean typography with Inter font
