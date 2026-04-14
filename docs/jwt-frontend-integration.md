# JWT Authentication — Guide d'intégration frontend

## Sommaire

1. [Vue d'ensemble](#vue-densemble)
2. [Endpoints d'authentification](#endpoints-dauthentification)
3. [Détail des requêtes](#détail-des-requêtes)
4. [Envoyer le token](#envoyer-le-token)
5. [Gestion du cycle de vie du token](#gestion-du-cycle-de-vie-du-token)
6. [Routes protégées](#routes-protégées)
7. [Gestion des erreurs](#gestion-des-erreurs)
8. [Exemples d'implémentation](#exemples-dimplémentation)

---

## Vue d'ensemble

L'API utilise une authentification **JWT (JSON Web Token)** stateless via la librairie `php-open-source-saver/jwt-auth`.

- Aucune session côté serveur — le token est la seule preuve d'identité
- Le token est valide **1 heure**
- Il peut être renouvelé sans re-connexion pendant **2 semaines**
- Après un logout, le token est blacklisté immédiatement et ne peut plus être réutilisé

**Base URL :** `http://<host>/api`

---

## Endpoints d'authentification

| Méthode | Endpoint | Auth requise | Description |
|--------|----------|:------------:|-------------|
| `POST` | `/auth/register` | Non | Inscription |
| `POST` | `/auth/login` | Non | Connexion |
| `POST` | `/auth/logout` | Oui | Déconnexion + blacklist du token |
| `POST` | `/auth/refresh` | Oui | Renouvellement du token |
| `GET` | `/auth/me` | Oui | Utilisateur actuellement connecté |

---

## Détail des requêtes

### Inscription — `POST /auth/register`

**Body (JSON) :**

| Champ | Type | Requis | Description |
|-------|------|:------:|-------------|
| `username` | string | Oui | Nom d'utilisateur unique |
| `email` | string | Oui | Adresse email unique |
| `password` | string | Oui | Minimum 8 caractères |
| `password_confirmation` | string | Oui | Doit correspondre à `password` |
| `birthdate` | string | Oui | Format `YYYY-MM-DD` |
| `localisation` | string | Non | Ville ou région |

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "motdepasse123",
  "password_confirmation": "motdepasse123",
  "birthdate": "1998-06-15",
  "localisation": "Paris"
}
```

**Réponse `201 Created` :**

```json
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "birthdate": "1998-06-15",
    "localisation": "Paris",
    "bio": null,
    "avatar_url": null,
    "banner_url": null,
    "role": "user",
    "created_at": "2026-04-14T10:00:00.000000Z",
    "updated_at": "2026-04-14T10:00:00.000000Z"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

---

### Connexion — `POST /auth/login`

**Body (JSON) :**

```json
{
  "email": "john@example.com",
  "password": "motdepasse123"
}
```

**Réponse `200 OK` :**

```json
{
  "user": { ... },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

---

### Déconnexion — `POST /auth/logout`

Aucun body requis. Le token courant est immédiatement blacklisté côté serveur.

**Réponse `200 OK` :**

```json
{
  "message": "Successfully logged out"
}
```

---

### Renouvellement du token — `POST /auth/refresh`

Aucun body requis. Retourne un nouveau token.

> Le token doit être encore dans sa fenêtre de refresh (2 semaines depuis l'émission initiale).

**Réponse `200 OK` :**

```json
{
  "user": { ... },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

---

### Utilisateur connecté — `GET /auth/me`

**Réponse `200 OK` :**

```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  ...
}
```

---

## Envoyer le token

Toutes les routes protégées nécessitent un header `Authorization` avec le token au format **Bearer**.

```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

> Attention à bien inclure l'espace entre `Bearer` et le token.

---

## Gestion du cycle de vie du token

### Schéma général

```
[Login / Register]
       |
       v
  Stocker token
  + timestamp d'expiration (Date.now() + expires_in * 1000)
       |
       v
[Requête protégée]
       |
  Token expiré ?
  /           \
Oui           Non
 |             |
 v             v
POST        Injecter
/auth/       Authorization
refresh      header
 |
 v
Succès ? -- Non --> Rediriger vers /login + vider le storage
 |
Oui
 |
 v
Mettre à jour le token stocké
+ nouveau timestamp d'expiration
```

### Ce qu'il faut stocker après login/register

```
token        → la valeur du champ "token"
expires_at   → Date.now() + (expires_in * 1000)
user         → l'objet utilisateur (optionnel, pour l'UI)
```

### Où stocker le token

| Mécanisme | Avantages | Inconvénients |
|-----------|-----------|---------------|
| `localStorage` | Persistant entre onglets | Accessible via JS (risque XSS) |
| `sessionStorage` | Isolé par onglet | Perdu à la fermeture |
| Cookie `HttpOnly` | Inaccessible via JS | Nécessite config CORS/CSRF côté API |

Pour une SPA classique sans SSR, `localStorage` est la solution la plus simple.

---

## Routes protégées

Les groupes de routes suivants nécessitent un token valide :

| Préfixe | Accès |
|---------|-------|
| `/auth/logout` | Token requis |
| `/auth/refresh` | Token requis |
| `/auth/me` | Token requis |
| `/users/*` | Token requis |
| `/posts` (POST, PUT, DELETE) | Token requis |
| `/likes/*` | Token requis |
| `/forum` (POST, PUT, DELETE) | Token requis |
| `/friends/*` | Token requis |
| `/library/*` | Token requis |

> La lecture des posts et topics de forum est publique (pas de token requis).

---

## Gestion des erreurs

| Code HTTP | Signification | Action recommandée |
|-----------|--------------|-------------------|
| `401 Unauthorized` | Token absent, invalide ou expiré | Tenter un refresh, sinon rediriger vers /login |
| `403 Forbidden` | Authentifié mais pas autorisé pour cette ressource | Afficher une erreur à l'utilisateur |
| `422 Unprocessable Entity` | Erreur de validation (champs manquants/invalides) | Afficher les erreurs retournées dans `errors` |

**Format d'erreur de validation (`422`) :**

```json
{
  "message": "The email field is required.",
  "errors": {
    "email": ["The email field is required."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

---

## Exemples d'implémentation

### Avec `fetch` natif

```javascript
// auth.js

const API_URL = 'http://localhost/api';

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw await res.json();

  const data = await res.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('expires_at', Date.now() + data.expires_in * 1000);
  return data.user;
}

export async function logout() {
  await authFetch(`${API_URL}/auth/logout`, { method: 'POST' });
  localStorage.removeItem('token');
  localStorage.removeItem('expires_at');
}

export async function refreshToken() {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    throw new Error('Session expirée');
  }

  const data = await res.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('expires_at', Date.now() + data.expires_in * 1000);
  return data.token;
}

// Wrapper fetch qui gère automatiquement le refresh sur 401
export async function authFetch(url, options = {}) {
  const token = localStorage.getItem('token');

  const res = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (res.status === 401) {
    try {
      const newToken = await refreshToken();
      // Retenter la requête avec le nouveau token
      return fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${newToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
    } catch {
      window.location.href = '/login';
    }
  }

  return res;
}
```

---

### Avec `axios`

```javascript
// api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/api',
  headers: { 'Accept': 'application/json' },
});

// Injecter le token à chaque requête
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Gérer les 401 : refresh automatique
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token));
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await api.post('/auth/refresh');
        localStorage.setItem('token', data.token);
        localStorage.setItem('expires_at', Date.now() + data.expires_in * 1000);
        api.defaults.headers.Authorization = `Bearer ${data.token}`;
        processQueue(null, data.token);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
```

**Usage :**

```javascript
import api from './api';

// Login
const { data } = await api.post('/auth/login', { email, password });
localStorage.setItem('token', data.token);

// Requête protégée (token injecté automatiquement)
const { data: user } = await api.get('/auth/me');

// Logout
await api.post('/auth/logout');
localStorage.removeItem('token');
```
