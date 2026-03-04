export async function sendGuestMessage(messages) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: `You are GuestFlow AI, a friendly assistant for service-based businesses. 
               Help guests understand services, check availability, and complete bookings. 
               Be warm, concise, and professional.`,
      messages,
    }),
  })
  const data = await response.json()
  return data.content[0].text
}