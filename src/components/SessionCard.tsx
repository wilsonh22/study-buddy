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
              <Card.Title className="fixOverflow">{studySessionInfo.title}</Card.Title>
              <div>
                <p>{studySessionInfo.description}</p>
                <p>
                  <strong>Organizer: </strong>
                  {studySessionInfo.owner?.profile
                    ? `${studySessionInfo.owner.profile.firstName} ${studySessionInfo.owner.profile.lastName}`
                    : 'Unknown'}
                </p>
                <p>
                  <strong>Buddies: </strong>
                  Ralph, Wilson, Lukas, Reo the quick boasjkd;lfajskdf l;ajs
                </p>
                <p>
                  <strong>Class: </strong>
                  {studySessionInfo.class}
                </p>
                <p>
                  <strong>Where: </strong>
                  {studySessionInfo.place}
                </p>
                <p>
                  <strong>Date: </strong>
                  {new Date(studySessionInfo.sessionDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p>
                  <strong>Time: </strong>
                  {new Date(studySessionInfo.startTime).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                  -
                  {new Date(studySessionInfo.endTime).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
              </div>
              <div className="py-1" />

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
