# 🚀 CI/CD Pipeline avec GitHub Actions et AWS Elastic Beanstalk

## 📋 Introduction

Ce projet implémente un pipeline CI/CD pour déployer automatiquement une application Node.js sur AWS Elastic Beanstalk à partir de GitHub. Il s'agit d'un projet personnel démontrant mes compétences en intégration continue et en déploiement continu (CI/CD).

## 🎯 Objectifs du projet

- Automatisation des tests et déploiement continu d'une application Node.js.
- Utilisation de GitHub Actions pour orchestrer l'intégration continue.
- Déploiement automatique sur AWS Elastic Beanstalk à chaque mise à jour sur la branche principale.

## 🛠️ Technologies Utilisées

- **AWS Elastic Beanstalk** : Pour le déploiement de l'application.
- **GitHub Actions** : Pour la gestion du pipeline CI/CD.
- **Node.js** : Pour le développement de l'application.
- **AWS CLI** : Pour les interactions avec les services AWS.

## 📦 Structure du Projet

```bash
/mon-projet
  ├── .github/
  │   └── workflows/
  │       └── ci-cd.yml  # Fichier de configuration pour GitHub Actions
  ├── app/
  │   └── ...            # Code source de l'application Node.js
  ├── Dockerfile         # Optionnel, pour déploiement avec Docker
  └── README.md          # Ce fichier
```

## 🏗️ Prérequis

Avant de commencer, assurez-vous d'avoir :

1. Un **compte AWS** avec Elastic Beanstalk configuré.
2. **AWS CLI** installé et configuré.
3. Un **dépôt GitHub** pour héberger votre code.
4. **GitHub Actions** activé dans votre dépôt.

### 1. Configuration de l'environnement Elastic Beanstalk

#### Créer un environnement Elastic Beanstalk

1. Accédez à **Elastic Beanstalk** depuis la console AWS.
2. Créez une nouvelle application avec la plateforme **Node.js**.
3. Suivez les étapes pour créer l'environnement et prenez note du nom de l'application et de l'environnement.

### 2. Configuration du workflow GitHub Actions

Créez un fichier `ci-cd.yml` dans le répertoire `.github/workflows/` de votre dépôt :

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test

    - name: Deploy to Elastic Beanstalk
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: 'us-east-1'  # Remplacez par votre région AWS
        EB_ENV: 'mon-environnement'  # Remplacez par votre environnement Elastic Beanstalk
      run: |
        zip -r my-app.zip .
        aws elasticbeanstalk create-application-version --application-name "mon-app" --version-label "v${{ github.run_number }}" --source-bundle S3Bucket=my-bucket,S3Key=my-app.zip
        aws elasticbeanstalk update-environment --environment-name $EB_ENV --version-label "v${{ github.run_number }}"
```
## 📸 Captures d'écran

1. Workflow GitHub Actions
2. Déploiement réussi sur AWS Elastic Beanstalk

## 📚 Références

- [Documentation AWS Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
