// Scene 9: The Polaroid Keepsake Photo
const Scene9 = {
  render() {
    window.switchBackground('bg-scene-selfie');

    return `
      <!-- Top Status Banner -->
      <div class="scene-top-banner">
        <span>📸</span> <span>polaroid memory</span>
      </div>

      <div class="polaroid-wrapper">
        <div class="polaroid-frame">
          <div class="washi-tape"></div>
          <div class="polaroid-img-container">
            <img src="polaroid_photo.jpg" alt="Our Café Date Selfie" class="polaroid-img">
          </div>
          <div class="polaroid-caption">
            proof that we actually went on this date. ❤️
          </div>
          <div class="polaroid-date">
            midnight café date • birthday edition
          </div>
        </div>

        <button class="action-btn" onclick="Scene9.next()">
          <span>keep this memory</span>
          <span class="btn-arrow">❤️ →</span>
        </button>
      </div>
    `;
  },

  next() {
    if (window.Scene10) {
      window.loadScene(Scene10);
    } else {
      alert("✨ Memory saved! Scene 10: The Café Receipt coming right up!");
    }
  }
};

window.Scene9 = Scene9;
