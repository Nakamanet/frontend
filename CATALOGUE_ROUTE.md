# Catalogue des routes — Nakamanet API

**Base URL:** `http://localhost:PORT`
**Format:** Toutes les réponses sont en `application/json`

---

## Sommaire

- [Anime](#anime)
  - [GET /anime](#get-anime)
  - [GET /anime/:id](#get-animeid)
  - [GET /anime/:id/categories](#get-animeidcategories)
  - [GET /anime/:id/genres](#get-animeidgenres)
- [Manga](#manga)
  - [GET /manga](#get-manga)
  - [GET /manga/:id](#get-mangaid)
  - [GET /manga/:id/categories](#get-mangaidcategories)
  - [GET /manga/:id/genres](#get-mangaidgenres)

---

## Anime

### `GET /anime`

Retourne la liste paginée des animes.

**Auth requise :** Non

**Query params :**

| Nom   | Type   | Défaut | Description               |
|-------|--------|--------|---------------------------|
| page  | number | 1      | Numéro de la page         |
| limit | number | 20     | Nombre d'éléments par page |

**Réponse 200 :**

```json
{
  "meta": {
    "total": 100,
    "per_page": 20,
    "current_page": 1,
    "last_page": 5,
    "first_page": 1,
    "first_page_url": "/?page=1",
    "last_page_url": "/?page=5",
    "next_page_url": "/?page=2",
    "previous_page_url": null
  },
  "data": [
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
}
```

---

### `GET /anime/:id/categories`

Retourne la liste des catégories d'un anime.

**Auth requise :** Non

**Paramètres :**

| Nom      | Lieu | Type   | Description   |
|----------|------|--------|---------------|
| anime_id | path | number | ID de l'anime |

**Réponses :**

| Code | Description       |
|------|-------------------|
| 200  | Tableau de catégories |
| 404  | Anime introuvable |

**Réponse 200 :**

```json
[
  {
    "id": 1,
    "name": "Action",
    "description": "..."
  }
]
```

---

### `GET /anime/:id/genres`

Retourne la liste des genres d'un anime.

**Auth requise :** Non

**Paramètres :**

| Nom      | Lieu | Type   | Description   |
|----------|------|--------|---------------|
| anime_id | path | number | ID de l'anime |

**Réponses :**

| Code | Description       |
|------|-------------------|
| 200  | Tableau de genres |
| 404  | Anime introuvable |

**Réponse 200 :**

```json
[
  {
    "id": 1,
    "name": "Shonen",
    "slug": "shonen"
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

Retourne la liste paginée des mangas.

**Auth requise :** Non

**Query params :**

| Nom   | Type   | Défaut | Description               |
|-------|--------|--------|---------------------------|
| page  | number | 1      | Numéro de la page         |
| limit | number | 20     | Nombre d'éléments par page |

**Réponse 200 :**

```json
{
  "meta": {
    "total": 100,
    "per_page": 20,
    "current_page": 1,
    "last_page": 5,
    "first_page": 1,
    "first_page_url": "/?page=1",
    "last_page_url": "/?page=5",
    "next_page_url": "/?page=2",
    "previous_page_url": null
  },
  "data": [
    {
      "id": 1,
      "slug": "berserk",
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
}
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
  "slug": "berserk",
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

### `GET /manga/:id/categories`

Retourne la liste des catégories d'un manga.

**Auth requise :** Non

**Paramètres :**

| Nom      | Lieu | Type   | Description  |
|----------|------|--------|--------------|
| manga_id | path | number | ID du manga  |

**Réponses :**

| Code | Description           |
|------|-----------------------|
| 200  | Tableau de catégories |
| 404  | Manga introuvable     |

**Réponse 200 :**

```json
[
  {
    "id": 1,
    "name": "Action",
    "description": "..."
  }
]
```

---

### `GET /manga/:id/genres`

Retourne la liste des genres d'un manga.

**Auth requise :** Non

**Paramètres :**

| Nom      | Lieu | Type   | Description  |
|----------|------|--------|--------------|
| manga_id | path | number | ID du manga  |

**Réponses :**

| Code | Description       |
|------|-------------------|
| 200  | Tableau de genres |
| 404  | Manga introuvable |

**Réponse 200 :**

```json
[
  {
    "id": 1,
    "name": "Shonen",
    "slug": "shonen"
  }
]
```

---

## Middleware global

| Middleware                    | Portée         | Rôle                              |
|-------------------------------|----------------|-----------------------------------|
| `ForceJsonResponseMiddleware` | Tous           | Force `Accept: application/json`  |
| `cors_middleware`             | Tous           | Gestion CORS                      |
| `bodyparser_middleware`       | Routes         | Parse le body des requêtes        |
| `shield_middleware`           | Routes         | Protection CSRF / sécurité        |
