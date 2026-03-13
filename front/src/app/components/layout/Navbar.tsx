'use client';

import Image from "next/image";
import Link from "next/link";
import { Search, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth();

    return (
        <div className="navbar justify-between p-2 bg-accent text-xl border-b border-border">
            <div className="pl-10">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={120}
                        height={150}
                    />
                </Link>
            </div>
            <div className="flex gap-20">
                <Link href="/list">Bibliothèque</Link>
                <Link href="forum">Forum</Link>
                <Link href="/chat">Chat</Link>
            </div>
            {isLoggedIn ? (
                <div className="flex gap-8 pr-10">
                    <Search size={27} className="mt-2"/>
                    <Bell size={27} className="mt-2"/>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <Image src="/logo.png" alt="Avatar" width={32} height={32} />
                            </div>
                        </div>
                        <ul tabIndex={-1} className="menu menu-sm dropdown-content rounded-box z-1 mt-3 p-2 bg-accent shadow">
                            <li><Link href="/profile">Profile</Link></li>
                            <li><button onClick={logout}>Déconnexion</button></li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="flex gap-5 p-2 pr-10">
                    <Link href="/login">Se connecter</Link>
                    <Link href="/register">S&apos;inscrire</Link>
                </div>
            )}
        </div>
    );
}
