import { roboto, sourceSans, openSans } from './styles/fonts'
import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: 'FanEmotions',
  description: 'The Second Broadcast: The Ultimate Drama is in the Stands',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${sourceSans.variable} ${openSans.variable}`}>{children}</body>
    </html>
  )
}
