'use client';

import { addSession } from '@/lib/dbActions';
import { StudySession } from '@prisma/client';
import { Card, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import '../styles/sessionCard.style.css';

type ExtendedStudySession = StudySession & {
  owner: {
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
};

const SessionCard = ({
  studySessions,
  currentUser,
}: {
  studySessions: ExtendedStudySession[];
  currentUser: number;
}) => {
  const addSessionBtn = async (studySession: ExtendedStudySession) => {
    console.log('Study Session ID:', studySession.id);
    console.log('Current User ID:', currentUser);
    await addSession(studySession.id, currentUser);
    swal('Success', 'Added Session', 'success', {
      timer: 1000,
    });
  };

  return (
    <div className="sessionCards">
      {studySessions.map((studySessionInfo) => (
        <div key={studySessionInfo.id} className="sessionCardBorder">
          <Card className="sessionCardCont">
            <Card.Img
              variant="top"
              src="/cardImgExample.jpg"
              className="cardImg"
              style={{ height: '150px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title>{studySessionInfo.title}</Card.Title>
              <Card.Text style={{ lineHeight: '2' }}>
                {studySessionInfo.description}
                <br />
                <strong>Organizer: </strong>
                {studySessionInfo.owner?.profile
                  ? `${studySessionInfo.owner.profile.firstName} ${studySessionInfo.owner.profile.lastName}`
                  : 'Unknown'}
                <br />
                <strong>Buddies: </strong>
                Ralph, Wilson, Lukas, Reo
                <br />
                <strong>Class: </strong>
                {studySessionInfo.class}
                <br />
                <strong>Where: </strong>
                {studySessionInfo.place}
                <br />
                <strong>When: </strong>
                12/12/2024 5pm - 8pm
                <br />
              </Card.Text>
              <Button className="requestBtn" onClick={() => addSessionBtn(studySessionInfo)}>
                Add
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SessionCard;
