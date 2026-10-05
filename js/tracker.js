// Real-time Date Tracker with SheetDB & LocalStorage
const DateTracker = {
  apiUrl: 'https://sheetdb.io/api/v1/tkbx0dbdl6963',
  isRowCreated: false,
  pendingSync: null,

  init() {
    if (!window.dateState.timestamp) {
      const now = new Date();
      window.dateState.timestamp = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
  },

  getPayload() {
    return {
      timestamp: window.dateState.timestamp || '',
      seat_chosen: window.dateState.seatLabel || window.dateState.seat || '',
      first_action: window.dateState.firstAction || '',
      drinks_ordered: (window.dateState.selectedDrinks || []).join(', '),
      food_ordered: (window.dateState.selectedFoods || []).join(', '),
      order_defense: window.dateState.orderDefense || '',
      sip_shared: window.dateState.sipChoice || '',
      bite_shared: window.dateState.foodShare || '',
      sit_next_choice: window.dateState.sitNextChoice || '',
      no_clicks_count: String(window.dateState.noClicksCount ?? 0),
      proposal_answer: window.dateState.proposalAnswer || '',
      status: window.dateState.status || 'Date In Progress'
    };
  },

  record(key, value) {
    this.init();
    window.dateState[key] = value;
    try {
      localStorage.setItem('dateChoices', JSON.stringify(this.getPayload()));
    } catch (e) {}

    // Debounced background sync
    if (this.pendingSync) clearTimeout(this.pendingSync);
    this.pendingSync = setTimeout(() => {
      this.sync();
    }, 600);
  },

  async sync() {
    this.init();
    const payload = this.getPayload();
    const tsKey = encodeURIComponent(window.dateState.timestamp);

    try {
      if (!this.isRowCreated) {
        // Try creating initial row
        const res = await fetch(this.apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [payload] })
        });
        if (res.ok) {
          this.isRowCreated = true;
          return;
        }
      }

      // If already created, update existing row
      await fetch(`${this.apiUrl}/timestamp/${tsKey}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload })
      });
    } catch (err) {
      console.warn('Silent sync error (offline or network):', err);
    }
  },

  async syncFinal(answer, noCount) {
    this.init();
    window.dateState.proposalAnswer = answer;
    window.dateState.noClicksCount = noCount;
    window.dateState.status = 'SHE SAID YES! 💍❤️';

    const payload = this.getPayload();
    const tsKey = encodeURIComponent(window.dateState.timestamp);

    try {
      localStorage.setItem('dateChoices', JSON.stringify(payload));
    } catch (e) {}

    try {
      // Use keepalive for final proposal response to ensure it reaches sheet
      await fetch(`${this.apiUrl}/timestamp/${tsKey}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload }),
        keepalive: true
      });
    } catch (e) {
      // Fallback post
      fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [payload] }),
        keepalive: true
      });
    }
  }
};

window.DateTracker = DateTracker;
