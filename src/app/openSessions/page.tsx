import React from 'react';
// import SessionCard from '../../components/SessionCard';
import '../../styles/openSessions.style.css';

const openSessionsPage = () => (
  <div>
    <h1 className="py-4 px-5">
      <strong>Open Sessions</strong>
    </h1>

    <div className="sessionListDiv">
      <div className="sessionsList">
        {/* <SessionCard />
        <SessionCard />
        <SessionCard />
        <SessionCard /> */}
      </div>
    </div>
  </div>
);

export default openSessionsPage;
