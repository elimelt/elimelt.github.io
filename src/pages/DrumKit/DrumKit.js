import React, { useState, useEffect, useCallback } from 'react'
import * as Tone from 'tone'
import styled from 'styled-components'

const PATH_TO_SAMPLES = './samples'
const samples = {
  snare1: require(`${PATH_TO_SAMPLES}/snares/wavbvkery---dreams-snare-01.wav`),
  snare2: require(`${PATH_TO_SAMPLES}/snares/wavbvkery---dreams-snare-02.wav`),
  snare3: require(`${PATH_TO_SAMPLES}/snares/wavbvkery---dreams-snare-03.wav`),
  snare4: require(`${PATH_TO_SAMPLES}/snares/wavbvkery---dreams-snare-04.wav`),
  snare5: require(`${PATH_TO_SAMPLES}/snares/wavbvkery---dreams-snare-05.wav`),
  snare6: require(`${PATH_TO_SAMPLES}/snares/wavbvkery---dreams-snare-06.wav`),
  snare7: require(`${PATH_TO_SAMPLES}/snares/wavbvkery---dreams-snare-07.wav`),
  snare8: require(`${PATH_TO_SAMPLES}/snares/wavbvkery---dreams-snare-08.wav`),
  snare9: require(`${PATH_TO_SAMPLES}/snares/wavbvkery---dreams-snare-09.wav`),
  snare10: require(`${PATH_TO_SAMPLES}/snares/wavbvkery---dreams-snare-10.wav`),
  perc1: require(`${PATH_TO_SAMPLES}/percs/wavbvkery---dreams-perc-01.wav`),
  perc2: require(`${PATH_TO_SAMPLES}/percs/wavbvkery---dreams-perc-02.wav`),
  perc3: require(`${PATH_TO_SAMPLES}/percs/wavbvkery---dreams-perc-03.wav`),
  perc4: require(`${PATH_TO_SAMPLES}/percs/wavbvkery---dreams-perc-04.wav`),
  perc5: require(`${PATH_TO_SAMPLES}/percs/wavbvkery---dreams-perc-05.wav`),
  perc6: require(`${PATH_TO_SAMPLES}/percs/wavbvkery---dreams-perc-06.wav`),
  perc7: require(`${PATH_TO_SAMPLES}/percs/wavbvkery---dreams-perc-07.wav`),
  perc8: require(`${PATH_TO_SAMPLES}/percs/wavbvkery---dreams-perc-08.wav`),
  perc9: require(`${PATH_TO_SAMPLES}/percs/wavbvkery---dreams-perc-09.wav`),
  perc10: require(`${PATH_TO_SAMPLES}/percs/wavbvkery---dreams-perc-10.wav`),
  kick1: require(`${PATH_TO_SAMPLES}/kicks/wavbvkery---dreams-kick-01.wav`),
  kick2: require(`${PATH_TO_SAMPLES}/kicks/wavbvkery---dreams-kick-02.wav`),
  kick3: require(`${PATH_TO_SAMPLES}/kicks/wavbvkery---dreams-kick-03.wav`),
  kick4: require(`${PATH_TO_SAMPLES}/kicks/wavbvkery---dreams-kick-04.wav`),
  kick5: require(`${PATH_TO_SAMPLES}/kicks/wavbvkery---dreams-kick-05.wav`),
  kick6: require(`${PATH_TO_SAMPLES}/kicks/wavbvkery---dreams-kick-06.wav`),
  kick7: require(`${PATH_TO_SAMPLES}/kicks/wavbvkery---dreams-kick-07.wav`),
  kick8: require(`${PATH_TO_SAMPLES}/kicks/wavbvkery---dreams-kick-08.wav`),
  kick9: require(`${PATH_TO_SAMPLES}/kicks/wavbvkery---dreams-kick-09.wav`),
  kick10: require(`${PATH_TO_SAMPLES}/kicks/wavbvkery---dreams-kick-10.wav`),
  hatOpen1: require(`${PATH_TO_SAMPLES}/cymbals/hats-open/wavbvkery---dreams-open-hat-01.wav`),
  hatOpen2: require(`${PATH_TO_SAMPLES}/cymbals/hats-open/wavbvkery---dreams-open-hat-02.wav`),
  hatOpen3: require(`${PATH_TO_SAMPLES}/cymbals/hats-open/wavbvkery---dreams-open-hat-03.wav`),
  hatOpen4: require(`${PATH_TO_SAMPLES}/cymbals/hats-open/wavbvkery---dreams-open-hat-04.wav`),
  hatOpen5: require(`${PATH_TO_SAMPLES}/cymbals/hats-open/wavbvkery---dreams-open-hat-05.wav`),
  hatOpen6: require(`${PATH_TO_SAMPLES}/cymbals/hats-open/wavbvkery---dreams-open-hat-06.wav`),
  hatOpen7: require(`${PATH_TO_SAMPLES}/cymbals/hats-open/wavbvkery---dreams-open-hat-07.wav`),
  hatOpen8: require(`${PATH_TO_SAMPLES}/cymbals/hats-open/wavbvkery---dreams-open-hat-08.wav`),
  hatOpen9: require(`${PATH_TO_SAMPLES}/cymbals/hats-open/wavbvkery---dreams-open-hat-09.wav`),
  hatOpen10: require(`${PATH_TO_SAMPLES}/cymbals/hats-open/wavbvkery---dreams-open-hat-10.wav`),
  hatClosed1: require(`${PATH_TO_SAMPLES}/cymbals/hats-closed/wavbvkery---dreams-closed-hat-01.wav`),
  hatClosed2: require(`${PATH_TO_SAMPLES}/cymbals/hats-closed/wavbvkery---dreams-closed-hat-02.wav`),
  hatClosed3: require(`${PATH_TO_SAMPLES}/cymbals/hats-closed/wavbvkery---dreams-closed-hat-03.wav`),
  hatClosed4: require(`${PATH_TO_SAMPLES}/cymbals/hats-closed/wavbvkery---dreams-closed-hat-04.wav`),
  hatClosed5: require(`${PATH_TO_SAMPLES}/cymbals/hats-closed/wavbvkery---dreams-closed-hat-05.wav`),
  hatClosed6: require(`${PATH_TO_SAMPLES}/cymbals/hats-closed/wavbvkery---dreams-closed-hat-06.wav`),
  hatClosed7: require(`${PATH_TO_SAMPLES}/cymbals/hats-closed/wavbvkery---dreams-closed-hat-07.wav`),
  hatClosed8: require(`${PATH_TO_SAMPLES}/cymbals/hats-closed/wavbvkery---dreams-closed-hat-08.wav`),
  hatClosed9: require(`${PATH_TO_SAMPLES}/cymbals/hats-closed/wavbvkery---dreams-closed-hat-09.wav`),
  hatClosed10: require(`${PATH_TO_SAMPLES}/cymbals/hats-closed/wavbvkery---dreams-closed-hat-10.wav`),
  crash1: require(`${PATH_TO_SAMPLES}/cymbals/crashes/wavbvkery---dreams-crash-01.wav`),
  crash2: require(`${PATH_TO_SAMPLES}/cymbals/crashes/wavbvkery---dreams-crash-02.wav`),
  crash3: require(`${PATH_TO_SAMPLES}/cymbals/crashes/wavbvkery---dreams-crash-03.wav`),
  crash4: require(`${PATH_TO_SAMPLES}/cymbals/crashes/wavbvkery---dreams-crash-04.wav`),
  crash5: require(`${PATH_TO_SAMPLES}/cymbals/crashes/wavbvkery---dreams-crash-05.wav`),
  crash6: require(`${PATH_TO_SAMPLES}/cymbals/crashes/wavbvkery---dreams-crash-06.wav`),
  crash7: require(`${PATH_TO_SAMPLES}/cymbals/crashes/wavbvkery---dreams-crash-07.wav`),
  crash8: require(`${PATH_TO_SAMPLES}/cymbals/crashes/wavbvkery---dreams-crash-08.wav`),
  crash9: require(`${PATH_TO_SAMPLES}/cymbals/crashes/wavbvkery---dreams-crash-09.wav`),
  crash10: require(`${PATH_TO_SAMPLES}/cymbals/crashes/wavbvkery---dreams-crash-10.wav`),
  ride1: require(`${PATH_TO_SAMPLES}/cymbals/rides/wavbvkery---dreams-ride-01.wav`),
  ride2: require(`${PATH_TO_SAMPLES}/cymbals/rides/wavbvkery---dreams-ride-02.wav`),
  ride3: require(`${PATH_TO_SAMPLES}/cymbals/rides/wavbvkery---dreams-ride-03.wav`),
  ride4: require(`${PATH_TO_SAMPLES}/cymbals/rides/wavbvkery---dreams-ride-04.wav`),
  ride5: require(`${PATH_TO_SAMPLES}/cymbals/rides/wavbvkery---dreams-ride-05.wav`),
  ride6: require(`${PATH_TO_SAMPLES}/cymbals/rides/wavbvkery---dreams-ride-06.wav`),
  ride7: require(`${PATH_TO_SAMPLES}/cymbals/rides/wavbvkery---dreams-ride-07.wav`),
  ride8: require(`${PATH_TO_SAMPLES}/cymbals/rides/wavbvkery---dreams-ride-08.wav`),
  ride9: require(`${PATH_TO_SAMPLES}/cymbals/rides/wavbvkery---dreams-ride-09.wav`),
  ride10: require(`${PATH_TO_SAMPLES}/cymbals/rides/wavbvkery---dreams-ride-10.wav`),
  clap1: require(`${PATH_TO_SAMPLES}/claps/wavbvkery---dreams-clap-01.wav`),
  clap2: require(`${PATH_TO_SAMPLES}/claps/wavbvkery---dreams-clap-02.wav`),
  clap3: require(`${PATH_TO_SAMPLES}/claps/wavbvkery---dreams-clap-03.wav`),
  clap4: require(`${PATH_TO_SAMPLES}/claps/wavbvkery---dreams-clap-04.wav`),
  clap5: require(`${PATH_TO_SAMPLES}/claps/wavbvkery---dreams-clap-05.wav`),
  clap6: require(`${PATH_TO_SAMPLES}/claps/wavbvkery---dreams-clap-06.wav`),
  clap7: require(`${PATH_TO_SAMPLES}/claps/wavbvkery---dreams-clap-07.wav`),
  clap8: require(`${PATH_TO_SAMPLES}/claps/wavbvkery---dreams-clap-08.wav`),
  clap9: require(`${PATH_TO_SAMPLES}/claps/wavbvkery---dreams-clap-09.wav`),
  clap10: require(`${PATH_TO_SAMPLES}/claps/wavbvkery---dreams-clap-10.wav`),
  eightOhEight1: require(`${PATH_TO_SAMPLES}/808s/wavbvkery---dreams-808---01---(c).wav`),
  eightOhEight2: require(`${PATH_TO_SAMPLES}/808s/wavbvkery---dreams-808---02---(c).wav`),
  eightOhEight3: require(`${PATH_TO_SAMPLES}/808s/wavbvkery---dreams-808---03---(c).wav`),
  eightOhEight4: require(`${PATH_TO_SAMPLES}/808s/wavbvkery---dreams-808---04---(c).wav`),
  eightOhEight5: require(`${PATH_TO_SAMPLES}/808s/wavbvkery---dreams-808---05---(c).wav`),
  eightOhEight6: require(`${PATH_TO_SAMPLES}/808s/wavbvkery---dreams-808---06---(c).wav`),
  eightOhEight7: require(`${PATH_TO_SAMPLES}/808s/wavbvkery---dreams-808---07---(c).wav`),
  eightOhEight8: require(`${PATH_TO_SAMPLES}/808s/wavbvkery---dreams-808---08---(c).wav`),
  eightOhEight9: require(`${PATH_TO_SAMPLES}/808s/wavbvkery---dreams-808---09---(c).wav`),
  eightOhEight10: require(`${PATH_TO_SAMPLES}/808s/wavbvkery---dreams-808---10---(c).wav`)
}

const Container = styled.div`
  width: 100%;
  padding: 20px;
`

const PresetContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
`

const PresetInput = styled.input`
  color: white;
  padding: 5px;
  style: none;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }
`

const SequenceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Always 4 columns */
  gap: 5px; /* Adjust gap between buttons */
  margin-left: 20px;
`;

const TracksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

const Title = styled.h1`
`

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-weight: bold;
`

const BpmInput = styled.input`
  margin-right: 5px;
  padding: 5px;
`

const Track = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const SampleSelect = styled.select`
  margin-right: 10px;
  padding: 5px;
`

const StepButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: ${props => (props.$isactive ? 'lightseagreen' : '#AAAAAA')};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

const PlayButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  background-color: lightgray;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: ${props => (props.$isplaying ? 'red' : 'green')};
`

const AddTrackButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  background-color: lightgray;
  border: 1px solid #ccc;
  cursor: pointer;
`

const RemoveTrackButton = styled.button`
  cursor: pointer;
  margin-right: 10px;
  background-color: #ff4136;
  color: white;
  border: none;
  padding: 5px 10px;
`

const PresetButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  background-color: lightgray;
  border: 1px solid #ccc;
`

const STEPS = 16

export const DrumKit = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [bpm, setBpm] = useState(120)
  const [tracks, setTracks] = useState([
    { id: 'track1', instrument: 'kick1' },
    { id: 'track2', instrument: 'snare1' },
    { id: 'track3', instrument: 'hatClosed1' },
    { id: 'track4', instrument: 'eightOhEight3' }
  ])

  const [sequence, setSequence] = useState({
    track1: [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ],
    track2: [
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ],
    track3: [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      true
    ],
    track4: [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ]
  })
  const [players, setPlayers] = useState({})

  const [presetName, setPresetName] = useState('')
  const [presets, setPresets] = useState([])

  useEffect(() => {
    const savedPresets = JSON.parse(
      localStorage.getItem('drumKitPresets') || '[]'
    )
    setPresets(savedPresets)
  }, [])

  useEffect(() => {
    Tone.Transport.bpm.value = bpm
  }, [bpm])

  useEffect(() => {
    const newSequence = {}
    const newPlayers = {}

    tracks.forEach(track => {
      newSequence[track.id] = sequence[track.id] || Array(STEPS).fill(false)
      newPlayers[track.id] = new Tone.Player({
        url: samples[track.instrument],
        autostart: false
      }).toDestination()
    })

    setSequence(newSequence)
    setPlayers(newPlayers)

    return () => {
      Object.values(newPlayers).forEach(player => player.dispose())
    }
  }, [tracks])

  const loop = useCallback(() => {
    return new Tone.Sequence(
      (time, step) => {
        tracks.forEach(track => {
          if (sequence[track.id] && sequence[track.id][step]) {
            players[track.id].start(time)
          }
        })
      },
      Array.from({ length: STEPS }, (_, i) => i),
      '16n'
    )
  }, [sequence, players, tracks])

  useEffect(() => {
    const currentLoop = loop()

    if (isPlaying) {
      Tone.Transport.start()
      currentLoop.start()
    } else {
      Tone.Transport.stop()
      currentLoop.stop()
    }

    return () => {
      currentLoop.dispose()
    }
  }, [isPlaying, loop])

  const togglePlay = async () => {
    await Tone.start()
    setIsPlaying(!isPlaying)
  }

  const handleInstrumentChange = (trackId, instrument) => {
    setTracks(prev =>
      prev.map(track =>
        track.id === trackId ? { ...track, instrument } : track
      )
    )
  }

  const toggleStep = (trackId, step) => {
    setSequence(prev => ({
      ...prev,
      [trackId]: prev[trackId].map((s, i) => (i === step ? !s : s))
    }))
  }

  const addTrack = () => {
    // if (tracks.length >= 4) {
    //   alert('You can only have 4 tracks')
    //   return
    // }
    const newTrackId = `track${tracks.length + 1}`
    setTracks(prev => [...prev, { id: newTrackId, instrument: 'kick1' }])
  }

  const removeTrack = trackId => {
    players[trackId].stop()
    players[trackId].dispose()
    setTracks(prev => prev.filter(track => track.id !== trackId))
    setSequence(prev => {
      const { [trackId]: removed, ...rest } = prev
      return rest
    })
  }

  const savePreset = () => {
    if (!presetName) {
      alert('Please enter a preset name')
      return
    }

    const preset = {
      name: presetName,
      tracks,
      sequence
    }

    const updatedPresets = [...presets, preset]
    setPresets(updatedPresets)
    localStorage.setItem('drumKitPresets', JSON.stringify(updatedPresets))
    setPresetName('')
  }

  const loadPreset = preset => {
    setTracks(preset.tracks)
    setSequence(preset.sequence)
  }

  return (
    <Container>
      <Title>Drum Kit</Title>
      <PresetContainer>
        <div>
          <h3>Presets:</h3>
          {presets.map((preset, index) => (
            <PresetButton key={index} onClick={() => loadPreset(preset)}>
              {preset.name}
            </PresetButton>
          ))}
          <PresetButton onClick={savePreset}>Save Preset</PresetButton>
          <PresetInput
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            placeholder="Preset name"
          />
        </div>

      </PresetContainer>

      <Controls>
        <div>
        <AddTrackButton onClick={addTrack}>Add Track</AddTrackButton>
        <PlayButton onClick={togglePlay} $isplaying={isPlaying}>
          {isPlaying ? 'Stop' : 'Play'}
        </PlayButton>
        <BpmInput
          type='number'
          value={bpm}
          onChange={e => setBpm(Number(e.target.value))}
          min='60'
          max='200'
        />
        <span>BPM</span>
        </div>
      </Controls>


      <TracksContainer>
        {tracks.map(track => (
          <Track key={track.id}>
            <RemoveTrackButton onClick={() => removeTrack(track.id)}>
              X
            </RemoveTrackButton>
            <SampleSelect
              value={track.instrument}
              onChange={e => handleInstrumentChange(track.id, e.target.value)}
            >
              {Object.keys(samples).map(sample => (
                <option key={sample} value={sample}>
                  {sample}
                </option>
              ))}
            </SampleSelect>
            <SequenceContainer>
              {sequence[track.id] && sequence[track.id].map((isActive, step) => (
                <StepButton
                  key={step}
                  onClick={() => toggleStep(track.id, step)}
                  $isactive={isActive}
                >
                  {step + 1}
                </StepButton>
              ))}
            </SequenceContainer>
          </Track>
        ))}
      </TracksContainer>
    </Container>
  );
}

export default DrumKit
