# Nakamanet Backend — Documentation API

**Base URL** : `http://localhost:8080/api`

**Authentification** : Bearer Token (Laravel Sanctum)

Pour les routes protégées, ajouter le header :

```
Authorization: Bearer <token>
```

---

## Sommaire

### Auth

- [POST `/auth/register`](#post-authregister)
- [POST `/auth/login`](#post-authlogin)
- [POST `/auth/logout`](#post-authlogout)
- [GET `/auth/me`](#get-authme)

### Users

- [PATCH `/users/profile`](#patch-usersprofile)
- [PUT `/users/disable/{id}`](#put-usersdisableid)
- [GET `/users/{id}/posts`](#get-usersidposts)
- [GET `/users/{id}/forum-topics`](#get-usersidforum-topics)

### Posts

- [GET `/posts`](#get-posts)
- [GET `/posts/{id}`](#get-postsid)
- [GET `/posts/{id}/comments`](#get-postsidcomments)
- [POST `/posts`](#post-posts)
- [PATCH `/posts/{id}`](#patch-postsid)
- [DELETE `/posts/{id}`](#delete-postsid)

### Likes

- [POST `/likes/toggle`](#post-likestoggle)

### Forum

- [GET `/forum/topics`](#get-forumtopics)
- [GET `/forum/topics/{id}`](#get-forumtopicsid)
- [POST `/forum/topics`](#post-forumtopics)
- [DELETE `/forum/topics/{id}`](#delete-forumtopicsid)
- [POST `/forum/topics/{id}/reply`](#post-forumtopicsidreply)

### Friends

- [GET `/friends`](#get-friends)
- [GET `/friends/pending`](#get-friendspending)
- [POST `/friends/send`](#post-friendssend)
- [PATCH `/friends/{id}/accept`](#patch-friendsidaccept)
- [DELETE `/friends/{id}/decline`](#delete-friendsiddecline)
- [PATCH `/friends/{id}/block`](#patch-friendsidblock)

### Library

- [GET `/library/anime`](#get-libraryanime)
- [POST `/library/anime`](#post-libraryanime)
- [DELETE `/library/anime/{anime_id}`](#delete-libraryanimeanimeid)
- [GET `/library/manga`](#get-librarymanga)
- [POST `/library/manga`](#post-librarymanga)
- [DELETE `/library/manga/{manga_id}`](#delete-librarymangamangaid)

---

## POST `/auth/register`

Créer un nouveau compte utilisateur.

**Auth requise** : Non

### Request Body

| Champ     | Type   | Requis | Règles                        |
| --------- | ------ | ------ | ----------------------------- |
| username  | string | oui    | max 50 caractères, unique     |
| email     | string | oui    | format email, max 100, unique |
| password  | string | oui    | min 8 caractères              |
| birthdate | string | oui    | format date (YYYY-MM-DD)      |

### Exemple requête

```json
{
  "username": "naruto_fan",
  "email": "naruto@example.com",
  "password": "password123",
  "birthdate": "2000-01-15"
}
```

### Réponse succès — `201 Created`

```json
{
  "user": {
    "id": 1,
    "username": "naruto_fan",
    "email": "naruto@example.com",
    "birthdate": "2000-01-15",
    "localisation": null,
    "bio": null,
    "avatar_url": null,
    "banner_url": null,
    "role": "user",
    "is_deleted": false,
    "created_at": "2026-03-18T10:00:00.000000Z",
    "updated_at": "2026-03-18T10:00:00.000000Z"
  },
  "token": "1|abc123def456..."
}
```

### Réponse erreur — `422 Unprocessable Entity`

```json
{
  "message": "The username has already been taken.",
  "errors": {
    "username": ["The username has already been taken."]
  }
}
```

---

## POST `/auth/login`

Se connecter avec un compte existant.

**Auth requise** : Non

### Request Body

| Champ    | Type   | Requis |
| -------- | ------ | ------ |
| email    | string | oui    |
| password | string | oui    |

### Exemple requête

```json
{
  "email": "naruto@example.com",
  "password": "password123"
}
```

### Réponse succès — `200 OK`

```json
{
  "user": {
    "id": 1,
    "username": "naruto_fan",
    "email": "naruto@example.com",
    "birthdate": "2000-01-15",
    "localisation": null,
    "bio": null,
    "avatar_url": null,
    "banner_url": null,
    "role": "user",
    "is_deleted": false,
    "created_at": "2026-03-18T10:00:00.000000Z",
    "updated_at": "2026-03-18T10:00:00.000000Z"
  },
  "token": "2|xyz789ghi012..."
}
```

### Réponse erreur — `422 Unprocessable Entity`

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["Invalid credentials."]
  }
}
```

---

## POST `/auth/logout`

Se déconnecter (supprime le token courant).

**Auth requise** : Oui

### Réponse succès — `200 OK`

```json
{
  "message": "Logged out successfully"
}
```

### Réponse erreur — `401 Unauthorized`

```json
{
  "message": "Unauthenticated."
}
```

---

## GET `/auth/me`

Récupérer les informations de l'utilisateur connecté.

**Auth requise** : Oui

### Réponse succès — `200 OK`

```json
{
  "id": 1,
  "username": "naruto_fan",
  "email": "naruto@example.com",
  "birthdate": "2000-01-15",
  "localisation": null,
  "bio": null,
  "avatar_url": null,
  "banner_url": null,
  "role": "user",
  "is_deleted": false,
  "created_at": "2026-03-18T10:00:00.000000Z",
  "updated_at": "2026-03-18T10:00:00.000000Z"
}
```

### Réponse erreur — `401 Unauthorized`

```json
{
  "message": "Unauthenticated."
}
```

---

## PATCH `/users/profile`

Mettre à jour le profil de l'utilisateur connecté. Tous les champs sont optionnels.

**Auth requise** : Oui

### Request Body

| Champ                 | Type   | Requis | Règles                                              |
| --------------------- | ------ | ------ | --------------------------------------------------- |
| username              | string | non    | max 50 caractères, unique                           |
| email                 | string | non    | format email, max 100, unique                       |
| password              | string | non    | min 8 caractères, nécessite `password_confirmation` |
| password_confirmation | string | non\*  | requis si `password` est fourni                     |
| birthdate             | string | non    | format date (YYYY-MM-DD)                            |
| localisation          | string | non    | max 100 caractères, nullable                        |
| bio                   | string | non    | max 500 caractères, nullable                        |
| avatar_url            | string | non    | format URL valide, nullable                         |
| banner_url            | string | non    | format URL valide, nullable                         |
| theme_preference      | string | non    | valeur parmi : `light`, `dark`, `system`            |

### Exemple requête

```json
{
  "bio": "Fan de shonen et de RPG !",
  "localisation": "Paris, France",
  "theme_preference": "dark"
}
```

### Réponse succès — `200 OK`

```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "username": "naruto_fan",
    "email": "naruto@example.com",
    "birthdate": "2000-01-15",
    "localisation": "Paris, France",
    "bio": "Fan de shonen et de RPG !",
    "avatar_url": null,
    "banner_url": null,
    "role": "user",
    "created_at": "2026-03-18T10:00:00.000000Z",
    "updated_at": "2026-03-18T11:00:00.000000Z"
  }
}
```

### Réponse erreur — `422 Unprocessable Entity`

```json
{
  "message": "The username has already been taken.",
  "errors": {
    "username": ["The username has already been taken."]
  }
}
```

---

## PUT `/users/disable/{id}`

Désactiver son propre compte. Seul l'utilisateur connecté peut désactiver son propre compte.

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description         |
| --------- | ------- | ------------------- |
| id        | integer | ID de l'utilisateur |

### Réponse succès — `200 OK`

```json
{
  "message": "Account disabled",
  "status": 200
}
```

### Réponse erreur — `403 Forbidden`

```json
{
  "message": "Forbidden"
}
```

### Réponse erreur — `404 Not Found`

```json
{
  "message": "No query results for model [User] 999"
}
```

---

## GET `/posts`

Récupérer la liste paginée des posts (fil d'actualité), du plus récent au plus ancien.

**Auth requise** : Non

### Paramètres query (optionnels)

| Paramètre  | Type    | Description                                                           |
| ---------- | ------- | --------------------------------------------------------------------- |
| user_id    | integer | Filtrer par auteur                                                    |
| anime_id   | integer | Filtrer par anime lié                                                 |
| manga_id   | integer | Filtrer par manga lié                                                 |
| is_spoiler | boolean | Filtrer par spoiler (`true` ou `false`)                               |
| has_images | boolean | Filtrer les posts avec images uniquement                              |
| sort       | string  | Tri : `oldest`, `most_liked`, `most_commented` (défaut : plus récent) |

### Réponse succès — `200 OK`

```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "content": "Mon avis sur Demon Slayer...",
      "related_anime_id": 42,
      "related_manga_id": null,
      "image_urls": ["https://example.com/img.jpg"],
      "is_spoiler": false,
      "created_at": "2026-03-18T10:00:00.000000Z",
      "user": { "id": 1, "username": "naruto_fan" }
    }
  ],
  "per_page": 20,
  "total": 100,
  "last_page": 5,
  "next_page_url": "http://localhost:8080/api/posts?page=2",
  "prev_page_url": null
}
```

---

## GET `/posts/{id}`

Récupérer un post par son ID avec ses commentaires.

**Auth requise** : Non

### Paramètres URL

| Paramètre | Type    | Description |
| --------- | ------- | ----------- |
| id        | integer | ID du post  |

### Réponse succès — `200 OK`

```json
{
  "id": 1,
  "user_id": 1,
  "content": "Mon avis sur Demon Slayer...",
  "related_anime_id": 42,
  "related_manga_id": null,
  "image_urls": ["https://example.com/img.jpg"],
  "is_spoiler": false,
  "created_at": "2026-03-18T10:00:00.000000Z",
  "user": { "id": 1, "username": "naruto_fan" },
  "comments": [
    {
      "id": 1,
      "content": "Totalement d'accord !",
      "user": { "id": 2, "username": "sasuke_fan" }
    }
  ]
}
```

### Réponse erreur — `404 Not Found`

```json
{
  "message": "No query results for model [Post] 999"
}
```

---

## POST `/posts`

Créer un nouveau post.

**Auth requise** : Oui

### Request Body

| Champ            | Type    | Requis | Règles                                |
| ---------------- | ------- | ------ | ------------------------------------- |
| content          | string  | oui    | max 5000 caractères                   |
| related_anime_id | integer | non    | nullable                              |
| related_manga_id | integer | non    | nullable                              |
| image_urls       | array   | non    | nullable, chaque élément = URL valide |
| is_spoiler       | boolean | non    | nullable                              |

### Exemple requête

```json
{
  "content": "Mon avis sur Demon Slayer saison 3...",
  "related_anime_id": 42,
  "image_urls": ["https://example.com/screenshot.jpg"],
  "is_spoiler": true
}
```

### Réponse succès — `201 Created`

```json
{
  "id": 1,
  "user_id": 1,
  "content": "Mon avis sur Demon Slayer saison 3...",
  "related_anime_id": 42,
  "related_manga_id": null,
  "image_urls": ["https://example.com/screenshot.jpg"],
  "is_spoiler": true,
  "created_at": "2026-03-18T10:00:00.000000Z"
}
```

### Réponse erreur — `422 Unprocessable Entity`

```json
{
  "message": "The content field is required.",
  "errors": {
    "content": ["The content field is required."]
  }
}
```

---

## PATCH `/posts/{id}`

Modifier un post. Seul l'auteur peut modifier son post.

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description |
| --------- | ------- | ----------- |
| id        | integer | ID du post  |

### Request Body

| Champ      | Type    | Requis | Règles              |
| ---------- | ------- | ------ | ------------------- |
| content    | string  | non    | max 5000 caractères |
| is_spoiler | boolean | non    |                     |
| image_urls | array   | non    |                     |

### Exemple requête

```json
{
  "content": "Mise à jour de mon avis...",
  "is_spoiler": false
}
```

### Réponse succès — `200 OK`

```json
{
  "id": 1,
  "user_id": 1,
  "content": "Mise à jour de mon avis...",
  "related_anime_id": 42,
  "related_manga_id": null,
  "image_urls": ["https://example.com/screenshot.jpg"],
  "is_spoiler": false,
  "created_at": "2026-03-18T10:00:00.000000Z"
}
```

### Réponse erreur — `403 Forbidden`

```json
{
  "message": "Forbidden"
}
```

### Réponse erreur — `404 Not Found`

```json
{
  "message": "No query results for model [Post] 999"
}
```

---

## DELETE `/posts/{id}`

Supprimer un post. Seul l'auteur peut supprimer son post.

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description |
| --------- | ------- | ----------- |
| id        | integer | ID du post  |

### Réponse succès — `200 OK`

```json
{
  "message": "Post deleted"
}
```

### Réponse erreur — `403 Forbidden`

```json
{
  "message": "Forbidden"
}
```

### Réponse erreur — `404 Not Found`

```json
{
  "message": "No query results for model [Post] 999"
}
```

---

## POST `/likes/toggle`

Liker ou unliker un post ou un commentaire. Si le like existe déjà il est supprimé (unlike), sinon il est créé (like).

**Auth requise** : Oui

### Request Body

| Champ      | Type    | Requis | Règles                         |
| ---------- | ------- | ------ | ------------------------------ |
| post_id    | integer | non\*  | nullable, doit exister en base |
| comment_id | integer | non\*  | nullable, doit exister en base |

\*Au moins un des deux champs est obligatoire.

### Exemple requête — like d'un post

```json
{
  "post_id": 1
}
```

### Exemple requête — like d'un commentaire

```json
{
  "comment_id": 5
}
```

### Réponse succès (like créé) — `201 Created`

```json
{
  "message": "Liked",
  "liked": true
}
```

### Réponse succès (like supprimé) — `200 OK`

```json
{
  "message": "Unliked",
  "liked": false
}
```

### Réponse erreur — `422 Unprocessable Entity`

```json
{
  "message": "post_id or comment_id is required"
}
```

---

## GET `/forum/topics`

Récupérer la liste paginée des sujets du forum. Les sujets épinglés apparaissent en premier.

**Auth requise** : Non

### Paramètres query (optionnels)

| Paramètre | Type    | Description                                                                        |
| --------- | ------- | ---------------------------------------------------------------------------------- |
| category  | string  | Filtrer par catégorie : `general`, `anime`, `manga`, `recommendations`, `spoilers` |
| user_id   | integer | Filtrer par auteur                                                                 |
| anime_id  | integer | Filtrer par anime lié                                                              |
| manga_id  | integer | Filtrer par manga lié                                                              |
| is_pinned | boolean | Filtrer les sujets épinglés (`true` ou `false`)                                    |
| is_locked | boolean | Filtrer les sujets verrouillés (`true` ou `false`)                                 |
| sort      | string  | Tri : `oldest`, `most_replied` (défaut : épinglés d'abord puis plus récent)        |

### Réponse succès — `200 OK`

```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "category": "anime",
      "title": "Vos animes préférés de 2025 ?",
      "content": "Partagez vos coups de coeur...",
      "related_anime_id": null,
      "related_manga_id": null,
      "is_pinned": false,
      "is_locked": false,
      "created_at": "2026-03-18T10:00:00.000000Z",
      "updated_at": "2026-03-18T10:00:00.000000Z",
      "user": { "id": 1, "username": "naruto_fan" }
    }
  ],
  "per_page": 20,
  "total": 50,
  "last_page": 3,
  "next_page_url": "http://localhost:8080/api/forum/topics?page=2",
  "prev_page_url": null
}
```

---

## GET `/forum/topics/{id}`

Récupérer un sujet par son ID avec toutes ses réponses.

**Auth requise** : Non

### Paramètres URL

| Paramètre | Type    | Description |
| --------- | ------- | ----------- |
| id        | integer | ID du sujet |

### Réponse succès — `200 OK`

```json
{
  "id": 1,
  "user_id": 1,
  "category": "anime",
  "title": "Vos animes préférés de 2025 ?",
  "content": "Partagez vos coups de coeur...",
  "related_anime_id": null,
  "related_manga_id": null,
  "is_pinned": false,
  "is_locked": false,
  "created_at": "2026-03-18T10:00:00.000000Z",
  "updated_at": "2026-03-18T10:00:00.000000Z",
  "user": { "id": 1, "username": "naruto_fan" },
  "replies": [
    {
      "id": 1,
      "topic_id": 1,
      "user_id": 2,
      "parent_id": null,
      "content": "Pour moi c'est Dandadan !",
      "created_at": "2026-03-18T11:00:00.000000Z",
      "updated_at": "2026-03-18T11:00:00.000000Z",
      "user": { "id": 2, "username": "sasuke_fan" }
    }
  ]
}
```

### Réponse erreur — `404 Not Found`

```json
{
  "message": "No query results for model [ForumTopic] 999"
}
```

---

## POST `/forum/topics`

Créer un nouveau sujet de forum.

**Auth requise** : Oui

### Request Body

| Champ            | Type    | Requis | Règles                                                                    |
| ---------------- | ------- | ------ | ------------------------------------------------------------------------- |
| title            | string  | oui    | max 255 caractères                                                        |
| content          | string  | oui    |                                                                           |
| category         | string  | oui    | valeur parmi : `general`, `anime`, `manga`, `recommendations`, `spoilers` |
| related_anime_id | integer | non    | nullable                                                                  |
| related_manga_id | integer | non    | nullable                                                                  |

### Exemple requête

```json
{
  "title": "Vos animes préférés de 2025 ?",
  "content": "Partagez vos coups de coeur de l'année !",
  "category": "anime"
}
```

### Réponse succès — `201 Created`

```json
{
  "id": 1,
  "user_id": 1,
  "category": "anime",
  "title": "Vos animes préférés de 2025 ?",
  "content": "Partagez vos coups de coeur de l'année !",
  "related_anime_id": null,
  "related_manga_id": null,
  "is_pinned": false,
  "is_locked": false,
  "created_at": "2026-03-18T10:00:00.000000Z",
  "updated_at": "2026-03-18T10:00:00.000000Z"
}
```

### Réponse erreur — `422 Unprocessable Entity`

```json
{
  "message": "The category field must be one of: general, anime, manga, recommendations, spoilers.",
  "errors": {
    "category": ["The category field must be one of: general, anime, manga, recommendations, spoilers."]
  }
}
```

---

## DELETE `/forum/topics/{id}`

Supprimer un sujet. Seul l'auteur peut supprimer son sujet.

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description |
| --------- | ------- | ----------- |
| id        | integer | ID du sujet |

### Réponse succès — `200 OK`

```json
{
  "message": "Topic deleted"
}
```

### Réponse erreur — `403 Forbidden`

```json
{
  "message": "Forbidden"
}
```

### Réponse erreur — `404 Not Found`

```json
{
  "message": "No query results for model [ForumTopic] 999"
}
```

---

## POST `/forum/topics/{id}/reply`

Répondre à un sujet. Supporte les réponses imbriquées via `parent_id`.

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description |
| --------- | ------- | ----------- |
| id        | integer | ID du sujet |

### Request Body

| Champ     | Type    | Requis | Règles                                      |
| --------- | ------- | ------ | ------------------------------------------- |
| content   | string  | oui    |                                             |
| parent_id | integer | non    | nullable, doit exister dans `Forum_Replies` |

### Exemple requête

```json
{
  "content": "Pour moi c'est Dandadan sans hésiter !"
}
```

### Réponse succès — `201 Created`

```json
{
  "id": 1,
  "topic_id": 1,
  "user_id": 2,
  "parent_id": null,
  "content": "Pour moi c'est Dandadan sans hésiter !",
  "created_at": "2026-03-18T11:00:00.000000Z",
  "updated_at": "2026-03-18T11:00:00.000000Z"
}
```

### Réponse erreur — `403 Forbidden` (sujet verrouillé)

```json
{
  "message": "Topic is locked"
}
```

### Réponse erreur — `404 Not Found`

```json
{
  "message": "No query results for model [ForumTopic] 999"
}
```

---

## Objet User (référence)

Champs retournés dans les réponses (`password_hash` toujours masqué) :

| Champ            | Type     | Description                            |
| ---------------- | -------- | -------------------------------------- |
| id               | integer  | ID unique                              |
| username         | string   | Nom d'utilisateur (unique)             |
| email            | string   | Adresse email (unique)                 |
| birthdate        | string   | Date de naissance (YYYY-MM-DD)         |
| localisation     | string?  | Localisation (nullable)                |
| bio              | string?  | Biographie (nullable)                  |
| avatar_url       | string?  | URL de l'avatar (nullable)             |
| banner_url       | string?  | URL de la bannière (nullable)          |
| role             | string   | `user`, `moderator` ou `admin`         |
| is_deleted       | boolean  | Compte désactivé                       |
| theme_preference | string?  | `light`, `dark` ou `system` (nullable) |
| created_at       | datetime | Date de création                       |
| updated_at       | datetime | Date de dernière modification          |

---

## GET `/users/{id}/posts`

Récupérer les posts d'un utilisateur spécifique, paginés du plus récent au plus ancien.

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description         |
| --------- | ------- | ------------------- |
| id        | integer | ID de l'utilisateur |

### Réponse succès — `200 OK`

```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "content": "Mon avis sur Demon Slayer...",
      "related_anime_id": 42,
      "related_manga_id": null,
      "image_urls": ["https://example.com/img.jpg"],
      "is_spoiler": false,
      "likes_count": 5,
      "comments_count": 2,
      "created_at": "2026-03-18T10:00:00.000000Z",
      "user": { "id": 1, "username": "naruto_fan" }
    }
  ],
  "per_page": 20,
  "total": 10,
  "last_page": 1,
  "next_page_url": null,
  "prev_page_url": null
}
```

---

## GET `/users/{id}/forum-topics`

Récupérer les topics de forum créés par un utilisateur spécifique, paginés du plus récent au plus ancien.

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description         |
| --------- | ------- | ------------------- |
| id        | integer | ID de l'utilisateur |

### Réponse succès — `200 OK`

```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "category": "anime",
      "title": "Vos animes préférés de 2025 ?",
      "content": "Partagez vos coups de coeur...",
      "related_anime_id": null,
      "related_manga_id": null,
      "is_pinned": false,
      "is_locked": false,
      "replies_count": 4,
      "created_at": "2026-03-18T10:00:00.000000Z",
      "updated_at": "2026-03-18T10:00:00.000000Z",
      "user": { "id": 1, "username": "naruto_fan" }
    }
  ],
  "per_page": 20,
  "total": 3,
  "last_page": 1,
  "next_page_url": null,
  "prev_page_url": null
}
```

---

## GET `/posts/{id}/comments`

Récupérer les commentaires d'un post, paginés.

**Auth requise** : Non

### Paramètres URL

| Paramètre | Type    | Description |
| --------- | ------- | ----------- |
| id        | integer | ID du post  |

### Réponse succès — `200 OK`

```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "content": "Totalement d'accord !",
      "user": { "id": 2, "username": "sasuke_fan" }
    }
  ],
  "per_page": 20,
  "total": 5,
  "last_page": 1,
  "next_page_url": null,
  "prev_page_url": null
}
```

### Réponse erreur — `404 Not Found`

```json
{
  "message": "No query results for model [Post] 999"
}
```

---

## GET `/friends`

Récupérer la liste des amis acceptés de l'utilisateur connecté.

**Auth requise** : Oui

### Réponse succès — `200 OK`

```json
[
  {
    "id": 1,
    "requester_id": 1,
    "addressee_id": 2,
    "status": "accepted",
    "requester": { "id": 1, "username": "naruto_fan" },
    "addressee": { "id": 2, "username": "sasuke_fan" }
  }
]
```

---

## GET `/friends/pending`

Récupérer les demandes d'amis reçues en attente.

**Auth requise** : Oui

### Réponse succès — `200 OK`

```json
[
  {
    "id": 3,
    "requester_id": 5,
    "addressee_id": 1,
    "status": "pending",
    "requester": { "id": 5, "username": "kakashi_fan" }
  }
]
```

---

## POST `/friends/send`

Envoyer une demande d'ami à un utilisateur.

**Auth requise** : Oui

### Request Body

| Champ        | Type    | Requis | Règles                             |
| ------------ | ------- | ------ | ---------------------------------- |
| addressee_id | integer | oui    | doit exister en base, pas soi-même |

### Exemple requête

```json
{
  "addressee_id": 2
}
```

### Réponse succès — `201 Created`

```json
{
  "id": 1,
  "requester_id": 1,
  "addressee_id": 2,
  "status": "pending"
}
```

### Réponse erreur — `422 Unprocessable Entity`

```json
{
  "message": "Request already sent"
}
```

```json
{
  "message": "You cannot add yourself"
}
```

---

## PATCH `/friends/{id}/accept`

Accepter une demande d'ami reçue.

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description            |
| --------- | ------- | ---------------------- |
| id        | integer | ID de la demande d'ami |

### Réponse succès — `200 OK`

```json
{
  "message": "Friend request accepted"
}
```

### Réponse erreur — `404 Not Found`

```json
{
  "message": "No query results for model [Friendship] 999"
}
```

---

## DELETE `/friends/{id}/decline`

Refuser ou annuler une demande d'ami (peut être utilisé par le demandeur ou le destinataire).

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description            |
| --------- | ------- | ---------------------- |
| id        | integer | ID de la demande d'ami |

### Réponse succès — `200 OK`

```json
{
  "message": "Friend request declined"
}
```

---

## PATCH `/friends/{id}/block`

Bloquer un utilisateur via une relation existante.

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description            |
| --------- | ------- | ---------------------- |
| id        | integer | ID de la relation amis |

### Réponse succès — `200 OK`

```json
{
  "message": "User blocked"
}
```

---

## GET `/library/anime`

Récupérer la bibliothèque anime de l'utilisateur connecté.

**Auth requise** : Oui

### Paramètres query (optionnels)

| Paramètre | Type   | Description                                                                         |
| --------- | ------ | ----------------------------------------------------------------------------------- |
| status    | string | Filtrer par statut : `watching`, `completed`, `on_hold`, `dropped`, `plan_to_watch` |

### Réponse succès — `200 OK`

```json
[
  {
    "id": 1,
    "user_id": 1,
    "anime_id": 42,
    "status": "watching",
    "progress": 12,
    "rewatch_count": 0,
    "score": 9,
    "is_private": false
  }
]
```

---

## POST `/library/anime`

Ajouter ou mettre à jour un anime dans la bibliothèque (si l'anime est déjà présent, la ligne est mise à jour).

**Auth requise** : Oui

### Request Body

| Champ         | Type    | Requis | Règles                                                                 |
| ------------- | ------- | ------ | ---------------------------------------------------------------------- |
| anime_id      | integer | oui    |                                                                        |
| status        | string  | oui    | parmi : `watching`, `completed`, `on_hold`, `dropped`, `plan_to_watch` |
| progress      | integer | non    | nullable, min 0                                                        |
| rewatch_count | integer | non    | nullable, min 0                                                        |
| score         | integer | non    | nullable, min 1, max 10                                                |
| is_private    | boolean | non    |                                                                        |

### Exemple requête

```json
{
  "anime_id": 42,
  "status": "watching",
  "progress": 12,
  "score": 9
}
```

### Réponse succès — `201 Created`

```json
{
  "id": 1,
  "user_id": 1,
  "anime_id": 42,
  "status": "watching",
  "progress": 12,
  "rewatch_count": 0,
  "score": 9,
  "is_private": false
}
```

---

## DELETE `/library/anime/{anime_id}`

Retirer un anime de la bibliothèque.

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description   |
| --------- | ------- | ------------- |
| anime_id  | integer | ID de l'anime |

### Réponse succès — `200 OK`

```json
{
  "message": "Removed from library"
}
```

### Réponse erreur — `404 Not Found`

```json
{
  "message": "No query results for model [UserAnimeLibrary] 42"
}
```

---

## GET `/library/manga`

Récupérer la bibliothèque manga de l'utilisateur connecté.

**Auth requise** : Oui

### Paramètres query (optionnels)

| Paramètre | Type   | Description                                                                         |
| --------- | ------ | ----------------------------------------------------------------------------------- |
| status    | string | Filtrer par statut : `watching`, `completed`, `on_hold`, `dropped`, `plan_to_watch` |

### Réponse succès — `200 OK`

```json
[
  {
    "id": 1,
    "user_id": 1,
    "manga_id": 10,
    "status": "completed",
    "progress": 120,
    "reread_count": 1,
    "score": 10,
    "is_private": false
  }
]
```

---

## POST `/library/manga`

Ajouter ou mettre à jour un manga dans la bibliothèque.

**Auth requise** : Oui

### Request Body

| Champ        | Type    | Requis | Règles                                                                 |
| ------------ | ------- | ------ | ---------------------------------------------------------------------- |
| manga_id     | integer | oui    |                                                                        |
| status       | string  | oui    | parmi : `watching`, `completed`, `on_hold`, `dropped`, `plan_to_watch` |
| progress     | integer | non    | nullable, min 0                                                        |
| reread_count | integer | non    | nullable, min 0                                                        |
| score        | integer | non    | nullable, min 1, max 10                                                |
| is_private   | boolean | non    |                                                                        |

### Exemple requête

```json
{
  "manga_id": 10,
  "status": "completed",
  "progress": 120,
  "score": 10
}
```

### Réponse succès — `201 Created`

```json
{
  "id": 1,
  "user_id": 1,
  "manga_id": 10,
  "status": "completed",
  "progress": 120,
  "reread_count": 1,
  "score": 10,
  "is_private": false
}
```

---

## DELETE `/library/manga/{manga_id}`

Retirer un manga de la bibliothèque.

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description |
| --------- | ------- | ----------- |
| manga_id  | integer | ID du manga |

### Réponse succès — `200 OK`

```json
{
  "message": "Removed from library"
}
```

### Réponse erreur — `404 Not Found`

```json
{
  "message": "No query results for model [UserMangaLibrary] 10"
}
```

---

## Notes pour le front

- Le **token** reçu au login/register doit être stocké et envoyé dans le header `Authorization: Bearer <token>` pour toutes les routes protégées.
- Un token invalidé (après logout) retournera `401 Unauthenticated` sur les routes protégées.
- Le serveur tourne sur le port **8080** via Docker (`docker compose up -d`).
- Les erreurs de validation retournent toujours un objet `errors` avec les champs concernés.
