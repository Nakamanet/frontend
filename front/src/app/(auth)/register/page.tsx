'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import api from "@/app/lib/axios";

export default function RegisterPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', { username, email, password, birthdate });
            login(response.data.token, response.data.user);
            router.push('/');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-base-200">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <form className="card-body" onSubmit={handleSubmit}>
                    <h2 className="card-title text-2xl font-bold">Créer un compte</h2>
                    
                    <div className="form-control">
                        <label className="label">Nom d&apos;utilisateur</label>
                        <input type="text" placeholder="Pseudo" className="input input-bordered" required 
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="form-control">
                        <label className="label">Email</label>
                        <input type="email" placeholder="email@exemple.com" className="input input-bordered" required 
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-control">
                        <label className="label">Date de naissance</label>
                        <input type="date" className="input input-bordered" required 
                            onChange={(e) => setBirthdate(e.target.value)} />
                    </div>

                    <div className="form-control">
                        <label className="label">Mot de passe</label>
                        <input type="password" placeholder="••••••••" className="input input-bordered" required 
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">S&apos;inscrire</button>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </div>
        </div>
    );
}