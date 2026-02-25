'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/app/lib/axios";

export default function Home() {
  const router = useRouter();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      const response = await api.post('/auth/logout');
      console.log('Réponse de l\'API:', response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Erreur lors de la déconnexion:', err);
    } finally {
      localStorage.removeItem('token');
      router.push('/');
    }
  }

  return (
    <main>
      <div>
        {token ? (
          <div>
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
            <p>user</p>
            <button onClick={handleLogout}>Se déconnecter</button>
          </div>
        ) : (
          <div>
            <h1>Veuillez vous connecter</h1>
          </div>
        )}
      </div>
    </main>
  ); 
}
