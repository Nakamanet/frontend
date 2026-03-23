z# Catalogue des routes — Nakamanet API

**Base URL:** `http://localhost:PORT`
**Format:** Toutes les réponses sont en `application/json`

---

## Sommaire

- [Sommaire](#sommaire)
- [Categories](#categories)
  - [`GET /categories`](#get-categories)
- [Genres](#genres)
  - [`GET /genres`](#get-genres)
- [Anime](#anime)
  - [`GET /anime`](#get-anime)
  - [`GET /anime/:id/categories`](#get-animeidcategories)
  - [`GET /anime/:id/genres`](#get-animeidgenres)
  - [`GET /anime/:id/episodes`](#get-animeidepisodes)
  - [`GET /anime/:id/characters`](#get-animeidcharacters)
  - [`GET /anime/:id/productions`](#get-animeidproductions)
  - [`GET /anime/:id/staff`](#get-animeidstaff)
  - [`GET /anime/:id`](#get-animeid)
- [Manga](#manga)
  - [`GET /manga`](#get-manga)
  - [`GET /manga/:id`](#get-mangaid)
  - [`GET /manga/:id/categories`](#get-mangaidcategories)
  - [`GET /manga/:id/genres`](#get-mangaidgenres)
  - [`GET /manga/:id/chapters`](#get-mangaidchapters)
  - [`GET /manga/:id/characters`](#get-mangaidcharacters)
  - [`GET /manga/:id/staff`](#get-mangaidstaff)
- [Middleware global](#middleware-global)

---

## Categories

### `GET /categories`

Retourne la liste complète des catégories.

**Auth requise :** Non

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

## Genres

### `GET /genres`

Retourne la liste complète des genres.

**Auth requise :** Non

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

## Anime

### `GET /anime`

Retourne la liste paginée des animes.

**Auth requise :** Non

**Query params :**

| Nom   | Type   | Défaut | Description                             |
| ----- | ------ | ------ | --------------------------------------- |
| page  | number | 1      | Numéro de la page                       |
| limit | number | 20     | Nombre d'éléments par page              |
| genre | string | —      | Filtrer par slug de genre (ex: `ecchi`) |

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
| -------- | ---- | ------ | ------------- |
| anime_id | path | number | ID de l'anime |

**Réponses :**

| Code | Description           |
| ---- | --------------------- |
| 200  | Tableau de catégories |
| 404  | Anime introuvable     |

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
| -------- | ---- | ------ | ------------- |
| anime_id | path | number | ID de l'anime |

**Réponses :**

| Code | Description       |
| ---- | ----------------- |
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

### `GET /anime/:id/episodes`

Retourne la liste paginée des épisodes d'un anime.

**Auth requise :** Non

**Paramètres :**

| Nom      | Lieu | Type   | Description   |
| -------- | ---- | ------ | ------------- |
| anime_id | path | number | ID de l'anime |

**Query params :**

| Nom   | Type   | Défaut | Description                |
| ----- | ------ | ------ | -------------------------- |
| page  | number | 1      | Numéro de la page          |
| limit | number | 20     | Nombre d'éléments par page |

**Réponses :**

| Code | Description               |
| ---- | ------------------------- |
| 200  | Tableau paginé d'épisodes |
| 404  | Anime introuvable         |

**Réponse 200 :**

```json
{
  "meta": { "total": 26, "per_page": 20, "current_page": 1, "last_page": 2, "...": "..." },
  "data": [
    {
      "anime_id": 1,
      "number": 1,
      "title": "Asteroid Blues",
      "airdate": "1998-04-03",
      "length": 24,
      "thumbnail_url": "https://..."
    }
  ]
}
```

---

### `GET /anime/:id/characters`

Retourne la liste des personnages d'un anime avec leur doubleur associé.

**Auth requise :** Non

**Paramètres :**

| Nom      | Lieu | Type   | Description   |
| -------- | ---- | ------ | ------------- |
| anime_id | path | number | ID de l'anime |

**Réponses :**

| Code | Description            |
| ---- | ---------------------- |
| 200  | Tableau de personnages |
| 404  | Anime introuvable      |

**Réponse 200 :**

```json
[
  {
    "anime_id": 1,
    "character_id": 10,
    "person_id": 5,
    "role": "main",
    "character": {
      "id": 10,
      "name": "Spike Spiegel",
      "description": "...",
      "image_url": "https://..."
    },
    "person": {
      "id": 5,
      "name": "Koichi Yamadera",
      "image_url": "https://..."
    }
  }
]
```

---

### `GET /anime/:id/productions`

Retourne la liste des studios/sociétés de production d'un anime.

**Auth requise :** Non

**Paramètres :**

| Nom      | Lieu | Type   | Description   |
| -------- | ---- | ------ | ------------- |
| anime_id | path | number | ID de l'anime |

**Réponses :**

| Code | Description            |
| ---- | ---------------------- |
| 200  | Tableau de productions |
| 404  | Anime introuvable      |

**Réponse 200 :**

```json
[
  {
    "anime_id": 1,
    "company_id": 3,
    "role": "studio",
    "company": {
      "id": 3,
      "name": "Sunrise",
      "country": "JP",
      "type": "studio"
    }
  }
]
```

---

### `GET /anime/:id/staff`

Retourne la liste des membres du staff d'un anime (réalisateurs, scénaristes, etc.).

**Auth requise :** Non

**Paramètres :**

| Nom      | Lieu | Type   | Description   |
| -------- | ---- | ------ | ------------- |
| anime_id | path | number | ID de l'anime |

**Réponses :**

| Code | Description       |
| ---- | ----------------- |
| 200  | Tableau de staff  |
| 404  | Anime introuvable |

**Réponse 200 :**

```json
[
  {
    "anime_id": 1,
    "character_id": null,
    "person_id": 7,
    "role": "director",
    "person": {
      "id": 7,
      "name": "Shinichiro Watanabe",
      "image_url": "https://...",
      "description": "..."
    }
  }
]
```

---

### `GET /anime/:id`

Retourne un anime par son ID ou son slug.

**Auth requise :** Non

**Paramètres :**

| Nom | Lieu | Type          | Description           |
| --- | ---- | ------------- | --------------------- |
| id  | path | number/string | ID ou slug de l'anime |

**Réponses :**

| Code | Description       |
| ---- | ----------------- |
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

| Nom   | Type   | Défaut | Description                              |
| ----- | ------ | ------ | ---------------------------------------- |
| page  | number | 1      | Numéro de la page                        |
| limit | number | 20     | Nombre d'éléments par page               |
| genre | string | —      | Filtrer par slug de genre (ex: `shonen`) |

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

Retourne un manga par son ID ou son slug.

**Auth requise :** Non

**Paramètres :**

| Nom | Lieu | Type          | Description         |
| --- | ---- | ------------- | ------------------- |
| id  | path | number/string | ID ou slug du manga |

**Réponses :**

| Code | Description       |
| ---- | ----------------- |
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

| Nom      | Lieu | Type   | Description |
| -------- | ---- | ------ | ----------- |
| manga_id | path | number | ID du manga |

**Réponses :**

| Code | Description           |
| ---- | --------------------- |
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

| Nom      | Lieu | Type   | Description |
| -------- | ---- | ------ | ----------- |
| manga_id | path | number | ID du manga |

**Réponses :**

| Code | Description       |
| ---- | ----------------- |
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

### `GET /manga/:id/chapters`

Retourne la liste paginée des chapitres d'un manga.

**Auth requise :** Non

**Paramètres :**

| Nom      | Lieu | Type   | Description |
| -------- | ---- | ------ | ----------- |
| manga_id | path | number | ID du manga |

**Query params :**

| Nom   | Type   | Défaut | Description                |
| ----- | ------ | ------ | -------------------------- |
| page  | number | 1      | Numéro de la page          |
| limit | number | 20     | Nombre d'éléments par page |

**Réponses :**

| Code | Description                 |
| ---- | --------------------------- |
| 200  | Tableau paginé de chapitres |
| 404  | Manga introuvable           |

**Réponse 200 :**

```json
{
  "meta": { "total": 364, "per_page": 20, "current_page": 1, "last_page": 19, "...": "..." },
  "data": [
    {
      "id": 1,
      "manga_id": 1,
      "number": 1,
      "volume_number": 1,
      "title": "The Black Swordsman",
      "release_date": "1989-08-25"
    }
  ]
}
```

---

### `GET /manga/:id/characters`

Retourne la liste des personnages d'un manga.

**Auth requise :** Non

**Paramètres :**

| Nom      | Lieu | Type   | Description |
| -------- | ---- | ------ | ----------- |
| manga_id | path | number | ID du manga |

**Réponses :**

| Code | Description            |
| ---- | ---------------------- |
| 200  | Tableau de personnages |
| 404  | Manga introuvable      |

**Réponse 200 :**

```json
[
  {
    "manga_id": 1,
    "character_id": 10,
    "role": "main",
    "character": {
      "id": 10,
      "name": "Guts",
      "description": "...",
      "image_url": "https://..."
    }
  }
]
```

---

### `GET /manga/:id/staff`

Retourne la liste des membres du staff d'un manga (auteurs, dessinateurs, etc.).

**Auth requise :** Non

**Paramètres :**

| Nom      | Lieu | Type   | Description |
| -------- | ---- | ------ | ----------- |
| manga_id | path | number | ID du manga |

**Réponses :**

| Code | Description       |
| ---- | ----------------- |
| 200  | Tableau de staff  |
| 404  | Manga introuvable |

**Réponse 200 :**

```json
[
  {
    "manga_id": 1,
    "person_id": 2,
    "role": "author",
    "person": {
      "id": 2,
      "name": "Kentaro Miura",
      "image_url": "https://...",
      "description": "..."
    }
  }
]
```

---

## Middleware global

| Middleware                    | Portée | Rôle                             |
| ----------------------------- | ------ | -------------------------------- |
| `ForceJsonResponseMiddleware` | Tous   | Force `Accept: application/json` |
| `cors_middleware`             | Tous   | Gestion CORS                     |
| `bodyparser_middleware`       | Routes | Parse le body des requêtes       |
| `shield_middleware`           | Routes | Protection CSRF / sécurité       |
