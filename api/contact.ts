import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { LIMITS } from '../constants/contact'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Strip CRLF and Unicode line/paragraph separators to prevent header/body injection */
const sanitize = (s: string) => s.replace(/[\r\n\u2028\u2029]+/g, ' ').trim()

const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(5, '1 m'),
      })
    : null

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  res.setHeader('Content-Type', 'application/json')

  try {
    if (ratelimit) {
      const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? req.headers['x-real-ip'] ?? 'unknown'
      const { success } = await ratelimit.limit(`contact:${ip}`)
      if (!success) {
        return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' })
      }
    }

    const { name, email, message } = req.body as Record<string, unknown>

    if (!name || !email || !message || typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }

    const nameTrimmed = sanitize(name)
    const emailTrimmed = sanitize(email)
    const messageTrimmed = sanitize(message)

    if (!nameTrimmed || !emailTrimmed || !messageTrimmed) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }
    if (nameTrimmed.length > LIMITS.name) return res.status(400).json({ error: `Name must be ${LIMITS.name} characters or less` })
    if (emailTrimmed.length > LIMITS.email) return res.status(400).json({ error: `Email must be ${LIMITS.email} characters or less` })
    if (messageTrimmed.length > LIMITS.message) return res.status(400).json({ error: `Message must be ${LIMITS.message} characters or less` })
    if (!EMAIL_REGEX.test(emailTrimmed)) return res.status(400).json({ error: 'Invalid email format' })

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
