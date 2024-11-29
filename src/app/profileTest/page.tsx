'use client';

import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/editProfile.style.css';

const ProfileTest: React.FC = () => (
  <main className="main-container">
    <Container>
      <Row className="justify-content-center">
        <Col xs={5}>
          <h1 className="text-center">Edit Profile</h1>
        </Col>
      </Row>
    </Container>
  </main>
);

export default ProfileTest;
