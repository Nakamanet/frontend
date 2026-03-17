# Nakamanet Backend - Documentation API

**Base URL** : `http://localhost:8080/api`

**Authentification** : Bearer Token (Laravel Sanctum)

Pour les routes protégées, ajouter le header :
```
Authorization: Bearer <token>
```

---

## POST `/auth/register`

Créer un nouveau compte utilisateur.

**Auth requise** : Non

### Request Body (JSON)

| Champ      | Type   | Requis | Règles                         |
|------------|--------|--------|--------------------------------|
| username   | string | oui    | max 50 caractères, unique      |
| email      | string | oui    | format email, max 100, unique  |
| password   | string | oui    | min 8 caractères               |
| birthdate  | string | oui    | format date (YYYY-MM-DD)       |

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
    "theme_preference": null,
    "created_at": "2026-02-25T12:00:00.000000Z",
    "updated_at": "2026-02-25T12:00:00.000000Z"
  },
  "token": "1|abc123def456..."
}
```

### Réponse erreur — `422 Unprocessable Entity`

```json
{
  "message": "The username has already been taken. (and 1 more error)",
  "errors": {
    "username": ["The username has already been taken."],
    "email": ["The email has already been taken."]
  }
}
```

---

## POST `/auth/login`

Se connecter avec un compte existant.

**Auth requise** : Non

### Request Body (JSON)

| Champ    | Type   | Requis |
|----------|--------|--------|
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
    "theme_preference": null,
    "created_at": "2026-02-25T12:00:00.000000Z",
    "updated_at": "2026-02-25T12:00:00.000000Z"
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

### Headers

```
Authorization: Bearer <token>
```

### Request Body

Aucun.

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

### Headers

```
Authorization: Bearer <token>
```

### Request Body

Aucun.

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
  "theme_preference": null,
  "created_at": "2026-02-25T12:00:00.000000Z",
  "updated_at": "2026-02-25T12:00:00.000000Z"
}
```

### Réponse erreur — `401 Unauthorized`

```json
{
  "message": "Unauthenticated."
}
```

---

## PATCH `/auth/profile`

Mettre à jour le profil de l'utilisateur connecté. Tous les champs sont optionnels.

**Auth requise** : Oui

### Headers

```
Authorization: Bearer <token>
```

### Request Body (JSON)

| Champ                 | Type   | Requis | Règles                                        |
|-----------------------|--------|--------|-----------------------------------------------|
| username              | string | non    | max 50 caractères, unique                     |
| email                 | string | non    | format email, max 100, unique                 |
| password              | string | non    | min 8 caractères, doit avoir `password_confirmation` |
| password_confirmation | string | non*   | requis si `password` est fourni               |
| birthdate             | string | non    | format date (YYYY-MM-DD)                      |
| localisation          | string | non    | max 100 caractères, nullable                  |
| bio                   | string | non    | max 500 caractères, nullable                  |
| avatar_url            | string | non    | format URL valide, nullable                   |
| banner_url            | string | non    | format URL valide, nullable                   |
| theme_preference      | string | non    | valeur parmi : `light`, `dark`, `system`      |

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
    "theme_preference": "dark",
    "created_at": "2026-02-25T12:00:00.000000Z",
    "updated_at": "2026-03-11T10:00:00.000000Z"
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

### Réponse erreur — `401 Unauthorized`

```json
{
  "message": "Unauthenticated."
}
```

---

## GET `/auth/posts`

Récupérer la liste paginée des posts (fil d'actualité).

**Auth requise** : Non

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
      "created_at": "2026-03-17T10:00:00.000000Z",
      "updated_at": "2026-03-17T10:00:00.000000Z",
      "user": { "id": 1, "username": "naruto_fan", "..." : "..." }
    }
  ],
  "per_page": 20,
  "total": 100,
  "last_page": 5,
  "next_page_url": "http://localhost:8080/api/auth/posts?page=2",
  "prev_page_url": null
}
```

---

## GET `/auth/posts/{id}`

Récupérer un post par son ID, avec ses commentaires.

**Auth requise** : Non

### Paramètres URL

| Paramètre | Type    | Description  |
|-----------|---------|--------------|
| id        | integer | ID du post   |

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
  "created_at": "2026-03-17T10:00:00.000000Z",
  "updated_at": "2026-03-17T10:00:00.000000Z",
  "user": { "id": 1, "username": "naruto_fan", "...": "..." },
  "comments": [
    {
      "id": 1,
      "content": "Totalement d'accord !",
      "user": { "id": 2, "username": "sasuke_fan", "...": "..." }
    }
  ]
}
```

### Réponse erreur — `404 Not Found`

```json
{ "message": "No query results for model [Post] 999" }
```

---

## POST `/auth/posts`

Créer un nouveau post.

**Auth requise** : Oui

### Request Body (JSON)

| Champ             | Type     | Requis | Règles                        |
|-------------------|----------|--------|-------------------------------|
| content           | string   | oui    | max 5000 caractères           |
| related_anime_id  | integer  | non    | nullable                      |
| related_manga_id  | integer  | non    | nullable                      |
| image_urls        | array    | non    | nullable, chaque élément = URL valide |
| is_spoiler        | boolean  | non    | nullable                      |

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
  "created_at": "2026-03-17T10:00:00.000000Z",
  "updated_at": "2026-03-17T10:00:00.000000Z"
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

## PATCH `/auth/posts/{id}`

Modifier un post existant. Seul l'auteur du post peut le modifier.

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description |
|-----------|---------|-------------|
| id        | integer | ID du post  |

### Request Body (JSON)

| Champ      | Type    | Requis | Règles              |
|------------|---------|--------|---------------------|
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
  "created_at": "2026-03-17T10:00:00.000000Z",
  "updated_at": "2026-03-17T10:05:00.000000Z"
}
```

### Réponse erreur — `403 Forbidden`

```json
{ "message": "Forbidden" }
```

### Réponse erreur — `404 Not Found`

```json
{ "message": "No query results for model [Post] 999" }
```

---

## DELETE `/auth/posts/{id}`

Supprimer un post. Seul l'auteur du post peut le supprimer.

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description |
|-----------|---------|-------------|
| id        | integer | ID du post  |

### Réponse succès — `200 OK`

```json
{ "message": "Post deleted" }
```

### Réponse erreur — `403 Forbidden`

```json
{ "message": "Forbidden" }
```

### Réponse erreur — `404 Not Found`

```json
{ "message": "No query results for model [Post] 999" }
```

---

## POST `/auth/likes/toggle`

Liker ou unliker un post ou un commentaire. Si le like existe déjà, il est supprimé (unlike) ; sinon il est créé (like).

**Auth requise** : Oui

### Request Body (JSON)

| Champ      | Type    | Requis | Règles                              |
|------------|---------|--------|-------------------------------------|
| post_id    | integer | non*   | nullable, doit exister en base      |
| comment_id | integer | non*   | nullable, doit exister en base      |

*Au moins un des deux champs est obligatoire.

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

### Réponse erreur — `422 Unprocessable Entity` (aucun champ fourni)

```json
{
  "message": "post_id or comment_id is required"
}
```

### Réponse erreur — `401 Unauthorized`

```json
{
  "message": "Unauthenticated."
}
```

---

## PUT `/auth/disable/{id}`

Désactiver son propre compte (soft delete). Seul l'utilisateur connecté peut désactiver son propre compte.

**Auth requise** : Oui

### Paramètres URL

| Paramètre | Type    | Description         |
|-----------|---------|---------------------|
| id        | integer | ID de l'utilisateur |

### Request Body

Aucun.

### Réponse succès — `200 OK`

```json
{
  "message": "Account disabled",
  "status": 200
}
```

### Réponse erreur — `403 Forbidden`

```json
{ "message": "Forbidden" }
```

### Réponse erreur — `404 Not Found`

```json
{ "message": "No query results for model [User] 999" }
```

---

## Objet User (référence)

Champs retournés dans les réponses (le `password_hash` est toujours masqué) :

| Champ            | Type     | Description                                       |
|------------------|----------|---------------------------------------------------|
| id               | integer  | ID unique                                         |
| username         | string   | Nom d'utilisateur (unique)                        |
| email            | string   | Adresse email (unique)                            |
| birthdate        | string   | Date de naissance (YYYY-MM-DD)                    |
| localisation     | string?  | Localisation (nullable)                           |
| bio              | string?  | Biographie (nullable)                             |
| avatar_url       | string?  | URL de l'avatar (nullable)                        |
| banner_url       | string?  | URL de la bannière (nullable)                     |
| role             | string   | Rôle : `user`, `moderator` ou `admin`             |
| theme_preference | string?  | Préférence de thème (nullable)                    |
| created_at       | datetime | Date de création                                  |
| updated_at       | datetime | Date de dernière modification                     |

---

## Notes pour le front

- Le **token** reçu au login/register doit être stocké (localStorage, cookie, etc.) et envoyé dans le header `Authorization: Bearer <token>` pour toutes les requêtes protégées.
- Un token invalidé (après logout) retournera `401 Unauthenticated` sur les routes protégées.
- Le serveur tourne sur le port **8080** via Docker (`docker compose up -d`).
- Les erreurs de validation retournent toujours un objet `errors` avec les champs concernés.
