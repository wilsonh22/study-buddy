'use client';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { createSession } from '@/lib/dbActions';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { CreateSessionSchema } from '@/lib/validationSchemas';
import '../../styles/createSession.style.css';

const onSubmit = async (data: { title: string; description: string; class: string; place: string }, session: any) => {
  const currentUser = parseInt(session?.user?.id, 10);
  await createSession({ ...data, id: currentUser, userId: currentUser, added: true });

  swal('Success', 'created session', 'success', {
    timer: 1000,
  });
};

const CreateSessionPage: React.FC = () => {
  const { data: session, status } = useSession();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(CreateSessionSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }
  return (
    <div className="p-5">
      <h1 className="createSessionTitle text-center">
        <strong>Create Sessions</strong>
      </h1>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={10}>
            <Card className="thebox">
              <Card.Body>
                <Form onSubmit={handleSubmit((data) => onSubmit(data, session))}>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label />
                        <input type="text" {...register('title')} className="form-control" placeholder="Title" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label />
                        <input
                          type="text"
                          {...register('description')}
                          className="form-control"
                          placeholder="Description"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label />
                        <input type="text" {...register('class')} className="form-control" placeholder="Class" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label />
                        <input
                          type="text"
                          {...register('place')}
                          className="form-control"
                          placeholder="Where to study"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/*
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
                <input type="hidden" /> */}
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
};

export default CreateSessionPage;
