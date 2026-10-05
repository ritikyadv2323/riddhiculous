// Real-time Date Tracker with SheetDB & LocalStorage
const DateTracker = {
  apiUrl: 'https://sheetdb.io/api/v1/tkbx0dbdl6963',
  isRowCreated: false,
  pendingSync: null,

  init() {
    if (!window.dateState.timestamp) {
      const storedTs = sessionStorage.getItem('date_ts');
      if (storedTs) {
        window.dateState.timestamp = storedTs;
        this.isRowCreated = true;
      } else {
        const d = new Date();
        const pad = n => String(n).padStart(2, '0');
        const ts = `Date_${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
        window.dateState.timestamp = ts;
        sessionStorage.setItem('date_ts', ts);
      }
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
      sip_shared: window.dateState.drinkSip || window.dateState.sipChoice || '',
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
    }, 300);
  },

  async sync() {
    this.init();
    const payload = this.getPayload();
    const tsKey = encodeURIComponent(window.dateState.timestamp);

    try {
      if (!this.isRowCreated) {
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

      // Update existing row
      const patchRes = await fetch(`${this.apiUrl}/timestamp/${tsKey}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload })
      });
      const patchData = await patchRes.json();
      
      // If no row was found to update, insert fresh row
      if (patchData && patchData.updated === 0) {
        await fetch(this.apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [payload] })
        });
        this.isRowCreated = true;
      }
    } catch (err) {
      console.warn('Silent tracker sync error:', err);
    }
  },

  async syncFinal(answer, noCount) {
    this.init();
    window.dateState.proposalAnswer = answer;
    window.dateState.noClicksCount = String(noCount ?? 0);
    window.dateState.status = 'SHE SAID YES! 💍❤️';

    const payload = this.getPayload();
    const tsKey = encodeURIComponent(window.dateState.timestamp);

    try {
      localStorage.setItem('dateChoices', JSON.stringify(payload));
    } catch (e) {}

    try {
      const res = await fetch(`${this.apiUrl}/timestamp/${tsKey}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload }),
        keepalive: true
      });
      const data = await res.json();
      if (data && data.updated > 0) return;
    } catch (e) {}

    // Fallback: If PATCH didn't match, POST complete final row
    try {
      await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [payload] }),
        keepalive: true
      });
    } catch (e) {}
  }
};

window.DateTracker = DateTracker;
