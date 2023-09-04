import React from "react";
import Project from "../Project/Project.js";
import projects from "../../data/projectData";
import "./ProjectShowcase.css";

const ProjectShowcase = () => {

  const [showing, setShowing] = React.useState(-1);

  if (showing === -1) 

    return (
      <div className="project-showcase">
        {projects.map((project) => (
          <div className="project" key={project.id}>
            <Project 
              info={project} 
              setShowing={setShowing} 
              showing={showing}
            />
          </div>
        ))}
      </div>
    );

  else {
      
      return (
        <div className="project-showcase">
          
            <div className="project" key={showing}>
              <Project 
                info={projects[showing]} 
                setShowing={setShowing} 
                showing={showing}
              />
            </div>

        </div>
      );
  
    }


};

export default ProjectShowcase;
