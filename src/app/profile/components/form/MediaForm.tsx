'use client';

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { User } from "../../../types/auth";
import api from "../../../lib/axios";

export default function MediaForm({ user }: { user: User }) {
    const [avatar_url, setAvatar_url] = useState(user.avatar_url);
    const [banner_url, setBanner_url] = useState(user.banner_url);
    const [theme_preference, setTheme_preference] = useState(user.theme_preference ?? "system");


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const { refreshUser } = useAuth();

    const handleSubmitMedias = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        setFieldErrors({});
        setIsSubmitting(true);

        try {
            const payload: Record<string, string> = {
                avatar_url: avatar_url ?? '',
                banner_url: banner_url ?? '',
                theme_preference: theme_preference ?? "system",
            };

            const body = Object.fromEntries(
                Object.entries(payload).filter(([, v]) => v !== undefined && v !== null && v !== '')
            );

            const { data } = await api.patch<{message: string, user: User}>('/users/profile', body);
            setSuccessMessage(data.message);
            await refreshUser();
        } catch (err: any) {
            const res = err.response?.data;
            if (err.response?.status === 422 && res?.errors) {
                const errors: Record<string, string> = {}
                Object.entries(res.errors).forEach(([key, messages]) => {
                    errors[key] = Array.isArray(messages) ? messages[0] : String(messages);
                });
                setFieldErrors(errors);
                setErrorMessage(res?.message ?? "Erreur de validation");
            } else {
                setErrorMessage(res?.message ?? "Erreur lors de la mise à jour du profil");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-5 bg-accent border border-border rounded-[15px]">
            <h3 className="text-2xl font-bold">Médias</h3>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmitMedias}>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="avatar_url">URL de l&apos;avatar</label>
                        <input 
                            type="text" 
                            id="avatar_url" 
                            name="avatar_url" 
                            className="input input-ghost bg-border rounded-full" 
                            value={avatar_url ?? ''}
                            onChange={(e) => setAvatar_url(e.target.value)}
                        />
                    </div>
                    {fieldErrors.avatar_url && (
                        <p className="text-sm text-alerts">{fieldErrors.avatar_url}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="banner_url">URL de la bannière</label>
                        <input 
                            type="text" 
                            id="banner_url" 
                            name="banner_url" 
                            className="input input-ghost bg-border rounded-full" 
                            value={banner_url ?? ''}
                            onChange={(e) => setBanner_url(e.target.value)}
                        />
                    </div>
                    {fieldErrors.banner_url && (
                        <p className="text-sm text-alerts">{fieldErrors.banner_url}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2">  
                    <div className="flex flex-col">
                        <label htmlFor="theme_preference">Préférence de thème</label>
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
                    {fieldErrors.theme_preference && (
                        <p className="text-sm text-alerts">{fieldErrors.theme_preference}</p>
                    )}
                </div>
                <button 
                    type="submit" 
                    className="grid col-span-2 btn btn-ghost border-none bg-primary text-primary-content"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour'}
                </button>
            </form>
            {successMessage && (
                <p className="text-sm text-success">{successMessage}</p>
            )}
            {errorMessage && (
                <p className="text-sm text-alerts">{errorMessage}</p>
            )}
        </div>
    );
}