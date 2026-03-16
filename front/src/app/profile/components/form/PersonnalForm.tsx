'use client';

import api from "../../../lib/axios";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { User } from "../../../types/auth";

export default function PersonnalForm({ user }: { user: User }) {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const { refreshUser } = useAuth();


    const handleSubmitPersonal = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        setFieldErrors({});
        setIsSubmitting(true);

        try {
            const payload: Record<string, string> = {
                username,
                email,
                password: password ?? '',
                password_confirmation: password_confirmation ?? '',
            };

            if (password && password_confirmation && password !== password_confirmation) {
                setFieldErrors({ password: "Les mots de passe ne correspondent pas" });
                setErrorMessage("Les mots de passe ne correspondent pas");
                setIsSubmitting(false);
                return;
            }

            if (password && !password_confirmation || !password && password_confirmation) {
                setFieldErrors({ password: "Les deux champs doivent être remplis" });
                setErrorMessage("Les deux champs doivent être remplis");
                setIsSubmitting(false);
                return;
            }

            const body = Object.fromEntries(
                Object.entries(payload).filter(([, v]) => v !== undefined && v !== null && v !== '')
            );

            const { data } = await api.patch<{message: string, user: User}>('/auth/profile', body);
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
            <h3 className="text-2xl font-bold">Informations personnelles</h3>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmitPersonal}>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="username">Nom d&apos;utilisateur</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            className="input input-ghost bg-border rounded-full" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    {fieldErrors.username && (
                        <p className="text-sm text-alerts">{fieldErrors.username}</p>
                    )}

                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="input input-ghost bg-border rounded-full" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {fieldErrors.email && (
                        <p className="text-sm text-alerts">{fieldErrors.email}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="password">Mot de passe</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="input input-ghost bg-border rounded-full" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {fieldErrors.password && (
                        <p className="text-sm text-alerts">{fieldErrors.password}</p>
                    )}

                    <div className="flex flex-col">
                        <label htmlFor="password_confirmation">Confirmation mot de passe</label>
                        <input 
                            type="password" 
                            id="password_confirmation" 
                            name="password_confirmation" 
                            className="input input-ghost bg-border rounded-full" 
                            value={password_confirmation}
                            onChange={(e) => setPassword_confirmation(e.target.value)}
                        />
                    </div>
                    {fieldErrors.password_confirmation && (
                        <p className="text-sm text-alerts">{fieldErrors.password_confirmation}</p>
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