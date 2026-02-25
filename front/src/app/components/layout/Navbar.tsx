import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Bell } from "lucide-react";

export default function Navbar() {
    return (
        <main className="flex justify-between items-center p-2 pl-10">
            <div className="p-4">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                </Link>
            </div>
            <div className="flex gap-25 p-2">
                <Link href="/list">My Anime List</Link>
                <Link href="forum">Forum</Link>
                <Link href="/chat">Chat</Link>
            </div>
            <div className="flex gap-5 p-2 pr-10">
                <MessageCircle />
                <Bell />
                {/* A changer quand le back fonctionnera */}
                <Image className="avatar" src="/logo.png" alt="Avatar" width={32} height={32} /> 
            </div>
        </main>
    );
}