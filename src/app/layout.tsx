import Navbar from './components/layout/Navbar'
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={montserrat.className}>
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <main>{children}</main>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
