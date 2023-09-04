import React from "react";
import "./QuarterEntry.css";

const QuarterEntry = ({ quarterData, showing, setShowing }) => {
  const { id, name, date, content } = quarterData;

  const isDisplaying = showing === id;

  const toggle = () => {
    if (isDisplaying) setShowing(-1);
    else setShowing(id);
  };

  if (isDisplaying)
    return (
      <div className="quarter-entry-container">
        <div className="quarter-entry-header">
          <h2 className="quarter-entry-title">{name}</h2>
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
        <button
          className="quarter-entry-button"
          onClick={() => toggle()}
        >
          Back
        </button>
      </div>
    );

  return (
    <div className="quarter-entry-container">
      <div className="quarter-entry-header">
        <h2 className="quarter-entry-title">{name}</h2>
        <p className="quarter-entry-date">{date}</p>
      </div>
      <button className="quarter-entry-button" onClick={() => toggle()}>
        View
      </button>
    </div>
  );  
};

export default QuarterEntry;
