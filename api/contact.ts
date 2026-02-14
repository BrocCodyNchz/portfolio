import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

// Input limits to prevent DoS (per OWASP recommendations)
const LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TO_EMAIL = 'contact@oldaikai.resend.app'
const FROM_EMAIL = 'contact@oldaikai.resend.app'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  res.setHeader('Content-Type', 'application/json')

  try {
    const { name, email, message } = req.body as {
      name?: unknown
      email?: unknown
      message?: unknown
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

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('Missing RESEND_API_KEY')
      return res.status(500).json({ error: 'Email service is not configured' })
    }

    const resend = new Resend(apiKey)

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: emailTrimmed,
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
    if (err instanceof Error) {
      console.error('Error message:', err.message)
    }
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
