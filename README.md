# Portfolio

A modern portfolio website with an xAI, SpaceX, and Starlink-inspired aesthetic. Built with React, TypeScript, and Tailwind CSS.

**Last updated:** February 2026

## Features

- **Dark theme** with high contrast and spring green accents
- **Responsive design** with mobile-first hamburger navigation
- **Glass morphism** effects and smooth transitions
- **Contact form** with Cloudflare Turnstile (bot protection) and Resend (email delivery)
- **Sections**: Hero, About, Contact

## Tech Stack

- React 18
- TypeScript 5.6
- Vite 5.4
- Tailwind CSS 3.4
- Resend 6.x (email)
- Cloudflare Turnstile (form protection)

## Security

- Input validation and length limits (name: 100, email: 254, message: 5000 chars)
- XSS protection via HTML escaping
- Cloudflare Turnstile bot protection
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

The contact form uses **Resend** for email delivery and **Cloudflare Turnstile** for bot protection.

1. **Resend**: Sign up at [resend.com](https://resend.com), create an API key, and verify your domain (or use `onboarding@resend.dev` for testing).
2. **Cloudflare Turnstile**: Get free keys at [Cloudflare Dashboard → Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile).
3. Add environment variables in Vercel (Project → Settings → Environment Variables):

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Your Resend API key |
| `RESEND_FROM_EMAIL` | Sender email (e.g. `onboarding@resend.dev`) |
| `RESEND_TO_EMAIL` | Where to receive contact form messages |
| `VITE_TURNSTILE_SITE_KEY` | Turnstile site key (public) — **use production key** to remove "for testing only" |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key (server-only) |

**Turnstile (remove "For testing only" message):**
1. Go to [Cloudflare Dashboard → Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Click **Add site**
3. Enter your domain (e.g. `your-portfolio.vercel.app`) or use `*` for all
4. Choose **Managed** (recommended) or **Non-interactive**
5. Copy the **Site Key** and **Secret Key**
6. Add both to Vercel Environment Variables and redeploy

Without production keys, the widget shows "For testing only. If seen, report to site owner."

**Still seeing "For testing only" after adding keys?**
1. In Vercel → Settings → Environment Variables, set **both** Production and Preview for each variable
2. Trigger a **new deployment** (Deployments → ⋮ → Redeploy)—env vars only apply to new builds
3. Confirm the variable name is exactly `VITE_TURNSTILE_SITE_KEY` (case-sensitive)

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
