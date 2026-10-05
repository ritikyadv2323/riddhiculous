// Scene 5: "Are You Sure?" Teasing Reaction Beat
const Scene5 = {
  render() {
    window.switchBackground('bg-scene-3');
    const totalItems = window.dateState.getAllItems().length;

    return `
      <!-- Speech Bubble over Ritik -->
      <div class="speech-bubble-anchor">
        <div class="speech-bubble" id="scene5Bubble">
          <div class="speech-speaker">
            <span class="speaker-dot"></span>
            <span>ritik</span>
          </div>
          <div class="speech-text" id="scene5BubbleText">
            <p>“wait…”</p>
            <p>“you're actually ordering all of that? 😭”</p>
            <span class="interactive-prompt">(${totalItems} items on the way...)</span>
          </div>
        </div>
      </div>

      <!-- Bottom Interactive Dock -->
      <div class="bottom-dock">
        <div class="dock-title-bar">your defense?</div>

        <div class="dock-choices" style="grid-template-columns: repeat(2, 1fr);">
          <button class="dock-choice-btn" data-choice="yes" onclick="Scene5.select('yes')">
            <span class="dock-choice-icon">💁‍♀️</span>
            <span class="dock-choice-label">yes, mind your business</span>
          </button>

          <button class="dock-choice-btn" data-choice="maybe" onclick="Scene5.select('maybe')">
            <span class="dock-choice-icon">👀</span>
            <span class="dock-choice-label">maybe remove something</span>
          </button>
        </div>

        <div class="dock-confirm-row" id="placeOrderRow">
          <button class="dock-enter-btn" onclick="Scene5.placeOrder()">
            <span>place my order</span>
            <span>🍽️ →</span>
          </button>
        </div>
      </div>
    `;
  },

  select(type) {
    const defense = type === 'yes' ? 'yes, mind your business' : 'maybe remove something';
    window.dateState.orderDefense = defense;
    if (window.DateTracker) window.DateTracker.record('order_defense', defense);

    document.querySelectorAll('.dock-choice-btn').forEach(btn => btn.classList.remove('selected'));
    const active = document.querySelector(`.dock-choice-btn[data-choice="${type}"]`);
    if (active) active.classList.add('selected');

    const bubble = document.getElementById('scene5Bubble');
    const bubbleText = document.getElementById('scene5BubbleText');
    const placeOrderRow = document.getElementById('placeOrderRow');

    bubble.style.animation = 'none';
    bubble.offsetHeight;
    bubble.style.animation = 'bubbleFloat 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';

    if (type === 'yes') {
      bubbleText.innerHTML = `
        <p>“okay okay. birthday rules.” 😂</p>
        <p>“i won't question the birthday girl.”</p>
      `;
    } else if (type === 'maybe') {
      bubbleText.innerHTML = `
        <p>“good decision.” 😂</p>
        <p>“we were about to need another table.”</p>
      `;
    }

    placeOrderRow.classList.add('visible');
  },

  placeOrder() {
    if (window.Scene6) {
      window.loadScene(Scene6);
    } else {
      alert("✨ Order placed! Scene 6 (Food arriving on the table) coming right up!");
    }
  }
};

window.Scene5 = Scene5;
