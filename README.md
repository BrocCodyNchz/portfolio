# Portfolio

A modern portfolio website with an xAI, SpaceX, and Starlink-inspired aesthetic. Built with React, TypeScript, and Tailwind CSS.

**Last updated:** February 2026

## Features

- **Dark theme** with high contrast and spring green accents
- **Responsive design** with mobile-first hamburger navigation
- **Glass morphism** effects and smooth transitions
- **Contact form** with EmailJS (client-side email)
- **Sections**: Hero, About, Contact

## Tech Stack

- React 18
- TypeScript 5.6
- Vite 5.4
- Tailwind CSS 3.4
- EmailJS (client-side email)

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

The contact form uses **EmailJS** for client-side email delivery — no backend or API keys needed. Emails are sent directly from the browser.

### EmailJS Setup

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. **Add Email Service**: Connect Gmail, Outlook, or another provider
3. **Create Email Template** with these variables:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email (for reply)
   - `{{message}}` — the message content
4. Copy your **Service ID**, **Template ID**, and **Public Key**

### Environment Variables (Vercel or .env)

| Variable | Description |
|----------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Your EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS public key |

**Note:** EmailJS uses public keys (safe for client-side). Free tier: 200 emails/month.

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
