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

### Installation Classique

#### Prérequis
- Node.js >= 16.0.0
- MongoDB >= 4.4
- Git

#### Installation
1. Cloner le repository
2. Installer les dépendances pour chaque service :
   ```bash
   cd auth-service && npm install
   cd ../books-service && npm install
   cd ../lending-service && npm install
   cd ../api-gateway && npm install
   cd ../frontend && npm install
   ```

#### Configuration
Créer les fichiers `.env` dans chaque service selon les exemples fournis.

#### Lancement
Ouvrir 5 terminaux et lancer :
```bash
# Terminal 1
cd auth-service && npm run dev

# Terminal 2  
cd books-service && npm run dev

# Terminal 3
cd lending-service && npm run dev

# Terminal 4
cd api-gateway && npm run dev

# Terminal 5
cd frontend && npm run dev
```

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
- ✅ **Health checks** et monitoring
- ✅ **API Gateway** avec proxy
- ✅ **Documentation technique** complète

---