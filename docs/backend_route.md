# Nakamanet Backend — API Routes Reference

> Base URL : `http://your-domain/api`  
> Auth : JWT Bearer token (`Authorization: Bearer <token>`)

---

## I. Authentification

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| POST | `/auth/register` | Non | Créer un compte |
| POST | `/auth/login` | Non | Se connecter |
| POST | `/auth/logout` | Oui | Se déconnecter |
| POST | `/auth/refresh` | Oui | Rafraîchir le token |
| GET | `/auth/me` | Oui | Infos de l'utilisateur connecté |

### POST `/auth/register`
```json
{
  "username": "string (required)",
  "email": "string (required)",
  "password": "string (required, min 8)",
  "birthdate": "date (required)",
  "localisation": "string (optional)"
}
```

### POST `/auth/login`
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Réponse (register `201` & login `200`) :**
```json
{
  "user": {
    "id": 1,
    "username": "SakuraMoe",
    "email": "sakura@example.com",
    "birthdate": "2000-04-15",
    "localisation": "Tokyo",
    "bio": "Anime lover",
    "avatar_url": "https://cdn.example.com/avatars/1.jpg",
    "banner_url": "https://cdn.example.com/banners/1.jpg",
    "role": "user",
    "is_admin": false,
    "is_moderator": false,
    "is_deleted": false,
    "created_at": "2026-01-10T12:00:00.000000Z",
    "updated_at": "2026-01-10T12:00:00.000000Z"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### POST `/auth/logout`

**Réponse `200` :**
```json
{
  "message": "Logged out successfully"
}
```

### POST `/auth/refresh`

**Réponse `200` :** même format que register/login (nouveau token + user).

### GET `/auth/me`

**Réponse `200` :** objet `user` complet (voir register/login).

---

## II. Utilisateurs

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| PATCH | `/users/profile` | Oui | Mettre à jour son profil |
| PUT | `/users/disable/{id}` | Oui | Désactiver son compte |
| GET | `/users/search?q=` | Oui | Rechercher des utilisateurs |
| GET | `/users/{id}/posts` | Non* | Posts d'un utilisateur |
| GET | `/users/{id}/forum-topics` | Oui | Topics forum d'un utilisateur |

### PATCH `/users/profile`
```json
{
  "username": "string (optional)",
  "email": "string (optional)",
  "password": "string (optional, min 8)",
  "password_confirmation": "string (optional)",
  "birthdate": "date (optional)",
  "localisation": "string (optional)",
  "bio": "string (optional)",
  "avatar_url": "string (optional)",
  "banner_url": "string (optional)"
}
```

**Réponse `200` :**
```json
{
  "message": "Profile updated successfully",
  "user": { "id": 1, "username": "SakuraMoe", "..." }
}
```

### PUT `/users/disable/{id}`

**Réponse `200` :**
```json
{
  "message": "Account disabled"
}
```

> Renvoie `403 Forbidden` si `{id}` ne correspond pas à l'utilisateur connecté.

### GET `/users/search`
| Param | Type | Description |
|-------|------|-------------|
| `q` | query | Terme de recherche (min 2 chars) |

**Réponse `200` :**
```json
[
  {
    "id": 1,
    "username": "SakuraMoe",
    "avatar_url": "https://cdn.example.com/avatars/1.jpg",
    "bio": "Anime lover"
  }
]
```

> Renvoie `422` si `q` fait moins de 2 caractères. Résultats limités à 20.

### GET `/users/{id}/posts`

**Réponse `200` :** liste paginée (même format que `GET /posts` avec `likes_count` et `comments_count`).

> *Auth optionnelle : si connecté et que `{id}` correspond à l'utilisateur connecté, ses posts archivés sont inclus. Pour un autre utilisateur, les posts archivés sont exclus.

### GET `/users/{id}/forum-topics`

**Réponse `200` :** liste paginée (même format que `GET /forum/topics`).

---

## III. Posts

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET | `/posts` | Non | Liste des posts (feed) |
| GET | `/posts/{id}` | Non | Détail d'un post |
| GET | `/posts/{id}/comments` | Non | Commentaires d'un post |
| POST | `/posts` | Oui | Créer un post |
| PATCH | `/posts/{id}` | Oui | Modifier son post |
| DELETE | `/posts/{id}` | Oui | Supprimer son post |
| GET | `/posts/me/liked` | Oui | Posts likés par l'utilisateur connecté |
| GET | `/posts/me/saved` | Oui | Posts sauvegardés |
| GET | `/posts/me/archived` | Oui | Ses propres posts archivés |
| GET | `/posts/me/archived-from-feed` | Oui | Posts d'autres users cachés de son feed |
| POST | `/posts/{id}/save` | Oui | Sauvegarder un post |
| DELETE | `/posts/{id}/save` | Oui | Retirer des sauvegardes |
| PATCH | `/posts/{id}/archive` | Oui | Archiver son propre post |
| PATCH | `/posts/{id}/unarchive` | Oui | Désarchiver son post |
| POST | `/posts/{id}/hide` | Oui | Cacher un post d'un autre user de son feed |
| DELETE | `/posts/{id}/hide` | Oui | Remettre un post caché dans le feed |

### GET `/posts` — Query params optionnels
| Param | Type | Description |
|-------|------|-------------|
| `user_id` | integer | Filtrer par utilisateur |
| `anime_id` | integer | Filtrer par anime |
| `manga_id` | integer | Filtrer par manga |
| `is_spoiler` | boolean | Filtrer les spoilers |
| `has_images` | boolean | Filtrer les posts avec images |
| `sort` | string | `latest` / `oldest` / `most_liked` / `most_commented` |
| `page` | integer | Pagination (20 items/page) |

> Les posts archivés et cachés sont automatiquement filtrés selon l'utilisateur connecté. Si connecté, le champ `likes` indique si l'utilisateur a liké chaque post.

**Réponse `200` :**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 42,
      "user_id": 1,
      "related_anime_id": 101,
      "related_manga_id": null,
      "content": "Cette arc était incroyable !",
      "image_urls": ["https://cdn.example.com/img1.jpg"],
      "is_spoiler": false,
      "likes_count": 14,
      "comments_count": 3,
      "user": {
        "id": 1,
        "username": "SakuraMoe",
        "avatar_url": "https://cdn.example.com/avatars/1.jpg"
      },
      "likes": [],
      "created_at": "2026-01-15T08:30:00.000000Z",
      "updated_at": "2026-01-15T08:30:00.000000Z"
    }
  ],
  "first_page_url": "http://your-domain/api/posts?page=1",
  "last_page": 5,
  "last_page_url": "http://your-domain/api/posts?page=5",
  "next_page_url": "http://your-domain/api/posts?page=2",
  "per_page": 20,
  "total": 98
}
```

### GET `/posts/{id}`

**Réponse `200` :**
```json
{
  "id": 42,
  "user_id": 1,
  "related_anime_id": 101,
  "related_manga_id": null,
  "content": "Cette arc était incroyable !",
  "image_urls": ["https://cdn.example.com/img1.jpg"],
  "is_spoiler": false,
  "user": {
    "id": 1,
    "username": "SakuraMoe",
    "avatar_url": "https://cdn.example.com/avatars/1.jpg"
  },
  "comments": [
    {
      "id": 7,
      "post_id": 42,
      "user_id": 2,
      "parent_id": null,
      "content": "Totalement d'accord !",
      "is_spoiler": false,
      "user": { "id": 2, "username": "NarutoBro", "avatar_url": null },
      "created_at": "2026-01-15T09:00:00.000000Z",
      "updated_at": "2026-01-15T09:00:00.000000Z"
    }
  ],
  "created_at": "2026-01-15T08:30:00.000000Z",
  "updated_at": "2026-01-15T08:30:00.000000Z"
}
```

### GET `/posts/{id}/comments`

**Réponse `200` :** liste paginée (20/page)
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 7,
      "post_id": 42,
      "user_id": 2,
      "parent_id": null,
      "content": "Totalement d'accord !",
      "is_spoiler": false,
      "user": {
        "id": 2,
        "username": "NarutoBro",
        "avatar_url": null
      },
      "created_at": "2026-01-15T09:00:00.000000Z",
      "updated_at": "2026-01-15T09:00:00.000000Z"
    }
  ],
  "per_page": 20,
  "total": 3
}
```

### POST `/posts`
```json
{
  "content": "string (required, max 5000)",
  "is_spoiler": "boolean (optional)",
  "image_urls": ["url1", "url2"],
  "related_anime_id": "integer (optional)",
  "related_manga_id": "integer (optional)"
}
```

**Réponse `201` :**
```json
{
  "id": 43,
  "user_id": 1,
  "related_anime_id": null,
  "related_manga_id": null,
  "content": "Mon nouveau post !",
  "image_urls": [],
  "is_spoiler": false,
  "created_at": "2026-01-15T10:00:00.000000Z",
  "updated_at": "2026-01-15T10:00:00.000000Z"
}
```

### PATCH `/posts/{id}`
```json
{
  "content": "string (optional)",
  "is_spoiler": "boolean (optional)",
  "image_urls": ["url"]
}
```

**Réponse `200` :** objet post mis à jour (même format que POST).

> Renvoie `403 Forbidden` si l'utilisateur n'est pas le créateur.

### DELETE `/posts/{id}`

**Réponse `200` :**
```json
{
  "message": "Post deleted"
}
```

> Renvoie `403 Forbidden` si l'utilisateur n'est pas le créateur.

---

### GET `/posts/me/liked`

**Réponse `200` :** liste paginée de posts (même format que `GET /posts`).

### GET `/posts/me/saved`

**Réponse `200` :** liste paginée de posts sauvegardés (même format que `GET /posts`).

### GET `/posts/me/archived`

Posts de l'utilisateur connecté qu'il a lui-même archivés (cachés de son propre profil public).

**Réponse `200` :** liste paginée de posts (sans objet `user` imbriqué).

### GET `/posts/me/archived-from-feed`

Posts d'autres utilisateurs que l'utilisateur connecté a cachés de son feed.

**Réponse `200` :** liste paginée de posts (même format que `GET /posts`).

---

### POST `/posts/{id}/save`

**Réponse `201` :**
```json
{
  "message": "Saved",
  "saved": true
}
```

### DELETE `/posts/{id}/save`

**Réponse `200` :**
```json
{
  "message": "Unsaved",
  "saved": false
}
```

---

### PATCH `/posts/{id}/archive`

Archive son propre post (le retire du profil public et du feed des autres).

**Réponse `200` :**
```json
{
  "message": "Archived",
  "archived": true
}
```

> Renvoie `403` si l'utilisateur n'est pas le créateur.

### PATCH `/posts/{id}/unarchive`

**Réponse `200` :**
```json
{
  "message": "Unarchived",
  "archived": false
}
```

> Renvoie `403` si l'utilisateur n'est pas le créateur.

---

### POST `/posts/{id}/hide`

Cache le post d'un autre utilisateur de son propre feed. Ne peut pas être utilisé sur ses propres posts (utiliser `/archive` à la place).

**Réponse `201` :**
```json
{
  "message": "Hidden from feed",
  "hidden": true
}
```

> Renvoie `422` si l'utilisateur tente de cacher son propre post.

### DELETE `/posts/{id}/hide`

**Réponse `200` :**
```json
{
  "message": "Restored to feed",
  "hidden": false
}
```

---

## IV. Likes

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| POST | `/likes/toggle` | Oui | Liker / unliker un post ou commentaire |

### POST `/likes/toggle`
```json
{
  "post_id": "integer (nullable)",
  "comment_id": "integer (nullable)"
}
```
> Fournir soit `post_id` soit `comment_id`.

**Réponse `201` (like) / `200` (unlike) :**
```json
{
  "message": "Liked",
  "liked": true
}
```

---

## V. Forum

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET | `/forum/topics` | Non | Liste des topics |
| GET | `/forum/topics/{id}` | Non | Détail d'un topic |
| POST | `/forum/topics` | Oui | Créer un topic |
| DELETE | `/forum/topics/{id}` | Oui | Supprimer son topic |
| POST | `/forum/topics/{id}/reply` | Oui | Répondre à un topic |
| POST | `/forum/topics/{id}/vote` | Oui | Voter sur un topic *(non implémenté)* |
| POST | `/forum/replies/{id}/vote` | Oui | Voter sur une réponse *(non implémenté)* |

### GET `/forum/topics` — Query params optionnels
| Param | Type | Description |
|-------|------|-------------|
| `category` | string | `general` / `anime` / `manga` / `recommendations` / `spoilers` |
| `user_id` | integer | Filtrer par créateur |
| `anime_id` | integer | Filtrer par anime |
| `manga_id` | integer | Filtrer par manga |
| `is_pinned` | boolean | Filtrer les topics épinglés |
| `is_locked` | boolean | Filtrer les topics verrouillés |
| `sort` | string | `oldest` / `most_replied` (défaut : latest, épinglés en premier) |
| `page` | integer | Pagination (20 items/page) |

**Réponse `200` :**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 10,
      "user_id": 1,
      "title": "Meilleur arc de One Piece ?",
      "content": "Pour moi c'est Marineford...",
      "category": "anime",
      "related_anime_id": 21,
      "related_manga_id": null,
      "is_pinned": false,
      "is_locked": false,
      "replies_count": 12,
      "user": {
        "id": 1,
        "username": "SakuraMoe",
        "avatar_url": "https://cdn.example.com/avatars/1.jpg"
      },
      "created_at": "2026-01-20T14:00:00.000000Z",
      "updated_at": "2026-01-20T14:00:00.000000Z"
    }
  ],
  "per_page": 20,
  "total": 45
}
```

### GET `/forum/topics/{id}`

**Réponse `200` :**
```json
{
  "id": 10,
  "user_id": 1,
  "title": "Meilleur arc de One Piece ?",
  "content": "Pour moi c'est Marineford...",
  "category": "anime",
  "related_anime_id": 21,
  "related_manga_id": null,
  "is_pinned": false,
  "is_locked": false,
  "user": {
    "id": 1,
    "username": "SakuraMoe",
    "avatar_url": "https://cdn.example.com/avatars/1.jpg"
  },
  "replies": [
    {
      "id": 55,
      "topic_id": 10,
      "user_id": 2,
      "parent_id": null,
      "content": "Enies Lobby pour moi !",
      "user": { "id": 2, "username": "NarutoBro", "avatar_url": null },
      "created_at": "2026-01-20T15:00:00.000000Z",
      "updated_at": "2026-01-20T15:00:00.000000Z"
    }
  ],
  "created_at": "2026-01-20T14:00:00.000000Z",
  "updated_at": "2026-01-20T14:00:00.000000Z"
}
```

### POST `/forum/topics`
```json
{
  "title": "string (required, max 255)",
  "content": "string (required)",
  "category": "general | anime | manga | recommendations | spoilers (required)",
  "related_anime_id": "integer (optional)",
  "related_manga_id": "integer (optional)"
}
```

**Réponse `201` :**
```json
{
  "id": 11,
  "user_id": 1,
  "title": "Nouveau topic",
  "content": "Contenu du topic...",
  "category": "general",
  "related_anime_id": null,
  "related_manga_id": null,
  "is_pinned": false,
  "is_locked": false,
  "created_at": "2026-01-21T10:00:00.000000Z",
  "updated_at": "2026-01-21T10:00:00.000000Z"
}
```

### DELETE `/forum/topics/{id}`

**Réponse `200` :**
```json
{
  "message": "Topic deleted"
}
```

> Renvoie `403 Forbidden` si l'utilisateur n'est pas le créateur.

### POST `/forum/topics/{id}/reply`
```json
{
  "content": "string (required)",
  "parent_id": "integer (optional, pour réponse imbriquée)"
}
```

> Renvoie `403` si le topic est verrouillé (`is_locked: true`).

**Réponse `201` :**
```json
{
  "id": 56,
  "topic_id": 10,
  "user_id": 1,
  "parent_id": null,
  "content": "Ma réponse au topic.",
  "created_at": "2026-01-21T10:30:00.000000Z",
  "updated_at": "2026-01-21T10:30:00.000000Z"
}
```

---

## VI. Amis

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET | `/friends` | Oui | Liste des amis acceptés |
| GET | `/friends/pending` | Oui | Demandes reçues en attente |
| POST | `/friends/send` | Oui | Envoyer une demande d'ami |
| PATCH | `/friends/{id}/accept` | Oui | Accepter une demande |
| DELETE | `/friends/{id}/decline` | Oui | Refuser une demande |
| PATCH | `/friends/{id}/block` | Oui | Bloquer un utilisateur |
| DELETE | `/friends/{id}/remove` | Oui | Supprimer un ami |

> `{id}` = ID de la relation d'amitié (pas l'ID utilisateur).

### GET `/friends`

**Réponse `200` :**
```json
[
  {
    "id": 3,
    "requester_id": 1,
    "addressee_id": 2,
    "status": "accepted",
    "requester": {
      "id": 1,
      "username": "SakuraMoe",
      "avatar_url": "https://cdn.example.com/avatars/1.jpg"
    },
    "addressee": {
      "id": 2,
      "username": "NarutoBro",
      "avatar_url": null
    },
    "created_at": "2026-01-12T10:00:00.000000Z",
    "updated_at": "2026-01-12T10:00:00.000000Z"
  }
]
```

### GET `/friends/pending`

**Réponse `200` :** liste des demandes en attente (status `pending`) reçues par l'utilisateur connecté, même format que `/friends`.

### POST `/friends/send`
```json
{
  "addressee_id": "integer (required, ID de l'utilisateur cible)"
}
```

**Réponse `201` :**
```json
{
  "id": 4,
  "requester_id": 1,
  "addressee_id": 5,
  "status": "pending",
  "created_at": "2026-01-21T11:00:00.000000Z",
  "updated_at": "2026-01-21T11:00:00.000000Z"
}
```

### PATCH `/friends/{id}/accept`

**Réponse `200` :**
```json
{
  "message": "Friend request accepted"
}
```

### DELETE `/friends/{id}/decline`

**Réponse `200` :**
```json
{
  "message": "Friend request declined"
}
```

### PATCH `/friends/{id}/block`

**Réponse `200` :**
```json
{
  "message": "User blocked"
}
```

### DELETE `/friends/{id}/remove`

**Réponse `200` :**
```json
{
  "message": "Friend removed"
}
```

---

## VII. Bibliothèque

### Anime

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET | `/library/anime` | Oui | Ma liste anime |
| POST | `/library/anime` | Oui | Ajouter un anime |
| PATCH | `/library/anime/{anime_id}` | Oui | Modifier une entrée |
| DELETE | `/library/anime/{anime_id}` | Oui | Supprimer une entrée |

### Manga

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET | `/library/manga` | Oui | Ma liste manga |
| POST | `/library/manga` | Oui | Ajouter un manga |
| PATCH | `/library/manga/{manga_id}` | Oui | Modifier une entrée |
| DELETE | `/library/manga/{manga_id}` | Oui | Supprimer une entrée |

### GET `/library/anime` ou `/library/manga` — Query params
| Param | Type | Description |
|-------|------|-------------|
| `status` | string | Filtrer par statut |

**Réponse `200` (anime) :**
```json
[
  {
    "user_id": 1,
    "anime_id": 101,
    "status": "watching",
    "progress": 12,
    "rewatch_count": 0,
    "score": 9,
    "is_private": false,
    "created_at": "2026-01-05T08:00:00.000000Z",
    "updated_at": "2026-01-20T18:00:00.000000Z"
  }
]
```

**Réponse `200` (manga) :** même format avec `manga_id` et `reread_count` à la place de `anime_id` et `rewatch_count`.

### POST `/library/anime`
```json
{
  "anime_id": "integer (required)",
  "status": "watching | completed | on_hold | dropped | plan_to_watch (required)",
  "progress": "integer (optional)",
  "rewatch_count": "integer (optional)",
  "score": "integer 1-10 (optional)",
  "is_private": "boolean (optional)"
}
```

**Réponse `201` :** objet de la nouvelle entrée (même format que GET).

### POST `/library/manga`
```json
{
  "manga_id": "integer (required)",
  "status": "reading | completed | on_hold | dropped | plan_to_read (required)",
  "progress": "integer (optional)",
  "reread_count": "integer (optional)",
  "score": "integer 1-10 (optional)",
  "is_private": "boolean (optional)"
}
```

**Réponse `201` :** objet de la nouvelle entrée (même format que GET).

### PATCH `/library/anime/{anime_id}`
```json
{
  "status": "optional",
  "progress": "integer (optional)",
  "score": "integer 1-10 (optional)",
  "rewatch_count": "integer (optional)",
  "is_private": "boolean (optional)"
}
```

**Réponse `200` :** objet mis à jour (même format que GET).

### PATCH `/library/manga/{manga_id}`
```json
{
  "status": "optional",
  "progress": "integer (optional)",
  "score": "integer 1-10 (optional)",
  "reread_count": "integer (optional)",
  "is_private": "boolean (optional)"
}
```

**Réponse `200` :** objet mis à jour (même format que GET).

### DELETE `/library/anime/{anime_id}` ou `/library/manga/{manga_id}`

**Réponse `200` :**
```json
{
  "message": "Removed from library"
}
```

---

## VIII. Notifications

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET | `/notifications` | Oui | Liste des notifications (paginée) |
| GET | `/notifications/unread-count` | Oui | Nombre de notifs non lues |
| PATCH | `/notifications/{id}/read` | Oui | Marquer une notif comme lue |
| PATCH | `/notifications/read-all` | Oui | Tout marquer comme lu |

### GET `/notifications`

**Réponse `200` :**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 99,
      "recipient_id": 1,
      "sender_id": 2,
      "type": "friend_request",
      "is_read": false,
      "payload": {},
      "sender": {
        "id": 2,
        "username": "NarutoBro",
        "avatar_url": null
      },
      "created_at": "2026-01-21T09:00:00.000000Z",
      "updated_at": "2026-01-21T09:00:00.000000Z"
    }
  ],
  "per_page": 20,
  "total": 5
}
```

### GET `/notifications/unread-count`

**Réponse `200` :**
```json
{
  "count": 3
}
```

### PATCH `/notifications/{id}/read`

**Réponse `200` :**
```json
{
  "message": "Notification marked as read"
}
```

### PATCH `/notifications/read-all`

**Réponse `200` :**
```json
{
  "message": "All notifications marked as read"
}
```

---

## Notes générales

- **Pagination** : 20 items/page, paramètre `?page=N`
- **Middleware `user.active`** : toutes les routes authentifiées vérifient que le compte n'est pas désactivé (`is_deleted: false`)
- **Propriété** : les routes PATCH/DELETE sur posts, topics, etc. vérifient que l'utilisateur en est le créateur (sinon `403 Forbidden`)
- **Soft deletes** : les comptes désactivés utilisent un flag `is_deleted` (pas de suppression physique)
- **OpenAPI / Swagger** : disponible à `GET /docs/api` (UI) ou `GET /docs/api.json` (JSON)
