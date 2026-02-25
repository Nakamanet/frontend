'use client';

import Image from "next/image";
import { useAuth } from "./context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { isLoggedIn } = useAuth();

  // A modifier quand les routes seront intégrées
  const posts = [
    {
      id: 1,
      avatar_url: "/logo.png",
      username: "John Doe",
      content: "Bonjour, comment ça va ?",
      created_at: "2026-02-25T12:00:00.000000Z",
      updated_at: "2026-02-25T12:00:00.000000Z",
    },
    {
      id: 2,
      avatar_url: "/logo.png",
      username: "Jane Doe",
      content: "Je suis content de voir que vous êtes de retour !",
      created_at: "2026-02-25T12:00:00.000000Z",
      updated_at: "2026-02-25T12:00:00.000000Z",
    },
  ];

  return (
    <main className="grid grid-cols-5 place-items-center">
      {/* Gauche de l'écran */}
      <div className="mt-15">
        <div className="card w-50 bg-accent shadow-sm place-items-center mb-5">
          <div className="card-body">
          {/* Bloc identité de l'utilisateur */}
          {isLoggedIn ? (
              <div>
                <Image src="/logo.png" alt="Logo" width={100} height={100} className="w-20 h-20 rounded-full"/>
                <p>Imortelmax</p>
                <p>Bio</p>
                <Link href="/profile">Mon profil</Link>
            </div>
          ) : (
            <div>
                <Link href="/login" className="flex justify-center border-2 border-primary rounded-full p-2 pr-3 pl-3 bg-primary">Se connecter</Link>
                <p className="flex justify-center p-2">ou</p>
                <Link href="/register" className="flex justify-center border-2 border-primary rounded-full p-2 pr-3 pl-3 bg-primary">S&apos;inscrire</Link>
            </div>
          )}
          </div>
        </div>
        {/* Bloc Activité des amis */}
        <div className="card w-50 bg-accent shadow-sm place-items-center mb-5">
          <div className="card-body">
          {isLoggedIn ? (
            <div>
              <p className="flex justify-center p-2 text-lg">Activité des amis</p>
              {/* Ajouter les activités des amis */}
            </div>
          ) : (
            <div>
              <p className="flex justify-center p-2">Connectez-vous pour voir l&apos;activité des amis</p>
            </div>
          )}
          </div>
        </div>
        {/* Bloc Top Anime */}
        <div className="card w-50 bg-accent shadow-sm place-items-center mb-5">
          <div className="card-body">
            <h1 className="flex justify-center text-lg">Top Anime</h1>
            <p>A remplir quand on aura l&apos;API</p>
          </div>
        </div>
      </div>
      {/* Centre de l'écran */}
      <div className="col-span-3">
        {/* Ajouter un post */}
        <div className="flex">
          <Image src="/logo.png" alt="Logo" width={100} height={100} className="w-10 h-10 rounded-full"/>
          <input type="text" placeholder="Ajouter un post..." className="input input-bordered w-full max-w-xs"/>
          <button className="btn btn-primary">Poster</button>
        </div>
        {/* Zone des posts */}
        {posts ? (
          posts.map((post) => (
            <div key={post.id}>
              <Image src={post.avatar_url} alt="Avatar" width={100} height={100} className="w-10 h-10 rounded-full"/>
              <p>{post.username}</p>
              <p>{post.content}</p>
              <p>{new Date(post.updated_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>
            Aucun post trouvé
          </p>
        )}
      </div>
      {/* Droite de l'écran */}
      <div>
        {/* Chat */}
        <div>
          <p>Chat</p>
          <p>Coming soon...</p>
        </div>
        {/* Agenda */}
        <p>Ca il faut que je vois comment faire</p>
      </div>
    </main>
  ); 
}
