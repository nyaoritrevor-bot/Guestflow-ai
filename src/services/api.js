export async function sendGuestMessage(messages) {
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error || 'Server error')
    }

    const data = await response.json()
    return data.reply

  } catch (error) {
    console.error('Chat error:', error)
    return 'Sorry, I could not connect right now. Please try again.'
  }
}