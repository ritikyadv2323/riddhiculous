// Scene 4: The Birthday Girl's Menu & Live Order Tray
const Scene4 = {
  drinks: [
    { id: 'sharpee', name: 'Double Choco Chip Sharpee', emoji: '🍫' },
    { id: 'cold_coffee', name: 'Cold Coffee', emoji: '☕' },
    { id: 'hot_coffee', name: 'Hot Coffee', emoji: '☕' },
    { id: 'mango_smoothie', name: 'Mango Shake Smoothie', emoji: '🥭' }
  ],

  foods: [
    { id: 'maggie', name: 'Veg Maggie', emoji: '🍜' },
    { id: 'crispers', name: 'Masala Crispers', emoji: '🌶️' },
    { id: 'burger', name: 'Burger', emoji: '🍔' },
    { id: 'tacos', name: 'Tacos', emoji: '🌮' },
    { id: 'potato_puff', name: 'Masala Potato Puff', emoji: '🥔' }
  ],

  render() {
    window.switchBackground('bg-scene-3');
    const allSelected = window.dateState.getAllItems();

    const drinksHtml = this.drinks.map(d => {
      const isSel = window.dateState.selectedDrinks.includes(d.name);
      return `
        <div class="menu-item-btn ${isSel ? 'selected' : ''}" onclick="Scene4.toggleItem(this, 'drink', '${d.name}')">
          <div class="menu-item-info">
            <span class="menu-item-emoji">${d.emoji}</span>
            <span class="menu-item-name">${d.name}</span>
          </div>
          <div class="menu-item-check">✓</div>
        </div>
      `;
    }).join('');

    const foodsHtml = this.foods.map(f => {
      const isSel = window.dateState.selectedFoods.includes(f.name);
      return `
        <div class="menu-item-btn ${isSel ? 'selected' : ''}" onclick="Scene4.toggleItem(this, 'food', '${f.name}')">
          <div class="menu-item-info">
            <span class="menu-item-emoji">${f.emoji}</span>
            <span class="menu-item-name">${f.name}</span>
          </div>
          <div class="menu-item-check">✓</div>
        </div>
      `;
    }).join('');

    const chipsHtml = allSelected.map(item => `
      <div class="tray-chip">
        <span>✨</span>
        <span>${item}</span>
      </div>
    `).join('');

    return `
      <div class="menu-card-overlay">
        <div class="menu-header">
          <div class="menu-tag">cafe menu</div>
          <h2 class="menu-title">THE BIRTHDAY GIRL'S MENU</h2>
          <p class="menu-subtitle">“don't worry. i remember your favorites.” ❤️</p>
        </div>

        <div class="menu-scroll-area">
          <div>
            <div class="menu-category-title">🥤 Drinks</div>
            <div class="menu-grid">${drinksHtml}</div>
          </div>

          <div>
            <div class="menu-category-title">🍴 Food</div>
            <div class="menu-grid">${foodsHtml}</div>
          </div>
        </div>

        <div class="order-tray-bar">
          <div class="tray-title-row">
            <span>your table. your rules.</span>
            <span class="tray-count-badge" id="trayCountBadge">${allSelected.length} items</span>
          </div>

          <div class="tray-chips-scroll" id="trayChips">
            ${chipsHtml || '<span style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">pick whatever you want...</span>'}
          </div>

          <button class="order-submit-btn" id="finishOrderBtn" ${allSelected.length === 0 ? 'disabled' : ''} onclick="Scene4.submitOrder()">
            <span>that's enough food 😂</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;
  },

  toggleItem(btnElement, category, name) {
    if (category === 'drink') {
      window.dateState.toggleDrink(name);
    } else {
      window.dateState.toggleFood(name);
    }

    const isSelected = category === 'drink'
      ? window.dateState.selectedDrinks.includes(name)
      : window.dateState.selectedFoods.includes(name);

    if (btnElement) {
      btnElement.classList.toggle('selected', isSelected);
    }

    this.updateTray();
  },

  updateTray() {
    const allSelected = window.dateState.getAllItems();
    const countBadge = document.getElementById('trayCountBadge');
    const chipsContainer = document.getElementById('trayChips');
    const finishBtn = document.getElementById('finishOrderBtn');

    if (countBadge) {
      countBadge.textContent = `${allSelected.length} items`;
    }

    if (chipsContainer) {
      if (allSelected.length === 0) {
        chipsContainer.innerHTML = '<span style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">pick whatever you want...</span>';
      } else {
        chipsContainer.innerHTML = allSelected.map(item => `
          <div class="tray-chip">
            <span>✨</span>
            <span>${item}</span>
          </div>
        `).join('');
      }
    }

    if (finishBtn) {
      finishBtn.disabled = (allSelected.length === 0);
    }
  },

  submitOrder() {
    if (window.DateTracker) {
      window.DateTracker.record('drinks_ordered', (window.dateState.selectedDrinks || []).join(', '));
      window.DateTracker.record('food_ordered', (window.dateState.selectedFoods || []).join(', '));
    }
    window.loadScene(Scene5);
  }
};

window.Scene4 = Scene4;
