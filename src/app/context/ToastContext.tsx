'use client'

import { createContext, useContext, useState } from "react"

type Toast = {
    message: string
    type: 'success' | 'error' | 'info'
}

type ToastContextType = {
    showToast: (message: string, type: Toast['type']) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = (message: string, type: Toast['type']) => {
        setToasts((prev) => [...prev, { message, type }])
        setTimeout(() => {
            setToasts((prev) => prev.slice(1))
        }, 3000)
    }

    return (
        <ToastContext.Provider value= {{ showToast }}>
            {children}
            <div className="toast toast-bottom toast-end">
                {toasts.map((toast, index) => (
                    <div key={index} className={`alert alert-${toast.type}`}>
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div> 
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) throw new Error('useToast must be used within a ToastProvider')
    return context
}