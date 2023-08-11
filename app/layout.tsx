import Navbar from '@/components/Navbar'
import './globals.css'
import { Roboto_Mono,JetBrains_Mono,Roboto_Condensed,Roboto_Flex } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import logo from './icon.png';
import { URL_OF_WEBSITE } from '@/utils/constants';



const robotoMono = JetBrains_Mono({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
})

export const metadata = {
  title: 'ZipURL',
  description: 'Get your zipped url with the name you want and track the analytics of your zipped url wiht few clicks. ZipURL is a free url shortener service which allows you to create short links for your long links and share them easily. Now shorten your links and make them more manageable.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="url shortener, url shortener free, url shortener custom, url shortener custom name, url shortener custom link, url shortener custom domain, url shortener, short url, zip url, small url, manage url, links, share links" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={`${URL_OF_WEBSITE}assets/icon.png`} />
        <meta property="og:url" content="https://zipurl.vercel.app/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@zipurl" />
        <meta name="twitter:creator" content="@zipurl" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={`${URL_OF_WEBSITE}assets/icon.png`} />

        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="./icon.png" type="image/png" />
      </head>
      <body className={`${robotoMono.className} text-black`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
