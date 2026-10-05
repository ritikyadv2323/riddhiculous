// Scene 1: The Opening Screen
const Scene1 = {
  render() {
    window.switchBackground('bg-scene-1');
    return `
      <div class="screen-1-container">
        <div class="story-card">
          <div class="cafe-tag">
            <span>☕</span> one little birthday café date
          </div>

          <h1 class="story-title">
            hi cutiepie Riddhi ☕️
          </h1>

          <div class="story-lines">
            <p class="story-line">i made you something small.</p>
            <p class="story-line">not a letter. not a long paragraph.</p>
            <p class="story-line highlight">just one little café date.</p>
            <p class="story-line interactive">and this time, you decide what happens.</p>
          </div>

          <button class="action-btn" onclick="Scene1.start()">
            <span>start our date</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
    `;
  },

  start() {
    if (!window.isAudioPlaying()) window.toggleMusic();
    if (window.DateTracker) window.DateTracker.record('status', 'Date Started');
    window.loadScene(Scene2);
  }
};

window.Scene1 = Scene1;
