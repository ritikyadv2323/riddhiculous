// Scene 11: 3-Shot Birthday Cake & Candle Blow Sequence
const Scene11 = {
  phase: 1, // 1: Cake Lit -> 2: Blowing Candle -> 3: Hearts Falling

  render() {
    this.phase = 1;
    window.switchBackground('bg-cake-1');

    return `
      <!-- Top Status Banner -->
      <div class="scene-top-banner" id="cakeBanner">
        <span>🕯️</span> <span>make a wish</span>
      </div>

      <!-- Dialogue Bubble over Ritik -->
      <div class="speech-bubble-anchor" style="top: 68px; left: 24px; max-width: 380px;">
        <div class="speech-bubble" id="cakeBubble">
          <div class="speech-speaker">
            <span class="speaker-dot"></span>
            <span>ritik</span>
          </div>
          <div class="speech-text" id="cakeBubbleText">
            <p>“wait…”</p>
            <p>“before we leave this table, you haven't made your birthday wish yet.” 🕯️</p>
            <span class="interactive-prompt">“close your eyes… make your wish…”</span>
          </div>
        </div>
      </div>

      <!-- Bottom Interactive Dock -->
      <div class="bottom-dock" style="bottom: 24px; left: 50%; transform: translateX(-50%); align-items: center;">
        <div id="cakeActionArea">
          <button class="dock-enter-btn" id="blowCandleBtn" style="padding: 16px 36px; font-size: 1.1rem; box-shadow: 0 10px 30px rgba(212, 128, 57, 0.6);" onclick="Scene11.blowCandle()">
            <span>🌬️ BLOW OUT THE CANDLE</span>
          </button>
        </div>
      </div>
    `;
  },

  blowCandle() {
    if (this.phase !== 1) return;
    this.phase = 2;

    const bubble = document.getElementById('cakeBubble');
    const bubbleText = document.getElementById('cakeBubbleText');
    const banner = document.getElementById('cakeBanner');
    const actionArea = document.getElementById('cakeActionArea');

    // 1. Transition to Phase 2: She leans in blowing the candle
    window.switchBackground('bg-cake-2');
    if (banner) banner.innerHTML = `<span>🌬️</span> <span>blowing the candle</span>`;
    
    if (bubble && bubbleText) {
      bubble.style.animation = 'none';
      bubble.offsetHeight;
      bubble.style.animation = 'bubbleFloat 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      bubbleText.innerHTML = `
        <p>“three… two… one…”</p>
        <span class="interactive-prompt">🌬️✨ *whoosh* ✨🌬️</span>
      `;
    }

    if (actionArea) {
      actionArea.innerHTML = `
        <div style="font-family:'Caveat', cursive; font-size:1.4rem; color:var(--accent-gold); text-shadow:0 2px 8px rgba(0,0,0,0.8);">
          blowing out the flame...
        </div>
      `;
    }

    // 2. Transition to Phase 3: Candle blown out, joyful laugh, hearts falling!
    setTimeout(() => {
      this.phase = 3;
      window.switchBackground('bg-cake-3');

      if (banner) banner.innerHTML = `<span>🎉</span> <span>wish granted</span>`;

      if (bubble && bubbleText) {
        bubble.style.animation = 'none';
        bubble.offsetHeight;
        bubble.style.animation = 'bubbleFloat 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        bubbleText.innerHTML = `
          <p>“wish granted! ❤️”</p>
          <p>“whatever you just wished for… i hope this year gives it to you.”</p>
          <span class="interactive-prompt">“now… there's actually one more thing. i brought something for you.” 🎁</span>
        `;
      }

      // Spawning celebratory hearts on screen
      for (let i = 0; i < 16; i++) {
        setTimeout(() => {
          const heart = document.createElement('div');
          heart.className = 'floating-heart';
          heart.textContent = ['💖', '✨', '🌸', '💫', '❤️'][i % 5];
          heart.style.left = `${Math.random() * window.innerWidth}px`;
          heart.style.top = `${Math.random() * (window.innerHeight * 0.6) + 100}px`;
          document.body.appendChild(heart);
          setTimeout(() => heart.remove(), 1600);
        }, i * 90);
      }

      if (actionArea) {
        actionArea.innerHTML = `
          <button class="dock-enter-btn" style="padding: 16px 38px; font-size: 1.1rem; box-shadow: 0 10px 30px rgba(212, 128, 57, 0.7);" onclick="Scene11.next()">
            <span>SHOW ME 👀</span>
            <span>🎁 →</span>
          </button>
        `;
      }
    }, 1800);
  },

  next() {
    if (window.Scene12) {
      window.loadScene(Scene12);
    } else {
      alert("✨ Gift time! Scene 12: The Handmade Clay Gift coming right up!");
    }
  }
};

window.Scene11 = Scene11;
