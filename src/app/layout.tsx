import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import QueryProvider from './providers/QueryProvider'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

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
            </ToastProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
