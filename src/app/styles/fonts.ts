import { Roboto, Source_Sans_3 } from 'next/font/google'
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

export const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-source-sans',
})
