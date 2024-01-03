import React from "react";
import ProjectShowcase from "../../components/ProjectShowcase/ProjectShowcase.js";
import ProjectContainer from "../../components/ProjectContainer/ProjectContainer.js";

import "./Projects.css";
const Projects = () => {
  return (
    <div className="page-container">
      <ProjectContainer />
      {/* <ProjectShowcase /> */}
    </div>
  );
};

export default Projects;
