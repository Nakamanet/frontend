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
