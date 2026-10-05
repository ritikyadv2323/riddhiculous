// Scene 7: Food Stealing Banter (Dynamically reacts to her food)
const Scene7 = {
  render() {
    window.switchBackground('bg-scene-6');
    const foodItem = window.dateState.selectedFoods[0] || 'Veg Maggie';
    const isMaggie = foodItem.toLowerCase().includes('maggie');
    const foodQuestion = isMaggie ? 'can i steal one bite of your maggie? 🥺🍜' : `can i steal a bite of your ${foodItem}? 🥺`;

    return `
      <!-- Top Status Banner -->
      <div class="scene-top-banner">
        <span>🍜</span> <span>food stealing mode</span>
      </div>

      <!-- Dialogue Bubble over Ritik -->
      <div class="speech-bubble-anchor">
        <div class="speech-bubble" id="scene7Bubble">
          <div class="speech-speaker">
            <span class="speaker-dot"></span>
            <span>ritik</span>
          </div>
          <div class="speech-text" id="scene7BubbleText">
            <p>“okay… different question.”</p>
            <span class="interactive-prompt">${foodQuestion}</span>
          </div>
        </div>
      </div>

      <!-- Bottom Interactive Dock -->
      <div class="bottom-dock" id="scene7Dock">
        <div class="dock-title-bar">will you share?</div>

        <div class="dock-choices" style="grid-template-columns: repeat(2, 1fr);">
          <button class="dock-choice-btn" data-choice="yes" onclick="Scene7.answer('yes')">
            <span class="dock-choice-icon">🥢</span>
            <span class="dock-choice-label">YES, sharing is caring</span>
          </button>

          <button class="dock-choice-btn" data-choice="no" onclick="Scene7.answer('no')">
            <span class="dock-choice-icon">🙅‍♀️</span>
            <span class="dock-choice-label">NO, my food!</span>
          </button>
        </div>

        <div class="dock-confirm-row" id="scene7ConfirmRow">
          <button class="dock-enter-btn" id="scene7NextBtn" onclick="Scene7.next()">
            <span>continue</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;
  },

  answer(choice) {
    const foodAns = choice === 'yes' ? 'YES, sharing is caring' : 'NO, my food!';
    window.dateState.foodShare = foodAns;
    if (window.DateTracker) window.DateTracker.record('bite_shared', foodAns);

    document.querySelectorAll('#scene7Dock .dock-choice-btn').forEach(btn => btn.classList.remove('selected'));
    const active = document.querySelector(`#scene7Dock .dock-choice-btn[data-choice="${choice}"]`);
    if (active) active.classList.add('selected');

    const bubble = document.getElementById('scene7Bubble');
    const bubbleText = document.getElementById('scene7BubbleText');
    const confirmRow = document.getElementById('scene7ConfirmRow');
    const nextBtn = document.getElementById('scene7NextBtn');

    bubble.style.animation = 'none';
    bubble.offsetHeight;
    bubble.style.animation = 'bubbleFloat 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';

    if (choice === 'yes') {
      bubbleText.innerHTML = `
        <p>“see? sharing is caring.” 😌</p>
        <p>“i knew you loved me.” ❤️</p>
      `;
      nextBtn.innerHTML = `<span>continue 😋</span> <span>→</span>`;
    } else {
      bubbleText.innerHTML = `
        <p>“okay.”</p>
        <p>“apparently birthday girl doesn't share food.” 😂</p>
        <p>“i see how it is.”</p>
      `;
      nextBtn.innerHTML = `<span>continue 😂</span> <span>→</span>`;
    }

    confirmRow.classList.add('visible');
  },

  next() {
    if (window.Scene8) {
      window.loadScene(Scene8);
    } else {
      alert("✨ Saved choice! Scene 8: What should I try first? coming right up!");
    }
  }
};

window.Scene7 = Scene7;
