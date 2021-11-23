# Groupomania

## But

Créer un réseau social interne pour les employés de Groupomania.  
Le but de cet outil est de faciliter la communication entre collègues.  
Cette application permet de partager des photos et de les commenters.  

## Stack

### Frontend

* AXIOS : 0.24.0
* CORE-JS : 3.6.5
* MYSQL : 2.18.1
* VUE : 2.6.11
* VUE-ROUTER : 3.2.0
* VUEX : 3.4.0

### Backend

* BCRYPT : 5.0.1
* BODY-PARSER : 1.19.0
* CORS : 2.8.5
* DOTENV : 10.0.0
* EXPRESS : 4.17.1
* EXPRESS-BRUTE : 1.0.1
* EXPRESS-RATE-LIMIT : 5.5.0
* FILE-SYSTEM : 2.2.2
* HELMET : 4.6.0
* HELMET-CSP : 3.4.0
* JSONWEBTOKEN : 8.5.1
* MULTER : 1.4.3
* MYSQL : 2.18.1
* MYSQL2 : 2.3.2
* NOCACHE : 3.0.1
* NODE-ESAPI : 0.0.1
* PATH : 0.12.7
* RATE-LIMITER : 0.2.0
* SAVE : 2.4.0
* TOOBUSY-JS : 0.5.1

## Instalation

### Base de donnée

* Enregistrer le fichier `groupomania.sql` qui se trouve dans le dossier backend.
* Démarrer votre client MySQL et connectez-vous.
* Lancer la commande `CREATE DATABASE groupomanie`.
* Quitter votre session avec la commande `exit`.

Pour importer la base données, veiller à écrire le chemin d'accès complet ou placer le directement là où vous lancez votre terminal.

### Environnement

Dans le fichier `.env` entrez vos informations de connexion  
`DB_PORT=` + votre port  
`DB_HOST=` + votre host  
`DB_NAME=` + le nom de votre BDD  
`DB_USER=` + votre nom utilisateur MySQL  
`DB_PASSWORD=` + votre mots de passe MySQL  

### Serveur backend

* Dans le terminal placez-vous sur le dossier backend et installer avec la commande.`npm install`  
* Démarrer le serveur backend avec la commande `node server.js`

### Serveur frontend

* Dans le terminal placez-vous sur le dossier frontend et installer Vue client avec la commande `npm install -g @vue/cli`  
* Installer ensuite le dossier avec `npm install`
* Démarrer le serveur front avec la commande `npm run serve`
  