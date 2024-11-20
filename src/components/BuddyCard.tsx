'use client';

import { Card, Button } from 'react-bootstrap';
import '../styles/buddyCard.style.css';

const BuddyCard = () => (
  <div className="buddyCard">
    <div className="sessionCardBorder">
      <Card className="sessionCardCont">
        <Card.Body>
          <div className="profilePic" />
          <Card.Title className="pt-3">Ralph Ramos</Card.Title>
          <Card.Text>
            <strong>Bio: </strong>
            Coding is Hard
          </Card.Text>
          <Card.Text>
            <strong>Major: </strong>
            Computer Science
          </Card.Text>
          <Card.Text>
            <strong>Buddies: </strong>
            John, Wilson, Lukas, Reo
          </Card.Text>
          <Card.Body className="cardBtnDiv">
            <Button className="requestBtn">Request</Button>
          </Card.Body>
        </Card.Body>
      </Card>
    </div>
  </div>
);

export default BuddyCard;
