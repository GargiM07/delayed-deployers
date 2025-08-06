import React, { useEffect, useState } from 'react';

const pianoMap = {
  z: 'C', s: 'C#', x: 'D', d: 'D#', c: 'E',
  v: 'F', g: 'F#', b: 'G', h: 'G#', n: 'A',
  j: 'A#', m: 'B'
};

const basicMap = {
  z: 'C', x: 'D', c: 'E', v: 'F', b: 'G', n: 'A', m: 'B'
};

export default function InstrumentPlayer() {
  const [instrument, setInstrument] = useState('keyboard');

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const map = instrument === 'keyboard' ? pianoMap : basicMap;
      const note = map[key];

      if (note) {
        const audio = new Audio(`/sounds/${instrument}/${note}.wav`);
        audio.play().catch(err => {
          console.error("Audio play error:", err);
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [instrument]);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '2rem' }}>
      <h1>🎹 Instrument Player</h1>

      <label htmlFor="instrument">Choose Instrument: </label>
      <select
        id="instrument"
        value={instrument}
        onChange={(e) => setInstrument(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      >
        <option value="keyboard">Keyboard</option>
        <option value="guitar">Guitar</option>
        <option value="drums">Drums</option>
      </select>

      <p style={{ marginTop: '1.5rem' }}>
        Press keys:
        <br />
        <strong>
          {instrument === 'keyboard'
            ? 'Z, S, X, D, C, V, G, B, H, N, J, M'
            : 'Z, X, C, V, B, N, M'}
        </strong>
        <br />
        to play notes
      </p>
    </div>
  );
}
