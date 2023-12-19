import React, { useEffect, useState } from 'react';

const NotesDirectory = ({ directory }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContents = async () => {
      const repoOwner = 'elimelt';
      const repoName = 'notes';
      const repoPath = directory; // Assuming directory name is the path

      const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${repoPath}`);
      const data = await response.json();

      // Filter out directories and other items as needed
      const items = data.map(item => item.name);
      setContents(items);
    };

    fetchContents();
  }, [directory]);

  return (
    <div>
      <h2>{directory}</h2>
      <ul>
        {contents.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotesDirectory;
