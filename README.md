# Portfolio

A modern portfolio website with an xAI, SpaceX, and Starlink-inspired aesthetic. Built with React, TypeScript, and Tailwind CSS.

**Last updated:** February 2026

## Features

- **Dark theme** with high contrast and spring green accents
- **Responsive design** with mobile-first hamburger navigation
- **Glass morphism** effects and smooth transitions
- **Contact form** with Turnstile (bot protection) and EmailJS (email)
- **Sections**: Hero, About, Contact

## Tech Stack

- React 18
- TypeScript 5.6
- Vite 5.4
- Tailwind CSS 3.4
- Cloudflare Turnstile (bot protection)
- EmailJS (email via REST API)

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

The contact form uses **Cloudflare Turnstile** (bot protection) and **EmailJS** (email delivery). Submissions are validated server-side before sending.

### Turnstile Setup

1. Go to [Cloudflare Dashboard → Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Add widget — select **"No"** for pre-clearance (required when hosting on Vercel)
3. Add your domain (e.g. `*.vercel.app`)
4. Copy **Site Key** and **Secret Key**

### EmailJS Setup

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. **Add Email Service**: Connect Gmail, Outlook, or another provider
3. **Create Email Template** — use the "Contact Us" template or add these variables to the body:
   - `{{name}}` — visitor's name
   - `{{email}}` — **visitor's email (required so you can contact them back)**
   - `{{message}}` — their message
   - `{{time}}` — submission timestamp (optional)
   
   **Template body example** (paste into Content field):
   ```
   New contact form submission
   
   Name: {{name}}
   Email: {{email}}
   Message: {{message}}
   Submitted: {{time}}
   ```
   
   **Template settings:**
   - **To Email**: Your email (where you receive submissions)
   - **Reply-To**: `{{email}}` (so Reply goes to the visitor)
4. Copy your **Service ID**, **Template ID**, and **Public Key**

### Environment Variables (Vercel)

| Variable | Description |
|----------|-------------|
| `VITE_TURNSTILE_SITE_KEY` | Turnstile site key (client) |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key (server) |
| `EMAILJS_SERVICE_ID` | EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `EMAILJS_PRIVATE_KEY` | EmailJS private key (required for server-side) |

**EmailJS server-side:** Go to [Account → Security](https://dashboard.emailjs.com/admin/account/security) and enable "Allow API calls from non-browser applications". Generate a Private Key there and add it as `EMAILJS_PRIVATE_KEY`.

**Note:** Set all for Production and Preview. Turnstile pre-clearance = No when using Vercel.

For local development, create a `.env` file with the variables above.

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
