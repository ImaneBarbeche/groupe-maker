# 🎓 Group-Maker

> Une application pédagogique pour créer des groupes d'élèves équilibrés et dynamiques.

🌐 [Voir la démo en ligne sur GitHub Pages](https://imanebarbeche.github.io/groupe-maker/)

## Maquette Figma (prototype)

https://www.figma.com/proto/8ZRz5OwIZuMulBD7e1YiBf/Group-Maker?node-id=31-553&p=f&t=7jSTQf92kK8qKgnN-1&scaling=contain&content-scaling=fixed&page-id=31%3A334

## 📚 Contexte

Projet fil rouge formation CDA chez Simplon.co (2025).  
Objectif : gérer les inscriptions élèves & formateurs, et générer des groupes équilibrés à partir de critères personnalisés.

## ⚙️ Stack technique

- Angular 19 (standalone components)
- TypeScript
- LocalStorage pour la persistance
- HTML / CSS vanilla
- Tests unitaires (Jasmine / Karma)

## 🚀 Fonctionnalités principales

- ✅ Inscription et connexion multi-utilisateur (élève / formateur)
- ✅ Création automatique de liste lors de l’inscription d’un élève
- ✅ Génération de groupes par répartition aléatoire (avec ou sans mix DWWM)
- ✅ Validation, annulation et historique des tirages
- ✅ Dashboard formateur avec statistiques dynamiques (âge, niveau technique)
- ✅ Suppression de compte & déconnexion propre
- ✅ Affichage dynamique conditionné par le rôle
- ✅ Design doux, épuré, responsive


## 🧪 Tests

- ✅ 48 tests écrits avec Jasmine
- ❌ 1 test de validation de doublon commenté (problème simulé non bloquant)
- ✅ Tous les autres tests passent avec succès

## 📦 Installation & utilisation

```bash
git clone https://gitlab.com/ton-nom-utilisateur/groupe-maker.git
cd groupe-maker
npm install
ng serve
