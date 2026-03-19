"use client";

import { useEffect, useState } from "react";
import { getForums } from "@/app/lib/forum";
import CreateForum from "./components/CreateForum";
import type { Forum } from "@/app/types/forum";
import Link from "next/link";

export default function ForumPage() {
  const [topics, setTopics] = useState<Forum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const forumsData = await getForums(1);
        setTopics(forumsData.data || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des forums:", error);
        setFetchError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">Forum</h1>

      <CreateForum />

      {isLoading && (
        <div className="p-8 text-center">
          <span>Chargement</span>
        </div>
      )}

      {fetchError && !isLoading && (
        <div className="p-4 mb-4 font-bold">
          Impossible de charger les sujets
        </div>
      )}

      {!fetchError && !isLoading && topics.length === 0 && (
        <div className="p-8 text-center">Aucun sujet pour le moment.</div>
      )}

      {!isLoading && topics.length > 0 && (
        <div className="flex flex-col gap-8">
          {topics.map((topic) => (
            <div key={topic.id} className="p-4">
              <div className="mb-4">
                <span className="text-xs px-2">{topic.category}</span>
                <h2 className="text-xl font-bold mt-4">{topic.title}</h2>
                <p className="text-sm mt-2">
                  Par{" "}
                  <span className="font-bold">
                    {topic.user?.username || "Anonyme"}
                  </span>{" "}
                  • {new Date(topic.created_at).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <div className="whitespace-pre-wrap">{topic.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
