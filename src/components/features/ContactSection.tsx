/**
 * ContactSection - Contact form with Turnstile and Resend
 *
 * @purpose Collects messages via form, protected by Cloudflare Turnstile, sent via Resend
 */

import { useState, useRef } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import type { TurnstileInstance } from '@marsidev/react-turnstile'

const API_URL = '/api/contact'

// VITE_ prefix required for Vercel to expose to client build (import.meta.env)
const siteKey = import.meta.env.VITE_CLOUD_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<TurnstileInstance | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const token = turnstileToken ?? (formData.get('cf-turnstile-response') as string | null)

    if (!token) {
      setErrorMessage('Please complete the verification.')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          turnstileToken: token,
        }),
      })

      const data = (await response.json()) as { error?: string; success?: boolean }

      if (!response.ok) {
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        turnstileRef.current?.reset()
        setTurnstileToken(null)
        return
      }

      setStatus('success')
      form.reset()
      setTurnstileToken(null)
      turnstileRef.current?.reset()
    } catch {
      setErrorMessage('Network error. Please try again.')
      setStatus('error')
      turnstileRef.current?.reset()
      setTurnstileToken(null)
    }
  }

  return (
    <section id="contact" className="border-t border-white/10 py-24 px-6">
      <div className="mx-auto max-w-2xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-green/90">Contact</p>
        <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Let&apos;s build something
          <br />
          <span className="text-green">extraordinary</span>
        </h2>
        <p className="mb-12 text-lg text-grey-300">
          Have a project in mind? I&apos;d love to hear about it. Reach out and let&apos;s create something amazing
          together.
        </p>

        {status === 'success' ? (
          <div className="rounded-xl border border-green/30 bg-green/5 p-8 text-center">
            <p className="text-lg font-medium text-green">Message sent!</p>
            <p className="mt-2 text-grey-300">Thanks for reaching out. I&apos;ll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-grey-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={100}
                autoComplete="name"
                className="w-full rounded-lg border border-white/20 bg-grey-900/50 px-4 py-3 text-white placeholder-grey-500 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
                placeholder="Your name"
                disabled={status === 'loading'}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-grey-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                className="w-full rounded-lg border border-white/20 bg-grey-900/50 px-4 py-3 text-white placeholder-grey-500 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
                placeholder="you@example.com"
                disabled={status === 'loading'}
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-grey-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={5000}
                className="w-full resize-none rounded-lg border border-white/20 bg-grey-900/50 px-4 py-3 text-white placeholder-grey-500 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
                placeholder="Tell me about your project..."
                disabled={status === 'loading'}
              />
            </div>

            <Turnstile
              ref={turnstileRef}
              siteKey={siteKey}
              options={{
                theme: 'dark',
                size: 'normal',
              }}
              onSuccess={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken(null)}
            />

            {errorMessage && (
              <p className="text-sm text-red-400">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-lg bg-green px-8 py-4 font-semibold text-black transition-all duration-300 hover:bg-green-dark hover:shadow-[0_0_30px_rgba(0,255,127,0.4)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
