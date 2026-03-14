'use client';
import { useAuth } from '../context/AuthContext';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { CircleUser } from 'lucide-react';
import { useState } from 'react';
import Profile from '../components/profile/Profile';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('activities');
    const { user } = useAuth();

    if (!user) redirect('/login');

    return (
        <main className="max-w-[1500px] mx-auto min-h-screen h-full">
            {/* Banniere */}
            <section className={`w-full p-5 h-40 flex items-end gap-4 ${user?.banner_url ? 'bg-cover bg-center' : 'bg-primary'}`}>
                <p>
                    {user.avatar_url ? <Image src={user.avatar_url} alt="Avatar" width={100} height={100} /> : <CircleUser size={50} strokeWidth={1.5} />}
                </p>
                <div className="flex flex-col">
                    <p>{user.username}</p>
                    <p>@{user.username}</p>
                </div>
            </section>
            {/* main content */}
            <section className="grid grid-cols-5">
                {/* Menu lateral */}
                <div className="w-full min-h-auto bg-accent flex flex-col gap-7 py-7 px-5 border-r border-border">
                    <div className="flex flex-col justify-center items-center gap-1">
                        <p>Compte créé le {new Date(user.created_at).toLocaleDateString()}</p>
                        <p>Habite à {user.localisation || 'Non renseigné'}</p>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <button 
                                    className={`btn btn-ghost border-none ${activeTab === 'activities' ? 'bg-primary text-primary-content' : ''}`} 
                                    onClick={() => setActiveTab('activities')}
                                >
                                    Activités
                                </button>
                            </li>
                            <li>
                                <button 
                                    className={`btn btn-ghost border-none ${activeTab === 'friends' ? 'bg-primary text-primary-content' : ''}`} 
                                    onClick={() => setActiveTab('friends')}
                                >
                                    Mes Amis
                                </button>
                            </li>
                            <li>
                                <button 
                                    className={`btn btn-ghost border-none ${activeTab === 'likes' ? 'bg-primary text-primary-content' : ''}`} 
                                    onClick={() => setActiveTab('likes')}
                                >
                                    Mes Likes
                                </button>
                            </li>                            
                            <li>
                                <button 
                                    className={`btn btn-ghost border-none ${activeTab === 'library' ? 'bg-primary text-primary-content' : ''}`} 
                                    onClick={() => setActiveTab('library')}
                                >
                                    Ma Bibliothèque
                                </button>
                            </li>                            
                            <li>
                                <button 
                                    className={`btn btn-ghost border-none ${activeTab === 'groups' ? 'bg-primary text-primary-content' : ''}`} 
                                    onClick={() => setActiveTab('groups')}
                                >
                                    Mes Groupes
                                </button>
                            </li>                            
                            <li>
                                <button 
                                    className={`btn btn-ghost border-none ${activeTab === 'profile' ? 'bg-primary text-primary-content' : ''}`} 
                                    onClick={() => setActiveTab('profile')}
                                >
                                    Mon Profile
                                </button>
                            </li>                        
                        </ul>
                    </div>
                </div>
                {/* Contenu principal */}
                <div className="col-span-4">
                    {/* {activeTab === 'activities' && <Activity />}
                    {activeTab === 'friends' && <Friends />}
                    {activeTab === 'likes' && <Likes />}
                    {activeTab === 'library' && <Library />}
                    {activeTab === 'groups' && <Groups />} */}
                    {activeTab === 'profile' && <Profile user={user} />}
                </div>
            </section>
        </main>
    );
}