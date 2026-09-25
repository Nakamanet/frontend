import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BottomNav from './components/layout/BottomNav'
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import QueryProvider from './providers/QueryProvider'
import { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: {
    template: '%s | NakamaNet',
    default: 'NakamaNet - Your Anime & Manga Community',
  },
  description: 'Rejoignez la communauté ultime des fans d\'anime et de manga.',
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: 'NakamaNet',
    description: 'Rejoignez la communauté ultime des fans d\'anime et de manga.',
    url: 'https://dev.nakamanet.fr',
    siteName: 'NakamaNet',
    images: [
      {
        url: '/favicon/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NakamaNet',
    description: 'Rejoignez la communauté ultime des fans d\'anime et de manga.',
    images: ['/favicon/web-app-manifest-512x512.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${montserrat.className} md:flex md:flex-col md:min-h-dvh`}>
        <QueryProvider>
          <AuthProvider>
            <ToastProvider>
              <Navbar />
              <main className="md:flex-1">{children}</main>
              <Footer />
              <BottomNav />
            </ToastProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
