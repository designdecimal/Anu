/**
 * Web Audio API synthesizer for romantic birthday sound effects and background music.
 * Works reliably client-side without any external network audio assets.
 */

class SoundSystem {
  private ctx: AudioContext | null = null;
  private musicPlaying = false;
  private musicTimeout: number | null = null;
  private isMuted = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.musicPlaying) {
      this.stopMusic();
    }
  }

  public getIsMuted() {
    return this.isMuted;
  }

  public getIsMusicPlaying() {
    return this.musicPlaying;
  }

  // Soft musical key tap
  public playKeyTap(noteIndex: number = 0) {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const baseFreqs = [523.25, 587.33, 659.25, 698.46, 783.99, 880.0, 987.77, 1046.5];
      const freq = baseFreqs[noteIndex % baseFreqs.length] || 523.25;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.19);
    } catch {
      // Audio context error safeguard
    }
  }

  // Unlock success chime fanfare (C5 - E5 - G5 - C6)
  public playUnlockSuccess() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const startTime = ctx.currentTime + idx * 0.1;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.46);
      });
    } catch {
      // Ignore
    }
  }

  // Subtle error wobble
  public playError() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.29);
    } catch {
      // Ignore
    }
  }

  // Gift open chime & sparkle
  public playGiftCelebration() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const chords = [
        [523.25, 659.25, 783.99],
        [587.33, 739.99, 880.0],
        [659.25, 830.61, 987.77],
        [783.99, 987.77, 1174.66, 1567.98]
      ];

      chords.forEach((chord, i) => {
        const time = ctx.currentTime + i * 0.16;
        chord.forEach(freq => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, time);

          gain.gain.setValueAtTime(0.08, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(time);
          osc.stop(time + 0.61);
        });
      });
    } catch {
      // Ignore
    }
  }

  // Flower bloom gentle harp chime
  public playBloomChime() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const notes = [659.25, 783.99, 880.0, 1046.5, 1318.51];
      notes.forEach((freq, idx) => {
        const time = ctx.currentTime + idx * 0.07;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.06, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.51);
      });
    } catch {
      // Ignore
    }
  }

  // Play "Happy Birthday" melody on a sweet music box tone
  public startBirthdayMelody() {
    if (this.musicPlaying || this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    this.musicPlaying = true;

    // Happy Birthday notes and durations (in beats)
    // Melody in Key of F: C4 C4 D4 C4 F4 E4 | C4 C4 D4 C4 G4 F4 | C4 C4 C5 A4 F4 E4 D4 | Bb4 Bb4 A4 F4 G4 F4
    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, Bb4 = 466.16, C5 = 523.25;

    const melody: [number, number][] = [
      [C4, 0.75], [C4, 0.25], [D4, 1], [C4, 1], [F4, 1], [E4, 2],
      [C4, 0.75], [C4, 0.25], [D4, 1], [C4, 1], [G4, 1], [F4, 2],
      [C4, 0.75], [C4, 0.25], [C5, 1], [A4, 1], [F4, 1], [E4, 1], [D4, 2],
      [Bb4, 0.75], [Bb4, 0.25], [A4, 1], [F4, 1], [G4, 1], [F4, 2.5]
    ];

    const tempoMs = 520; // ms per beat

    const playStep = (index: number) => {
      if (!this.musicPlaying || this.isMuted) return;

      if (index >= melody.length) {
        // Loop after a 2-second pause
        this.musicTimeout = window.setTimeout(() => playStep(0), 2000);
        return;
      }

      const [freq, durationBeats] = melody[index];
      const durationSec = (durationBeats * tempoMs) / 1000;

      try {
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        // Music box bell / celesta timbre
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime);

        gain.gain.setValueAtTime(0.07, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + Math.min(durationSec * 0.9, 1.4));

        osc.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc2.start();
        osc.stop(ctx.currentTime + durationSec);
        osc2.stop(ctx.currentTime + durationSec);
      } catch {
        // Ignore
      }

      this.musicTimeout = window.setTimeout(() => {
        playStep(index + 1);
      }, durationBeats * tempoMs);
    };

    playStep(0);
  }

  public stopMusic() {
    this.musicPlaying = false;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.musicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.setMuted(false);
      this.startBirthdayMelody();
      return true;
    }
  }
}

export const sound = new SoundSystem();
