import React, { useState, useRef, useEffect } from 'react'
import TextArea from './TextArea/TextArea'
// import RestartButton from '../RestartButton/RestartButton'
// import GameOptions from '../GameOptions/GameOptions'
// import GameSummary from '../GameSummary/GameSummary'
// import Timer from '../Timer/Timer'
import './Game.css'

const Game = ({ defaultSnippet }) => {

  const [currSnippet, setCurrSnippet] = useState(defaultSnippet)

  // const [selectedLength, setSelectedLength] = useState()

  // const [selectedType, setSelectedType] = useState()

  // const [recording, setRecording] = useState(false)

  const [gameFinished, setGameFinished] = useState(false)

  const [typingState, setTypingState] = useState({
    userInput: '',
    currWord: currSnippet[0].split(' ')[0],
    typingStatus: false
  })

  const cursor = {
    lineIndex: useRef(0),
    wordIndex: useRef(0),
    letterIndex: useRef(-1)
  }

  // const gameRecorder = {
  //   time: useRef(0),
  //   numDel: useRef(0),
  //   dataTyped: useRef([]),
  //   typingTarget: currSnippet.join('\n'),
  //   typingProgress: useRef(''),
  //   snapshot: useRef([''])
  // }

  // const { time, dataTyped, typingProgress, snapshot } = gameRecorder

  useEffect(
    () =>
      setTypingState(oldState => ({
        ...oldState,
        currWord: currSnippet[0].split(' ')[0]
      })),
    [currSnippet]
  )

  useEffect(() => {
    setCurrSnippet(defaultSnippet)
  }, [defaultSnippet])


  // const tickTime = () => {
  //   snapshot.current[time.current + 1] = typingProgress.current
  //   dataTyped.current[time.current] =
  //     snapshot.current[time.current + 1].length -
  //     snapshot.current[time.current].length
  //   time.current++
  //   return time.current
  // }

  // const startGame = () => {
  //   setRecording(true)
  // }

  // const restartGame = () => {
  //   setTypingState(oldState => ({
  //     userInput: '',
  //     currWord: currSnippet[0].split(' ')[0],
  //     typingStatus: false
  //   }))
  //   setRecording(false)
  //   setGameFinished(false)
  //   cursor.lineIndex.current = 0
  //   cursor.wordIndex.current = 0
  //   cursor.letterIndex.current = -1
  //   gameRecorder.numDel.current = 0
  //   gameRecorder.time.current = 0
  //   gameRecorder.dataTyped.current = [[]]
  //   gameRecorder.typingProgress.current = ''
  //   gameRecorder.snapshot.current = ['']
  // }

  const restartGame = () => {
    setTypingState(oldState => ({
      userInput: '',
      currWord: currSnippet[0].split(' ')[0],
      typingStatus: false
    }))
    setGameFinished(false)
    cursor.lineIndex.current = 0
    cursor.wordIndex.current = 0
    cursor.letterIndex.current = -1
  }

  return (
    <div className='game-container'>
      {/* <Timer recording={recording} tickTime={tickTime} /> */}
      <TextArea
        typingState={typingState}
        setTypingState={setTypingState}
        cursor={cursor}
        // gameRecorder={gameRecorder}
        lines={currSnippet}
        setGameFinished={setGameFinished}
        // recording={recording}
        // startGame={startGame}
      />
      {/* <div className="control-center">
        <RestartShortcut restartGame={restartGame} />
        <RestartButton restartGame={restartGame} />
        <button className="restart-button" onClick={() => restartGame()}>Restart</button>
      </div> */}
    </div>
  )
}


export default Game
