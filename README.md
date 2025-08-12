# 📚 LiGest2 – Système de Gestion de Bibliothèque en Ligne

Application web moderne permettant aux utilisateurs de consulter, emprunter et rendre des livres dans une bibliothèque en ligne, avec une interface d'administration complète.

## 🏗️ Architecture 3-tiers & Microservices

### Schéma Architectural

```
┌────────────────────────────────────────────────────────────────┐
│                    COUCHE PRÉSENTATION                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Frontend React (Vite)                      │   │
│  │  • Interface utilisateur moderne (Tailwind CSS)         │   │
│  │  • Gestion d'état avec Context API                      │   │ 
│  │  • Design responsive                                    │   │
│  │  • Authentification par cookies HTTP-Only               │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
                                │
                         API REST (HTTP/CORS)
                                │
┌─────────────────────────────────────────────────────────────────┐
│                     COUCHE MÉTIER                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Auth Service   │  │  Books Service  │  │ Lending Service │  │
│  │   Port: 5000    │  │   Port: 5001    │  │   Port: 5002    │  │
│  │                 │  │                 │  │                 │  │
│  │ • JWT Tokens    │  │ • CRUD Livres   │  │ • Emprunts      │  │
│  │ • Rôles (Admin) │  │ • Recherche     │  │ • Retours       │  │
│  │ • Middleware    │  │                 │  │                 │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                │
                          MongoDB Driver (Mongoose)
                                │
┌─────────────────────────────────────────────────────────────────┐
│                    COUCHE DONNÉES                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   libgest       │  │   libgest       │  │  libgest        │  │
│  │                 │  │                 │  │                 │  │
│  │ • users         │  │ • books         │  │ • lendings      │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                        MongoDB                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔧 Structure du Projet

```
LiGest2/
├── auth-service/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── app.js
│   ├── auth.middleware.js
│   ├── package.json
│   ├── user.controller.js
│   ├── user.model.js
│   └── user.route.js
│
├── books-service/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── app.js
│   ├── book.controller.js
│   ├── book.model.js
│   ├── book.route.js
│   ├── middleware.js
│   └── package.json
│
├── lending-service/
│   ├── .env
│   ├── .gitignore
│   ├── app.js
│   ├── lending.controller.js
│   ├── lending.model.js
│   ├── lending.route.js
│   ├── middleware.js
│   └── package.json
│
├── frontend/
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── api/
│       │   ├── api.js
│       │   ├── auth.js
│       │   ├── books.js
│       │   └── lending.js
│       ├── components/
│       │   ├── Button.jsx
│       │   ├── EmptyState.jsx
│       │   ├── Input.jsx
│       │   ├── Layout.jsx
│       │   └── Navbar.jsx
│       ├── pages/
│       │   ├── admin/
│       │   │   ├── AdminBooks.jsx
│       │   │   └── AdminLendings.jsx
│       │   ├── auth/
│       │   │   ├── Login.jsx
│       │   │   └── Register.jsx
│       │   └── user/
│       │       ├── BookDetails.jsx
│       │       ├── BooksList.jsx
│       │       ├── LendingDetails.jsx
│       │       ├── LendingForm.jsx
│       │       └── LendingsList.jsx
│       ├── routes/
│       │   └── router.jsx
│       ├── store/
│       │   ├── AuthSession.jsx
│       │   ├── AutoAuth.jsx
│       │   ├── BookStore.jsx
│       │   └── LendingStore.jsx
│       └── utils/
│           ├── AdminProtected.jsx
│           ├── GuestProtected.jsx
│           └── UserProtected.jsx
└── README.md
```

## 🛠️ Choix Technologiques

### Frontend - React avec Vite
- **React 19.1.1** : Framework JavaScript moderne
- **Vite 4.7.0** : Build tool rapide avec HMR
- **Tailwind CSS 4.1.11** : Framework CSS utility-first
- **Lucide React** : Bibliothèque d'icônes
- **React Router DOM** : Gestion des routes

### Backend - Node.js avec Express.js
- **Express.js 5.1.0** : Framework web minimaliste
- **MongoDB 8.17.1** : Base de données NoSQL
- **Mongoose** : ODM pour MongoDB
- **JWT** : Authentification par tokens
- **bcrypt** : Hachage des mots de passe

## 📡 Endpoints des APIs

### Auth Service (Port 5000)
- `POST /api/auth/register` : Inscription
- `POST /api/auth/login` : Connexion
- `POST /api/auth/logout` : Déconnexion
- `GET /api/auth/me` : Utilisateur connecté

### Books Service (Port 5001)
- `GET /api/books` : Liste des livres
- `GET /api/books/:id` : Détails d'un livre
- `POST /api/books` : Ajouter un livre (Admin)
- `PUT /api/books/:id` : Modifier un livre (Admin)
- `DELETE /api/books/:id` : Supprimer un livre (Admin)

### Lending Service (Port 5002)
- `GET /api/lendings/my` : Emprunts utilisateur
- `GET /api/lendings/` : Tous les emprunts (Admin)
- `GET /api/lendings/:id` : Détails d'un emprunt
- `POST /api/lendings` : Emprunter un livre
- `PUT /api/lendings/:id/return` : Rendre un livre
- `DELETE /api/lendings/:id` : Supprimer un emprunt (Admin)

## 🚀 Instructions d'Installation

### Option 1 : Installation Classique

#### Prérequis (Développement Manuel)
- Node.js >= 16.0.0
- MongoDB >= 4.4
- Git

## 🚀 Déploiement avec Docker (Recommandé)

### Prérequis
- [Docker](https://docs.docker.com/get-docker/) installé et en cours d'exécution
- [Docker Compose](https://docs.docker.com/compose/install/) installé

### Démarrage rapide

#### Windows
```bash
# Exécuter le script de démarrage
.\start.bat
```

#### Linux/macOS
```bash
# Rendre le script exécutable
chmod +x start.sh

# Exécuter le script de démarrage
./start.sh
```

#### Manuellement
```bash
# Construire les images
docker-compose build

# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f
```

### Services disponibles
Une fois démarré, l'application sera accessible sur :
- **Frontend** : http://localhost
- **API Authentication** : http://localhost/api/auth
- **API Livres** : http://localhost/api/books
- **API Emprunts** : http://localhost/api/lending

### Commandes utiles

```bash
# Voir l'état des services
docker-compose ps

# Voir les logs en temps réel
docker-compose logs -f

# Redémarrer un service
docker-compose restart <service-name>

# Arrêter tous les services
docker-compose down

# Arrêter et supprimer les volumes
docker-compose down -v

# Reconstruire un service
docker-compose build <service-name>

# Tester les services
chmod +x test-services.sh && ./test-services.sh
```

### Architecture Docker

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Frontend      │    │   Auth Service  │    │  Books Service  │
│   (React/Vite)  │    │   (Express.js)  │    │   (Express.js)  │
│   Port: 80      │    │   Port: 5000    │    │   Port: 5001    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐    ┌─────────────────┐
                    │                 │    │                 │
                    │ Lending Service │    │    MongoDB      │
                    │  (Express.js)   │    │   (Database)    │
                    │   Port: 5002    │    │   Port: 27017   │
                    │                 │    │                 │
                    └─────────────────┘    └─────────────────┘
```

### Volumes Docker
- `mongodb_data` : Données persistantes de MongoDB
- `nginx_logs` : Logs du reverse proxy Nginx

### Variables d'environnement
Les variables d'environnement sont configurées dans `docker-compose.yml` :
- `MONGODB_URI` : URI de connexion MongoDB
- `JWT_SECRET` : Clé secrète pour les tokens JWT
- `CORS_ORIGIN` : Origine autorisée pour CORS

## 📦 Installation Manuelle (Développement)

#### Installation
1. Cloner le repository
2. Installer les dépendances pour chaque service :
   ```bash
   cd auth-service && npm install
   cd ../books-service && npm install
   cd ../lending-service && npm install
   cd ../frontend && npm install
   ```

#### Configuration
Créer les fichiers `.env` dans chaque service selon les exemples fournis.

#### Lancement
Ouvrir 4 terminaux et lancer :
```bash
# Terminal 1
cd auth-service && npm run dev

# Terminal 2  
cd books-service && npm run dev

# Terminal 3
cd lending-service && npm run dev

# Terminal 4
cd frontend && npm run dev
```

### Option 2 : 🐳 Installation Docker (BONUS)

#### Prérequis
- Docker Engine >= 20.10
- Docker Compose >= 2.0
- 4GB de RAM minimum

#### Démarrage Rapide
```bash
# Cloner le projet
git clone https://github.com/Aurel667/libgest.git
cd LiGest2

# Lancer avec Docker Compose
docker-compose up -d

# Voir les logs
docker-compose logs -f
```

#### Production Docker
```bash
# Configuration
cp .env.docker .env
# Éditer .env avec vos valeurs de production

# Lancement production
docker-compose -f docker-compose.prod.yml up -d
```

#### Services Docker
| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Interface React + Nginx |
| Nginx Proxy | http://localhost:8080 | Reverse proxy (prod) |
| MongoDB | localhost:27017 | Base de données |

**📖 Documentation Docker complète :** [docker/README.md](./docker/README.md)

### Accès à l'Application

#### Mode Développement
- Frontend : http://localhost:5173
- Auth API : http://localhost:5000
- Books API : http://localhost:5001
- Lending API : http://localhost:5002

#### Mode Docker
- Frontend : http://localhost:3000
- Proxy API : http://localhost:8080
- MongoDB : localhost:27017

## 🎯 Fonctionnalités

### Pour les Utilisateurs
- Consulter le catalogue de livres
- Rechercher et filtrer les livres
- Emprunter et rendre des livres
- Suivre ses emprunts en cours

### Pour les Administrateurs
- Gestion complète du catalogue (CRUD livres)
- Suivi de tous les emprunts
- Statistiques et tableaux de bord
- Gestion des utilisateurs

## 🏆 Points Bonus Implémentés

- ✅ **Conteneurisation Docker** complète avec Docker Compose
- ✅ **Architecture microservices** avec 3 services distincts
- ✅ **Interface moderne** avec design system cohérent
- ✅ **Authentification sécurisée** avec JWT et cookies HTTP-Only
- ✅ **Base de données séparées** par microservice
- ✅ **Reverse proxy Nginx** pour la production
- ✅ **Health checks** et monitoring
- ✅ **Documentation technique** complète

---

**Développé pour l'Architecture Logicielle L3**