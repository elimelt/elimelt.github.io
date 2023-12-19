import React, { useEffect, useRef, useState } from 'react';
import './EtchASketch.css';

function EtchASketch() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(2);
  const [includeBackground, setIncludeBackground] = useState(false);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Drawing logic
    const draw = (e) => {
      e.preventDefault();
      if (!isDrawingRef.current) return;

      ctx.strokeStyle = color;  // Update color
      ctx.lineWidth = size;     // Update size

      const rect = canvas.getBoundingClientRect();
      let x, y;
      if (e.type === 'touchmove') {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.moveTo(x, y);
    };

    canvas.addEventListener('mousedown', () => {
      isDrawingRef.current = true;
      ctx.beginPath();
    });

    canvas.addEventListener('mouseup', () => {
      isDrawingRef.current = false;
    });

    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('touchstart', () => {
      isDrawingRef.current = true;
      ctx.beginPath();
    });

    canvas.addEventListener('touchend', () => {
      isDrawingRef.current = false;
    })

    canvas.addEventListener('touchmove', draw);

    return () => {
      canvas.removeEventListener('mousedown', () => {
        isDrawingRef.current = true;
      });
      canvas.removeEventListener('mouseup', () => {
        isDrawingRef.current = false;
      });
      canvas.removeEventListener('mousemove', draw);

      canvas.removeEventListener('touchstart', () => {
        isDrawingRef.current = true;
      });

      canvas.removeEventListener('touchend', () => {
        isDrawingRef.current = false;
      });

      canvas.removeEventListener('touchmove', draw);
    };
  }, [color, size]);  // Re-run the effect if color or size changes

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background if checked
    if (includeBackground) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [includeBackground]); // Re-run the effect if includeBackground changes

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'etchASketchDrawing.png';
    link.click();
  };

  return (
    <div className="etch-container">
      <canvas ref={canvasRef} className="etch-canvas" width="600" height="400"></canvas>

      <div className="etch-color-selector">
        <label>Color:</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>

      <div className="etch-size-selector">
        <label>Brush Size:</label>
        <input type="range" min="1" max="20" value={size} onChange={(e) => setSize(e.target.value)} />
      </div>

      <div className="etch-background-checkbox">
        <label>
          <input type="checkbox" checked={includeBackground} onChange={(e) => setIncludeBackground(e.target.checked)} />
          Include Background (Clears Canvas)
        </label>
      </div>

      <button onClick={handleClear} className="etch-clear-button">Clear</button>
      <button onClick={handleExport} className="etch-clear-button">Export as PNG</button>
    </div>
  );
}

export default EtchASketch;
