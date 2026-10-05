// Scene 8: "Can I Sit Next to You?" -> Leading into the Picture
const Scene8 = {
  render() {
    window.switchBackground('bg-scene-6');

    return `
      <!-- Top Status Banner -->
      <div class="scene-top-banner">
        <span>✨</span> <span>table moment</span>
      </div>

      <!-- Dialogue Bubble over Ritik -->
      <div class="speech-bubble-anchor">
        <div class="speech-bubble" id="scene8Bubble">
          <div class="speech-speaker">
            <span class="speaker-dot"></span>
            <span>ritik</span>
          </div>
          <div class="speech-text" id="scene8BubbleText">
            <p>“so…”</p>
            <span class="interactive-prompt">can i come sit next to you? 🥺👉👈</span>
          </div>
        </div>
      </div>

      <!-- Bottom Interactive Dock -->
      <div class="bottom-dock" id="scene8Dock">
        <div class="dock-title-bar">will you let him?</div>

        <div class="dock-choices" style="grid-template-columns: repeat(2, 1fr);" id="sitChoices">
          <button class="dock-choice-btn" data-choice="yes" onclick="Scene8.answer('yes')">
            <span class="dock-choice-icon">💕</span>
            <span class="dock-choice-label">YES, come here</span>
          </button>

          <button class="dock-choice-btn" data-choice="no" onclick="Scene8.answer('no')">
            <span class="dock-choice-icon">🙅‍♀️</span>
            <span class="dock-choice-label">NO, stay over there</span>
          </button>
        </div>

        <div class="dock-confirm-row" id="scene8ConfirmRow">
          <button class="dock-enter-btn" id="scene8NextBtn" onclick="Scene8.next()">
            <span>take our picture 📸</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;
  },

  answer(choice) {
    const sitAns = choice === 'yes' ? 'YES, come here' : 'NO, stay over there';
    window.dateState.sitNextChoice = sitAns;
    if (window.DateTracker) window.DateTracker.record('sit_next_choice', sitAns);

    document.querySelectorAll('#scene8Dock .dock-choice-btn').forEach(btn => btn.classList.remove('selected'));
    const active = document.querySelector(`#scene8Dock .dock-choice-btn[data-choice="${choice}"]`);
    if (active) active.classList.add('selected');

    const bubble = document.getElementById('scene8Bubble');
    const bubbleText = document.getElementById('scene8BubbleText');
    const confirmRow = document.getElementById('scene8ConfirmRow');
    const nextBtn = document.getElementById('scene8NextBtn');

    bubble.style.animation = 'none';
    bubble.offsetHeight;
    bubble.style.animation = 'bubbleFloat 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';

    if (choice === 'yes') {
      bubbleText.innerHTML = `
        <p>“much better.” 😌</p>
        <p>“now i don't have to reach across the table to steal food.” ❤️</p>
        <p>“wait… now that we're sitting together…”</p>
      `;
      nextBtn.innerHTML = `<span>take our picture 📸</span> <span>→</span>`;
    } else {
      bubbleText.innerHTML = `
        <p>“no? playing hard to get on your birthday? 😂”</p>
        <p>“fine… but can we at least take one picture together?” 📸</p>
        <span class="interactive-prompt">“i HAVE to sit next to you to fit in the frame anyway.” 😏</span>
      `;
      nextBtn.innerHTML = `<span>okay fine, one picture 📸</span> <span>→</span>`;
    }

    confirmRow.classList.add('visible');
  },

  next() {
    window.loadScene(Scene8b);
  }
};

window.Scene8 = Scene8;
