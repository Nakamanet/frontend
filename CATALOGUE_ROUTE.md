# Catalogue des routes — Nakamanet API

**Base URL:** `http://localhost:PORT`
**Format:** Toutes les réponses sont en `application/json`

---

## Sommaire

- [Anime](#anime)
- [Manga](#manga)

---

## Anime

### `GET /anime`

Retourne la liste complète des animes.

**Auth requise :** Non

**Réponse 200 :**

```json
[
  {
    "id": 1,
    "slug": "cowboy-bebop",
    "title_en": "Cowboy Bebop",
    "title_jp": "カウボーイビバップ",
    "synopsis": "...",
    "type": "TV",
    "subtype": "...",
    "status": "finished",
    "start_date": "1998-04-03T00:00:00.000Z",
    "end_date": "1999-04-24T00:00:00.000Z",
    "nsfw": false,
    "poster_image": "https://...",
    "cover_image": "https://...",
    "age_rating": "R17+",
    "episode_count": 26,
    "episode_length": 24,
    "created_at": "...",
    "updated_at": "..."
  }
]
```

---

### `GET /anime/:id`

Retourne un anime par son ID.

**Auth requise :** Non

**Paramètres :**

| Nom | Lieu | Type   | Description   |
|-----|------|--------|---------------|
| id  | path | number | ID de l'anime |

**Réponses :**

| Code | Description       |
|------|-------------------|
| 200  | Objet anime       |
| 404  | Anime introuvable |

**Réponse 200 :**

```json
{
  "id": 1,
  "slug": "cowboy-bebop",
  "title_en": "Cowboy Bebop",
  "title_jp": "カウボーイビバップ",
  "synopsis": "...",
  "type": "TV",
  "subtype": "...",
  "status": "finished",
  "start_date": "1998-04-03T00:00:00.000Z",
  "end_date": "1999-04-24T00:00:00.000Z",
  "nsfw": false,
  "poster_image": "https://...",
  "cover_image": "https://...",
  "age_rating": "R17+",
  "episode_count": 26,
  "episode_length": 24,
  "created_at": "...",
  "updated_at": "..."
}
```

---

## Manga

### `GET /manga`

Retourne la liste complète des mangas.

**Auth requise :** Non

**Réponse 200 :**

```json
[
  {
    "id": 1,
    "title_en": "Berserk",
    "title_jp": "ベルセルク",
    "synopsis": "...",
    "type": "manga",
    "status": "ongoing",
    "volume_count": 41,
    "chapter_count": 364,
    "start_date": "1989-08-25T00:00:00.000Z",
    "end_date": null,
    "poster_image": "https://...",
    "cover_image": "https://...",
    "created_at": "..."
  }
]
```

---

### `GET /manga/:id`

Retourne un manga par son ID.

**Auth requise :** Non

**Paramètres :**

| Nom | Lieu | Type   | Description  |
|-----|------|--------|--------------|
| id  | path | number | ID du manga  |

**Réponses :**

| Code | Description       |
|------|-------------------|
| 200  | Objet manga       |
| 404  | Manga introuvable |

**Réponse 200 :**

```json
{
  "id": 1,
  "title_en": "Berserk",
  "title_jp": "ベルセルク",
  "synopsis": "...",
  "type": "manga",
  "status": "ongoing",
  "volume_count": 41,
  "chapter_count": 364,
  "start_date": "1989-08-25T00:00:00.000Z",
  "end_date": null,
  "poster_image": "https://...",
  "cover_image": "https://...",
  "created_at": "..."
}
```

---

## Middleware global

| Middleware                    | Portée         | Rôle                              |
|-------------------------------|----------------|-----------------------------------|
| `ForceJsonResponseMiddleware` | Tous           | Force `Accept: application/json`  |
| `cors_middleware`             | Tous           | Gestion CORS                      |
| `bodyparser_middleware`       | Routes         | Parse le body des requêtes        |
| `shield_middleware`           | Routes         | Protection CSRF / sécurité        |
