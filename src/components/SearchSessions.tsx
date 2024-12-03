'use client';

import '../styles/searchSessions.style.css';
/*
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
*/
import React from 'react';
import { Search } from 'react-bootstrap-icons';

interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchSessions: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  /*
  const [] = useState<string>('');
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName === activeButton ? '' : buttonName);
  };
  */

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="filterDiv">
      <div
        style={{
          paddingTop: '15px',
        }}
      >
        <div className="searchBar px-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleChange}
            className="searchBarInput"
          />
          <Search
            style={{
              position: 'absolute',
              right: '30px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666',
            }}
            size={20}
          />
        </div>
        {/*
        <Container className="btnContainer">
          <button
            type="button"
            className={`filterBtn ${activeButton === 'Requested' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Requested')}
          >
            Requested
          </button>
          <button
            type="button"
            className={`filterBtn ${activeButton === 'Accepted' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Accepted')}
          >
            Accepted
          </button>
        </Container>
        */}
      </div>
    </div>
  );
};

export default SearchSessions;
