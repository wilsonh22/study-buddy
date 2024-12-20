'use client';

import { signIn } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import './signin.css';

/** The sign in page. */
const SignIn = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const result = await signIn('credentials', {
      callbackUrl: '/sessions',
      email,
      password,
    });

    if (result?.error) {
      console.error('Sign in failed: ', result.error);
      console.log('error');
    }
  };

  return (
    <main className="main-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Sign In</h1>
            <Card className="grayCard">
              <Card.Body>
                <Form method="post" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <input name="email" type="text" className="form-control" placeholder="Email" />
                  </Form.Group>
                  <Form.Group>
                    <input name="password" type="password" className="form-control" placeholder="Password" />
                  </Form.Group>
                  <Button type="submit" className="mt-3 mx-auto d-block">
                    Sign In
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer>
                Don&apos;t have an account?&nbsp;
                <a href="/auth/signup">Sign up</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;
