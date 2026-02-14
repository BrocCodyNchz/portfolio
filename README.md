# Portfolio

A modern portfolio website with an xAI, SpaceX, and Starlink-inspired aesthetic. Built with React, TypeScript, and Tailwind CSS.

**Last updated:** February 2026

## Features

- **Dark theme** with high contrast and spring green accents
- **Responsive design** with mobile-first hamburger navigation
- **Glass morphism** effects and smooth transitions
- **Contact form** with Resend (email delivery)
- **Sections**: Hero, About, Contact

## Tech Stack

- React 18
- TypeScript 5.6
- Vite 5.4
- Tailwind CSS 3.4
- Resend (email delivery)

## Security

- Input validation and length limits (name: 100, email: 254, message: 5000 chars)
- XSS protection via HTML escaping
- Security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, etc.)
- No secrets in client-side code

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

The contact form uses **Resend** for email delivery. You must verify a domain at [resend.com/domains](https://resend.com/domains) — the testing sender (`onboarding@resend.dev`) is not for production use.

### Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your domain at [resend.com/domains](https://resend.com/domains) (add DNS records they provide)
3. Create an API key at [resend.com/api-keys](https://resend.com/api-keys)

### Vercel Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Your Resend API key |
| `RESEND_FROM_EMAIL` | Sender address (must use your verified domain, e.g. `contact@yourdomain.com`) |
| `RESEND_TO_EMAIL` | Where to receive contact form messages |

**Keep these in Vercel only** — never commit emails or API keys to the repo.

For local development, copy `.env.example` to `.env` and fill in your credentials.

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
