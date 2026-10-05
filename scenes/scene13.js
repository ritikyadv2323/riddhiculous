// Scene 13: The Midnight Walk, Proposal & Forever Climax
const Scene13 = {
  step: 'walk', // 'walk' -> 'proposal' -> 'celebration'

  render() {
    this.step = 'walk';
    window.switchBackground('bg-scene-2');

    return `
      <!-- Top Status Banner -->
      <div class="scene-top-banner" id="proposalBanner">
        <span>🌙</span> <span>midnight walk</span>
      </div>

      <!-- Dialogue Bubble over Ritik -->
      <div class="speech-bubble-anchor" style="top: 68px; left: 24px; max-width: 400px;">
        <div class="speech-bubble" id="proposalBubble">
          <div class="speech-speaker">
            <span class="speaker-dot"></span>
            <span>ritik</span>
          </div>
          <div class="speech-text" id="proposalBubbleText">
            <p>“the night is so quiet and peaceful.”</p>
            <p>“just you, me, and the sleeping streets.”</p>
            <span class="interactive-prompt">“wait… stop here for a second.” 👀</span>
          </div>
        </div>
      </div>

      <!-- Center Proposal Ring Spotlight (Shown on proposal step) -->
      <div id="proposalStageArea" style="position:relative; z-index:15; display:none; flex-direction:column; align-items:center;"></div>

      <!-- Bottom Interactive Dock -->
      <div class="bottom-dock" id="proposalDock" style="bottom: 24px; left: 50%; transform: translateX(-50%); align-items: center;">
        <div id="proposalActionArea">
          <button class="dock-enter-btn" style="padding: 14px 34px; font-size: 1.05rem;" onclick="Scene13.toProposal()">
            <span>what is it?</span>
            <span class="btn-arrow">👀 →</span>
          </button>
        </div>
      </div>
    `;
  },

  noClickCount: 0,

  toProposal() {
    this.step = 'proposal';
    this.noClickCount = 0;
    window.switchBackground('bg-proposal');

    const bubble = document.getElementById('proposalBubble');
    const bubbleText = document.getElementById('proposalBubbleText');
    const banner = document.getElementById('proposalBanner');
    const stage = document.getElementById('proposalStageArea');
    const actionArea = document.getElementById('proposalActionArea');

    if (banner) banner.innerHTML = `<span>💍</span> <span>one question</span>`;

    if (bubble && bubbleText) {
      bubble.style.animation = 'none';
      bubble.offsetHeight;
      bubble.style.animation = 'bubbleFloat 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      bubbleText.innerHTML = `
        <p>“there's actually one last birthday gift…”</p>
        <p>“i don't just want one little café date with you.”</p>
        <p>“i want a lifetime of them.”</p>
        <span class="interactive-prompt" style="font-size:1.45rem; color:var(--accent-gold); margin-top:8px; display:block;">
          “will you marry me?” 💍❤️
        </span>
      `;
    }

    if (stage) {
      stage.style.display = 'none';
    }

    if (actionArea) {
      actionArea.innerHTML = `
        <div id="proposalButtonsWrapper" style="display:flex; align-items:center; justify-content:center; gap:16px; flex-wrap:wrap; transition:all 0.4s ease;">
          <button id="proposalYesBtn" class="dock-enter-btn" style="padding: 16px 42px; font-size: 1.1rem; background:linear-gradient(135deg, #ff9a76 0%, #e8505b 100%); color:#fff; box-shadow:0 10px 35px rgba(232,80,91,0.6); border:none; cursor:pointer; transition:all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275); position:relative; z-index:2;" onclick="Scene13.sayYes()">
            <span>YES! A MILLION TIMES YES! 💍😭❤️</span>
          </button>
          <button id="proposalNoBtn" class="dock-enter-btn" style="padding: 14px 28px; font-size: 0.95rem; background:rgba(35, 22, 16, 0.85); color:#d6c2b4; border:1px solid rgba(255,255,255,0.2); box-shadow:0 4px 15px rgba(0,0,0,0.5); cursor:pointer; transition:all 0.3s ease;" onclick="Scene13.clickNo()">
            <span>No... 🥺</span>
          </button>
        </div>
      `;
    }
  },

  clickNo() {
    this.noClickCount = (this.noClickCount || 0) + 1;
    const noBtn = document.getElementById('proposalNoBtn');
    const yesBtn = document.getElementById('proposalYesBtn');
    const bubbleText = document.getElementById('proposalBubbleText');

    if (this.noClickCount === 1) {
      if (bubbleText) {
        bubbleText.innerHTML = `
          <p>“wait… are you sure? think again, cutiepie… 👀”</p>
          <span class="interactive-prompt" style="font-size:1.45rem; color:var(--accent-gold); margin-top:8px; display:block;">
            “will you marry me?” 💍❤️
          </span>
        `;
      }
      if (noBtn) {
        noBtn.innerHTML = '<span>Wait, really? 🥺</span>';
        noBtn.style.transform = 'scale(0.92)';
      }
      if (yesBtn) {
        yesBtn.style.transform = 'scale(1.1)';
        yesBtn.style.boxShadow = '0 12px 40px rgba(232,80,91,0.8), 0 0 25px rgba(255,207,113,0.5)';
      }
    } else if (this.noClickCount === 2) {
      if (bubbleText) {
        bubbleText.innerHTML = `
          <p>“look at my eyes… you know you want to say yes! 🥹✨”</p>
          <span class="interactive-prompt" style="font-size:1.45rem; color:var(--accent-gold); margin-top:8px; display:block;">
            “will you marry me?” 💍❤️
          </span>
        `;
      }
      if (noBtn) {
        noBtn.innerHTML = '<span>Wrong button! 🙈</span>';
        noBtn.style.transform = 'scale(0.82)';
        noBtn.style.opacity = '0.75';
      }
      if (yesBtn) {
        yesBtn.style.transform = 'scale(1.22)';
        yesBtn.style.boxShadow = '0 15px 50px rgba(232,80,91,0.9), 0 0 35px rgba(255,207,113,0.8)';
      }
    } else if (this.noClickCount >= 3) {
      if (bubbleText) {
        bubbleText.innerHTML = `
          <p>“okay, that option has officially expired! 😂❤️”</p>
          <p>“forever with me is your only destiny.”</p>
          <span class="interactive-prompt" style="font-size:1.5rem; color:var(--accent-gold); margin-top:8px; display:block;">
            “will you marry me?” 💍❤️
          </span>
        `;
      }
      if (noBtn) {
        noBtn.style.transition = 'all 0.4s ease';
        noBtn.style.transform = 'scale(0)';
        noBtn.style.opacity = '0';
        setTimeout(() => noBtn.remove(), 400);
      }
      if (yesBtn) {
        yesBtn.style.transform = 'scale(1.3)';
        yesBtn.style.boxShadow = '0 20px 60px rgba(232,80,91,1), 0 0 45px rgba(255,207,113,0.9)';
      }
    }

    if (window.DateTracker) window.DateTracker.record('no_clicks_count', String(this.noClickCount));
  },

  sayYes() {
    this.step = 'celebration';
    window.switchBackground('bg-ring');

    if (window.DateTracker) {
      window.DateTracker.syncFinal('YES! A MILLION TIMES YES! 💍😭❤️', this.noClickCount);
    }

    const bubble = document.getElementById('proposalBubble');
    const banner = document.getElementById('proposalBanner');
    const stage = document.getElementById('proposalStageArea');
    const actionArea = document.getElementById('proposalActionArea');

    if (banner) banner.innerHTML = `<span>❤️</span> <span>she said yes!</span>`;

    // Firework Hearts & Stardust burst
    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = ['💍', '❤️', '✨', '💖', '🎉', '🌸'][i % 6];
        heart.style.left = `${Math.random() * window.innerWidth}px`;
        heart.style.top = `${Math.random() * (window.innerHeight * 0.7) + 60}px`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2200);
      }, i * 50);
    }

    if (stage) {
      stage.style.display = 'flex';
      stage.style.position = 'fixed';
      stage.style.top = '68px';
      stage.style.left = '24px';
      stage.style.zIndex = '20';
      stage.innerHTML = `
        <div style="background:rgba(20,13,9,0.92); border:1.5px solid var(--accent-gold); padding:22px 26px; border-radius:22px; max-width:390px; box-shadow:0 14px 40px rgba(0,0,0,0.75), 0 0 32px rgba(255,207,113,0.3); animation:popIn 0.8s cubic-bezier(0.16,1,0.3,1) forwards; backdrop-filter:blur(8px);">
          <h2 style="font-family:'Playfair Display',serif; font-size:1.45rem; color:#fff; margin-bottom:10px; line-height:1.35;">happy birthday my cutiepie, my forever ❤️</h2>
          <p style="font-size:0.95rem; line-height:1.65; color:var(--text-muted); margin-bottom:12px;">
            i hope this year gives you everything you've ever wished for.<br>
            more happiness. more peace. more reasons to smile.<br>
            and lots and lots of your favorite cold coffee with me. ☕️
          </p>
          <div style="font-family:'Caveat',cursive; font-size:1.6rem; color:var(--accent-gold); text-align:right;">
            — your ritik
          </div>
        </div>
      `;
    }

    if (bubble) bubble.style.display = 'none';

    const dock = document.getElementById('proposalDock');
    if (dock) dock.style.display = 'none';
    if (actionArea) actionArea.innerHTML = '';
  },

  finish() {
    // Remove existing modal if any name
    const existing = document.getElementById('romanticEndingModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'romantic-modal-backdrop';
    modal.id = 'romanticEndingModal';
    modal.onclick = (e) => {
      if (e.target === modal) Scene13.closeModal();
    };

    modal.innerHTML = `
      <div class="romantic-modal-card">
        <div class="romantic-modal-icon">💍</div>
        <div class="romantic-modal-subtitle">date complete • riddhiculous café</div>
        <h2 class="romantic-modal-title">forever begins tonight ❤️</h2>
        <p class="romantic-modal-text">
          thank you for spending this unforgettable night with me, my cutiepie.<br><br>
          every cup of coffee, every laugh, and every quiet step beside you is my favorite place in the whole world.
        </p>
        <div class="romantic-modal-signature">— your ritik</div>
        <div class="romantic-modal-actions">
          <button class="romantic-modal-btn-primary" onclick="Scene13.replayDate()">
            <span>☕️ relive our date from the start</span>
          </button>
          <button class="romantic-modal-btn-secondary" onclick="Scene13.closeModal()">
            <span>🌸 stay in this moment with you</span>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Extra celebratory burst
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = ['✨', '💍', '💖', '🌸'][i % 4];
        heart.style.left = `${Math.random() * window.innerWidth}px`;
        heart.style.top = `${Math.random() * (window.innerHeight * 0.7) + 60}px`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
      }, i * 60);
    }
  },

  closeModal() {
    const modal = document.getElementById('romanticEndingModal');
    if (modal) {
      modal.style.transition = 'opacity 0.3s ease';
      modal.style.opacity = '0';
      setTimeout(() => modal.remove(), 300);
    }
  },

  replayDate() {
    this.closeModal();
    if (window.Scene1) {
      window.loadScene(window.Scene1);
    } else {
      window.location.reload();
    }
  }
};

window.Scene13 = Scene13;
