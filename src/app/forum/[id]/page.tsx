"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getForumById } from "@/app/lib/forum";
import type { Forum } from "@/app/types/forum";
import ReplyForum from "../components/ReplyForum";

export default function TopicDetailPage() {
  const params = useParams();
  const [topic, setTopic] = useState<Forum | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const data = await getForumById(Number(params.id));
        setTopic(data);
      } catch (err) {
        console.error("Erreur de récupération du sujet:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchTopic();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-white">Chargement du sujet...</div>
    );
  }

  if (error || !topic) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-white text-center border border-white mt-8">
        Impossible de charger ce sujet.
        <br />
        <Link
          href="/forum"
          className="px-4 py-2 border border-white inline-block mt-4 font-bold"
        >
          Retour au forum
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <Link
        href="/forum"
        className="px-4 py-2 border border-white font-bold inline-block mb-8"
      >
        ← Retour au forum
      </Link>

      <div className="border border-white p-6 mb-8">
        <span className="text-xs font-bold px-2 py-1 uppercase border border-white">
          {topic.category}
        </span>
        <h1 className="text-3xl font-bold mt-6">{topic.title}</h1>
        <p className="text-sm mt-2 mb-6">
          Par{" "}
          <span className="font-bold">{topic.user?.username || "Anonyme"}</span>{" "}
          • {new Date(topic.created_at).toLocaleDateString("fr-FR")}
        </p>
        <div className="whitespace-pre-wrap text-lg">{topic.content}</div>
      </div>

      <h2 className="text-2xl font-bold mb-4">
        Réponses ({topic.replies?.length || 0})
      </h2>

      <div className="flex flex-col gap-4">
        {topic.replies && topic.replies.length > 0 ? (
          topic.replies.map((reply) => (
            <div key={reply.id} className="border border-white p-4 ml-8">
              <p className="text-sm mb-3">
                <span className="font-bold">
                  {reply.user?.username || "Anonyme"}
                </span>{" "}
                • {new Date(reply.created_at).toLocaleDateString("fr-FR")}
              </p>
              <div className="whitespace-pre-wrap">{reply.content}</div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center border border-white">
            Aucune réponse pour le moment. Soyez le premier !
          </div>
        )}
      </div>

      <ReplyForum topicId={topic.id} />
    </div>
  );
}
