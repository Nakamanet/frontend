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

**Réponse (register & login) :**
```json
{
  "user": { ... },
  "token": "jwt.token.string",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

---

## II. Utilisateurs

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| PATCH | `/users/profile` | Oui | Mettre à jour son profil |
| PUT | `/users/disable/{id}` | Oui | Désactiver son compte |
| GET | `/users/search?q=` | Oui | Rechercher des utilisateurs |
| GET | `/users/{id}/posts` | Oui | Posts d'un utilisateur |
| GET | `/users/{id}/forum-topics` | Oui | Topics forum d'un utilisateur |

### PATCH `/users/profile`
```json
{
  "username": "string (optional)",
  "email": "string (optional)",
  "password": "string (optional)",
  "password_confirmation": "string (optional)",
  "birthdate": "date (optional)",
  "localisation": "string (optional)",
  "bio": "string (optional)",
  "avatar_url": "string (optional)",
  "banner_url": "string (optional)",
  "theme_preference": "light | dark | system (optional)"
}
```

### GET `/users/search`
| Param | Type | Description |
|-------|------|-------------|
| `q` | query | Terme de recherche (min 2 chars) |

**Réponse :** liste `[{ id, username, avatar_url, bio }]`

---

## III. Posts

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET | `/posts` | Non | Liste des posts |
| GET | `/posts/{id}` | Non | Détail d'un post |
| GET | `/posts/{id}/comments` | Non | Commentaires d'un post |
| POST | `/posts` | Oui | Créer un post |
| PATCH | `/posts/{id}` | Oui | Modifier son post |
| DELETE | `/posts/{id}` | Oui | Supprimer son post |

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

### POST `/posts`
```json
{
  "content": "string (required, max 5000)",
  "is_spoiler": "boolean (optional)",
  "image_urls": ["url1", "url2"] ,
  "related_anime_id": "integer (optional)",
  "related_manga_id": "integer (optional)"
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

**Réponse :**
```json
{
  "message": "Liked | Unliked",
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
| POST | `/forum/topics/{id}/vote` | Oui | Voter sur un topic |
| POST | `/forum/replies/{id}/vote` | Oui | Voter sur une réponse |

### GET `/forum/topics` — Query params optionnels
| Param | Type | Description |
|-------|------|-------------|
| `category` | string | `general` / `anime` / `manga` / `recommendations` / `spoilers` |
| `user_id` | integer | Filtrer par créateur |
| `anime_id` | integer | Filtrer par anime |
| `manga_id` | integer | Filtrer par manga |
| `is_pinned` | boolean | Filtrer les topics épinglés |
| `is_locked` | boolean | Filtrer les topics verrouillés |
| `sort` | string | `oldest` / `most_replied` (défaut : latest) |
| `page` | integer | Pagination (20 items/page) |

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

### POST `/forum/topics/{id}/reply`
```json
{
  "content": "string (required)",
  "parent_id": "integer (optional, pour réponse imbriquée)"
}
```
> Échoue si le topic est verrouillé (`is_locked: true`).

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

### POST `/friends/send`
```json
{
  "addressee_id": "integer (required, ID de l'utilisateur cible)"
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

---

## VIII. Notifications

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET | `/notifications` | Oui | Liste des notifications (paginée) |
| GET | `/notifications/unread-count` | Oui | Nombre de notifs non lues |
| PATCH | `/notifications/{id}/read` | Oui | Marquer une notif comme lue |
| PATCH | `/notifications/read-all` | Oui | Tout marquer comme lu |

---

## Notes générales

- **Pagination** : 20 items/page, paramètre `?page=N`
- **Propriété** : les routes PATCH/DELETE sur posts, topics, etc. vérifient que l'utilisateur en est le créateur (sinon `403 Forbidden`)
- **Soft deletes** : les comptes désactivés utilisent un soft delete
- **OpenAPI / Swagger** : disponible à `GET /docs/api` (UI) ou `GET /docs/api.json` (JSON)
