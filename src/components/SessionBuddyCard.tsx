'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { addBuddy, removeBuddy, getBuddyIdByUserId, isBuddyWithCurrentUser } from '@/lib/dbActions';
import { StudySession } from '@prisma/client';
// import { StarFill } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import { HeartFill, Heart, Pencil } from 'react-bootstrap-icons';
import { Card, Button, Image, Col, Row, Badge } from 'react-bootstrap';
// import SearchBuddies from './SearchBuddies';
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
    myBuddies?: {
      buddyId: number;
    }[];
  }[];
};

const SessionBuddyCard = ({ buddyList, currentUser }: { buddyList: ExtendedStudySession[]; currentUser: number }) => {
  // const users = buddyList.flatMap((buddy) => buddy.users);

  const users = useMemo(() => buddyList.flatMap((buddy) => buddy.users), [buddyList]);

  const addBuddyBtn = async (user: {
    id: number;
    profile?:
      | {
          firstName: string;
          lastName: string;
          bio: string;
          major: string;
          collegeRole: string;
          social: string;
          profilePicUrl: string;
        }
      | undefined;
    myBuddies?: { buddyId: number }[] | undefined;
  }) => {
    // Assuming you want to use the owner's ID or the first user's ID

    const idOfBuddyModel = await getBuddyIdByUserId(user.id);
    const idOfBuddyModelCurrentUser = await getBuddyIdByUserId(currentUser);

    console.log('id of buddy from id of user:', idOfBuddyModel);
    console.log('Buddy model ID to add as buddy:', idOfBuddyModel);
    console.log('Current User ID:', currentUser);
    console.log('Current User ID of Buddy Model:', idOfBuddyModelCurrentUser);

    try {
      if (idOfBuddyModel) {
        await addBuddy(idOfBuddyModel, currentUser);
        await addBuddy(idOfBuddyModelCurrentUser!, idOfBuddyModel);
        swal('Success', 'Added Buddy', 'success', {
          timer: 1000,
        });
      } else {
        swal('Error', 'No buddy ID found', 'error', {
          timer: 1000,
        });
      }
    } catch (error) {
      console.error('Error adding buddy:', error);
      swal('Error', 'Failed to add buddy', 'error', {
        timer: 1000,
      });
    }
  };

  const removeBuddyBtn = async (user: {
    id: number;
    profile?:
      | {
          firstName: string;
          lastName: string;
          bio: string;
          major: string;
          collegeRole: string;
          social: string;
          profilePicUrl: string;
        }
      | undefined;
    myBuddies?: { buddyId: number }[] | undefined;
  }) => {
    // Assuming you want to use the owner's ID or the first user's ID

    const idOfBuddyModel = await getBuddyIdByUserId(user.id);
    const idOfBuddyModelCurrentUser = await getBuddyIdByUserId(currentUser);

    console.log('id of buddy from id of user:', idOfBuddyModel);
    console.log('Buddy model ID to remove as buddy:', idOfBuddyModel);
    console.log('Current User ID:', currentUser);
    console.log('Current User ID of Buddy Model:', idOfBuddyModelCurrentUser);

    try {
      if (idOfBuddyModel) {
        await removeBuddy(idOfBuddyModel, currentUser);
        await removeBuddy(idOfBuddyModelCurrentUser!, idOfBuddyModel);
        swal('Success', 'Removed Buddy', 'error', {
          timer: 1000,
        });
      } else {
        swal('Error', 'No buddy ID found', 'error', {
          timer: 1000,
        });
      }
    } catch (error) {
      console.error('Error adding buddy:', error);
      swal('Error', 'Failed to add buddy', 'error', {
        timer: 1000,
      });
    }
  };

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
                  {(() => {
                    if (user.id === currentUser) {
                      return (
                        <Button className="requestBtnModal" href="/editProfile">
                          <Pencil />
                        </Button>
                      );
                    }

                    // const isBuddy = user.myBuddies?.some((buddy) => buddy.buddyId === currentUser);

                    // const isBuddy = user.myBuddies?.some((buddy) => {
                    //   console.log('Buddy:', buddy);
                    //   console.log('Current User:', currentUser);
                    //   console.log('Comparison:', buddy.buddyId === currentUser);
                    //   return buddy.buddyId === currentUser;
                    // });

                    const [buddyStatus, setBuddyStatus] = useState<{ [key: number]: boolean }>({});

                    useEffect(() => {
                      users.forEach(async (user) => {
                        const isBuddy = await isBuddyWithCurrentUser(user.id, currentUser);
                        setBuddyStatus((prev) => ({ ...prev, [user.id]: isBuddy }));
                      });
                    }, [users, currentUser]);

                    if (buddyStatus[user.id]) {
                      return (
                        <Button className="requestBtnModal" onClick={() => removeBuddyBtn(user)}>
                          <HeartFill />
                        </Button>
                      );
                    }
                    return (
                      <Button className="requestBtnModal" onClick={() => addBuddyBtn(user)}>
                        <Heart />
                      </Button>
                    );
                  })()}

                  {/* {currentUser === user.id ? (
                    <Button className="requestBtnModal" href="/editProfile">
                      <Pencil />
                    </Button>
                  ) : (
                    <Button className="requestBtnModal" onClick={() => addBuddyBtn(user)}>
                      <Heart />
                    </Button>
                  )} */}
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
