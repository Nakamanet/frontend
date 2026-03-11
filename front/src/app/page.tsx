'use client';

import Image from "next/image";
import { useAuth } from "./context/AuthContext";
import Link from "next/link";
import { CircleUser, Users } from "lucide-react";

export default function Home() {
  const { isLoggedIn, user } = useAuth();

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
    <main className="grid grid-cols-5 place-items-center h-screen p-10">
      {/* Gauche de l'écran */}
      <section className="w-full h-full">
        <div className="card w-full bg-accent shadow-sm  mb-5 border border-border">
          {/* Bloc identité de l'utilisateur */}
          {isLoggedIn && user ? (
            <div>
              <figure className="w-full h-[100px]">
                {user.banner_url ? (
                  <Image src={user.banner_url} alt="Banner" fill className="object-cover" />
                ) : (
                  <span className="w-full h-full justify-center items-center border-b border-border bg-alerts rounded-t-[8px]"></span>
                )}
              </figure>
              <div className="card-body flex w-full">
                <div className="relative flex w-[50px] h-[50px]">
                  {user.avatar_url ? (
                    <Image src={user.avatar_url} alt="Logo" fill className="object-cover rounded-[10px]"/>
                  ) : (
                    <Image src="/logo.png" alt="Logo" fill className="object-cover rounded-[10px]"/>

                    // <CircleUser size={50} className="border-2 border-border w-full h-full rounded-[10px] p-2"/>
                  )}
                  <div>
                    <p>{user.username}</p>
                    {/* A voir avec Remi */}
                    <p>@{user.username}</p>
                  </div>
                </div>
                <div>
                  <p>Oeuvres</p>
                  <p>Amis</p>
                  <p>Posts</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
                <Link href="/login" className="flex justify-center border-2 border-primary rounded-full p-2 pr-3 pl-3 bg-primary">Se connecter</Link>
                <p className="flex justify-center p-2">ou</p>
                <Link href="/register" className="flex justify-center border-2 border-primary rounded-full p-2 pr-3 pl-3 bg-primary">S&apos;inscrire</Link>
            </div>
          )}
          </div>
        {/* Bloc Activité des amis */}
        <div className="card w-full bg-accent shadow-sm place-items-center mb-5 border border-border">
          <div className="card-body">
          {isLoggedIn ? (
            <div>
              <p className="flex justify-center p-2 text-lg"><Users /> Activité des amis</p>
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
        <div className="card w-full bg-accent shadow-sm place-items-center mb-5 border border-border">
          <div className="card-body">
            <h1 className="flex justify-center text-lg">Top Anime</h1>
            <p>A remplir quand on aura l&apos;API</p>
          </div>
        </div>
      </section>

      {/* Centre de l'écran */}
      <section className="col-span-3 h-full">
        {/* Ajouter un post */}
        <div className="flex m-8">
          <Image src="/logo.png" alt="Logo" width={100} height={100} className="w-10 h-10 rounded-full mr-2"/>
          <input type="text" placeholder="Ajouter un post..." className="input input-bordered w-xl"/>
          <button className="btn bg-primary">Poster</button>
        </div>
        {/* Zone des posts */}
        {posts ? (
          posts.map((post) => (
            <div key={post.id} className="card w-50 bg-accent shadow-sm place-items-center m-5">
              <div className="card-body">
                <Image src={post.avatar_url} alt="Avatar" width={100} height={100} className="w-10 h-10 rounded-full"/>
                <p>{post.username}</p>
                <p>{post.content}</p>
                <p>{new Date(post.updated_at).toLocaleString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>
            Aucun post trouvé
          </p>
        )}
      </section>

      {/* Droite de l'écran */}
      <section>
        {/* Chat */}
        <div>
          <p>Chat</p>
          <p>Coming soon...</p>
        </div>
        {/* Agenda */}
        <p>Ca il faut que je vois comment faire</p>
      </section>
    </main>
  ); 
}
