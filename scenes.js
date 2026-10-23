// Le contenu de chaque scène est regroupé ici pour qu'il soit facile à modifier.
// wrongAnswers contient les numéros des choix qui ouvrent le popup de reprise.
const scenes = {
  1: {
    title: 'Le plan change',
    chapter: 'SCÈNE 01 · LE RENDEZ-VOUS',
    openingLine: 'Est-ce qu’on peut se retrouver à Châtelet stp ?',
    question: 'Que répond Anja ?',
    answers: [
      'J’aime pas Châtelet, je croise souvent des gens que je connais. Et puis c’est trop loin, je suis fatiguée.',
      'D’accord, je te rejoins à Châtelet.',
    ],
    wrongAnswers: [1],
    nextPage: 'scene2.html',
  },

  2: {
    title: 'On se retrouve',
    chapter: 'SCÈNE 02 · À CHÂTELET',
    openingLine: 'Où es-tu ?',
    miniGame: 'findAnja',
    successAnswer: 'Je suis entre la mairie et l’église.',
    response: 'Oh wow ! Jolie casquette ry olo tiko ann.',
    nextPage: 'scene3.html',
  },

  3: {
    title: 'Faire les courses',
    chapter: 'SCÈNE 03 · POUR NOTRE SOIRÉE',
    openingLine: 'Bon, on va chercher à manger pour notre petite soirée.',
    miniGame: 'shopping',
    nextPage: 'scene4.html',
  },

  4: {
    title: 'Trouver une place sur l’escalier',
    chapter: 'SCÈNE 04 · UN PETIT COIN À NOUS',
    openingLine: 'Maintenant, il faut trouver une place sur l’escalier.',
    question: 'Où est-ce qu’on s’installe ?',
    answers: [
      'On s’assoit ici !',
      'Continuons à chercher, il y a trop de monde.',
      'Viens, on s’installe sur ces marches.',
    ],
    nextPage: 'scene5.html',
  },

  5: {
    title: 'Trouver un endroit où manger',
    chapter: 'SCÈNE 05 · ON CHERCHE UN ENDROIT',
    openingLine: 'Bon, maintenant, trouvons un endroit où manger.',
    question: 'Où est-ce qu’on se pose ?',
    answers: [
      'Pizza',
      'Rramen',
      'Tiens, un pita. Ca a l’air bon !',
    ],
    nextPage: 'scene6.html',
  },

  6: {
    title: 'Prendre des vélos',
    chapter: 'SCÈNE 06 · EN ROUTE',
    openingLine: 'Et si on prenait des vélos ?',
    miniGame: 'bicycle',
    nextPage: 'scene7.html',
  },

  7: {
    title: 'Se faire des câlins dans le parc',
    chapter: 'SCÈNE 07 · TOUT CONTRE TOI',
    openingLine: 'Maintenant, direction le parc.',
    question: 'Qu’est-ce qu’on fait ?',
    answers: [
      'On s’assoit quelque part et on profite du calme.',
      'Je veux faire un tour du parc d’abord.',
      'Viens, j’ai envie de te faire un câlin.',
    ],
    response: 'Ry olo tiko ann, viens là.',
    followUpQuestion: 'Et Anja répond…',
    followUpAnswers: [
      'Un gros câlin.',
      'Encore un câlin.',
      'Je ne te lâche plus. ❤️',
    ],
    ending: 'Tu sais, je me sens comme ça en amour pour la deuxième fois de ma vie. La première fois, j’avais 13 ans. Je ne pensais pas que ça allait encore m’arriver. 💜',
  },
};
