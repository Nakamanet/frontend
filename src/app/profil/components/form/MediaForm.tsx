'use client'

import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useToast } from '@/app/context/ToastContext'
import { getCroppedImage, uploadAvatar, uploadBanner } from '@/app/lib/upload'
import { X } from 'lucide-react'
import Cropper from 'react-easy-crop'

export default function MediaForm() {
  const { showToast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [step, setStep] = useState<1 | 2>(1)
  const [cropType, setCropType] = useState<'avatar' | 'banner' | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{x: number, y: number, width: number, height: number} | null>(null)  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { refreshUser } = useAuth()


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      setPreview(URL.createObjectURL(selected))
    }
  }

  const handleSubmitAvatar = async () => {
    setIsSubmitting(true)

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
      setIsSubmitting(false)
    }
  }

  const handleSubmitBanner = async () => {
    setIsSubmitting(true)

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
      setIsSubmitting(false)
    }
  }

  const resetModal = () => {
    setIsOpen(false)
    setPreview(null)
    setFile(null)
    setStep(1)
    setCropType(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)
  }

  return (
    <div className="flex flex-col gap-4 p-5 bg-accent border border-border rounded-[15px]">
      <button 
        onClick={() => setIsOpen(true)} 
        className='btn btn-ghost border-none bg-primary text-primary-content'
      >
        Ajouter un média
      </button>

      {isOpen && (
      <dialog className="modal modal-open">
        <div className="modal-box flex flex-col gap-4">
          {step === 1 && (
            <div>
              <h3 className="font-bold text-lg">Choisir un média</h3>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {preview && <img src={preview} alt="" className="rounded-[15px]" />}
              {file && (
                <div className="modal-action">
                  <button 
                    onClick={() => { setCropType('avatar'); setStep(2) }} 
                    disabled={isSubmitting} 
                    className="btn btn-primary"
                  >Avatar</button>
                  <button 
                    onClick={() => { setCropType('banner'); setStep(2) }} 
                    disabled={isSubmitting} 
                    className="btn"
                  >Bannière</button>
                </div>
              )}
            </div>
          )}
          {step === 2 && (
            <div className='flex flex-col gap-4'> 
              <div className='relative h-70 w-full'>
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
              <button 
                className='btn btn-primary'
                onClick={() => cropType === 'avatar' ? handleSubmitAvatar() : handleSubmitBanner()}
              >
                Confirmer
              </button>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => resetModal()}><X /></button>
        </form>
      </dialog>
    )}
    </div>
  )
}
