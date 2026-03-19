"use client";

import { useState } from "react";
import { replyToForum } from "@/app/lib/forum";

export default function ReplyForum({ topicId }: { topicId: number }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await replyToForum(topicId, content);
      setContent("");
      window.location.reload();
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erreur lors de l'envoi de la réponse.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 p-6 flex flex-col gap-4 border border-white text-white"
    >
      <h3 className="text-xl font-bold">Ajouter une réponse</h3>

      {error && (
        <div className="p-2 font-bold border border-white">{error}</div>
      )}

      <div className="flex flex-col gap-2">
        <textarea
          placeholder="Votre réponse..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="p-2 h-24 resize-y text-white bg-transparent border border-white outline-none focus:ring-1 focus:ring-white"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 font-bold disabled:opacity-50 mt-2 w-fit border border-white"
      >
        {loading ? "Envoi en cours..." : "Répondre"}
      </button>
    </form>
  );
}
