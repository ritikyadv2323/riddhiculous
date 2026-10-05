// Scene 12: The Pink Lilies Bouquet Gift
const Scene12 = {
  render() {
    window.switchBackground('bg-lilies');

    return `
      <!-- Top Status Banner -->
      <div class="scene-top-banner">
        <span>🌸</span> <span>for the birthday girl</span>
      </div>

      <!-- Dialogue Bubble over Ritik -->
      <div class="speech-bubble-anchor" style="top: 68px; left: 24px; max-width: 380px;">
        <div class="speech-bubble" id="scene12Bubble">
          <div class="speech-speaker">
            <span class="speaker-dot"></span>
            <span>ritik</span>
          </div>
          <div class="speech-text" id="scene12BubbleText">
            <p>“for the birthday girl. 🌸”</p>
            <p>“pink lilies. because they're gentle, elegant, and make everything around them a little brighter…”</p>
            <span class="interactive-prompt">“…just like you.” ❤️</span>
          </div>
        </div>
      </div>

      <!-- Bottom Interactive Dock -->
      <div class="bottom-dock" style="bottom: 24px; left: 50%; transform: translateX(-50%); align-items: center;">
        <div id="liliesActionArea">
          <button class="dock-enter-btn" style="padding: 14px 34px; font-size: 1.05rem;" onclick="Scene12.holdFlowers()">
            <span>💐 hold the flowers close</span>
          </button>
        </div>
      </div>
    `;
  },

  holdFlowers() {
    const bubble = document.getElementById('scene12Bubble');
    const bubbleText = document.getElementById('scene12BubbleText');
    const actionArea = document.getElementById('liliesActionArea');

    if (bubble && bubbleText) {
      bubble.style.animation = 'none';
      bubble.offsetHeight;
      bubble.style.animation = 'bubbleFloat 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      bubbleText.innerHTML = `
        <p>“officially the happiest girl in the café tonight.” 😌❤️</p>
        <span class="interactive-prompt">“ready to step outside for a quiet midnight walk?” 🌙</span>
      `;
    }

    // Spawn gentle floating flower petals
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const petal = document.createElement('div');
        petal.className = 'floating-heart';
        petal.textContent = ['🌸', '🌺', '✨', '💕'][i % 4];
        petal.style.left = `${Math.random() * window.innerWidth}px`;
        petal.style.top = `${Math.random() * (window.innerHeight * 0.7) + 80}px`;
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 1600);
      }, i * 100);
    }

    if (actionArea) {
      actionArea.innerHTML = `
        <button class="dock-enter-btn" style="padding: 16px 36px; font-size: 1.08rem; box-shadow: 0 10px 30px rgba(212, 128, 57, 0.7);" onclick="Scene12.next()">
          <span>let's take a midnight walk</span>
          <span>🌙 →</span>
        </button>
      `;
    }
  },

  next() {
    if (window.Scene13) {
      window.loadScene(Scene13);
    } else {
      alert("✨ Stepping outside into the quiet night... Scene 13: The Midnight Walk & Proposal!");
    }
  }
};

window.Scene12 = Scene12;
