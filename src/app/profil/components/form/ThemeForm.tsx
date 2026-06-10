'use client'

import { useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { useToast } from '@/app/context/ToastContext'
import { updateProfil } from '@/app/lib/user'
import { getCroppedImage, uploadAvatar, uploadBanner } from '@/app/lib/upload'
import { User } from '@/app/types/auth'
import { X } from 'lucide-react'
import Cropper from 'react-easy-crop'

export default function ThemeForm({ user }: { user: User }) {
  const { showToast } = useToast()
  const { refreshUser } = useAuth()

  const [theme_preference, setTheme_preference] = useState(user.theme_preference ?? 'system')
  const [isThemeSubmitting, setIsThemeSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const [modalOpen, setModalOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [cropType, setCropType] = useState<'avatar' | 'banner'>('avatar')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number
    y: number
    width: number
    height: number
  } | null>(null)
  const [isMediaSubmitting, setIsMediaSubmitting] = useState(false)

  const handleSubmitTheme = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFieldErrors({})
    setIsThemeSubmitting(true)

    try {
      const payload: Record<string, string> = {
        theme_preference: theme_preference ?? 'system',
      }

      const body = Object.fromEntries(
        Object.entries(payload).filter(([, v]) => v !== undefined && v !== null && v !== '')
      )

      await updateProfil(body)
      showToast('Profil modifié avec succès', 'success')
      await refreshUser()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showToast('Erreur lors de la modification du profil', 'error')
    } finally {
      setIsThemeSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setPreview(URL.createObjectURL(selected))
      setModalOpen(true)
    }
  }

  const handleSubmitAvatar = async () => {
    setIsMediaSubmitting(true)
    try {
      const blob = await getCroppedImage(preview!, croppedAreaPixels!, 400, 400)
      await uploadAvatar(blob)
      showToast('Avatar upload avec succès', 'success')
      await refreshUser()
      resetModal()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showToast("Erreur lors de l'upload de l'avatar", 'error')
    } finally {
      setIsMediaSubmitting(false)
    }
  }

  const handleSubmitBanner = async () => {
    setIsMediaSubmitting(true)
    try {
      const blob = await getCroppedImage(preview!, croppedAreaPixels!, 1500, 500)
      await uploadBanner(blob)
      showToast('Bannière upload avec succès', 'success')
      await refreshUser()
      resetModal()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showToast("Erreur lors de l'upload de la bannière", 'error')
    } finally {
      setIsMediaSubmitting(false)
    }
  }

  const resetModal = () => {
    setModalOpen(false)
    setPreview(null)
    setCropType('avatar')
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)
  }

  return (
    <div className="flex flex-col gap-4 p-5 bg-accent border border-border rounded-[15px]">
      <h3 className="text-2xl font-bold">Personnalisation</h3>

      <div className="grid grid-cols-2 gap-6">
        <form className="flex flex-col gap-4" onSubmit={handleSubmitTheme}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="theme_preference">Thème</label>
              <select
                id="theme_preference"
                name="theme_preference"
                className="input input-ghost bg-border rounded-full"
                value={theme_preference || ''}
                onChange={(e) => setTheme_preference(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            {fieldErrors.theme_preference && <p className="text-sm text-alerts">{fieldErrors.theme_preference}</p>}
          </div>
          <button
            type="submit"
            className="btn btn-ghost border-none bg-primary text-primary-content mt-auto"
            disabled={isThemeSubmitting}
          >
            {isThemeSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour'}
          </button>
        </form>

        <div className="flex flex-col">
          <p className="font">Médias</p>
          <input type="file" accept="image/*" className="file-input w-full" onChange={handleFileChange} />
        </div>
      </div>

      {modalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl flex flex-col gap-4">
            <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
              <div className="relative h-64 w-full">
                <Cropper
                  image={preview!}
                  crop={crop}
                  zoom={zoom}
                  aspect={cropType === 'avatar' ? 1 : 3}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setCropType('avatar')}
                  disabled={isMediaSubmitting}
                  className={`btn btn-ghost border-none text-primary-content ${cropType === 'avatar' ? 'bg-primary' : 'bg-border'}`}
                >
                  Avatar
                </button>
                <button
                  onClick={() => setCropType('banner')}
                  disabled={isMediaSubmitting}
                  className={`btn btn-ghost border-none text-primary-content ${cropType === 'banner' ? 'bg-primary' : 'bg-border'}`}
                >
                  Bannière
                </button>
              </div>
            </div>
            <button
              className="btn btn-ghost border-none bg-primary text-primary-content"
              onClick={() => (cropType === 'avatar' ? handleSubmitAvatar() : handleSubmitBanner())}
              disabled={isMediaSubmitting}
            >
              {isMediaSubmitting ? 'Upload en cours...' : 'Confirmer'}
            </button>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => resetModal()}>
              <X />
            </button>
          </form>
        </dialog>
      )}
    </div>
  )
}
