import Navbar from '@/components/Navbar'
import './globals.css'
import { Roboto_Mono,JetBrains_Mono,Roboto_Condensed,Roboto_Flex } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';



const robotoMono = JetBrains_Mono({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
})

export const metadata = {

  title: 'ZipURL',
  description: 'Get your zipped url with the name you want and track the analytics of your zipped url wiht few clicks. ZipURL is a free url shortener service which allows you to create short links for your long links and share them easily. Now shorten your links and make them more manageable.',
  metadata: [

    {name: 'viewport', content: 'width=device-width, initial-scale=1.0'},

    { name:'keywords', content:'url shortener, url shortener free, url shortener custom, url shortener custom name, url shortener custom link, url shortener custom domain, url shortener, short url, zip url, small url, manage url, links, share links '},

    { name: 'og:title', content: 'ZipURL' },
    { name: 'og:description', content: 'Get your zipped url with the name you want and track the analytics of your zipped url wiht few clicks. ZipURL is a free url shortener service which allows you to create short links for your long links and share them easily. Now shorten your links and make them more manageable.' },
    { name: 'og:image', content: '/icon.png' },
    { name: 'og:url', content: 'https://zipurl.vercel.app/' },
    { name: 'og:type', content: 'website' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@zipurl' },
    { name: 'twitter:creator', content: '@zipurl' },
    { name: 'twitter:title', content: 'ZipURL' },
    { name: 'twitter:description', content: 'Get your zipped url with the name you want and track the analytics of your zipped url wiht few clicks. ZipURL is a free url shortener service which allows you to create short links for your long links and share them easily. Now shorten your links and make them more manageable.' },
    { name: 'twitter:image', content: '/icon.png' },
  ]

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body className={`${robotoMono.className} text-black`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
