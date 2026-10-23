(() => {
  const storageKey = "upen-theme";
  const root = document.documentElement;
  const header = document.querySelector(".header-inner");
  if (!header) return;

  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem(storageKey) === "dark" ? "dark" : "light";
  } catch {
    // Le mode jour reste utilisable si le navigateur bloque le stockage local.
  }

  root.dataset.theme = savedTheme;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "theme-switch";
  toggle.setAttribute("aria-pressed", String(savedTheme === "dark"));

  const icon = document.createElement("span");
  icon.className = "theme-switch-icon";
  icon.setAttribute("aria-hidden", "true");
  const label = document.createElement("span");
  label.className = "theme-switch-label";
  toggle.append(icon, label);

  const updateControl = () => {
    const nightMode = root.dataset.theme === "dark";
    toggle.setAttribute("aria-pressed", String(nightMode));
    toggle.setAttribute("aria-label", nightMode ? "Activer le mode jour" : "Activer le mode nuit");
    icon.textContent = nightMode ? "☀" : "☾";
    label.textContent = nightMode ? "Mode jour" : "Mode nuit";
  };

  updateControl();
  header.append(toggle);

  toggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(storageKey, root.dataset.theme);
    } catch {
      // Le choix s’applique à la page courante, même sans stockage local.
    }
    updateControl();
  });
})();
