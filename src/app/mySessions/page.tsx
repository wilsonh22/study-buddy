import React from 'react';
import SessionCard from '../../components/SessionCard';
import '../../styles/mySessions.style.css';

const MySessionsPage = () => (
  <div>
    <h1 className="py-4 px-5">
      <strong>My Sessions</strong>
    </h1>

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

export default MySessionsPage;
