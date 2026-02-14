import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

// Input limits to prevent DoS (per OWASP recommendations)
const LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
  token: 2048,
} as const

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const resend = new Resend(process.env.RESEND_API_KEY)

async function validateTurnstile(token: string, remoteip?: string): Promise<{ success: boolean; 'error-codes'?: string[] }> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    return { success: false, 'error-codes': ['missing-input-secret'] }
  }

  try {
    const formData = new URLSearchParams()
    formData.append('secret', secret)
    formData.append('response', token)
    if (remoteip) formData.append('remoteip', remoteip)

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    })
    return (await response.json()) as { success: boolean; 'error-codes'?: string[] }
  } catch (error) {
    console.error('Turnstile validation error:', error)
    return { success: false, 'error-codes': ['internal-error'] }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  res.setHeader('Content-Type', 'application/json')

  try {
    const { name, email, message, turnstileToken } = req.body as {
      name?: unknown
      email?: unknown
      message?: unknown
      turnstileToken?: unknown
    }

    if (!name || !email || !message || typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }

    const nameTrimmed = name.trim()
    const emailTrimmed = email.trim()
    const messageTrimmed = message.trim()

    if (!nameTrimmed || !emailTrimmed || !messageTrimmed) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }

    if (nameTrimmed.length > LIMITS.name) {
      return res.status(400).json({ error: `Name must be ${LIMITS.name} characters or less` })
    }
    if (emailTrimmed.length > LIMITS.email) {
      return res.status(400).json({ error: `Email must be ${LIMITS.email} characters or less` })
    }
    if (messageTrimmed.length > LIMITS.message) {
      return res.status(400).json({ error: `Message must be ${LIMITS.message} characters or less` })
    }
    if (!EMAIL_REGEX.test(emailTrimmed)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    if (!turnstileToken || typeof turnstileToken !== 'string') {
      return res.status(400).json({ error: 'Verification required. Please complete the challenge.' })
    }
    if (turnstileToken.length > LIMITS.token) {
      return res.status(400).json({ error: 'Invalid verification token' })
    }

    const remoteip =
      (req.headers['cf-connecting-ip'] as string) ||
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      undefined

    const turnstileResult = await validateTurnstile(turnstileToken.trim(), remoteip)
    if (!turnstileResult.success) {
      return res.status(400).json({
        error: 'Verification failed. Please try again.',
        errorCodes: turnstileResult['error-codes'],
      })
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL
    const toEmail = process.env.RESEND_TO_EMAIL

    if (!process.env.RESEND_API_KEY || !fromEmail || !toEmail) {
      console.error('Missing Resend configuration')
      return res.status(500).json({ error: 'Email service is not configured' })
    }

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Portfolio Contact from ${escapeHtml(nameTrimmed)}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(nameTrimmed)}</p>
        <p><strong>Email:</strong> ${escapeHtml(emailTrimmed)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(messageTrimmed).replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Failed to send message. Please try again.' })
    }

    return res.status(200).json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Contact API error:', err)
    return res.status(500).json({ error: 'An unexpected error occurred' })
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
