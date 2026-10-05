// Scene 10: The Printed Café Receipt
const Scene10 = {
  render() {
    window.switchBackground('bg-scene-selfie');
    const selected = window.dateState.getAllItems();
    const seatName = window.dateState.seatLabel || 'window seat';
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const itemsHtml = selected.map(item => `
      <div class="receipt-item-row">
        <span class="receipt-item-name">1x ${item}</span>
        <span class="receipt-item-price">FREE</span>
      </div>
    `).join('');

    return `
      <!-- Top Status Banner -->
      <div class="scene-top-banner">
        <span>🧾</span> <span>café receipt</span>
      </div>

      <div class="receipt-wrapper">
        <div class="receipt-paper">
          <div class="receipt-header">
            <div class="receipt-logo">☕ RIDDHICULOUS CAFÉ</div>
            <div class="receipt-sub">one little birthday date</div>
          </div>

          <div class="receipt-info-row">
            <span>CUSTOMER:</span>
            <span>riddhi (cutiepie) ❤️</span>
          </div>
          <div class="receipt-info-row">
            <span>TABLE:</span>
            <span>${seatName}</span>
          </div>
          <div class="receipt-info-row">
            <span>DATE:</span>
            <span>${dateStr}</span>
          </div>

          <div class="receipt-divider"></div>

          <div class="receipt-items-list">
            ${itemsHtml || '<div class="receipt-item-row"><span>1x Birthday Coffee</span><span>FREE</span></div>'}
            
            <div class="receipt-item-row receipt-special-row">
              <span class="receipt-item-name">1x Her Contagious Laugh</span>
              <span class="receipt-item-price">Priceless</span>
            </div>
            <div class="receipt-item-row receipt-special-row">
              <span class="receipt-item-name">1x Stealing My Attention</span>
              <span class="receipt-item-price">Forever</span>
            </div>
          </div>

          <div class="receipt-total-box">
            <span>TOTAL DUE:</span>
            <span>PAID IN FULL</span>
          </div>

          <div class="receipt-stamp">
            PAID IN 100% LOVE & SMILES ❤️
          </div>

          <div class="receipt-footer-note">
            thank you for spending this date with me • valid forever
          </div>
        </div>

        <button class="action-btn" onclick="Scene10.next()">
          <span>something feels incomplete… what?</span>
          <span class="btn-arrow">🤔 →</span>
        </button>
      </div>
    `;
  },

  next() {
    window.loadScene(Scene11);
  }
};

window.Scene10 = Scene10;
