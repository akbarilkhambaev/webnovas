import { ImageResponse } from 'next/og'
import { priceFrom } from '@/lib/price'
import { PRICE } from '@/data/pricing'

/*
 * Картинка для превью ссылки в Telegram, WhatsApp, Facebook и т. д.
 * Генерируется при сборке. Шрифт Unbounded с кириллицей подгружается из Google Fonts;
 * если загрузить его не удалось, картинка собирается с латинским текстом и сборка не падает.
 */

export const alt = 'WebNova — разработка сайтов и Telegram-ботов в Ташкенте'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const COLORS = {
  ink: '#0C0E12',
  ivory: '#EDEAE3',
  muted: '#A9AEB7',
  primary: '#3FD0D4',
  gold: '#E3B04B',
  border: '#262A33',
}

const RU = {
  title: 'Разработка сайтов и Telegram-ботов',
  place: 'Ташкент · webnovas.uz',
  facts: [
    `Сайт ${priceFrom(PRICE.website, 'ru')}`,
    `Бот ${priceFrom(PRICE.telegram, 'ru')}`,
    'Запуск от 1–2 недель',
  ],
}

const LATIN = {
  title: 'Saytlar va Telegram-botlar yaratish',
  place: 'Toshkent · webnovas.uz',
  facts: [
    `Sayt ${priceFrom(PRICE.website, 'uz')}`,
    `Bot ${priceFrom(PRICE.telegram, 'uz')}`,
    '1–2 haftada ishga tushirish',
  ],
}

async function loadFont(text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Unbounded:wght@500&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
  if (!match) throw new Error('Font URL not found')
  const response = await fetch(match[1])
  if (!response.ok) throw new Error(`Font request failed: ${response.status}`)
  return response.arrayBuffer()
}

/** Восьмиконечная звезда — знак WebNova */
const Star = () => (
  <svg width="360" height="360" viewBox="-210 -210 420 420">
    <circle cx="0" cy="0" r="200" fill="none" stroke={COLORS.border} strokeWidth="2" />
    <rect x="-128" y="-128" width="256" height="256" fill="none" stroke={COLORS.primary} strokeWidth="3" />
    <rect
      x="-128"
      y="-128"
      width="256"
      height="256"
      fill="none"
      stroke={COLORS.primary}
      strokeWidth="3"
      transform="rotate(45)"
    />
    <rect x="-64" y="-64" width="128" height="128" fill="none" stroke={COLORS.gold} strokeWidth="3" transform="rotate(22.5)" />
    <rect x="-64" y="-64" width="128" height="128" fill="none" stroke={COLORS.gold} strokeWidth="3" transform="rotate(67.5)" />
    <circle cx="0" cy="0" r="12" fill={COLORS.ivory} />
  </svg>
)

export default async function OpengraphImage() {
  const allRuText = ['WebNova', RU.title, RU.place, ...RU.facts].join(' ')

  let fontData: ArrayBuffer | null = null
  try {
    fontData = await loadFont(allRuText)
  } catch {
    fontData = null
  }

  const copy = fontData ? RU : LATIN
  const fontFamily = fontData ? 'Unbounded' : 'sans-serif'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: COLORS.ink,
          color: COLORS.ivory,
          fontFamily,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 680 }}>
            <div style={{ display: 'flex', fontSize: 30, color: COLORS.primary, letterSpacing: 2 }}>WebNova</div>
            <div style={{ display: 'flex', marginTop: 28, fontSize: 64, lineHeight: 1.08 }}>{copy.title}</div>
            <div style={{ display: 'flex', marginTop: 28, fontSize: 28, color: COLORS.gold }}>{copy.place}</div>
          </div>
          <Star />
        </div>

        <div
          style={{
            display: 'flex',
            gap: 48,
            paddingTop: 28,
            borderTop: `2px solid ${COLORS.border}`,
            fontSize: 28,
            color: COLORS.muted,
          }}
        >
          {copy.facts.map((fact) => (
            <div key={fact} style={{ display: 'flex' }}>
              {fact}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData ? [{ name: 'Unbounded', data: fontData, weight: 500, style: 'normal' }] : undefined,
    }
  )
}
