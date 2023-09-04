import { useState } from "react";
import quarters from "../../data/academicData.js";
import QuarterEntry from "../../components/QuarterEntry/QuarterEntry.js";
import "./Academics.css";

const Academics = () => {
  const [showing, setShowing] = useState(-1);

  const QE = (quarter) => (
    <div className="quarter" key={quarter.id} id={quarter.id}>
      <QuarterEntry
        quarterData={quarter}
        showing={showing}
        setShowing={setShowing}
      />
    </div>
  );

  if (showing == -1)
    return (
      <div className="page-container">
        <div className="entries">
          {quarters.map((quarter, i) => QE(quarter))}
        </div>
      </div>
    );

  return (
    <div className="page-container">
      <div className="entry">
        {QE(quarters[showing])}
      </div>
    </div>
  );
};

export default Academics;
