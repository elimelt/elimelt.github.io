// MatrixEditor.js
import React from 'react';

const MatrixEditor = ({ matrix, onChange }) => {
  const toggleSquare = (row, col) => {
    const newMatrix = matrix.map((rowArray, rowIndex) =>
      rowArray.map((isActive, colIndex) => (rowIndex === row && colIndex === col ? !isActive : isActive))
    );

    if (onChange) {
      onChange(newMatrix);
    }
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${matrix[0].length}, 40px)`, gap: '4px' }}>
        {matrix.map((row, rowIndex) =>
          row.map((isActive, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => toggleSquare(rowIndex, colIndex)}
              style={{
                width: '40px',
                height: '40px',
                background: isActive ? 'yellow' : 'lightgray',
                border: '1px solid #333',
                cursor: 'pointer',
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default MatrixEditor;
