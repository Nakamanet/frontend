# Catalogue des routes API — Nakamanet

> Base URL: `http://localhost:3333` (dev local)  
> Toutes les routes retournent du JSON.  
> Rate limit : **10 req/min par IP** sur les routes de contenu.

---

## Documentation

| Méthode | Chemin | Description |
|---------|--------|-------------|
| GET | `/swagger.json` | Spec OpenAPI au format JSON |
| GET | `/docs` | Interface Swagger UI |

---

## Catalog

| Méthode | Chemin | Description | Cache |
|---------|--------|-------------|-------|
| GET | `/genres` | Liste tous les genres | 1h |
| GET | `/categories` | Liste toutes les catégories | 1h |

---

## Anime

| Méthode | Chemin | Description | Cache |
|---------|--------|-------------|-------|
| GET | `/anime` | Liste des animes (pagination, filtre genre) | 5m |
| GET | `/anime/:id` | Détail d'un anime par ID ou slug | 5m |
| GET | `/anime/:id/categories` | Catégories d'un anime | 1h |
| GET | `/anime/:id/genres` | Genres d'un anime | 1h |
| GET | `/anime/:id/episodes` | Épisodes d'un anime (pagination) | 5m |
| GET | `/anime/:id/characters` | Personnages & voice actors d'un anime | 30m |
| GET | `/anime/:id/productions` | Studios de production d'un anime | 30m |
| GET | `/anime/:id/staff` | Staff d'un anime | 30m |

### Query params — `/anime`

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Numéro de page (défaut : 1) |
| `limit` | number | Nombre de résultats par page |
| `genre` | string | Filtrer par genre |

---

## Manga

| Méthode | Chemin | Description | Cache |
|---------|--------|-------------|-------|
| GET | `/manga` | Liste des mangas (pagination, filtre genre) | 5m |
| GET | `/manga/:id` | Détail d'un manga par ID ou slug | 10m |
| GET | `/manga/:id/categories` | Catégories d'un manga | 1h |
| GET | `/manga/:id/genres` | Genres d'un manga | 1h |
| GET | `/manga/:id/chapters` | Chapitres d'un manga (pagination) | 5m |
| GET | `/manga/:id/characters` | Personnages d'un manga | 30m |
| GET | `/manga/:id/staff` | Staff d'un manga | 30m |

### Query params — `/manga`

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Numéro de page (défaut : 1) |
| `limit` | number | Nombre de résultats par page |
| `genre` | string | Filtrer par genre |

---

## Authentification *(à venir — branch `main`)*

> Préfixe : `/api/v1/auth`

| Méthode | Chemin | Description | Auth requise |
|---------|--------|-------------|--------------|
| POST | `/api/v1/auth/signup` | Créer un compte | Non |
| POST | `/api/v1/auth/login` | Se connecter (retourne un token) | Non |
| POST | `/api/v1/auth/logout` | Se déconnecter | Oui |
| GET | `/api/v1/account/profile` | Profil de l'utilisateur connecté | Oui |

---

## Notes

- **`:id`** accepte un identifiant numérique **ou un slug** (ex: `/anime/one-piece`).
- Les routes authentifiées nécessitent un header `Authorization: Bearer <token>`.
- Le rate limiter répond `429 Too Many Requests` si la limite est dépassée.
