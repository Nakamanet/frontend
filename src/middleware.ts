import { NextRequest, NextResponse } from 'next/server'

/**
 * Bascule en Content-Security-Policy-Report-Only : le navigateur signale les
 * violations (console + report-uri) sans rien bloquer. Utile pour valider en
 * preprod avant de passer en enforce. Mettre à true pour observer, false pour
 * appliquer.
 */
const REPORT_ONLY = false

/** Extrait le scheme+host d'une URL (ignore le path), null si invalide. */
function toOrigin(raw?: string): string | null {
  if (!raw) return null
  try {
    return new URL(raw).origin
  } catch {
    return null
  }
}

/** Variante WebSocket d'une origine http(s) → ws(s), pour socket.io. */
function toWsOrigin(origin: string | null): string | null {
  return origin ? origin.replace(/^http/, 'ws') : null
}

export function middleware(request: NextRequest) {
  // Nonce unique par requête (Web Crypto, dispo dans le runtime edge).
  const nonce = btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))),
  )
  const isDev = process.env.NODE_ENV !== 'production'

  // Origines externes légitimes, dérivées des variables d'env du build.
  const api = toOrigin(process.env.NEXT_PUBLIC_API_URL)
  const lib = toOrigin(process.env.NEXT_PUBLIC_LIB_API_URL)
  const chat = toOrigin(process.env.NEXT_PUBLIC_CHAT_URL)
  const r2 = toOrigin(process.env.NEXT_PUBLIC_R2_PUBLIC_URL)

  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    // HMR / React Refresh en dev ont besoin de eval.
    isDev ? "'unsafe-eval'" : null,
  ].filter(Boolean)

  const connectSrc = [
    ...new Set(
      [
        "'self'",
        api,
        lib,
        chat,
        toWsOrigin(lib),
        toWsOrigin(chat),
        // websockets HMR en dev
        isDev ? 'ws:' : null,
      ].filter(Boolean),
    ),
  ]

  const imgSrc = [
    ...new Set(
      [
        "'self'",
        'data:',
        'blob:',
        'https://*.r2.dev',
        'https://media.kitsu.app',
        r2,
      ].filter(Boolean),
    ),
  ]

  const directives = [
    `default-src 'self'`,
    `base-uri 'self'`,
    `script-src ${scriptSrc.join(' ')}`,
    // Next/Tailwind injectent du style inline sans nonce → unsafe-inline requis.
    `style-src 'self' 'unsafe-inline'`,
    `img-src ${imgSrc.join(' ')}`,
    `font-src 'self' data:`,
    `connect-src ${connectSrc.join(' ')}`,
    `worker-src 'self' blob:`,
    `object-src 'none'`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
  ]

  const csp = directives.join('; ')
  const headerName = REPORT_ONLY
    ? 'Content-Security-Policy-Report-Only'
    : 'Content-Security-Policy'

  // Next lit le nonce depuis le header CSP de la *requête* pour l'appliquer
  // automatiquement à ses propres scripts.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', csp)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set(headerName, csp)

  // Headers de sécurité complémentaires (Aikido les vérifie souvent aussi).
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-Frame-Options', 'DENY')

  return response
}

export const config = {
  matcher: [
    // Toutes les routes sauf assets statiques et images optimisées, et on
    // saute les prefetch (pas besoin de nonce sur un prefetch).
    {
      source: '/((?!_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
