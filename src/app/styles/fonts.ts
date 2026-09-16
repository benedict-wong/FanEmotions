import { Roboto, Source_Sans_3, Open_Sans } from 'next/font/google'
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
})

export const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-source-sans',
})

export const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-open-sans',
})
