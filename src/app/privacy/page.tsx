import type { Metadata } from 'next'
import PrivacyPolicyPage from '@/views/PrivacyPolicy'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика конфиденциальности WebNova — как мы собираем и используем ваши данные.',
  alternates: { canonical: 'https://webnovas.uz/privacy' },
  robots: { index: false, follow: false },
}

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />
}
