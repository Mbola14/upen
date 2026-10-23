(() => {
  const card = document.querySelector('.gift-card');
  const giftBox = document.querySelector('#giftBox');
  const knot = document.querySelector('#giftKnot');
  const instruction = document.querySelector('#giftInstruction');
  const message = document.querySelector('#giftMessage');
  const continueLink = document.querySelector('.gift-continue');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  knot.addEventListener('click', () => {
    if (giftBox.classList.contains('is-open')) return;

    giftBox.classList.add('is-open');
    card.classList.add('is-open');
    knot.setAttribute('aria-expanded', 'true');
    knot.disabled = true;
    instruction.textContent = 'Une petite lettre rien que pour toi…';

    window.setTimeout(() => {
      message.hidden = false;
      window.requestAnimationFrame(() => {
        message.classList.add('is-visible');
        message.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
        continueLink.focus({ preventScroll: true });
      });
    }, prefersReducedMotion ? 0 : 850);
  });
})();
