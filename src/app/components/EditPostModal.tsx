'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Post } from '../types/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePost } from '../lib/post'
import { useToast } from '../context/ToastContext'
import Loader from './Loader'
import Button from './ui/Button'

export default function EditPostModal({ isOpen, onClose, post }: {isOpen: boolean, onClose : () => void, post: Post }) {
    const [content, setContent] = useState(post.content)
    const queryClient = useQueryClient()
    const { showToast } = useToast()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
        }
        if (isOpen) document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    }, [isOpen])

    const updateMutation = useMutation({
        mutationFn: () => updatePost(post.id, { content }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            showToast("Post modifié", "success")
            onClose()
        },
        onError: () => showToast("Erreur lors de la modification", 'error')
    })

    if (isOpen === false) return

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-base-100 w-11/12 max-w-2xl rounded-xl shadow-2xl border border-border flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="font-bold text-lg">Modifier le post</h2>
                    <button className="btn btn-sm btn-circle btn-ghost shrink-0" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Votre message..."
                        className="w-full h-32 p-3 rounded-xl resize-y bg-background border border-border outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>

                <div className="flex justify-end gap-2 p-4 border-t border-border">
                    <Button variant="secondary" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        onClick={() => updateMutation.mutate()}
                        disabled={updateMutation.isPending || content.trim() === '' || content === post.content}
                    >
                        {updateMutation.isPending ? <Loader variant="inline" size="xs" /> : 'Enregistrer'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
