import type { VercelRequest, VercelResponse } from '@vercel/node'

const LIMITS = { name: 100, email: 254, message: 5000, token: 2048 } as const
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function validateTurnstile(token: string, remoteip?: string): Promise<{ success: boolean; 'error-codes'?: string[] }> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return { success: false, 'error-codes': ['missing-input-secret'] }

  try {
    const formData = new URLSearchParams()
    formData.append('secret', secret)
    formData.append('response', token)
    if (remoteip) formData.append('remoteip', remoteip)

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    })
    return (await res.json()) as { success: boolean; 'error-codes'?: string[] }
  } catch {
    return { success: false, 'error-codes': ['internal-error'] }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  res.setHeader('Content-Type', 'application/json')

  try {
    const { name, email, message, turnstileToken } = req.body as Record<string, unknown>

    if (!name || !email || !message || typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }

    const nameTrimmed = name.trim()
    const emailTrimmed = email.trim()
    const messageTrimmed = message.trim()

    if (!nameTrimmed || !emailTrimmed || !messageTrimmed) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }
    if (nameTrimmed.length > LIMITS.name) return res.status(400).json({ error: `Name must be ${LIMITS.name} characters or less` })
    if (emailTrimmed.length > LIMITS.email) return res.status(400).json({ error: `Email must be ${LIMITS.email} characters or less` })
    if (messageTrimmed.length > LIMITS.message) return res.status(400).json({ error: `Message must be ${LIMITS.message} characters or less` })
    if (!EMAIL_REGEX.test(emailTrimmed)) return res.status(400).json({ error: 'Invalid email format' })

    if (!turnstileToken || typeof turnstileToken !== 'string') {
      return res.status(400).json({ error: 'Verification required. Please complete the challenge.' })
    }
    if (turnstileToken.length > LIMITS.token) return res.status(400).json({ error: 'Invalid verification token' })

    const remoteip = (req.headers['cf-connecting-ip'] as string) || (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
    const turnstileResult = await validateTurnstile(turnstileToken.trim(), remoteip)
    if (!turnstileResult.success) {
      return res.status(400).json({ error: 'Verification failed. Please try again.', errorCodes: turnstileResult['error-codes'] })
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID
    const templateId = process.env.EMAILJS_TEMPLATE_ID
    const publicKey = process.env.EMAILJS_PUBLIC_KEY
    const privateKey = process.env.EMAILJS_PRIVATE_KEY
    if (!serviceId || !templateId || !publicKey || !privateKey) {
      return res.status(500).json({ error: 'Email service is not configured' })
    }

    const emailjsRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          name: nameTrimmed,
          email: emailTrimmed,
          message: messageTrimmed,
          from_name: nameTrimmed,
          from_email: emailTrimmed,
          title: `Contact from ${nameTrimmed}`,
          time: new Date().toLocaleString(),
        },
      }),
    })

    if (!emailjsRes.ok) {
      const errText = await emailjsRes.text()
      console.error('EmailJS error:', emailjsRes.status, errText)
      return res.status(500).json({ error: 'Failed to send message. Please try again.' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return res.status(500).json({ error: 'An unexpected error occurred' })
  }
}
