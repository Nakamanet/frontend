import Image from "next/image";
import { User } from "../../types/auth";
import Link from "next/link";
import { CircleUser, Users, Flame } from "lucide-react";

export default function SideBar({ isLoggedIn, user }: { isLoggedIn: boolean, user: User | null }) {
    return (
        <div className="flex flex-col w-full max-w-[1500px] mx-auto h-full gap-5">
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
                <div className="card-body flex justify-center w-full">
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
                <p className="text-sm"> Activité amis</p>
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
        </div>
    );
}