import React, { useEffect, useState } from 'react'
import * as Tone from 'tone'
import styled from 'styled-components'

const keyMap = {
  // Keyboard-to-note mapping (C4 is the middle octave)
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
}

const noteMap = Object.fromEntries(
  Object.entries(keyMap).map(([k, v]) => [v, k])
)

const ConfigSetter = ({ config, setConfig }) => {
  const [oscillatorType, setOscillatorType] = useState(config.oscillator.type)
  const [envelopeAttack, setEnvelopeAttack] = useState(config.envelope.attack)
  const [envelopeDecay, setEnvelopeDecay] = useState(config.envelope.decay)
  const [envelopeSustain, setEnvelopeSustain] = useState(
    config.envelope.sustain
  )
  const [envelopeRelease, setEnvelopeRelease] = useState(
    config.envelope.release
  )

  useEffect(() => {
    setConfig(prev => ({
      ...prev,
      oscillator: {
        ...prev.oscillator,
        type: oscillatorType
      },
      envelope: {
        ...prev.envelope,
        attack: envelopeAttack,
        decay: envelopeDecay,
        sustain: envelopeSustain,
        release: envelopeRelease
      }
    }))
  }, [
    oscillatorType,
    envelopeAttack,
    envelopeDecay,
    envelopeSustain,
    envelopeRelease
  ])

  return (
    <div>
      <h2>Config</h2>
      <label>
        Oscillator Type:
        <select
          value={oscillatorType}
          onChange={e => setOscillatorType(e.target.value)}
        >
          {[
            'sine',
            'square',
            'sawtooth',
            'triangle',
            'pulse',
            'pwm',
            'amsine',
            'fatsine',
            'fmsine',
            'amtriangle',
            'fattriangle',
            'fmsquare',
            'fatsquare',
            'fmsawtooth',
            'fatsawtooth'
          ].map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label>
        Envelope Attack:
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={envelopeAttack}
          onChange={e => setEnvelopeAttack(e.target.value)}
        />
        {envelopeAttack}
      </label>
      <label>
        Envelope Decay:
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={envelopeDecay}
          onChange={e => setEnvelopeDecay(e.target.value)}
        />
        {envelopeDecay}
      </label>
      <label>
        Envelope Sustain:
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={envelopeSustain}
          onChange={e => setEnvelopeSustain(e.target.value)}
        />
        {envelopeSustain}
      </label>

      <label>
        Envelope Release:
        <input
          type='range'
          min='0'
          max='5'
          step='0.01'
          value={envelopeRelease}
          onChange={e => setEnvelopeRelease(e.target.value)}
        />
        {envelopeRelease}
      </label>
    </div>
  )
}

const Synth = () => {
  const [octave, setOctave] = useState(0) // Control the current octave
  const [activeNotes, setActiveNotes] = useState([]) // Track which notes are being played
  const [config, setConfig] = useState({
    oscillator: {
      type: 'amtriangle',
      harmonicity: 0.5,
      modulationType: 'sine'
    },
    envelope: {
      attackCurve: 'exponential',
      attack: 0.05,
      decay: 0.2,
      sustain: 0.2,
      release: 1.5
    },
    detune: 0,
    portamento: 0.05
  })

  const [configSource, setConfigSource] = useState(
    JSON.stringify(config, null, 2)
  )

  useEffect(() => {
    try {
      const newConfig = JSON.parse(configSource)
      setConfig(newConfig)
    } catch (e) {
      console.error(e)
    }
  }, [configSource])

  const synth = new Tone.Synth({
    ...config
  }).toDestination()

  const playNote = note => {
    const noteWithOctave = note.replace(
      /(\d)/,
      match => parseInt(match) + octave
    )
    synth.triggerAttackRelease(noteWithOctave, '8n')
    setActiveNotes(prev => [...new Set([...prev, noteWithOctave])])
  }

  const stopNote = note => {
    const noteWithOctave = note.replace(
      /(\d)/,
      match => parseInt(match) + octave
    )
    setActiveNotes(prev => prev.filter(n => n !== noteWithOctave))
  }

  const handleKeyDown = e => {
    if (e.key === 'z') {
      setOctave(oct => Math.max(oct - 1, -2))
    } else if (e.key === 'x') {
      setOctave(oct => Math.min(oct + 1, 2))
    } else if (keyMap[e.key]) {
      playNote(keyMap[e.key])
    }
  }

  const handleKeyUp = e => {
    if (keyMap[e.key]) {
      stopNote(keyMap[e.key])
    }
  }

  const handleMouseDown = note => {
    playNote(note)
  }

  const handleMouseUp = note => {
    stopNote(note)
  }

  const handleMouseOver = (e, note) => {
    if (e.buttons === 1) {
      // If the mouse is pressed, play the note
      playNote(note)
    }
  }

  const handleMouseOut = note => {
    stopNote(note)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [octave])

  return (
    <Container>
      <h1>Synth</h1>
      <p>Play notes using the keyboard or mouse!</p>
      <p>
        Use <strong>z</strong> to decrease the octave, and <strong>x</strong> to
        increase the octave.
      </p>
      <p>Current octave shift: {octave}</p>

      <Keyboard>
        {Object.valuess(keyMap).map(note => (
          <Key
            key={note}
            isBlack={note.includes('#')}
            isActive={activeNotes.includes(
              note.replace(/(\d)/, match => parseInt(match) + octave)
            )}
            onMouseDown={() => handleMouseDown(note)}
            onMouseUp={() => handleMouseUp(note)}
            onMouseOver={e => handleMouseOver(e, note)}
            onMouseOut={() => handleMouseOut(note)}
          >
            <KeyLabel>
              {noteMap[note]} <br /> {note}
            </KeyLabel>
          </Key>
        ))}
      </Keyboard>
      <ConfigSetter config={config} setConfig={setConfig} />
    </Container>
  )
}

export default Synth

// Styled Components
const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`

const Keyboard = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
  margin-top: 20px;
`

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
`

const KeyLabel = styled.span`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
`
