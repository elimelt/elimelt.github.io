import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Gist from 'super-react-gist';
import styled from 'styled-components';

const PageContainer = styled.div``;

const GistContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
`;

const GistTitle = styled.h2`
  font-size: 25px;
  margin-bottom: 10px;
`;

const GistDescription = styled.p`
  margin-bottom: 10px;
`;

const Button = styled.button`
  &:hover {
    background-color: #d0d0d0;
  }
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageNumber = styled.span`
  margin: 0 50px;
  font-size: 18px;
  font-weight: 800;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border: 2px solid #000;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  padding: 10px;
  width: 60%;


  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: #fff;

  &:focus {
    outline: none;
  }
`;

function Modal({ gist, onClose }) {
  return (
    <ModalOverlay>
      <ModalContent>
        <Button onClick={onClose}>Close</Button>
        <ModalTitle>{Object.keys(gist.files).join(', ')}</ModalTitle>
        <Gist url={`https://gist.github.com/elimelt/${gist.id}`} />
        <Button onClick={onClose}>Close</Button>
      </ModalContent>
    </ModalOverlay>
  );
}

function GistView({ gist, onExpand }) {
  return (
    <GistContainer>
      <a href={gist.html_url}>
        <GistTitle>{Object.keys(gist.files).join(', ')}</GistTitle>
      </a>
      <GistDescription>{gist.description}</GistDescription>
      <Button onClick={onExpand}>Show Gist</Button>
    </GistContainer>
  );
}

const fetchAllGists = () => {
  return axios
    .get('https://api.github.com/users/elimelt/gists', {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
};

export default function GistsPage() {
  const [allGists, setAllGists] = useState([]); // Store all gists initially
  const [filteredGists, setFilteredGists] = useState([]); // Store filtered gists based on search
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10); // Items per page
  const [selectedGist, setSelectedGist] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all gists once
  useEffect(() => {
    setIsLoading(true);
    fetchAllGists()
      .then((data) => {
        setAllGists(data);
        setFilteredGists(data); // Initially, all gists are displayed
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Filter gists based on search query
  useEffect(() => {
    const filtered = allGists.filter(
      (gist) =>
        gist.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Object.keys(gist.files).some((fileName) =>
          fileName.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setFilteredGists(filtered);
    setPage(1); // Reset to the first page when search changes
  }, [searchQuery, allGists]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  // Calculate paginated data
  const startIndex = (page - 1) * perPage;
  const paginatedGists = filteredGists.slice(startIndex, startIndex + perPage);

  const renderAllGists = () => (
    <>
      {paginatedGists.map((gist) => (
        <GistView key={gist.id} gist={gist} onExpand={() => setSelectedGist(gist)} />
      ))}
    </>
  );

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

  return (
    <PageContainer>
      {/* Search Input */}
      <SearchContainer>
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search Gists by file name..."
        />
      </SearchContainer>

      {/* Gist List */}
      {renderAllGists()}

      {/* Pagination */}
      <PaginationControls>
        <Button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </Button>
        <PageNumber>Page {page}</PageNumber>
        <Button onClick={handleNextPage} disabled={paginatedGists.length < perPage}>
          Next
        </Button>
      </PaginationControls>

      {/* Modal */}
      {selectedGist && <Modal gist={selectedGist} onClose={() => setSelectedGist(null)} />}
    </PageContainer>
  );
}
