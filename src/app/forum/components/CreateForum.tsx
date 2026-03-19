"use client";

import { useState } from "react";
import { createForum } from "@/app/lib/forum";
import type { Forum } from "@/app/types/forum";

export default function CreateForum() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Forum["category"]>("general");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createForum({
        title,
        content,
        category,
        related_anime_id: null,
        related_manga_id: null,
      });

      setTitle("");
      setContent("");
      setCategory("general");
      setIsOpen(false);

      window.location.reload();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Une erreur est survenue lors de la création.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-12 text-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 font-bold border border-white"
      >
        {isOpen ? "Annuler" : "Créer un nouveau sujet"}
      </button>

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 p-6 flex flex-col gap-6 border border-white"
        >
          <h2 className="text-xl font-bold">Nouveau Sujet</h2>

          {error && (
            <div className="p-2 font-bold border border-white">{error}</div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Titre</label>
            <input
              type="text"
              placeholder="Titre de votre sujet..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={255}
              className="p-2 text-white bg-transparent border border-white outline-none focus:ring-1 focus:ring-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Forum["category"])}
              className="p-2 text-white bg-transparent border border-white outline-none focus:ring-1 focus:ring-white"
            >
              <option value="general" className="text-black">
                Général
              </option>
              <option value="anime" className="text-black">
                Anime
              </option>
              <option value="manga" className="text-black">
                Manga
              </option>
              <option value="recommendations" className="text-black">
                Recommandations
              </option>
              <option value="spoilers" className="text-black">
                Spoilers
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Contenu</label>
            <textarea
              placeholder="De quoi voulez-vous discuter ?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="p-2 h-32 resize-y text-white bg-transparent border border-white outline-none focus:ring-1 focus:ring-white"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 font-bold disabled:opacity-50 mt-4 w-fit border border-white"
          >
            {loading ? "Création en cours..." : "Publier le sujet"}
          </button>
        </form>
      )}
    </div>
  );
}