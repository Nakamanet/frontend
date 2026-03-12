'use client';

import Image from "next/image";
import { useAuth } from "./context/AuthContext";
import Link from "next/link";
import { 
  CircleUser, 
  Users, 
  Flame, 
  Image as ImageIcon, 
  SendHorizonal, 
  Smile, 
  SlidersHorizontal, 
  Clock,
  Heart,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export default function Home() {
  const { isLoggedIn, user } = useAuth();

  // A modifier quand les routes seront intégrées
  const posts = [
    {
      id: 1,
      avatar_url: "/logo.png",
      username: "John Doe",
      content: "Bonjour, comment ça va ?",
      created_at: "2026-03-10T12:00:00.000000Z",
      updated_at: "2026-03-10T12:00:00.000000Z",
    },
    {
      id: 2,
      avatar_url: "",
      username: "Jane Doe",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      created_at: "2026-02-25T12:00:00.000000Z",
      updated_at: "2026-02-25T12:00:00.000000Z",
    },
    {
      id: 3,
      avatar_url: "",
      username: "Jane Doe",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      created_at: "2026-02-25T12:00:00.000000Z",
      updated_at: "2026-02-25T12:00:00.000000Z",
    },
    {
      id: 4,
      avatar_url: "",
      username: "Jane Doe",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      created_at: "2026-02-25T12:00:00.000000Z",
      updated_at: "2026-02-25T12:00:00.000000Z",
    },
    {
      id: 5,
      avatar_url: "",
      username: "Jane Doe",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      created_at: "2026-02-25T12:00:00.000000Z",
      updated_at: "2026-02-25T12:00:00.000000Z",
    },
    {
      id: 6,
      avatar_url: "/logo.png",
      username: "Jane Doe",
      content: "Je suis content de voir que vous êtes de retour !",
      created_at: "2026-02-20T12:00:00.000000Z",
      updated_at: "2026-02-20T12:00:00.000000Z",
    },
  ];

  const chatMessages = [
    {
      id: 1,
      username: "John Doe",
      content: "Comming soon...",
      avatar_url: "/logo.png",
      created_at: "2026-03-10T12:00:00.000000Z",
    },
    {
      id: 2,
      username: "Jane Doe",
      content: "Comming soon...",
      created_at: "2026-03-10T13:00:00.000000Z",
    },
    {
      id: 3,
      username: user?.username,
      content: "Le chat arriveras dans une prochaine mise à jour",
      created_at: "2026-03-10T13:00:00.000000Z",
    },
  ];

  return (
    <main className="grid grid-cols-5 place-items-center h-screen px-20 py-10">
      {/* Gauche de l'écran */}
      <section className="flex flex-col w-full max-w-[1500px] mx-auto h-full gap-5">
        <div className="card w-full bg-accent shadow-sm border border-border overflow-hidden rounded-[15px]">
          {/* Bloc identité de l'utilisateur */}
          {isLoggedIn && user ? (
            <>
              {/* Bannière : image ou fond rouge */}
              <div className="relative w-full h-20 shrink-0 rounded-t-[8px] overflow-hidden bg-primary">
                {user.banner_url ? (
                  <Image
                    src={user.banner_url}
                    alt="Bannière"
                    fill
                    className="object-cover"
                    sizes="(max-width: 400px) 100vw, 400px"
                  />
                ) : null}
              </div>
              <div className="card-body pt-0 px-4 pb-4">
                {/* Avatar (chevauche la bannière) + pseudo + handle */}
                <div className="flex items-end gap-3 -mt-6">
                  <div className="w-18 h-18 rounded-[10px] bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden z-10 text-base-content/70">
                    {user.avatar_url ? (
                      <Image
                        src={user.avatar_url}
                        alt="Avatar"
                        width={65}
                        height={65}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <CircleUser size={50} strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-base truncate">{user.username}</p>
                    <p className="text-sm text-border">@{user.username}</p>
                  </div>
                </div>
                {/* Stats : Oeuvres, Amis, Posts */}
                <div className="mt-2 p-2 rounded-[8px] bg-muted border border-border">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xl font-bold">0</p>
                      <p className="text-sm text-black/70">Oeuvres</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">0</p>
                      <p className="text-sm text-black/70">Amis</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">0</p>
                      <p className="text-sm text-black/70">Posts</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
                <Link href="/login" className="flex justify-center border-2 border-primary rounded-full p-2 pr-3 pl-3 bg-primary">Se connecter</Link>
                <p className="flex justify-center p-2">ou</p>
                <Link href="/register" className="flex justify-center border-2 border-primary rounded-full p-2 pr-3 pl-3 bg-primary">S&apos;inscrire</Link>
            </div>
          )}
        </div>
        {/* Bloc Activité des amis a remplir quand l'API fonctionnera*/}
        <div className="card w-full bg-accent shadow-sm place-items-center border border-border rounded-[15px]">
          <div className="card-body flex justify-center w-full">
          {isLoggedIn ? (
            <div className="flex gap-2">
              <Users size={20} />
              <p className="text-sm"> Activité des amis</p>
              {/* Ajouter les activités des amis */}
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
        {/* Bloc Top Mangas a remplir quand la Bibliothèque sera intégrée*/}
        <div className="card w-full bg-accent shadow-sm place-items-center border border-border rounded-[15px]">
          <div className="card-body flex justify-center w-full">
            <div className="flex gap-2">
              <Flame size={20} />
              <h1 className="text-sm">Top Mangas</h1>
            </div>
            <p>A remplir quand on aura l&apos;API</p>
          </div>
        </div>
        {/* Bloc Top Anime a remplir quand la Bibliothèque sera intégrée*/}
        <div className="card w-full bg-accent shadow-sm place-items-center border border-border rounded-[15px]">
          <div className="card-body flex justify-center w-full">
            <div className="flex gap-2">
              <Flame size={20} />
              <h1 className="text-sm">Top Anime</h1>
            </div>
            <p>A remplir quand on aura l&apos;API</p>
          </div>
        </div>
      </section>

      {/* Centre de l'écran */}
      <section className="flex flex-col col-span-3 w-full max-w-[1500px] mx-auto h-full min-h-0 px-6 gap-3 overflow-y-auto scrollbar-hide">        
        {/* Ajouter un post */}
        {isLoggedIn && user ? (
          <div className="flex flex-col bg-accent border border-border rounded-[15px] gap-2 px-6 py-4">
            <div className="flex gap-2">
              <div className="w-12 h-12 rounded-[10px] bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden text-base-content/70">
                {user.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt="Avatar"
                    width={35}
                    height={35}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CircleUser size={35} strokeWidth={1.5} />
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div>
                  <input type="text" placeholder="Partage ton avis sur un manga, un anime, etc" className="input text-border input-ghost w-full h-10"/>
                </div>
                <div className="flex justify-between gap-2">
                  <div className="flex gap-2 pt-2">
                    <ImageIcon size={20} />
                    <Smile size={20} />
                  </div>
                  <button className="btn btn-ghost px-4 border border-border text-border rounded-[15px]"><SendHorizonal size={17} /> Poster</button>
                </div>
              </div>
            </div>
          </div>
        ) : null }
        {/* Filtre/Tendances/... */}
        <div className="flex justify-between border border-border bg-accent rounded-full py-2 px-6">
          <div className="flex gap-5">
            <div className="flex px-4 gap-2">
              <Flame size={20} />
              <p>Tendances</p>
            </div>
            <div className="flex px-4 gap-2">
              <Clock size={20} />
              <p>Récents</p>
            </div>
            <div className="flex px-4 gap-2">
              <Users size={20} />
              <p>Amis</p>
            </div>
          </div>
          <div className="flex px-4 gap-2">
            <SlidersHorizontal size={20} />
            <p>Filtres</p>
          </div>
        </div>
        {/* Zone des posts */}
        {posts ? (
          posts.map((post) => (
            <div key={post.id} className="bg-accent shadow-sm place-items-center w-full border border-border rounded-[15px] p-6">
              <div className="flex gap-3">
                <div>
                  {post.avatar_url ? (
                    <Image 
                      src={post.avatar_url} 
                      alt="Avatar" 
                      width={100} 
                      height={100} 
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-[10px] bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden text-base-content/70">
                      <CircleUser size={35} strokeWidth={1.5} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <p className="font-bold">{post.username}</p>
                    <p className="text-sm text-border">@{post.username}</p>
                    <p className="text-sm text-border">{formatDistanceToNow(new Date(post.updated_at), { locale: fr })}</p>
                  </div>
                  <p>{post.content}</p>
                  <div className="flex gap-2">
                    <div className="flex gap-2">
                      <Heart size={20} />
                      <p>0</p>
                    </div>
                    <div className="flex gap-2">
                      <MessageCircle size={20} />
                      <p>0</p>
                    </div>
                    <div className="flex gap-2">
                      <Bookmark size={20} />
                    </div>
                  </div>
                </div>
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
      <section className="flex flex-col w-full max-w-[1500px] mx-auto h-full gap-5">
        {/* Chat */}
        <div className="flex flex-col w-full bg-accent h-auto py-2 shadow-sm border border-border rounded-[15px]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-3 pr-5">
              <div className="flex">
                <span className="text-primary text-4xl px-3">#</span>
                <p className="text-xl py-2">Général</p>
              </div>
              <p className="text-primary">X en lignes</p>
            </div>
            <div>
              <div className="flex flex-col gap-2 max-h-[320px] h-[320px] px-2 pb-2 overflow-y-auto scrollbar-hide">
              {chatMessages.map((message) => {
                const isMe = user && message.username === user.username;
                return (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden bg-muted border-2 border-border flex items-center justify-center">
                      {message.avatar_url ? (
                        <Image
                          src={message.avatar_url}
                          alt="Avatar"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <CircleUser size={18} strokeWidth={1.5} className="text-base-content/70" />
                      )}
                    </div>
                    {/* Bulle + heure */}
                    <div className={`flex flex-col gap-0.5 max-w-[85%] ${isMe ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`px-3 py-2 rounded-2xl ${
                          isMe
                            ? 'bg-primary rounded-tr-md'
                            : 'bg-muted rounded-tl-md'
                        }`}
                      >
                        <p className="text-xs font-medium opacity-90">
                          {isMe ? 'Moi' : message.username}
                        </p>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-base-content/60 px-1">
                        {formatDistanceToNow(new Date(message.created_at), { addSuffix: true, locale: fr })}
                      </p>
                    </div>
                  </div>
                );
              })}
              </div>
              <div className="flex items-center gap-2 mx-2 mt-2 p-2 bg-muted rounded-full border border-border">
                <Smile size={24} className="text-base-content/60 shrink-0" />
                <input
                  type="text"
                  placeholder="Envoyer un message"
                  className="input input-ghost w-full bg-transparent text-sm focus:outline-none"
                />
                <button type="button" className="btn btn-circle btn-ghost btn-sm bg-primary shrink-0">
                  <SendHorizonal size={18} className="text-primary-content" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Agenda */}
        <p>Ca il faut que je vois comment faire</p>
      </section>
    </main>
  ); 
}
