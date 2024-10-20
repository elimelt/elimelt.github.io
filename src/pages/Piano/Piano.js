import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import styled from 'styled-components';

// Initialize the Tone.js Sampler
const sampler = new Tone.Sampler({
  urls: {
    A0: "A0.mp3",
    C1: "C1.mp3",
    "D#1": "Ds1.mp3",
    "F#1": "Fs1.mp3",
    A1: "A1.mp3",
    C2: "C2.mp3",
    "D#2": "Ds2.mp3",
    "F#2": "Fs2.mp3",
    A2: "A2.mp3",
    C3: "C3.mp3",
    "D#3": "Ds3.mp3",
    "F#3": "Fs3.mp3",
    A3: "A3.mp3",
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
    C5: "C5.mp3",
    "D#5": "Ds5.mp3",
    "F#5": "Fs5.mp3",
    A5: "A5.mp3",
    C6: "C6.mp3",
    "D#6": "Ds6.mp3",
    "F#6": "Fs6.mp3",
    A6: "A6.mp3",
    C7: "C7.mp3",
    "D#7": "Ds7.mp3",
    "F#7": "Fs7.mp3",
    A7: "A7.mp3",
    C8: "C8.mp3",
  },
  release: 1,
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

// Key to note mapping
const keyMap = {
  a: 'C4',
  w: 'C#4',
  s: 'D4',
  e: 'D#4',
  d: 'E4',
  f: 'F4',
  t: 'F#4',
  g: 'G4',
  y: 'G#4',
  h: 'A4',
  u: 'A#4',
  j: 'B4',
  k: 'C5',
  o: 'C#5',
  l: 'D5',
  p: 'D#5',
  ';': 'E5',
  "'": 'F5',
  '[': 'F#5',
  ']': 'G5'
};

// Styled components
const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Keyboard = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
  margin-top: 20px;
`;

const Key = styled.div`
  position: relative;
  display: inline-block;
  width: ${props => (props.isBlack ? '30px' : '40px')};
  height: ${props => (props.isBlack ? '100px' : '150px')};
  margin-left: ${props => (props.isBlack ? '-15px' : '1px')};
  margin-right: ${props => (props.isBlack ? '-15px' : '1px')};
  background-color: ${props => (props.isBlack ? 'black' : 'white')};
  color: ${props => (props.isBlack ? 'white' : 'black')};
  border: 1px solid black;
  cursor: pointer;
  text-align: center;
  transition: background 0.1s;
  z-index: ${props => (props.isBlack ? '1' : '0')};

  ${props =>
    props.isActive &&
    `
    background-color: yellow;
  `}
`;

const KeyLabel = styled.span`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
`;

// Main Piano Component
const Piano = () => {
  const [activeNotes, setActiveNotes] = useState(new Set());

  // Play the note when a key is pressed
  const playNote = (note) => {
    sampler.triggerAttack(note);
    setActiveNotes((prev) => new Set(prev.add(note)));
  };

  // Stop the note when the key is released
  const stopNote = (note) => {
    sampler.triggerRelease(note);
    setActiveNotes((prev) => {
      prev.delete(note);
      return new Set(prev);
    });
  };

  // Handle key down event for keyboard
  const handleKeyDown = (e) => {
    const note = keyMap[e.key];
    if (note && !activeNotes.has(note)) {
      playNote(note);
    }
  };

  // Handle key up event for keyboard
  const handleKeyUp = (e) => {
    const note = keyMap[e.key];
    if (note && activeNotes.has(note)) {
      stopNote(note);
    }
  };

  // Play note when mouse clicks the key
  const handleMouseDown = (note) => {
    playNote(note);
  };

  // Stop note when mouse releases the key
  const handleMouseUp = (note) => {
    stopNote(note);
  };

  // Add event listeners for keyboard input
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeNotes]);

  return (
    <Container>
      <Keyboard>
        {Object.keys(keyMap).map((key, index) => {
          const note = keyMap[key];
          const isBlack = note.includes('#');
          return (
            <Key
              key={index}
              isBlack={isBlack}
              isActive={activeNotes.has(note)}
              onMouseDown={() => handleMouseDown(note)}
              onMouseUp={() => handleMouseUp(note)}
            >
              <KeyLabel>{key.toUpperCase()}</KeyLabel>
            </Key>
          );
        })}
      </Keyboard>
    </Container>
  );
};

export default Piano;
