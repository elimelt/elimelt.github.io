import React from 'react'
import './MatrixEditor.css'

const MatrixEditor = ({ matrix, onChange }) => {
  const toggleSquare = (row, col) => {
    const newMatrix = matrix.map((rowArray, rowIndex) =>
      rowArray.map((isActive, colIndex) =>
        rowIndex === row && colIndex === col ? !isActive : isActive
      )
    )

    if (onChange) {
      onChange(newMatrix)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%'
      }}
    >
      <div
        className='matrix-editor-row'
        style={{ gridTemplateColumns: `repeat(${matrix[0].length}, 40px)` }}
      >
        {matrix.map((row, rowIndex) =>
          row.map((isActive, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => toggleSquare(rowIndex, colIndex)}
              className={`matrix-square ${isActive ? 'active' : ''}`}
            ></div>
          ))
        )}
      </div>
    </div>
  )
}

export default MatrixEditor
