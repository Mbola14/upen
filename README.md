# Upen

Site vitrine statique pour une activité de développement et d’intégration Zoho freelance. Il comprend une page d’accueil et des pages dédiées aux intégrations API, à la personnalisation et à la reprise technique Zoho. Le site utilise HTML, CSS et JavaScript natifs, sans installation ni backend.

## Lancer le site

Ouvrez `index.html` directement dans un navigateur. Les cartes de la section projets mènent vers `integration-api.html`, `personnalisation-zoho.html` et `reprise-zoho.html`. Pour travailler avec un serveur local, utilisez l’extension Live Server de votre éditeur ou n’importe quel serveur de fichiers statiques.

## Personnaliser

- **Services, exemples de projets et étapes de travail :** tableaux `services`, `projects` et `steps` dans `script.js`.
- **Textes de présentation, navigation et formulaire de la page d’accueil :** `index.html`.
- **Contenu de la page intégrations API :** `integration-api.html`.
- **Contenu de la page personnalisation Zoho :** `personnalisation-zoho.html`.
- **Contenu de la page reprise technique Zoho :** `reprise-zoho.html`.
- **Palette des modes jour et nuit :** variables dans `theme.css`.
- **Interrupteur jour/nuit et mémorisation du choix :** `theme.js`.
- **Typographie et mise en page responsive :** variables en haut de `styles.css`, puis les règles de styles associées.
- **Styles propres à la page intégrations API :** `integration.css`.
- **Photo affichée sur le site :** `portrait.webp` (version optimisée). L’original `portrait.png` est conservé comme source.

Les trois cartes de la page d’accueil présentent des domaines d’intervention, pas des références client. Leurs intitulés, descriptions et liens se modifient dans le tableau `projects` de `script.js`.

## Référencement

Chaque page de service possède un titre et une description propres, et les services de la page d’accueil mènent vers leurs pages détaillées. Avant la mise en ligne, renseignez le domaine public pour ajouter les URL canoniques et générer un sitemap XML avec des adresses absolues, puis déclarez ce sitemap dans Google Search Console. Le domaine de publication n’étant pas encore confirmé, aucun domaine n’est inscrit en dur dans ces fichiers.

## Formulaire de contact

Le formulaire envoie les demandes à Web3Forms avec la clé d’accès configurée dans `index.html`. Après un envoi réussi, il redirige vers `merci.html`. Pour recevoir les messages, l’adresse de destination associée à cette clé doit être confirmée dans Web3Forms. Publiez le site sur un hébergement web puis effectuez un envoi réel de vérification ; l’ouverture directe depuis `file://` peut être limitée par le navigateur ou le service.

La police est chargée depuis Google Fonts. Une connexion internet est nécessaire pour l’afficher ; sans elle, le navigateur utilise les polices de remplacement.
