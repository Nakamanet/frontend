import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BottomNav from './components/layout/BottomNav'
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import QueryProvider from './providers/QueryProvider'
import { Montserrat } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${montserrat.className} md:flex md:flex-col md:min-h-dvh`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
