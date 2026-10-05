// Scene 2: Getting to the Café & Seating Selection
const Scene2 = {
  render() {
    window.switchBackground('bg-scene-2');
    return `
      <!-- Top Subtle Scene Tag -->
      <div class="scene-top-banner">
        <span>🌙</span> midnight café walk
      </div>

      <!-- Speech Bubble floating cleanly on the upper left awning -->
      <div class="speech-bubble-anchor">
        <div class="speech-bubble" id="ritikBubble">
          <div class="speech-speaker">
            <span class="speaker-dot"></span>
            <span>ritik</span>
          </div>
          <div class="speech-text" id="bubbleText">
            <p>“we're here. finally.”</p>
            <p>“the café looks so cozy tonight. where are we sitting? ☕”</p>
          </div>
        </div>
      </div>

      <!-- Compact Bottom Choice Dock -->
      <div class="bottom-dock">
        <div class="dock-title-bar">pick our spot</div>

        <div class="dock-choices">
          <button class="dock-choice-btn" data-seat="window" onclick="Scene2.select('window')">
            <span class="dock-choice-icon">🪟</span>
            <span class="dock-choice-label">window seat</span>
          </button>

          <button class="dock-choice-btn" data-seat="corner" onclick="Scene2.select('corner')">
            <span class="dock-choice-icon">🪑</span>
            <span class="dock-choice-label">corner seat</span>
          </button>

          <button class="dock-choice-btn" data-seat="wherever" onclick="Scene2.select('wherever')">
            <span class="dock-choice-icon">☕</span>
            <span class="dock-choice-label">wherever you want</span>
          </button>
        </div>

        <div class="dock-confirm-row" id="confirmRow">
          <button class="dock-enter-btn" onclick="Scene2.enter()">
            <span>enter café</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;
  },

  select(type) {
    window.dateState.setSeat(type);
    if (window.DateTracker) window.DateTracker.record('seat_chosen', window.dateState.seatLabel);

    document.querySelectorAll('.dock-choice-btn').forEach(btn => btn.classList.remove('selected'));
    const active = document.querySelector(`.dock-choice-btn[data-seat="${type}"]`);
    if (active) active.classList.add('selected');

    const bubble = document.getElementById('ritikBubble');
    const bubbleText = document.getElementById('bubbleText');
    const confirmRow = document.getElementById('confirmRow');

    bubble.style.animation = 'none';
    bubble.offsetHeight;
    bubble.style.animation = 'bubbleFloat 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';

    if (type === 'window') {
      bubbleText.innerHTML = `
        <p>“of course you picked the window.”</p>
        <p>“you always need the best view.” 😌</p>
      `;
    } else if (type === 'corner') {
      bubbleText.innerHTML = `
        <p>“corner seat it is.”</p>
        <p>“okay, this already feels suspiciously comfortable.” 😂</p>
      `;
    } else if (type === 'wherever') {
      bubbleText.innerHTML = `
        <p>“fair enough.”</p>
        <p>“apparently i'm not making any decisions today.” 😂</p>
      `;
    }

    confirmRow.classList.add('visible');
  },

  enter() {
    window.loadScene(Scene3);
  }
};

window.Scene2 = Scene2;
