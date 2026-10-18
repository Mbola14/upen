# Upen

Page vitrine statique pour une activité de développement et d’intégration Zoho freelance. Le site utilise HTML, CSS et JavaScript natifs, sans installation ni backend.

## Lancer le site

Ouvrez `index.html` directement dans un navigateur. Pour travailler avec un serveur local, utilisez l’extension Live Server de votre éditeur ou n’importe quel serveur de fichiers statiques.

## Personnaliser

- **Services, exemples de projets et étapes de travail :** tableaux `services`, `projects` et `steps` dans `script.js`.
- **Textes de présentation, navigation et formulaire :** `index.html`.
- **Couleurs, typographie et mise en page responsive :** variables en haut de `styles.css`, puis les règles de styles associées.

Les trois réalisations présentes sont des contenus de démonstration, pas des références client. Remplacez-les dans `script.js` par des exemples représentatifs de votre expérience.

## Formulaire de contact

Le formulaire vérifie les champs dans le navigateur et affiche une confirmation de démonstration. Il n’envoie pas de message et ne conserve aucune donnée. Pour recevoir les demandes, connectez-le à un service de formulaire (par exemple Formspree ou une fonction serverless) ou ajoutez un backend avec un envoi d’email. Il faudra alors définir la destination, protéger le traitement contre le spam et fournir une politique de confidentialité adaptée.

La police est chargée depuis Google Fonts. Une connexion internet est nécessaire pour l’afficher ; sans elle, le navigateur utilise les polices de remplacement.
