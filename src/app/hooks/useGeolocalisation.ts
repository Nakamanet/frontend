// hooks/useGeolocation.ts
import { useState } from 'react'

export function useGeolocation() {
  const [location, setLocation] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const detect = () => {
    if (!navigator.geolocation) {
      setError('Géolocalisation non supportée')
      return
    }

    setLoading(true)

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          const res = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`)
          const data = await res.json()

          if (data.location) setLocation(data.location)
          else setError('Localisation introuvable')
          console.log(data.location)
        } catch {
          setError('Erreur lors de la récupération')
        } finally {
          setLoading(false)
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setError('Permission refusée')
        } else if (err.code === err.TIMEOUT) {
          setError('Délai de localisation dépassé')
        } else {
          setError('Localisation indisponible')
        }
        setLoading(false)
      },
      { timeout: 10000 }
    )
  }

  return { location, setLocation, loading, error, detect }
}
