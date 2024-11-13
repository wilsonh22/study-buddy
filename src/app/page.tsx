import { Col, Container, Row, Button } from 'react-bootstrap';
import './globals.css';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center vh-100">
        <Col xs={12} className="d-flex flex-column justify-content-center align-items-center">
          <h1>Study Buddy</h1>
          <p>&quot;Your study success starts with a buddy&quot;</p>
          <Button>Get Started</Button>
        </Col>
      </Row>
      <Row className="tutorial-row vh-100">
        <h1>What is Study Buddy?</h1>
      </Row>
    </Container>
  </main>
);

export default Home;
