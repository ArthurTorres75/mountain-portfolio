// Procedural ambient sounds via Web Audio API — no audio files required.
// Each factory returns { gainNode, stop } where gainNode is the MASTER gain.
//
// IMPORTANT: LFO tremolo is routed through a separate modGain node so that
// setting gainNode.gain = 0 actually silences the output. If you wire the LFO
// directly to gainNode.gain, the oscillation bleeds through even at gain = 0.

type SoundHandle = { gainNode: GainNode; stop: () => void };

function createWhiteNoise(ctx: AudioContext, durationSecs = 3): AudioBufferSourceNode {
  const bufferSize = ctx.sampleRate * durationSecs;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

// Graph: source → lowpass × 2 → masterGain → out (no LFO — clean water rumble)
export function createRiverSound(ctx: AudioContext, volume = 0.18): SoundHandle {
  const source = createWhiteNoise(ctx);

  const lp1 = ctx.createBiquadFilter();
  lp1.type = "lowpass";
  lp1.frequency.value = 900;

  const lp2 = ctx.createBiquadFilter();
  lp2.type = "lowpass";
  lp2.frequency.value = 1400;

  const gainNode = ctx.createGain();
  gainNode.gain.value = volume;

  source.connect(lp1);
  lp1.connect(lp2);
  lp2.connect(gainNode);
  gainNode.connect(ctx.destination);
  source.start();

  return { gainNode, stop: () => { try { source.stop(); } catch { /* already stopped */ } } };
}

// Graph: source → bandpass → modGain (LFO tremolo ±0.3) → masterGain → out
// masterGain = 0 → silence regardless of LFO state
export function createWindSound(ctx: AudioContext, volume = 0.10): SoundHandle {
  const source = createWhiteNoise(ctx, 4);

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 350;
  bp.Q.value = 0.4;

  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.4; // slow gusts

  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.3;

  // modGain carries the tremolo — LFO modulates its gain around 1.0
  const modGain = ctx.createGain();
  modGain.gain.value = 1.0;

  // masterGain is the single control point for volume / muting
  const gainNode = ctx.createGain();
  gainNode.gain.value = volume;

  lfo.connect(lfoGain);
  lfoGain.connect(modGain.gain); // tremolo into modGain

  source.connect(bp);
  bp.connect(modGain);
  modGain.connect(gainNode);     // tremolo sound into master
  gainNode.connect(ctx.destination);

  source.start();
  lfo.start();

  return {
    gainNode,
    stop: () => {
      try { source.stop(); } catch { /* already stopped */ }
      try { lfo.stop(); }    catch { /* already stopped */ }
    },
  };
}

// Graph: source → lowpass → modGain (LFO crackle ±0.12) → masterGain → out
export function createFireSound(ctx: AudioContext, volume = 0.08): SoundHandle {
  const source = createWhiteNoise(ctx, 2);

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 600;

  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 8; // fast crackle modulation

  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.12;

  const modGain = ctx.createGain();
  modGain.gain.value = 1.0;

  const gainNode = ctx.createGain();
  gainNode.gain.value = volume;

  lfo.connect(lfoGain);
  lfoGain.connect(modGain.gain);

  source.connect(lp);
  lp.connect(modGain);
  modGain.connect(gainNode);
  gainNode.connect(ctx.destination);

  source.start();
  lfo.start();

  return {
    gainNode,
    stop: () => {
      try { source.stop(); } catch { /* already stopped */ }
      try { lfo.stop(); }    catch { /* already stopped */ }
    },
  };
}

// Ramp volume over `durationSecs` to avoid audio clicks on zone transitions
export function rampGain(gainNode: GainNode, target: number, durationSecs = 0.8): void {
  gainNode.gain.linearRampToValueAtTime(
    target,
    gainNode.context.currentTime + durationSecs,
  );
}

// Dog bark: filtered noise with a separate envelope gain so the proximity
// masterGain (gainNode) can be set independently without fighting the pulses.
// Graph: noise → bandpass → envelopeGain (bark pulses) → gainNode (proximity) → out
export function createBarkSound(ctx: AudioContext, volume = 0): SoundHandle {
  const source = createWhiteNoise(ctx, 2);

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 900;
  bp.Q.value = 2.0;

  const envelopeGain = ctx.createGain();
  envelopeGain.gain.value = 0;

  const gainNode = ctx.createGain();
  gainNode.gain.value = volume;

  source.connect(bp);
  bp.connect(envelopeGain);
  envelopeGain.connect(gainNode);
  gainNode.connect(ctx.destination);
  source.start();

  let stopped = false;
  function scheduleBark() {
    if (stopped) return;
    const now = ctx.currentTime;
    envelopeGain.gain.cancelScheduledValues(now);
    envelopeGain.gain.setValueAtTime(0, now);
    envelopeGain.gain.linearRampToValueAtTime(1, now + 0.02);
    envelopeGain.gain.setValueAtTime(1, now + 0.18);
    envelopeGain.gain.linearRampToValueAtTime(0, now + 0.30);
    if (Math.random() > 0.5) {
      envelopeGain.gain.setValueAtTime(0, now + 0.45);
      envelopeGain.gain.linearRampToValueAtTime(0.7, now + 0.47);
      envelopeGain.gain.setValueAtTime(0.7, now + 0.62);
      envelopeGain.gain.linearRampToValueAtTime(0, now + 0.74);
    }
    setTimeout(scheduleBark, 3500 + Math.random() * 5500);
  }
  setTimeout(scheduleBark, 1000 + Math.random() * 2000);

  return {
    gainNode,
    stop: () => { stopped = true; try { source.stop(); } catch { /* ok */ } },
  };
}

// Bird chirps: scheduled oscillator sweeps, occasional (8–20 s intervals).
// Graph: per-chirp osc → per-chirp env → gainNode (mute master) → out
export function createBirdChirpSound(ctx: AudioContext, volume = 0.15): SoundHandle {
  const gainNode = ctx.createGain();
  gainNode.gain.value = volume;
  gainNode.connect(ctx.destination);

  let stopped = false;
  function scheduleChirp() {
    if (stopped) return;
    const now = ctx.currentTime;
    const count = 1 + Math.floor(Math.random() * 3);
    for (let n = 0; n < count; n++) {
      const t = now + n * (0.12 + Math.random() * 0.08);
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1800 + Math.random() * 1200, t);
      osc.frequency.linearRampToValueAtTime(2400 + Math.random() * 800, t + 0.07);
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(1, t + 0.015);
      env.gain.setValueAtTime(1, t + 0.07);
      env.gain.linearRampToValueAtTime(0, t + 0.13);
      osc.connect(env);
      env.connect(gainNode);
      osc.start(t);
      osc.stop(t + 0.16);
    }
    setTimeout(scheduleChirp, 8000 + Math.random() * 12000);
  }
  setTimeout(scheduleChirp, 2000 + Math.random() * 4000);

  return {
    gainNode,
    stop: () => { stopped = true; },
  };
}
