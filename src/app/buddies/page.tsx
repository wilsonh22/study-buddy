'use client';

import { useState } from 'react';
import SearchBuddies from '../../components/SearchBuddies';
import BuddyCard from '../../components/BuddyCard';
import '../../styles/buddies.style.css';

const Buddies = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="buddiess">
      <h1 className="buddiesPageTitle">
        <strong>Buddies</strong>
      </h1>
      <SearchBuddies search={search} setSearch={setSearch} />
      <div className="buddiesListDiv">
        <div className="buddiesList">
          <BuddyCard />
          <BuddyCard />
          <BuddyCard />
          <BuddyCard />
        </div>
      </div>
    </div>
  );
};
export default Buddies;
