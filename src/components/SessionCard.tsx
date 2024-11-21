'use client';

import { Card, Col, Row, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/sessionCard.style.css';

const SessionCard = () => (
  <div className="sessionCard">
    <div className="sessionCardBorder">
      <Card className="sessionCardCont">
        <Card.Img
          variant="top"
          src="/cardImgExample.jpg"
          className="cardImg"
          style={{ height: '150px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>Study Session Title</Card.Title>
          <Card.Text>Come Study for ICS311 Final</Card.Text>
          <Card.Text>
            <strong>Buddies: </strong>
            Ralph, Wilson, Lukas, Reo
          </Card.Text>
          <ListGroup className="list-group-flush no-gap py-1">
            <Row g-0>
              <Col xs={6}>
                <ListGroup.Item className="p-1">
                  <strong>Class:</strong>
                  <br />
                  ICS311
                </ListGroup.Item>
              </Col>
              <Col xs={6}>
                <ListGroup.Item className="p-1">
                  <strong>Organizer:</strong>
                  <br />
                  John Foo
                </ListGroup.Item>
              </Col>
            </Row>
            <Row g-0>
              <Col xs={6}>
                <ListGroup.Item className="p-1">
                  <strong>Time:</strong>
                  <br />
                  3:00PM-5:00PM
                </ListGroup.Item>
              </Col>
              <Col xs={6}>
                <ListGroup.Item className="p-1">
                  <strong>Place:</strong>
                  <br />
                  Hamilton Library
                </ListGroup.Item>
              </Col>
            </Row>
          </ListGroup>
          <Button className="requestBtn">Request</Button>
        </Card.Body>
      </Card>
    </div>
  </div>
);

export default SessionCard;
