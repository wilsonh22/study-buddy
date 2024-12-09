'use client';

import { useState } from 'react';
import { addBuddy } from '@/lib/dbActions';
import { StudySession } from '@prisma/client';
// import { StarFill } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import { HeartFill, Heart, Pencil } from 'react-bootstrap-icons';
import { Card, Button, Image, Col, Row, Badge } from 'react-bootstrap';
import SearchBuddies from './SearchBuddies';
import '../styles/sessionBuddyCard.style.css';

type ExtendedStudySession = StudySession & {
  owner: {
    id: number;
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
  users: {
    id: number;
    profile?: {
      firstName: string;
      lastName: string;
      bio: string;
      major: string;
      collegeRole: string;
      social: string;
      profilePicUrl: string;
    };
  }[];
};

const SessionBuddyCard = ({ buddyList, currentUser }: { buddyList: ExtendedStudySession[]; currentUser: number }) => {
  const users = buddyList.flatMap((buddy) => buddy.users);

  //   const addBuddyBtn = async (buddy: ExtendedStudySession) => {
  //     console.log('Buddy ID:', buddy.id);
  //     console.log('Current User ID:', currentUser);
  //     await addBuddy(buddy.id, currentUser);
  //     swal('Success', 'Added Buddy', 'success', {
  //       timer: 1000,
  //     });
  //   };

  //   const buddySearch = buddyList.filter((buddy) => {
  //     const firstName = buddy.userDupe.profile?.firstName ?? '';
  //     const lastName = buddy.userDupe.profile?.lastName ?? '';
  //     const combinedName = `${firstName} ${lastName}`.toLowerCase();
  //     const searchLower = search.toLowerCase();

  // return (
  //   buddy.userDupe.profile?.firstName?.toLowerCase().includes(searchLower) ||
  //   buddy.userDupe.profile?.lastName?.toLowerCase().includes(searchLower) ||
  //   combinedName.includes(searchLower)
  // );
  //   });
  return (
    <div>
      <div>{/* <SearchBuddies search={search} setSearch={setSearch} /> */}</div>
      <div className="buddyCards">
        {users.map((user) => (
          <div key={user.id} className="buddyCardBorder">
            <Card className="buddyCardCont">
              <Card.Body>
                <Row>
                  <Col xs={3}>
                    <Image className="profilePic" src={user.profile?.profilePicUrl} />
                  </Col>
                  <Col xs={8}>
                    <div className="buddyInfoDiv">
                      <Row>
                        <Card.Title>
                          {user.profile ? `${user.profile.firstName} ${user.profile.lastName}` : 'Unknown'}
                        </Card.Title>
                      </Row>
                      <Row>
                        <Col xs={2}>
                          {(() => {
                            let role = 'role';

                            let pillColor = 'primary';
                            if (user.profile?.collegeRole === 'Student') {
                              role = 'Student';
                              pillColor = 'success';
                            }

                            if (user.profile?.collegeRole === 'LA') {
                              role = 'LA';
                              pillColor = 'warning';
                            }

                            if (user.profile?.collegeRole === 'TA') {
                              role = 'TA';
                              pillColor = 'danger';
                            }

                            return (
                              <Badge pill bg={pillColor}>
                                {role}
                              </Badge>
                            );
                          })()}
                        </Col>
                      </Row>
                      <Row>
                        <p>
                          <strong>Bio:</strong>
                          {user.profile?.bio ?? 'No Bio'}
                        </p>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            <strong>Major:</strong>
                            {user.profile?.major ?? 'No Major'}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <p>
                          <strong>Socials:</strong>
                          {user.profile?.social ?? 'No Social'}
                        </p>
                      </Row>
                    </div>
                  </Col>
                </Row>
                <Card.Body className="cardBtnDiv">
                  {currentUser === user.id ? (
                    <Button className="requestBtnModal" href="/editProfile">
                      <Pencil />
                    </Button>
                  ) : (
                    <Button className="requestBtnModal">
                      <Heart />
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

export default SessionBuddyCard;
