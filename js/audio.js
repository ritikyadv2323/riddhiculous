// Continuous Ambient Lo-Fi Synth Audio Manager
let audioCtx = null;
let isPlaying = false;
let audioInterval = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

const chords = [
  [349.23, 440.0, 523.25, 659.25], // Fmaj7
  [261.63, 329.63, 392.0, 493.88], // Cmaj7
  [293.66, 349.23, 440.0, 523.25], // Dm7
  [220.0, 261.63, 329.63, 392.0]   // Am7
];
let chordIdx = 0;

function playWarmChord(freqs) {
  if (!audioCtx || !isPlaying) return;
  freqs.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750 + i * 50, audioCtx.currentTime);

    const startTime = audioCtx.currentTime + (i * 0.04);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.04, startTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + 4.0);
  });
}

function toggleMusic() {
  initAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const musicBtn = document.getElementById('musicToggle');
  const musicText = document.getElementById('musicText');

  if (!isPlaying) {
    isPlaying = true;
    if (musicBtn) musicBtn.classList.add('music-playing');
    if (musicText) musicText.textContent = 'café music playing ☕';
    playWarmChord(chords[chordIdx]);
    audioInterval = setInterval(() => {
      chordIdx = (chordIdx + 1) % chords.length;
      playWarmChord(chords[chordIdx]);
    }, 3800);
  } else {
    isPlaying = false;
    if (musicBtn) musicBtn.classList.remove('music-playing');
    if (musicText) musicText.textContent = 'play café music';
    clearInterval(audioInterval);
  }
}

window.toggleMusic = toggleMusic;
window.initAudio = initAudio;
window.isAudioPlaying = () => isPlaying;
