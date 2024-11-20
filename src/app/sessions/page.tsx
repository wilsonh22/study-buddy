'use client';

import { useState } from 'react';
import SearchSessions from '../../components/SearchSessions';
import SessionCard from '../../components/SessionCard';
import '../../styles/sessions.style.css';

const Sessions = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="sessions">
      <h1 className="sessionsPageTitle">
        <strong>Sessions</strong>
      </h1>
      <SearchSessions search={search} setSearch={setSearch} />
      <div className="createBtnDiv">
        <a href="../createSession" className="createBtn" style={{ textDecoration: 'none' }}>
          + Create Session
        </a>
      </div>
      <div className="sessionListDiv">
        <div className="sessionsList">
          <SessionCard />
          <SessionCard />
          <SessionCard />
          <SessionCard />
        </div>
      </div>
    </div>
  );
};
export default Sessions;
