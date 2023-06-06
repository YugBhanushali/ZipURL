
import '../globals.css'
import { Roboto_Mono } from 'next/font/google'

const robotoMono = Roboto_Mono({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
})

export const metadata = {
  title: 'ZipURL',
  description: 'Get your zipped url with the name you want and track the analytics of your zipped url wiht few clicks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${robotoMono.className} text-black`}>
        {children}
      </body>
    </html>
  )
}
