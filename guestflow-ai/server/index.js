import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: 'You are GuestFlow AI, a friendly assistant for service-based businesses. Help guests understand services, check availability, and complete bookings. Be warm, concise, and professional.',
      messages,
    })

    res.json({ reply: response.content[0].text })

  } catch (error) {
    console.error('Anthropic error:', error)
    res.status(500).json({ error: error.message })
  }
})

app.listen(3001, () => {
  console.log('GuestFlow server running on http://localhost:3001')
})