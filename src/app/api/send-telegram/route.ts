import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, service, message } = body

  if (!name || !email || !phone || !service || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Missing Telegram credentials')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const telegramMessage = `
🆕 <b>Новая заявка с сайта WebNova</b>

👤 <b>Имя:</b> ${name}
📧 <b>Email:</b> ${email}
📱 <b>Телефон:</b> ${phone}
🎯 <b>Услуга:</b> ${service}

💬 <b>Сообщение:</b>
${message}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })}
  `.trim()

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      }
    )

    if (!response.ok) {
      const data = await response.json()
      console.error('Telegram API error:', data)
      return NextResponse.json({ error: 'Failed to send message to Telegram' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Заявка успешно отправлена!' })
  } catch (err) {
    console.error('Telegram send error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
