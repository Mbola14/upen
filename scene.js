// Affiche une scène et gère ses choix. Le texte reste dans scenes.js.
(() => {
  const sceneNumber = Number(document.body.dataset.scene);
  const scene = scenes[sceneNumber];
  if (!scene) return;

  const dialogue = document.querySelector('#dialogue');
  const choices = document.querySelector('#choices');
  const prompt = document.querySelector('#choicePrompt');
  const answerList = document.querySelector('#answerList');
  const retryDialog = document.querySelector('#retryDialog');
  const endingPanel = document.querySelector('#endingPanel');
  const progress = document.querySelector('#progress');
  const progressText = document.querySelector('#progressText');

  document.querySelector('#sceneChapter').textContent = scene.chapter;
  document.querySelector('#sceneTitle').textContent = scene.title;
  document.querySelector('#progressFill').style.width = `${(sceneNumber / 7) * 100}%`;
  progressText.textContent = `Scène ${sceneNumber} sur 7`;
  progress.setAttribute('aria-valuenow', String(sceneNumber));
  addMessage('Mbola', scene.openingLine, 'mbola');

  if (scene.miniGame === 'findAnja') {
    choices.hidden = true;
    document.querySelector('#mapGame').hidden = false;
    startFindAnja();
  } else if (scene.miniGame === 'shopping') {
    choices.hidden = true;
    document.querySelector('#supermarketGame').hidden = false;
    startShoppingGame();
  } else if (scene.miniGame === 'bicycle') {
    choices.hidden = true;
    document.querySelector('#bicycleGame').hidden = false;
    startBicycleGame();
  } else {
    showAnswers(scene.question, scene.answers, chooseAnswer);
  }

  function addMessage(speaker, text, person) {
    const row = document.createElement('div');
    row.className = `message-row ${person}`;

    const avatar = document.createElement('span');
    avatar.className = `avatar avatar-${person}`;
    avatar.setAttribute('aria-hidden', 'true');
    const portrait = document.createElement('img');
    portrait.src = `assets/personnages/${person}.png`;
    portrait.alt = '';
    portrait.className = 'portrait';
    avatar.append(portrait);

    const content = document.createElement('div');
    const label = document.createElement('span');
    label.className = 'speaker';
    label.textContent = speaker;

    const bubble = document.createElement('p');
    bubble.className = 'bubble';
    bubble.textContent = text;

    content.append(label, bubble);
    row.append(avatar, content);
    dialogue.append(row);
    row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function showAnswers(question, answers, onSelect) {
    prompt.textContent = question;
    answerList.replaceChildren();

    answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.className = 'answer-button';
      button.type = 'button';
      button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span class="answer-copy"></span><span class="answer-arrow" aria-hidden="true">↗</span>`;
      button.querySelector('.answer-copy').textContent = answer;
      button.addEventListener('click', () => onSelect(answer, index));
      answerList.append(button);
    });
  }

  function showContinue() {
    answerList.replaceChildren();
    const button = document.createElement('a');
    button.className = 'continue-button';
    button.href = scene.nextPage;
    button.innerHTML = 'Continuer <span aria-hidden="true">→</span>';
    answerList.append(button);
    prompt.textContent = 'Prête pour la suite ?';
  }

  function startFindAnja() {
    const map = document.querySelector('#cityMap');
    const target = document.querySelector('#mapTarget');
    const status = document.querySelector('#mapStatus');
    let misses = 0;
    let found = false;
    const missedLines = [
      'Où es-tu, je ne te trouve pas.',
      'Je suis perdu là.',
      'Chérie, je te cherche partout.',
    ];

    function showMiss() {
      if (found) return;
      addMessage('Enzo', missedLines[misses % missedLines.length], 'mbola');
      misses += 1;
      status.textContent = 'Pas encore… continue à chercher sur la carte.';
      status.classList.add('is-hint');
    }

    function findAnja() {
      if (found) return;
      found = true;
      target.classList.add('is-found');
      target.querySelector('.target-hint').textContent = '♥';
      target.setAttribute('aria-pressed', 'true');
      status.classList.remove('is-hint');
      status.classList.add('is-found');
      status.textContent = 'Tu as retrouvé Anja ! 💜';
      addMessage('Anja', scene.successAnswer, 'anja');
      addMessage('Mbola', scene.response, 'mbola');
      choices.hidden = false;
      showContinue();
    }

    target.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        findAnja();
      }
    });
    map.addEventListener('click', (event) => {
      const mapPoint = map.createSVGPoint();
      mapPoint.x = event.clientX;
      mapPoint.y = event.clientY;
      const point = mapPoint.matrixTransform(map.getScreenCTM().inverse());
      const distance = Math.hypot(point.x - 589, point.y - 184);

      if (distance <= 18) {
        findAnja();
      } else {
        showMiss();
      }
    });
  }

  function startShoppingGame() {
    const productGrid = document.querySelector('#productGrid');
    const bagItems = document.querySelector('#bagItems');
    const bagCount = document.querySelector('#bagCount');
    const feedback = document.querySelector('#shoppingFeedback');
    const checkBag = document.querySelector('#checkBag');
    const shoppingBag = document.querySelector('#shoppingBag');
    const requiredIds = new Set(['chips', 'vin', 'verre', 'lipton']);
    const requiredProducts = [
      { id: 'chips', name: 'les chips' },
      { id: 'vin', name: 'le vin' },
      { id: 'verre', name: 'le verre à jeter' },
      { id: 'lipton', name: 'le thé Lipton' },
    ];
    const otherProducts = [
      { id: 'chocolat', name: 'le chocolat' },
      { id: 'durex', name: 'le durex' },
      { id: 'biscuits', name: 'les biscuits' },
      { id: 'fraises', name: 'les fraises' },
      { id: 'cigarette', name: 'les cigarettes' },
    ];
    const shuffle = (items) => {
      const shuffled = [...items];
      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
      }
      return shuffled;
    };
    const products = shuffle([...requiredProducts, ...shuffle(otherProducts).slice(0, 5)]);
    const productById = new Map(products.map((product) => [product.id, product]));
    const basket = new Set();
    let completed = false;
    let activeDrag = null;

    function resetFeedback() {
      feedback.textContent = 'Il nous faut des chips, du vin et un verre à jeter.';
      feedback.classList.remove('is-error', 'is-success');
    }

    function renderShopping() {
      renderProducts();
      renderBag();
    }

    function bindImageInteractions(image, productId, origin) {
      image.tabIndex = 0;
      image.draggable = false;
      image.addEventListener('pointerdown', (event) => {
        if (event.button !== 0 || completed || activeDrag) return;
        event.preventDefault();
        activeDrag = {
          productId,
          origin,
          pointerId: event.pointerId,
          source: image,
          startX: event.clientX,
          startY: event.clientY,
          moved: false,
          ghost: null,
        };
        document.addEventListener('pointermove', moveDraggedItem);
        document.addEventListener('pointerup', dropDraggedItem);
        document.addEventListener('pointercancel', cancelDraggedItem);
      });
      image.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        if (event.repeat) return;
        event.preventDefault();
        if (completed) return;
        if (origin === 'shelf') {
          if (basket.has(productId)) basket.delete(productId);
          else basket.add(productId);
        } else {
          basket.delete(productId);
        }
        resetFeedback();
        renderShopping();
        productGrid.querySelector(`[data-product-id="${productId}"]`)?.focus();
      });
    }

    function moveDraggedItem(event) {
      if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;
      const dx = event.clientX - activeDrag.startX;
      const dy = event.clientY - activeDrag.startY;
      if (!activeDrag.moved && Math.hypot(dx, dy) < 6) return;
      activeDrag.moved = true;
      activeDrag.source.classList.add('is-dragging');
      document.body.classList.add('is-product-dragging');

      if (!activeDrag.ghost) {
        activeDrag.ghost = activeDrag.source.cloneNode(true);
        activeDrag.ghost.className = 'drag-ghost';
        activeDrag.ghost.removeAttribute('data-product-id');
        activeDrag.ghost.removeAttribute('tabindex');
        activeDrag.ghost.setAttribute('aria-hidden', 'true');
        document.body.append(activeDrag.ghost);
      }
      activeDrag.ghost.style.left = `${event.clientX}px`;
      activeDrag.ghost.style.top = `${event.clientY}px`;

      const target = document.elementFromPoint(event.clientX, event.clientY);
      shoppingBag.classList.toggle('is-drop-target', Boolean(target?.closest('#shoppingBag')));
    }

    function finishPointerDrag(event, cancelled = false) {
      if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;
      const drag = activeDrag;
      activeDrag = null;
      document.removeEventListener('pointermove', moveDraggedItem);
      document.removeEventListener('pointerup', dropDraggedItem);
      document.removeEventListener('pointercancel', cancelDraggedItem);
      shoppingBag.classList.remove('is-drop-target');
      document.body.classList.remove('is-product-dragging');
      drag.source.classList.remove('is-dragging');
      drag.ghost?.remove();

      const target = document.elementFromPoint(event.clientX, event.clientY);
      const droppedInBag = Boolean(target?.closest('#shoppingBag'));
      let changed = false;
      if (!cancelled && drag.origin === 'shelf' && droppedInBag && !basket.has(drag.productId)) {
        basket.add(drag.productId);
        changed = true;
      } else if (!cancelled && drag.origin === 'bag' && !droppedInBag) {
        changed = basket.delete(drag.productId);
      } else if (!cancelled && !drag.moved && drag.origin === 'shelf') {
        if (basket.has(drag.productId)) changed = basket.delete(drag.productId);
        else {
          basket.add(drag.productId);
          changed = true;
        }
      } else if (!cancelled && !drag.moved && drag.origin === 'bag') {
        changed = basket.delete(drag.productId);
      }

      if (changed) {
        resetFeedback();
        renderShopping();
      }
    }

    function dropDraggedItem(event) {
      finishPointerDrag(event);
    }

    function cancelDraggedItem(event) {
      finishPointerDrag(event, true);
    }

    function renderProducts() {
      productGrid.replaceChildren();
      products.forEach((product) => {
        const image = document.createElement('img');
        image.className = 'shelf-product';
        image.dataset.productId = product.id;
        image.src = `assets/epicerie/${product.id}.png`;
        image.alt = basket.has(product.id)
          ? `${product.name}, déjà dans le sac. Appuyer sur Entrée pour retirer.`
          : `${product.name}. Glisser dans le sac ou appuyer sur Entrée pour ajouter.`;
        if (basket.has(product.id)) image.classList.add('is-in-bag');
        if (completed) image.classList.add('is-locked');
        bindImageInteractions(image, product.id, 'shelf');
        productGrid.append(image);
      });
    }

    function renderBag() {
      bagItems.replaceChildren();
      bagCount.textContent = `${basket.size} article${basket.size === 1 ? '' : 's'}`;
      if (basket.size === 0) {
        const empty = document.createElement('p');
        empty.className = 'empty-bag';
        empty.textContent = 'Le sac est vide…';
        bagItems.append(empty);
        return;
      }

      basket.forEach((productId) => {
        const product = productById.get(productId);
        const image = document.createElement('img');
        image.className = 'bag-product';
        image.dataset.productId = product.id;
        image.src = `assets/epicerie/${product.id}.png`;
        image.alt = `${product.name}, dans le panier. Glisser hors du sac ou appuyer sur Entrée pour retirer.`;
        bindImageInteractions(image, product.id, 'bag');
        bagItems.append(image);
      });
    }

    checkBag.addEventListener('click', () => {
      if (completed) return;
      const hasMissing = [...requiredIds].some((productId) => !basket.has(productId));
      const hasExtra = [...basket].some((productId) => !requiredIds.has(productId));

      if (hasMissing || hasExtra) {
        const messages = [];
        if (hasMissing) messages.push('Il nous manque qqch.');
        if (hasExtra) messages.push('C’est un peu trop pour la soirée non ?');
        feedback.textContent = messages.join(' ');
        feedback.classList.remove('is-success');
        feedback.classList.add('is-error');
        return;
      }

      completed = true;
      feedback.textContent = 'Parfait, on a tout ce qu’il nous faut !';
      feedback.classList.remove('is-error');
      feedback.classList.add('is-success');
      checkBag.disabled = true;
      renderProducts();
      renderBag();
      addMessage('Mbola', 'Parfait, on a tout ce qu’il nous faut !', 'mbola');
      choices.hidden = false;
      showContinue();
    });

    renderProducts();
    renderBag();
  }

  function startBicycleGame() {
    const game = document.querySelector('#bicycleGame');
    const stage = document.querySelector('#bikeStage');
    const anja = document.querySelector('#bikeAnja');
    const mbola = document.querySelector('#bikeMbola');
    const meetHeart = document.querySelector('#bikeMeetHeart');
    const progressBar = document.querySelector('#bikeProgress');
    const progressFill = document.querySelector('#bikeProgressFill');
    const status = document.querySelector('#bikeStatus');
    const encouragements = [
      { at: 0.25, text: 'Allez, on se rapproche… garde le rythme, Anja !' },
      { at: 0.52, text: 'Je vois ta main… encore un peu, ry olo tiko ann. 💜' },
      { at: 0.74, text: 'On y est presque ! Continue, je suis juste là.' },
    ];
    const finalEncouragements = [
      { at: 0.67, text: 'Bien joué ! Encore plus vite maintenant, on va y arriver.' },
      { at: 0.82, text: 'Encore quelques clics, chérie… ne lâche pas ma main !' },
      { at: 0.94, text: 'Un dernier effort, Anja ! 💜' },
    ];
    let progressValue = 0;
    let lastPressAt = 0;
    let lastFrameAt = performance.now();
    let nextEncouragement = 0;
    let finalPhase = false;
    let completed = false;
    let hasMoved = false;
    let lastAnnouncedPercent = -1;

    function render() {
      const width = stage.clientWidth;
      const imageWidth = anja.getBoundingClientRect().width;
      const travel = Math.max(0, width * 0.5 - width * 0.04 - imageWidth);
      anja.style.transform = `translateX(${progressValue * travel}px)`;
      mbola.style.transform = `translateX(${-progressValue * travel}px)`;
      progressFill.style.width = `${progressValue * 100}%`;
      const percent = Math.round(progressValue * 100);
      if (percent !== lastAnnouncedPercent) {
        progressBar.setAttribute('aria-valuenow', String(percent));
        lastAnnouncedPercent = percent;
      }
      meetHeart.classList.toggle('is-visible', progressValue > 0.55);
      stage.classList.toggle('is-close', progressValue > 0.73);
    }

    function sayEncouragement() {
      const lines = finalPhase ? finalEncouragements : encouragements;
      const next = lines[nextEncouragement];
      if (next && progressValue >= next.at) {
        addMessage('Mbola', next.text, 'mbola');
        nextEncouragement += 1;
      }
    }

    function pressForward() {
      if (completed) return;
      const now = performance.now();
      const pause = lastPressAt ? now - lastPressAt : 0;
      lastPressAt = now;
      hasMoved = true;

      if (pause > 1450) {
        progressValue = 0;
        nextEncouragement = 0;
        finalPhase = false;
        status.textContent = 'Vous êtes repartis de chaque côté… reprends le rythme 💜';
      } else if (pause > 560) {
        progressValue = Math.max(0, progressValue - 0.065);
        status.textContent = 'Plus vite ! Vous commencez à vous éloigner.';
      } else if (pause > 285) {
        progressValue = Math.max(0, progressValue - 0.018);
        status.textContent = 'Un peu plus vite… vous vous rapprochez à nouveau.';
      } else {
        const step = finalPhase
          ? 0.024
          : progressValue < 0.62 ? 0.058 : 0.041;
        progressValue = Math.min(1, progressValue + step);
        status.textContent = finalPhase
          ? 'Encore, encore ! Chaque clic vous rapproche. 💜'
          : 'Oui ! Continue à cliquer rapidement. 💜';
      }

      sayEncouragement();

      if (!finalPhase && progressValue >= 0.84) {
        finalPhase = true;
        progressValue = 0.55;
        nextEncouragement = 0;
        status.textContent = 'Presque ! Les vélos ont fait un écart. Il faut accélérer encore !';
        addMessage('Mbola', 'Oh, presque ! Les vélos ont fait un petit écart… encore plus vite, on y est presque ! 💜', 'mbola');
      }

      if (progressValue >= 1) finishRide();
      render();
    }

    function finishRide() {
      completed = true;
      progressValue = 1;
      stage.classList.add('is-united');
      status.textContent = 'Vous voilà, main dans la main. En route ! 💜';
      addMessage('Anja', 'Je te tiens ! 💜', 'anja');
      addMessage('Mbola', 'Parfait… en route, main dans la main.', 'mbola');
      choices.hidden = false;
      showContinue();
    }

    function animate(now) {
      if (completed) return;
      const delta = Math.min((now - lastFrameAt) / 1000, 0.05);
      lastFrameAt = now;

      if (hasMoved && lastPressAt) {
        const idleFor = now - lastPressAt;
        if (idleFor > 1450 && progressValue > 0) {
          progressValue = 0;
          nextEncouragement = 0;
          finalPhase = false;
          status.textContent = 'Vous êtes revenus à votre place de départ. À toi de rejouer !';
        } else if (idleFor > 285 && progressValue > 0) {
          const retreatSpeed = idleFor > 650 ? 0.34 : 0.15;
          progressValue = Math.max(0, progressValue - retreatSpeed * delta);
        }
        render();
      }

      requestAnimationFrame(animate);
    }

    stage.addEventListener('click', pressForward);
    document.addEventListener('keydown', (event) => {
      if (game.hidden || completed || event.code !== 'Space' || event.repeat) return;
      event.preventDefault();
      pressForward();
    });
    window.addEventListener('resize', render);
    render();
    requestAnimationFrame(animate);
  }

  function chooseAnswer(answer, index) {
    if (scene.wrongAnswers?.includes(index)) {
      retryDialog.showModal();
      return;
    }

    addMessage('Anja', answer, 'anja');

    if (sceneNumber === 1) {
      window.location.href = scene.nextPage;
      return;
    }

    const reply = Array.isArray(scene.responses) ? scene.responses[index] : scene.response;
    if (reply) addMessage('Mbola', reply, 'mbola');

    if (scene.followUpAnswers) {
      showAnswers(scene.followUpQuestion, scene.followUpAnswers, finishHug);
      return;
    }

    if (scene.ending) {
      finishScene();
      return;
    }

    showContinue();
  }

  function finishHug(answer) {
    addMessage('Anja', answer, 'anja');
    addMessage('Mbola', scene.ending, 'mbola');
    finishScene();
  }

  function finishScene() {
    choices.hidden = true;
    endingPanel.hidden = false;
    progressText.textContent = 'Fin de notre journée 💜';
    document.querySelector('#progressFill').style.width = '100%';
    progress.setAttribute('aria-valuenow', '7');
    endingPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  const restartButton = document.querySelector('#restartStory');
  if (restartButton) restartButton.addEventListener('click', () => { window.location.href = 'scene1.html'; });
  if (retryDialog) retryDialog.addEventListener('cancel', (event) => event.preventDefault());

  const memoriesDialog = document.querySelector('#memoriesDialog');
  document.querySelector('#openMemories')?.addEventListener('click', () => memoriesDialog.showModal());
  document.querySelector('#closeMemories')?.addEventListener('click', () => memoriesDialog.close());
  memoriesDialog?.addEventListener('click', (event) => {
    if (event.target === memoriesDialog) memoriesDialog.close();
  });
  memoriesDialog?.addEventListener('close', () => {
    memoriesDialog.querySelectorAll('video').forEach((video) => video.pause());
  });
})();
