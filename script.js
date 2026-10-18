// Le contenu du site se modifie ici, sans toucher à la mise en page.
const services = [
  { icon: "⌘", title: "Zoho CRM sur mesure", description: "Modules, champs, mises en page et fonctions Deluge adaptés à vos processus métier." },
  { icon: "↗", title: "Intégrations API", description: "Connexion de vos outils via API REST, OAuth et webhooks, avec des échanges de données fiables." },
  { icon: "◷", title: "Automatisations", description: "Des tâches répétitives prises en charge par des scénarios utiles et maintenables." },
  { icon: "▤", title: "Zoho Books", description: "Personnalisation et automatisation de la facturation, reliées à vos outils existants." },
];

const projects = [
  { type: "Zoho CRM · Démonstration", index: "01", title: "Un CRM qui suit le bon rythme", description: "Un exemple de personnalisation du pipeline, des modules et des automatisations pour mieux refléter les étapes de vente d’une équipe.", tags: ["Zoho CRM", "Deluge", "Automatisation"] },
  { type: "Intégration · Démonstration", index: "02", title: "Les outils qui se répondent", description: "Un exemple de connexion entre Zoho CRM et une application tierce via API, OAuth et webhooks.", tags: ["API REST", "OAuth", "Webhooks"] },
  { type: "Zoho Books · Démonstration", index: "03", title: "Une facturation plus fluide", description: "Un exemple d’automatisation du parcours de facturation entre CRM et Zoho Books, selon les règles de l’entreprise.", tags: ["Zoho Books", "Deluge", "Facturation"] },
];

const steps = [
  { title: "On fait le point", description: "Vous me décrivez votre contexte, vos outils et le résultat attendu. On cadre ensemble le besoin." },
  { title: "Je propose une solution", description: "Je définis une approche technique claire, le périmètre et les étapes de réalisation." },
  { title: "Je développe et j’intègre", description: "Je construis la solution et la teste dans votre environnement, en gardant votre équipe au courant." },
  { title: "On livre, vous prenez la main", description: "Vous recevez un résultat documenté et les éléments nécessaires pour le faire évoluer." },
];

const serviceList = document.querySelector("#service-list");
const projectList = document.querySelector("#project-list");
const stepList = document.querySelector("#step-list");

for (const service of services) {
  const card = document.createElement("article");
  card.className = "service-card";
  card.innerHTML = `<span class="service-icon" aria-hidden="true">${service.icon}</span><h3>${service.title}</h3><p>${service.description}</p>`;
  serviceList.append(card);
}

for (const project of projects) {
  const card = document.createElement("article");
  card.className = "project-card";
  const tags = project.tags.map((tag) => `<span>${tag}</span>`).join("");
  card.innerHTML = `<div class="project-type"><span class="project-badge">${project.type}</span><span class="project-index">${project.index}</span></div><h3>${project.title}</h3><p>${project.description}</p><div class="project-tags">${tags}</div>`;
  projectList.append(card);
}

for (const [index, step] of steps.entries()) {
  const item = document.createElement("li");
  item.className = "step-item";
  item.innerHTML = `<span class="step-number">0${index + 1}</span><div><h3>${step.title}</h3><p>${step.description}</p></div>`;
  stepList.append(item);
}

document.querySelector("#year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Ouvrir le menu" : "Fermer le menu");
  navigation.classList.toggle("is-open", !expanded);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    navigation.classList.remove("is-open");
  }
});

// La démo valide les champs mais n'envoie aucune donnée à un serveur.
document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#form-feedback").textContent = "Merci, le formulaire est prêt. Connectez-le à un service d’envoi pour recevoir les demandes.";
});
