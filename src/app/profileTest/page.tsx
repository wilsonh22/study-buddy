'use client';

import { useSession } from 'next-auth/react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { createProfile } from '@/lib/dbActions';
import { CreateProfileSchema } from '@/lib/validationSchemas';
import '../../styles/editProfile.style.css';

const onSubmit = async (data: { firstName: string; lastName: string; major: string }, session: any) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  const userId = parseInt(session?.user?.id, 10); // Assuming userId is available in session
  await createProfile({ ...data, userId, id: userId });

  swal('Success', 'created profile', 'success', {
    timer: 1000,
  });
};
const ProfileTest: React.FC = () => {
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateProfileSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <main className="main-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Edit Profile</h1>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit((data) => onSubmit(data, session))}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <input type="hidden" />
                    <input
                      type="text"
                      {...register('firstName')}
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                  </Form.Group>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>Last Name</Form.Label>
                    <input
                      type="text"
                      {...register('lastName')}
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                  </Form.Group>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>Major</Form.Label>
                    <input
                      type="text"
                      {...register('major')}
                      className={`form-control ${errors.major ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.major?.message}</div>
                  </Form.Group>
                  <Button type="submit" className="mt-3 ">
                    Save Profile
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ProfileTest;
