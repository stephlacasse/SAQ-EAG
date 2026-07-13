# Frontend

Le frontend de cette application est créé avec [Vite React](https://vite.dev/), une librairie pour le développement d'applications frontend réactives.

Pour exécuter le frontend en local, il faut exécuter les commandes suivantes :

### Installer les dépendances de développement et de build
```
npm install
```

### Démarrer une instance de développement locale
```
npm run dev
```

# Backend

Le backend déploie une API à l'aide de Terraform.

L'API dispose de 3 endpoints :

- **/centre** : permet de récupérer les informations sur un centre de contact. Cela inclut la récupération des dates de férié et des messages d'urgence.
- **/ferie** : permet d'effectuer les opérations de création et de suppression sur les dates de férié.
- **/message** : permet d'effectuer les opérations de création, suppression et basculement (*toggle*) sur les messages d'urgence.

# Hosting

Le site est hébergé dans un bucket S3.
Le bucket est déployé avec le Terraform du backend.

# Build

Cette commande va packager l'application dans un build qui peut être déployé sur le bucket S3 :
```
npm run build -- --mode csa-dev 
npm run build -- --mode csa-prod 
npm run build -- --mode csa-test
npm run build -- --mode resto-dev

```
Une fois la commande exécutée, vous aurez un nouveau dossier `dist`. Il faut prendre l'ensemble du **contenu** de ce dossier et le placer dans le bucket S3.

De plus, il faut uploader le fichier de configuration `callCenters.json` à la racine du bucket.