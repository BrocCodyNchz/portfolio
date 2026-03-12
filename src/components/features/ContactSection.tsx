/**
 * ContactSection - Contact form with EmailJS
 *
 * @purpose Collects messages via form, sent via EmailJS (bot protection via Vercel)
 */

import { useState, useRef } from 'react'
import { LIMITS } from '../../../constants/contact'

const API_URL = '/api/contact'

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')

    const form = formRef.current
    if (!form) return

    setStatus('loading')

    try {
      const formData = new FormData(form)
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('from_name'),
          email: formData.get('from_email'),
          message: formData.get('message'),
        }),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      form.reset()
    } catch {
      setErrorMessage('Network error. Please try again.')
      setStatus('error')
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
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="from_name" className="mb-2 block text-sm font-medium text-grey-300">
                Name
              </label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                required
                maxLength={LIMITS.name}
                autoComplete="name"
                className={`w-full rounded-lg border bg-grey-900/50 px-4 py-3 text-white placeholder-grey-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/20 disabled:opacity-60 disabled:cursor-not-allowed ${status === 'error' ? 'border-error ring-2 ring-error/20' : 'border-white/20'}`}
                placeholder="Your name"
                disabled={status === 'loading'}
              />
            </div>
            <div>
              <label htmlFor="from_email" className="mb-2 block text-sm font-medium text-grey-300">
                Email
              </label>
              <input
                id="from_email"
                name="from_email"
                type="email"
                required
                maxLength={LIMITS.email}
                autoComplete="email"
                className={`w-full rounded-lg border bg-grey-900/50 px-4 py-3 text-white placeholder-grey-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/20 disabled:opacity-60 disabled:cursor-not-allowed ${status === 'error' ? 'border-error ring-2 ring-error/20' : 'border-white/20'}`}
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
                maxLength={LIMITS.message}
                className={`w-full resize-none rounded-lg border bg-grey-900/50 px-4 py-3 text-white placeholder-grey-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/20 disabled:opacity-60 disabled:cursor-not-allowed ${status === 'error' ? 'border-error ring-2 ring-error/20' : 'border-white/20'}`}
                placeholder="Tell me about your project..."
                disabled={status === 'loading'}
              />
            </div>

            {errorMessage && <p className="text-sm text-error">{errorMessage}</p>}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-lg bg-green px-8 py-4 font-semibold text-black transition-colors transition-shadow transition-transform duration-300 hover:bg-green-hover hover:shadow-[0_0_30px_rgba(0,255,127,0.4)] hover:-translate-y-px active:bg-green-dark active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
