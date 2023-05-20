import React from 'react';
import './QuarterEntry.css';

const QuarterEntry = ({ quarterData }) => {
  const { quarter, date, content } = quarterData;

  return (
    <div className="quarter-entry-container">
      <div className="quarter-entry-header">
        <h2 className="quarter-entry-title">{quarter}</h2>
        <p className="quarter-entry-date">{date}</p>
      </div>
      <div className="quarter-entry-content">
        {content.map((section, index) => (
          <div key={index} className="quarter-entry-section">
            <h3 className="quarter-entry-section-title">{section.title}</h3>
            <span className="quarter-entry-section-body">{section.body}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuarterEntry;
