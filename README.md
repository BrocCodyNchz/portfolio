# Portfolio

A modern portfolio website with an xAI, SpaceX, and Starlink-inspired aesthetic. Built with React, TypeScript, and Tailwind CSS.

**Last updated:** February 2026

## Features

- **Dark theme** with high contrast and spring green accents
- **Responsive design** with mobile-first hamburger navigation
- **Glass morphism** effects and smooth transitions
- **Contact form** with nodemailer (SMTP email delivery)
- **Sections**: Hero, About, Contact

## Tech Stack

- React 18
- TypeScript 5.6
- Vite 5.4
- Tailwind CSS 3.4
- Nodemailer (SMTP email)

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

The contact form uses **nodemailer** for direct SMTP email sending to `codydev.expire209@passinbox.com`.

1. **SMTP Provider**: Use Gmail, Outlook, or another SMTP service.
2. **Gmail Setup** (recommended):
   - Enable 2FA in Google Account settings
   - Generate an App Password: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Use the 16-character app password (not your regular password)

3. Add environment variables in Vercel (Project → Settings → Environment Variables):

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | SMTP server (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (`587` for TLS, `465` for SSL) |
| `SMTP_USER` | Your email address |
| `SMTP_PASS` | App password (for Gmail) or account password |

For local development, copy `.env.example` to `.env` and fill in your SMTP credentials.

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
