# Portfolio

A modern portfolio website with an xAI, SpaceX, and Starlink-inspired aesthetic. Built with React, TypeScript, and Tailwind CSS.

**Last updated:** February 2026

## Features

- **Dark theme** with high contrast and spring green accents
- **Responsive design** with mobile-first hamburger navigation
- **Glass morphism** effects and smooth transitions
- **Contact form** with Cloudflare Turnstile (bot protection with pre-clearance) and Resend (email delivery)
- **Sections**: Hero, About, Contact

## Tech Stack

- React 18
- TypeScript 5.6
- Vite 5.4
- Tailwind CSS 3.4
- Cloudflare Turnstile (bot protection with pre-clearance)
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

The contact form uses **Cloudflare Turnstile** (Feb 2026 with pre-clearance support) for bot protection and **Resend** for email delivery.

**Email:** Messages are sent from `contact@oldaikai.resend.app` to `codydev.expire209@passinbox.com`.

### Turnstile Setup (Pre-clearance enabled)

1. Go to [Cloudflare Dashboard → Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Click **Add widget**
3. **Enable pre-clearance**: Select "Yes" when asked "Would you like to opt for pre-clearance for this site?"
4. **Choose clearance level**:
   - `managed` (recommended) - bypasses Managed and JS challenges
   - `interactive` (high security) - bypasses all challenge types
   - `jschallenge` (low) - bypasses only JS challenges
5. Add your domain (e.g. `your-portfolio.vercel.app`) or use `*` for all
6. Copy the **Site Key** and **Secret Key**

### Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain `oldaikai.resend.app` (if not already verified)
3. Create an API key

### Vercel Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_TURNSTILE_SITE_KEY` | Turnstile site key (public) — **VITE_ prefix required** |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key (server-only) |
| `RESEND_API_KEY` | Your Resend API key |

**Pre-clearance benefits:**
- Issues `cf_clearance` cookie to verified visitors
- Bypasses WAF challenges based on clearance level
- Reduces friction for legitimate users
- Cookie valid for duration set in Challenge Passage settings

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
