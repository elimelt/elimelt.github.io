import React, { useState, useRef } from 'react';
import ImageUtils from './ImageUtils';
import './PNGProcessor.css';

const PNGProcessor = () => {
  const [selectedTransformation, setSelectedTransformation] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [processedImage, setProcessedImage] = useState(null);
  const [transformationParams, setTransformationParams] = useState({});
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        setImageSrc(event.target.result);
        setProcessedImage(null); // Reset processed image when a new image is uploaded
      } catch (error) {
        console.error('Error processing image:', error);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleTransformationSelect = (event) => {
    const transformation = event.target.value;
    setSelectedTransformation(transformation);
    // Reset transformation parameters when selecting a new transformation
    setTransformationParams({});
  };

  const handleParameterChange = (event) => {
    const { name, value } = event.target;
    setTransformationParams({ ...transformationParams, [name]: parseInt(value) || 0 }); // Ensure value is parsed as an integer
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const imageData = await ImageUtils.processImage(
        imageSrc,
        selectedTransformation,
        transformationParams
      );

      setImageSrc(imageData); // Update image source with processed image data
      setProcessedImage({ download: () => downloadImage(imageData) }); // Set processed image for download
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  const downloadImage = (imageData) => {
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'processed_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="image-processing-container">
      <h1 className="title">PNG Processing Tool</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="transformation" className="label">Select Transformation:</label>
          <select id="transformation" value={selectedTransformation} onChange={handleTransformationSelect} className="select">
            <option value="">Select...</option>
            {Object.keys(ImageUtils.transformations).map((transformation) => (
              <option key={transformation} value={transformation}>{transformation}</option>
            ))}
          </select>
        </div>
        {selectedTransformation && ImageUtils.transformations[selectedTransformation].map((param) => (
          <div key={param.name} className="form-group">
            <label htmlFor={param.name} className="label">{param.label}:</label>
            <input
              type={param.type}
              id={param.name}
              name={param.name}
              value={transformationParams[param.name] || param.defaultValue || ''}
              onChange={handleParameterChange}
              className="input"
            />
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="imageInput" className="label">Upload PNG Image:</label>
          <input
            type="file"
            id="imageInput"
            accept=".png"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="file-input"
          />
          <button type="button" onClick={() => fileInputRef.current.click()} className="browse-button">Browse</button>
        </div>
        <button type="submit" className="submit-button">Apply Transformation</button>
      </form>
      {imageSrc && <img src={imageSrc} alt="Uploaded" className="uploaded-image" />}
      {processedImage && (
        <div className="export-button-container">
          <button onClick={processedImage.download} className="export-button">Export Processed Image</button>
        </div>
      )}
    </div>
  );
}

export default PNGProcessor;
