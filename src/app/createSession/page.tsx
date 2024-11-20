'use client';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import '../../styles/createSession.style.css';

const createSession = () => (
  <div className="p-5">
    <h1 className="createSessionTitle text-center">
      <strong>Create Sessions</strong>
    </h1>
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card className="thebox">
            <Card.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label />
                      <input type="text" className="form-control" placeholder="Title" />
                      <div className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label />
                      <input type="text" className="form-control" placeholder="Class" />
                      <div className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label />
                      <input type="text" className="form-control" placeholder="Place" />
                      <div className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label />
                      <input type="text" className="form-control" placeholder="Date" />
                      <div className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label />
                      <input type="text" className="form-control" placeholder="Time" />
                      <div className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label />
                  <textarea className="form-control" placeholder="Enter a description" />
                  <div className="invalid-feedback" />
                </Form.Group>
                <input type="hidden" />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col />
                    <Col />
                    <Col />
                    <Col>
                      <Button className="cSbutton" type="submit" variant="primary">
                        Add Session
                      </Button>
                    </Col>
                    <Col />
                    <Col />
                    <Col />
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default createSession;
