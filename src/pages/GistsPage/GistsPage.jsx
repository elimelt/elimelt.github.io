import axios from 'axios';
import { useEffect, useState } from 'react';
import Gist from 'super-react-gist';
import './GistsPage.css';

function Modal({ gist, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1 className="modal-title">{Object.keys(gist.files).join(', ')}</h1>
        <Gist url={`https://gist.github.com/elimelt/${gist.id}`} />
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

function GistView({ gist, onExpand }) {
  return (
    <div className="gist-view">
      <h1 className="gist-title">{Object.keys(gist.files).join(', ')}</h1>
      <h2 className="gist-description">{gist.description}</h2>
      <button className="toggle-button" onClick={onExpand}>
        Show Gist
      </button>
    </div>
  );
}

const getAllGists = (page = 1, perPage = 10) => {
  return axios
    .get('https://api.github.com/users/elimelt/gists', {
      params: { page, per_page: perPage },
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
    });
};

export default function GistsPage() {
  const [gists, setGists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10); // Items per page
  const [selectedGist, setSelectedGist] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getAllGists(page, perPage)
      .then(data => {
        setGists(data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, perPage]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const renderAllGists = () => (
    <div className="gist-container">
      {gists.map(gist => (
        <GistView key={gist.id} gist={gist} onExpand={() => setSelectedGist(gist)} />
      ))}
    </div>
  );

  const handleNextPage = () => setPage(prevPage => prevPage + 1);
  const handlePreviousPage = () => setPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));

  return (
    <div className="gists-page">
      <h1 className="page-title">Gists</h1>
      {renderAllGists()}
      <div className="pagination-controls">
        <button className="pagination-button" onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span className="page-number">Page {page}</span>
        <button className="pagination-button" onClick={handleNextPage}>
          Next
        </button>
      </div>
      {selectedGist && <Modal gist={selectedGist} onClose={() => setSelectedGist(null)} />}
    </div>
  );
}
