// Scene 6: Her Order Arrives & "Can I Have a Sip?"
const Scene6 = {
  render() {
    window.switchBackground('bg-scene-6');
    const drinkName = window.dateState.selectedDrinks[0] || 'Double Choco Chip Sharpee';

    return `
      <!-- Top Status Banner -->
      <div class="scene-top-banner">
        <span>✨</span> <span>order served</span>
      </div>

      <!-- Dialogue Bubble over Ritik (upper left, 100% clear of all faces and food) -->
      <div class="speech-bubble-anchor">
        <div class="speech-bubble" id="scene6Bubble">
          <div class="speech-speaker">
            <span class="speaker-dot"></span>
            <span>ritik</span>
          </div>
          <div class="speech-text" id="scene6BubbleText">
            <p>“your order has arrived. ☕️”</p>
            <p>“and yes… it looks exactly like something you would order.”</p>
          </div>
        </div>
      </div>

      <!-- Bottom Interactive Choice Dock -->
      <div class="bottom-dock" id="scene6Dock">
        <div class="dock-title-bar" id="scene6DockTitle">he has an urgent question...</div>

        <!-- Yes / No Options -->
        <div class="dock-choices" style="grid-template-columns: repeat(2, 1fr);" id="sipChoices">
          <button class="dock-choice-btn" data-choice="yes" onclick="Scene6.answer('yes')">
            <span class="dock-choice-icon">🥤</span>
            <span class="dock-choice-label">YES, take a sip</span>
          </button>

          <button class="dock-choice-btn" data-choice="no" onclick="Scene6.answer('no')">
            <span class="dock-choice-icon">🙅‍♀️</span>
            <span class="dock-choice-label">NO, get your own</span>
          </button>
        </div>

        <!-- Next / Continue Action Row -->
        <div class="dock-confirm-row" id="scene6ConfirmRow">
          <button class="dock-enter-btn" id="scene6NextBtn" onclick="Scene6.next()">
            <span>continue</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;
  },

  init() {
    // After 2 seconds of the food being placed, Ritik leans in for a sip
    setTimeout(() => {
      const bubble = document.getElementById('scene6Bubble');
      const bubbleText = document.getElementById('scene6BubbleText');
      const dockTitle = document.getElementById('scene6DockTitle');
      const drinkName = window.dateState.selectedDrinks[0] || 'Double Choco Chip Sharpee';

      if (bubble && bubbleText) {
        bubble.style.animation = 'none';
        bubble.offsetHeight;
        bubble.style.animation = 'bubbleFloat 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        bubbleText.innerHTML = `
          <p>“okay, one very important question…”</p>
          <span class="interactive-prompt">can i have a sip of your ${drinkName}? 🥺</span>
        `;
        if (dockTitle) dockTitle.textContent = 'can he have a sip?';
      }
    }, 2200);
  },

  answer(choice) {
    const sipAns = choice === 'yes' ? 'YES, take a sip' : 'NO, get your own';
    window.dateState.drinkSip = sipAns;
    if (window.DateTracker) window.DateTracker.record('sip_shared', sipAns);

    document.querySelectorAll('#scene6Dock .dock-choice-btn').forEach(btn => btn.classList.remove('selected'));
    const active = document.querySelector(`#scene6Dock .dock-choice-btn[data-choice="${choice}"]`);
    if (active) active.classList.add('selected');

    const bubble = document.getElementById('scene6Bubble');
    const bubbleText = document.getElementById('scene6BubbleText');
    const confirmRow = document.getElementById('scene6ConfirmRow');
    const nextBtn = document.getElementById('scene6NextBtn');

    bubble.style.animation = 'none';
    bubble.offsetHeight;
    bubble.style.animation = 'bubbleFloat 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';

    if (choice === 'yes') {
      bubbleText.innerHTML = `
        <p>“WAIT.”</p>
        <p>“I actually got a sip. 😭”</p>
        <p>“birthday miracles are real.”</p>
      `;
      nextBtn.innerHTML = `<span>continue ❤️</span> <span>→</span>`;
      nextBtn.onclick = () => Scene6.next();
      confirmRow.classList.add('visible');
    } else {
      bubbleText.innerHTML = `
        <p>“no? you have your own?”</p>
        <span class="interactive-prompt">tap next to hear my reasoning... 👀</span>
      `;
      nextBtn.innerHTML = `<span>why? 👀</span> <span>→</span>`;
      nextBtn.onclick = () => Scene6.revealNoReason();
      confirmRow.classList.add('visible');
    }
  },

  revealNoReason() {
    const bubble = document.getElementById('scene6Bubble');
    const bubbleText = document.getElementById('scene6BubbleText');
    const nextBtn = document.getElementById('scene6NextBtn');

    bubble.style.animation = 'none';
    bubble.offsetHeight;
    bubble.style.animation = 'bubbleFloat 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';

    bubbleText.innerHTML = `
      <p>“i know i have my own.”</p>
      <p>“yours always tastes better. ☕️”</p>
      <p>“don't look at me like that. it's scientifically proven.” 😂</p>
    `;

    nextBtn.innerHTML = `<span>continue 😂</span> <span>→</span>`;
    nextBtn.onclick = () => Scene6.next();
  },

  next() {
    if (window.Scene7) {
      window.loadScene(Scene7);
    } else {
      alert("✨ Saved sip reaction! Ready for Scene 7: Food Stealing Banter 🍜");
    }
  }
};

window.Scene6 = Scene6;
