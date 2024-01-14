import React, { useState, useRef, useEffect } from 'react'
import TextArea from './TextArea/TextArea'
import './Game.css'

const Game = ({ defaultSnippet }) => {
  const [currSnippet, setCurrSnippet] = useState(defaultSnippet)
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

  return (
    <div className='game-container'>
      <TextArea
        typingState={typingState}
        setTypingState={setTypingState}
        cursor={cursor}
        lines={currSnippet}
        setGameFinished={() => console.log('setGameFinished')}
      />

    </div>
  )
}


export default Game
