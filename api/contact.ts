import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

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
      name?: string
      email?: string
      message?: string
      turnstileToken?: string
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }

    if (!turnstileToken) {
      return res.status(400).json({ error: 'Verification required. Please complete the challenge.' })
    }

    const remoteip =
      (req.headers['cf-connecting-ip'] as string) ||
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      undefined

    const turnstileResult = await validateTurnstile(turnstileToken, remoteip)
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
      subject: `Portfolio Contact from ${name.trim()}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message.trim()).replace(/\n/g, '<br>')}</p>
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
