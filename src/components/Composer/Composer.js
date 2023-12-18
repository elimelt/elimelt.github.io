import { useState, useEffect } from 'react';
import MatrixEditor from './MatrixEditor';
import * as Tone from 'tone';
import { modes } from './modes';
import './Composer.css';

const Composer = () =>{
  const [mode, setMode] = useState(modes.major);
  const [cols, setCols] = useState(8);
  const [matrix, setMatrix] = useState(Array.from({ length: mode.notes.length }, () => Array(8).fill(false)));

  const handleMatrixChange = (newMatrix) => {
    console.log(cols)
    setMatrix(newMatrix);
    console.log(matrix)
  };

  // Create a Tone.js synth

  const synths = new Array(mode.notes.length).fill().map(() => new Tone.Synth().toDestination());

  // Create a Tone.js Transport
  const transport = Tone.Transport;

  const startLoop = () => {
    // Set the loop duration based on your musical preference
    const loopDuration = '8n';
    const bps = 4;

    const now = Tone.now();
    // Schedule events in the loop
    for (let i = 0; i < 2; i++) {
      matrix.forEach((row, rowIndex) => {
        row.forEach((isActive, colIndex) => {
          if (isActive) {
            synths[rowIndex].triggerAttackRelease(mode.notes[rowIndex], loopDuration, now + (colIndex + cols * i)/bps);
          }
        });
      });
    }
    // Start the Transport to begin the loop
    transport.start();
  };

  const handleModeChange = (event) => {
    console.log(event.target.value)
    setMode(modes[event.target.value]);
    setMatrix(Array.from({ length: modes[event.target.value].notes.length }, () => Array(cols).fill(false)));
  }

  const handleColsChange = (event) => {
    const newCols = parseInt(event.target.value, 10);
    setCols(newCols);
    setMatrix((prevMatrix) => {
      // Update matrix based on the new number of columns
      return prevMatrix.map((row) => {
        // If the new number of columns is greater, add new elements
        if (newCols > row.length) {
          return [...row, ...Array(newCols - row.length).fill(false)];
        }
        // If the new number of columns is smaller, trim the row
        return row.slice(0, newCols);
      });
    });
  };


  const stopLoop = () => {
    // Stop the Transport to end the loop
    transport.stop();
    // Cancel scheduled events
    transport.cancel();
    // Clear scheduled events
    transport.clear();
    // Reset the Transport to 0
    transport.position = 0;
  };

  useEffect(() => {
    // Clean up when the component unmounts
    return () => {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      Tone.Transport.clear();
      for (let i = 0; i < synths.length; i++) {
        synths[i].dispose();
      }
    };
  }, []);

  return (
    <div>

      <MatrixEditor matrix={matrix} onChange={handleMatrixChange} />
      <button className="start-button" onClick={startLoop}>Play</button>
      {/* <input className="num-col-input" type="number" value={cols} onChange={handleColsChange} /> */}
      <select className="scale-dropdown" value={Object.keys(modes).find((key) => modes[key] === mode)} onChange={handleModeChange}>
        {Object.keys(modes).map((modeKey) => (
          <option key={modeKey} value={modeKey}>
            {modes[modeKey].name}
          </option>
        ))}
      </select>


    </div>
  );
}

export default Composer;
