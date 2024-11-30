'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Container, Row, Col, Card, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { CollegeRole } from '@prisma/client';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { editProfile, getProfile } from '@/lib/dbActions';
import { CreateProfileSchema } from '@/lib/validationSchemas';
import '../../styles/editProfile.style.css';

// const onSubmit = async (
//   data: {
//     firstName: string;
//     lastName: string;
//     major: string;
//     social: string;
//     bio: string;
//     collegeRole: CollegeRole;
//   },
//   session: any,
// ) => {
//   // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
//   const userId = parseInt(session?.user?.id, 10); // Assuming userId is available in session
//   await editProfile({ ...data, userId, id: userId });

//   swal('Success', 'Saved profile', 'success', {
//     timer: 1000,
//   });
// };

const EditProfile: React.FC = () => {
  const { data: session, status } = useSession();
  const [selectedRole, setSelectedRole] = useState<CollegeRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateProfileSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Use type assertion to handle the any type
        const userId = session?.user && 'id' in session.user ? parseInt((session.user as any).id, 10) : null;

        if (userId) {
          const profileData = await getProfile(userId);

          if (profileData) {
            // Populate form fields
            setValue('firstName', profileData.firstName || '');
            setValue('lastName', profileData.lastName || '');
            setValue('major', profileData.major || '');
            setValue('social', profileData.social || '');
            setValue('bio', profileData.bio || '');

            // Set the selected role
            if (profileData.collegeRole) {
              setSelectedRole(profileData.collegeRole);
              setValue('collegeRole', profileData.collegeRole);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        swal('Error', 'Failed to load profile', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [session, setValue, status]);

  const onSubmit = async (data: {
    firstName: string;
    lastName: string;
    major: string;
    social: string;
    bio: string;
    collegeRole: CollegeRole;
  }) => {
    try {
      // Use type assertion to handle the any type
      const userId = session?.user && 'id' in session.user ? parseInt((session.user as any).id, 10) : null;

      if (!userId) {
        throw new Error('No user ID found');
      }

      await editProfile({
        ...data,
        userId,
        id: userId,
      });

      swal('Success', 'Profile saved successfully', 'success', {
        timer: 1500,
      });
    } catch (error) {
      console.error('Profile save error:', error);
      swal('Error', 'Failed to save profile', 'error');
    }
  };

  const handleRoleSelect = (eventKey: string | null) => {
    if (eventKey) {
      const role = eventKey as CollegeRole;
      setSelectedRole(role);
      setValue('collegeRole', role);
    }
  };

  // Loading state
  if (status === 'loading' || isLoading) {
    return <LoadingSpinner />;
  }

  // Unauthenticated state
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <div className="p-5">
      <h1 className="createSessionTitle text-center">
        <strong>Edit Profile</strong>
      </h1>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={10}>
            <Card className="thebox">
              <Card.Body>
                {/* Profile Image Section */}
                <div className="profile-image-container">
                  <div className="profile-image">
                    <div className="add-icon-circle">
                      <span className="add-icon">+</span>
                    </div>
                  </div>
                </div>
                {/* Form Section */}
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col xs={5}>
                      <Form.Group>
                        <Form.Label />
                        <input
                          type="text"
                          {...register('firstName')}
                          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                          placeholder="First Name"
                        />
                        <div className="invalid-feedback" />
                      </Form.Group>
                    </Col>
                    <Col xs={5}>
                      <Form.Group>
                        <Form.Label />
                        <input
                          type="text"
                          {...register('lastName')}
                          className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                          placeholder="Last Name"
                        />
                        <div className="invalid-feedback" />
                      </Form.Group>
                    </Col>
                    <Col xs={2} className="collegeRoleCol">
                      <Form.Group>
                        <Form.Label />
                        <DropdownButton
                          id="roleDropdown"
                          title={selectedRole || 'College Role'}
                          onSelect={handleRoleSelect}
                          variant="custom"
                          className={`w-100${errors.collegeRole ? 'is-invalid' : ''}`}
                        >
                          {Object.values(CollegeRole).map((role) => (
                            <Dropdown.Item className="roleDropdownItem" key={role} eventKey={role}>
                              {role}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                        <input type="hidden" {...register('collegeRole')} value={selectedRole || ''} />
                        {errors.collegeRole && (
                          <div className="invalid-feedback d-block">{errors.collegeRole.message}</div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label />
                      <input type="text" className="form-control" placeholder="Username" />
                      <div className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                </Row> */}
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label />
                        <input
                          type="text"
                          {...register('major')}
                          className={`form-control ${errors.major ? 'is-invalid' : ''}`}
                          placeholder="Major"
                        />
                        <div className="invalid-feedback" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label />
                        <input
                          type="text"
                          {...register('social')}
                          className={`form-control ${errors.social ? 'is-invalid' : ''}`}
                          placeholder="Social"
                        />
                        <div className="invalid-feedback" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group>
                    <Form.Label />
                    <textarea
                      {...register('bio')}
                      className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
                      placeholder="Bio: Tell us about yourself!"
                    />
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
                          Save Profile
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

export default EditProfile;
