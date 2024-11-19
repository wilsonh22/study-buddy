import { Col, Container, Row, Button } from 'react-bootstrap';
import './globals.css';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Row id="about" className="about-row align-middle text-center vh-100">
        <Col xs={12} className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="title">Study</h1>
          <h1 className="title">Buddy</h1>
          <p>&quot;Your study success starts with a buddy&quot;</p>
          <Button className="get-started">Get Started</Button>
        </Col>
      </Row>
      <Row id="tutorial" className="tutorial-row vh-100">
        <h1 className="mt-5">What is Study Buddy?</h1>
        <Col className="col-centered">
          <div className="container_temp">
            <div className="overlay_temp" />
          </div>
        </Col>
        <Col className="col-centered">
          <div className="container">
            <div className="overlay" />
            <p className="text">
              Study buddy is an application to find a buddy to study with.
              With study buddy, you can find and schedule study sessions.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
