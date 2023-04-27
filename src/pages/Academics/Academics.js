import React from 'react';
import quarters from '../../data/quarterData.js'
import QuarterEntry from '../../components/QuarterEntry/QuarterEntry.js';
import './Academics.css'


const Academics = () => {



  return (
    <div className="page-container">
      {
      quarters.map((quarter, i) => 
        (
        <div className="quarter" key={i}>
          <QuarterEntry quarterData={quarter}/>
        </div>
        )
      )
      }
    </div>
  );
};

export default Academics;
