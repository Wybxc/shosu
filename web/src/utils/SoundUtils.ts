class SoundUtils {
  private holdSound: HTMLAudioElement | null = null;
  private finishSound: HTMLAudioElement | null = null;

  constructor() {
    // Preload audio files
    this.holdSound = new Audio('/processing.wav');
    this.holdSound.loop = true;
    this.finishSound = new Audio('/finished.wav');
    this.finishSound.loop = false;
  }

  playHoldSound() {
    try {
      if (this.holdSound) {
        this.holdSound.currentTime = 0;
        this.holdSound.play().catch(err => console.error('Error playing hold sound:', err));
      }
    } catch (e) {
      console.error('Error playing hold sound:', e);
    }
  }

  stopHoldSound() {
    try {
      if (this.holdSound) {
        this.holdSound.pause();
        this.holdSound.currentTime = 0;
      }
    } catch (e) {
      console.error('Error stopping hold sound:', e);
    }
  }

  playFinishSound() {
    try {
      if (this.finishSound) {
        this.finishSound.currentTime = 0;
        this.finishSound.play().catch(err => console.error('Error playing finish sound:', err));
      }
    } catch (e) {
      console.error('Error playing finish sound:', e);
    }
  }

  release() {
    this.stopHoldSound();
    if (this.finishSound) {
      this.finishSound.pause();
      this.finishSound.currentTime = 0;
    }
  }
}

export default SoundUtils;
