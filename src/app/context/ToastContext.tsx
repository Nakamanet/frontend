'use client'

import { createContext, useContext, useState } from "react"

type Toast = {
    id: string
    message: string
    type: 'success' | 'error' | 'info'
}

type ToastContextType = {
    showToast: (message: string, type: Toast['type']) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])
    const [expanded, setExpanded] = useState(false)

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }

    const showToast = (message: string, type: Toast['type']) => {
        const id = crypto.randomUUID()
        setToasts((prev) => [...prev, { id, message, type }])
        setTimeout(() => removeToast(id), 3000)
    }

    return (
        <ToastContext.Provider value= {{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50" onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
                {toasts.map((toast, index) => {
                    const offset = toasts.length - 1 - index
                    return (
                        <div 
                            key={toast.id} 
                            className={`alert bg-${toast.type} absolute bottom-0 right-0 w-60 rounded-[50px]`}
                            style={{
                                transform: expanded ? `translateY(${-offset * 65}px) scale(1)` : `translateY(${-offset * 15}px) scale(${1 - offset * 0.05})`,
                                opacity: expanded ? 1 : (offset > 2 ? 0 : 1),
                                zIndex: toasts.length - offset,
                                transition: 'all 0.35s ease',
                            }}
                        >
                            <span>{toast.message}</span>
                        </div>
                    )
                })}
            </div> 
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) throw new Error('useToast doit etre utiliser avec le ToastProvider')
    return context
}