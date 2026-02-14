/**
 * ContactSection - Contact form with EmailJS
 *
 * @purpose Collects messages via form, sent via EmailJS (client-side, no backend needed)
 */

import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')

    if (!formRef.current || !SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setErrorMessage('Email service is not configured.')
      setStatus('error')
      return
    }

    const form = formRef.current
    const fromName = (form.elements.namedItem('from_name') as HTMLInputElement)?.value ?? ''
    const fromEmail = (form.elements.namedItem('from_email') as HTMLInputElement)?.value ?? ''
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value ?? ''

    setStatus('loading')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: fromName,
          email: fromEmail,
          message,
          from_name: fromName,
          from_email: fromEmail,
          title: `Contact from ${fromName}`,
          time: new Date().toLocaleString(),
        },
        { publicKey: PUBLIC_KEY }
      )
      setStatus('success')
      form.reset()
    } catch (err) {
      console.error('EmailJS error:', err)
      const errMsg = err instanceof Error ? err.message : String(err)
      const is422 = errMsg.includes('422') || (err as { status?: number })?.status === 422
      setErrorMessage(
        is422
          ? 'Template mismatch. Ensure your EmailJS template uses {{from_name}}, {{from_email}}, {{message}}.'
          : 'Failed to send message. Please try again.'
      )
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
                maxLength={100}
                autoComplete="name"
                className="w-full rounded-lg border border-white/20 bg-grey-900/50 px-4 py-3 text-white placeholder-grey-500 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
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
