import "./Project.css";

const Project = ({ info, setShowing, showing }) => {
  const { name, description, techStack, githubURL, demoURL, demoGIF } = info;

  const isExpanded = showing === info.id;


  const visitProject = () => {
    if (isExpanded) {
      setShowing(-1);
    } else {
      setShowing(info.id);
    }
  };

  return (
    <div className={"project-container"}>
      <div className="project-info">
        <h2 className="project-name">{name}</h2>
        <p className="project-tech-stack">Tech stack: {techStack}</p>
        <div className="project-description">
          {isExpanded ? description : description.props.children[0]}
        </div>
      </div>

      {isExpanded && (
        <div className="project-details">
          <div className="project-demo">
            <img
              className="project-gif"
              src={demoGIF}
              alt={`Demo of ${name}`}
            />
          </div>
        </div>
      )}

      <div className="project-links">
        <a
          className="project-link"
          href={githubURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        {demoURL && demoURL !== "" && <a
          className="project-link"
          href={demoURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Demo
        </a>}

        <button className="expand-button" onClick={() => visitProject()}>
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default Project;
