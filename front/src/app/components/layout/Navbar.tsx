'use client';

import Image from "next/image";
import Link from "next/link";
import { Search, Bell, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { CircleUser } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const { isLoggedIn, logout, user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full border-b border-border bg-accent">
            <div className="navbar justify-between p-2 text-xl max-w-[1500px] mx-auto">
                <div className="pl-4 md:pl-10">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={120}
                            height={150}
                        />
                    </Link>
                </div>

                {/* Nav links - desktop only */}
                <div className="hidden md:flex gap-20">
                    <Link href="/list">Bibliothèque</Link>
                    <Link href="/forum">Forum</Link>
                    <Link href="/chat">Chat</Link>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3 pr-4 md:pr-10">
                    {isLoggedIn && user ? (
                        <>
                            <Search size={27} className="hidden md:block mt-2"/>
                            <Bell size={27} className="hidden md:block mt-2"/>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        {user.avatar_url ? (
                                            <Image src={user.avatar_url} alt="Avatar" width={32} height={32} />
                                        ) : (
                                            <CircleUser size={32} />
                                        )}
                                    </div>
                                </div>
                                <ul tabIndex={-1} className="menu menu-sm dropdown-content rounded-box z-1 mt-3 p-2 bg-accent shadow">
                                    <li><Link href="/profile">Profile</Link></li>
                                    <li><button onClick={logout}>Déconnexion</button></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div className="hidden md:flex gap-5 p-2">
                            <Link href="/login">Se connecter</Link>
                            <Link href="/register">S&apos;inscrire</Link>
                        </div>
                    )}

                    {/* Burger button - mobile only */}
                    <button
                        className="md:hidden btn btn-ghost btn-circle"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menu"
                    >
                        {menuOpen ? <X size={27} /> : <Menu size={27} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <nav className="md:hidden flex flex-col bg-accent border-t border-border px-6 py-4 gap-5 text-lg">
                    <Link href="/list" onClick={() => setMenuOpen(false)}>Bibliothèque</Link>
                    <Link href="/forum" onClick={() => setMenuOpen(false)}>Forum</Link>
                    <Link href="/chat" onClick={() => setMenuOpen(false)}>Chat</Link>
                    {!isLoggedIn && (
                        <>
                            <hr className="border-border" />
                            <Link href="/login" onClick={() => setMenuOpen(false)}>Se connecter</Link>
                            <Link href="/register" onClick={() => setMenuOpen(false)}>S&apos;inscrire</Link>
                        </>
                    )}
                </nav>
            )}
        </header>
    );
}
