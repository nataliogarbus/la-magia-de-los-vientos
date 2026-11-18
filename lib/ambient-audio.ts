export type SoundMood = 'ambient' | 'ruido-mental' | 'tension' | 'desanimo';

const MOOD_FREQUENCIES: Record<SoundMood, number[]> = {
  // Re menor 9 cálido (D3, A3, E4, F4)
  ambient: [146.83, 220.0, 329.63, 349.23],
  // Sol grave en quinta abierta (G2, D3, A3, B3) — enraizamiento
  'ruido-mental': [98.0, 146.83, 220.0, 246.94],
  // Do sostenido / La cálido (A2, E3, B3, C#4) — distensión
  tension: [110.0, 164.81, 246.94, 277.18],
  // Fa mayor 7 luminoso (F3, C4, E4, A4) — apertura vital
  desanimo: [174.61, 261.63, 329.63, 440.0],
};

export class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private lfo: OscillatorNode | null = null;
  private isPlaying = false;
  private currentVolume = 0.25;

  public start(mood: SoundMood = 'ambient', volume = 0.25) {
    if (typeof window === 'undefined') return;
    this.stop();

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const masterGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(680, ctx.currentTime);
    filter.Q.setValueAtTime(0.7, ctx.currentTime);

    this.currentVolume = Math.max(0, Math.min(1, volume));
    masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(
      Math.max(0.001, this.currentVolume * 0.18),
      ctx.currentTime + 1.8
    );

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    // LFO suave para efecto de respiración orgánica
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
    lfoGain.gain.setValueAtTime(140, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    const freqs = MOOD_FREQUENCIES[mood] || MOOD_FREQUENCIES.ambient;
    const oscs: OscillatorNode[] = [];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const voiceGain = ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      // Desafinación sutil para calidez acústica
      osc.detune.setValueAtTime((idx - 1.5) * 3.5, ctx.currentTime);

      voiceGain.gain.setValueAtTime(0.22 / (idx * 0.35 + 1), ctx.currentTime);

      osc.connect(voiceGain);
      voiceGain.connect(filter);
      osc.start();
      oscs.push(osc);
    });

    this.ctx = ctx;
    this.masterGain = masterGain;
    this.oscillators = oscs;
    this.lfo = lfo;
    this.isPlaying = true;
  }

  public setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.ctx && this.masterGain && this.isPlaying) {
      this.masterGain.gain.setTargetAtTime(
        Math.max(0.0001, this.currentVolume * 0.18),
        this.ctx.currentTime,
        0.15
      );
    }
  }

  public playContrastTexture(kind: 'ruido-mental' | 'tension' | 'desanimo') {
    if (typeof window === 'undefined') return;

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.connect(ctx.destination);

    const patterns: Record<typeof kind, number[]> = {
      'ruido-mental': [523.25, 554.37, 587.33, 523.25, 622.25, 587.33], // pulso rápido inquieto
      tension: [220.0, 233.08, 220.0, 233.08], // segunda menor tensa
      desanimo: [293.66, 261.63, 220.0, 196.0], // descenso apagado
    };

    const notes = patterns[kind];
    const stepDur = kind === 'ruido-mental' ? 0.22 : 0.45;

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const startAt = ctx.currentTime + i * stepDur;

      osc.type = kind === 'tension' ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, startAt);

      noteGain.gain.setValueAtTime(0.001, startAt);
      noteGain.gain.exponentialRampToValueAtTime(0.06, startAt + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.001, startAt + stepDur);

      osc.connect(noteGain);
      noteGain.connect(gain);
      osc.start(startAt);
      osc.stop(startAt + stepDur + 0.02);
    });

    gain.gain.setValueAtTime(1, ctx.currentTime);
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, notes.length * stepDur * 1000 + 250);
  }

  public stop() {
    if (!this.ctx) {
      this.isPlaying = false;
      return;
    }

    const ctx = this.ctx;
    const gain = this.masterGain;
    const oscs = this.oscillators;
    const lfo = this.lfo;

    this.ctx = null;
    this.masterGain = null;
    this.oscillators = [];
    this.lfo = null;
    this.isPlaying = false;

    try {
      if (gain) {
        gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.25);
      }
      setTimeout(() => {
        oscs.forEach((o) => {
          try {
            o.stop();
          } catch {
            // ignorar
          }
        });
        try {
          lfo?.stop();
        } catch {
          // ignorar
        }
        ctx.close().catch(() => {});
      }, 450);
    } catch {
      ctx.close().catch(() => {});
    }
  }
}
