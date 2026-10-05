// Scene 8b: Sitting Next to Her & Posing with the Camera
const Scene8b = {
  render() {
    window.switchBackground('bg-scene-selfie');

    return `
      <!-- Camera Flash Overlay -->
      <div class="camera-flash-overlay" id="cameraFlash"></div>

      <!-- Top Status Banner -->
      <div class="scene-top-banner">
        <span>📸</span> <span>selfie mode</span>
      </div>

      <!-- Dialogue Bubble -->
      <div class="speech-bubble-anchor" style="top: 68px; left: 24px; max-width: 360px;">
        <div class="speech-bubble" id="scene8bBubble">
          <div class="speech-speaker">
            <span class="speaker-dot"></span>
            <span>ritik</span>
          </div>
          <div class="speech-text">
            <p>“ready? smile, birthday girl! 📸✨”</p>
            <span class="interactive-prompt">“three… two… one… say coffee! ☕”</span>
          </div>
        </div>
      </div>

      <!-- Bottom Interactive Dock with Shutter Button -->
      <div class="bottom-dock" style="bottom: 24px; left: 50%; transform: translateX(-50%); align-items: center;">
        <button class="dock-enter-btn" style="padding: 16px 36px; font-size: 1.1rem; box-shadow: 0 10px 30px rgba(212, 128, 57, 0.6);" onclick="Scene8b.snap()">
          <span>📸 SNAP PHOTO</span>
        </button>
      </div>
    `;
  },

  snap() {
    const flash = document.getElementById('cameraFlash');
    if (flash) {
      flash.classList.add('flashing');
      setTimeout(() => {
        flash.classList.remove('flashing');
        window.loadScene(Scene9);
      }, 250);
    } else {
      window.loadScene(Scene9);
    }
  }
};

window.Scene8b = Scene8b;
