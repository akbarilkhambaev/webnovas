import type { Metadata } from 'next'
import TermsPage from '@/views/Terms'

export const metadata: Metadata = {
  title: 'Условия использования',
  description: 'Условия использования сайта и услуг WebNova.',
  alternates: { canonical: 'https://webnovas.uz/terms' },
  robots: { index: false, follow: false },
}

export default function Terms() {
  return <TermsPage />
}
