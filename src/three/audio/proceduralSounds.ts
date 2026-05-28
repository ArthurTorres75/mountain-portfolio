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
