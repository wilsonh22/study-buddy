'use client';

import { useState } from 'react';
import { addBuddy } from '@/lib/dbActions';
import { Buddy } from '@prisma/client';
// import { StarFill } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import { Card, Button } from 'react-bootstrap';
import SearchBuddies from './SearchBuddies';
import '../styles/buddyCard.style.css';

type ExtendedBuddy = Buddy & {
  userDupe: {
    id: number;
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
};

const BuddyCard = ({ buddyList, currentUser }: { buddyList: ExtendedBuddy[]; currentUser: number }) => {
  const [search, setSearch] = useState('');

  const addBuddyBtn = async (buddy: ExtendedBuddy) => {
    console.log('Buddy ID:', buddy.id);
    console.log('Current User ID:', currentUser);
    await addBuddy(buddy.id, currentUser);
    swal('Success', 'Added Buddy', 'success', {
      timer: 1000,
    });
  };

  const buddySearch = buddyList.filter((buddy) => {
    const firstName = buddy.userDupe.profile?.firstName ?? '';
    const lastName = buddy.userDupe.profile?.lastName ?? '';
    const combinedName = `${firstName} ${lastName}`.toLowerCase();
    const searchLower = search.toLowerCase();

    return (
      buddy.userDupe.profile?.firstName?.toLowerCase().includes(searchLower) ||
      buddy.userDupe.profile?.lastName?.toLowerCase().includes(searchLower) ||
      combinedName.includes(searchLower)
    );
  });

  return (
    <div>
      <div>
        <SearchBuddies search={search} setSearch={setSearch} />
      </div>
      <div className="buddyCards">
        {buddySearch.map((buddy) => (
          <div key={buddy.userDupe.id} className="buddyCardBorder">
            <Card className="buddyCardCont">
              <Card.Body>
                <div className="profilePic" />
                <Card.Title className="pt-3">
                  {buddy.userDupe?.profile
                    ? `${buddy.userDupe.profile.firstName} ${buddy.userDupe.profile.lastName}`
                    : 'Unknown'}
                </Card.Title>
                <div>
                  <p>
                    <strong>Bio:</strong>
                    Bio Field
                  </p>
                  <p>
                    <strong>Major:</strong>
                    Major Field
                  </p>
                  <p>
                    <strong>Role:</strong>
                    College Role Field
                  </p>
                  <p>
                    <strong>Socials:</strong>
                    Social Field
                  </p>
                </div>
                <Card.Body className="cardBtnDiv">
                  {currentUser === buddy.userDupe.id ? (
                    <Button className="requestBtn" href="/editProfile">
                      Edit Profile
                    </Button>
                  ) : (
                    <Button className="requestBtn" onClick={() => addBuddyBtn(buddy)}>
                      Favorite
                      {/* <StarFill /> */}
                    </Button>
                  )}
                </Card.Body>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuddyCard;
