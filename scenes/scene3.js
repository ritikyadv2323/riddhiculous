// Scene 3: Seated at the Table & First Action
const Scene3 = {
  render() {
    window.switchBackground('bg-scene-3');
    const seatText = window.dateState.seat === 'window' ? '🪟 seated by the window' :
                     window.dateState.seat === 'corner' ? '🪑 cozy corner table' :
                     '☕ seated at our table';

    return `
      <!-- Top Subtle Scene Tag -->
      <div class="scene-top-banner">
        <span>✨</span> <span>${seatText}</span>
      </div>

      <!-- Speech Bubble over Ritik -->
      <div class="speech-bubble-anchor">
        <div class="speech-bubble" id="scene3Bubble">
          <div class="speech-speaker">
            <span class="speaker-dot"></span>
            <span>ritik</span>
          </div>
          <div class="speech-text" id="scene3BubbleText">
            <p>“okay. we're seated.”</p>
            <p>“but there's one very important decision before anything else…”</p>
            <span class="interactive-prompt">coffee first, talking first, or both? ❤️</span>
          </div>
        </div>
      </div>

      <!-- Bottom Interactive Dock for Decision -->
      <div class="bottom-dock">
        <div class="dock-title-bar">what comes first?</div>

        <div class="dock-choices">
          <button class="dock-choice-btn" data-first="coffee" onclick="Scene3.select('coffee')">
            <span class="dock-choice-icon">☕</span>
            <span class="dock-choice-label">coffee first</span>
          </button>

          <button class="dock-choice-btn" data-first="talking" onclick="Scene3.select('talking')">
            <span class="dock-choice-icon">💬</span>
            <span class="dock-choice-label">talking first</span>
          </button>

          <button class="dock-choice-btn" data-first="both" onclick="Scene3.select('both')">
            <span class="dock-choice-icon">❤️</span>
            <span class="dock-choice-label">both, obviously</span>
          </button>
        </div>

        <div class="dock-confirm-row" id="scene3ConfirmRow">
          <button class="dock-enter-btn" onclick="Scene3.next()">
            <span>open the menu</span>
            <span>📜 →</span>
          </button>
        </div>
      </div>
    `;
  },

  select(type) {
    const actionLabel = type === 'coffee' ? 'coffee first' : type === 'talking' ? 'talking first' : 'both, obviously';
    window.dateState.setFirstAction(actionLabel);
    if (window.DateTracker) window.DateTracker.record('first_action', actionLabel);

    document.querySelectorAll('.dock-choice-btn').forEach(btn => btn.classList.remove('selected'));
    const active = document.querySelector(`.dock-choice-btn[data-first="${type}"]`);
    if (active) active.classList.add('selected');

    const bubble = document.getElementById('scene3Bubble');
    const bubbleText = document.getElementById('scene3BubbleText');
    const confirmRow = document.getElementById('scene3ConfirmRow');

    bubble.style.animation = 'none';
    bubble.offsetHeight;
    bubble.style.animation = 'bubbleFloat 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';

    if (type === 'coffee') {
      bubbleText.innerHTML = `
        <p>“priorities. i respect that.” ☕️</p>
        <p>“let's see what you're craving tonight.”</p>
      `;
    } else if (type === 'talking') {
      bubbleText.innerHTML = `
        <p>“okay, so we're skipping the warm-up and going straight into it?” 😂</p>
        <p>“i've got plenty of things to tell you.”</p>
      `;
    } else if (type === 'both') {
      bubbleText.innerHTML = `
        <p>“the only correct answer.” ❤️</p>
        <p>“good coffee + endless conversation.”</p>
      `;
    }

    confirmRow.classList.add('visible');
  },

  next() {
    if (window.Scene4) {
      window.loadScene(Scene4);
    } else {
      alert("✨ Saved choice! Scene 4 loading next...");
    }
  }
};

window.Scene3 = Scene3;
