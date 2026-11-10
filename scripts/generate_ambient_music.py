# Generates a short, original, royalty-free ambient background loop (no external
# audio, no copyrighted samples — pure synthesized sine/harmonic tones).
# Usage: python scripts/generate_ambient_music.py
import math
import struct
import wave
import os

SAMPLE_RATE = 44100
DURATION = 40.0          # seconds, loops via the <audio loop> attribute
AMPLITUDE_PEAK = 0.32     # keep it mild; JS also sets <audio>.volume = 0.25

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_PATH = os.path.join(ROOT, "audio", "ambient.wav")

# C major pentatonic, two octaves — always sounds consonant, good for ambient loops.
SCALE = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00]
PAD_CHORD = [130.81, 164.81, 196.00]  # low C-E-G sustained pad


def note_envelope(t, start, attack=0.08, release=1.6):
    """Soft attack / slow release envelope, 0 outside [start, start+attack+release]."""
    local = t - start
    dur = attack + release
    if local < 0 or local > dur:
        return 0.0
    if local < attack:
        return local / attack
    return max(0.0, 1.0 - (local - attack) / release)


def fade(t, total, fade_len=2.5):
    if t < fade_len:
        return t / fade_len
    if t > total - fade_len:
        return max(0.0, (total - t) / fade_len)
    return 1.0


def build_melody_events():
    """A gentle, slowly repeating arpeggio — one soft note roughly every 1.4s."""
    events = []
    t = 1.0
    i = 0
    pattern = [0, 2, 4, 5, 4, 2, 7, 4, 2, 0, 4, 5]
    while t < DURATION - 2.0:
        note = SCALE[pattern[i % len(pattern)]]
        events.append((t, note))
        t += 1.4
        i += 1
    return events


def sample_value(t, melody):
    value = 0.0

    # Sustained low pad chord with a slow breathing swell.
    swell = 0.5 + 0.5 * math.sin(2 * math.pi * 0.06 * t)
    for freq in PAD_CHORD:
        value += 0.05 * swell * math.sin(2 * math.pi * freq * t)

    # Soft arpeggio notes with a touch of octave harmonic for warmth.
    for start, freq in melody:
        env = note_envelope(t, start)
        if env <= 0:
            continue
        value += env * 0.22 * math.sin(2 * math.pi * freq * t)
        value += env * 0.07 * math.sin(2 * math.pi * freq * 2 * t)

    return value


def main():
    melody = build_melody_events()
    n_samples = int(SAMPLE_RATE * DURATION)
    frames = bytearray()

    for n in range(n_samples):
        t = n / SAMPLE_RATE
        raw = sample_value(t, melody) * fade(t, DURATION)
        clamped = max(-1.0, min(1.0, raw * AMPLITUDE_PEAK / 0.4))
        sample = int(clamped * 32767)
        frames += struct.pack("<h", sample)

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with wave.open(OUT_PATH, "w") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(bytes(frames))

    print(f"Wrote {OUT_PATH} ({DURATION:.0f}s, {SAMPLE_RATE} Hz mono)")


if __name__ == "__main__":
    main()
