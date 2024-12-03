'use client';

import React, { useState, ChangeEvent } from 'react';
import s3 from '@/lib/s3';
import { useSession } from 'next-auth/react';
import { Container, Row, Col, Card, Form, Button, Dropdown, DropdownButton, Image } from 'react-bootstrap';
import { CollegeRole } from '@prisma/client';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { createProfile } from '@/lib/dbActions';
import { CreateProfileSchema } from '@/lib/validationSchemas';
import '../../styles/editProfile.style.css';

const onSubmit = async (
  data: {
    firstName: string;
    lastName: string;
    major: string;
    social: string;
    bio: string;
    collegeRole: CollegeRole;
    profilePicUrl: string;
  },
  session: any,
) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  const userId = parseInt(session?.user?.id, 10); // Assuming userId is available in session
  await createProfile({ ...data, userId, id: userId });

  swal('Success', 'Created profile', 'success', {
    timer: 1000,
  });
};

const CreateProfile: React.FC = () => {
  const { data: session, status } = useSession();
  const [selectedRole, setSelectedRole] = useState<CollegeRole | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
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

  const handleRoleSelect = (eventKey: string | null) => {
    if (eventKey) {
      const role = eventKey as CollegeRole;
      setSelectedRole(role);
      // This ensures the value is registered with react-hook-form
      setValue('collegeRole', role);
    }
  };

  function handleImgUpload(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const uploadParams = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
        Key: `public/${Date.now()}_${file.name}`,
        Body: file,
        ContentType: file.type,
        // ACL: 'public-read',
      };

      s3.upload(uploadParams, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          console.error('Error uploading image:', err);
        } else {
          console.log('Image uploaded successfully:', data.Location);
          // Update the profilePicUrl field with the image URL
          setValue('profilePicUrl', data.Location);
          setProfilePicUrl(data.Location);
        }
      });
    }
  }
  return (
    <div className="p-5">
      <h1 className="createSessionTitle text-center">
        <strong>Create Profile</strong>
      </h1>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={10}>
            <Card className="thebox">
              <Card.Body>
                {/* Profile Image Section */}
                <div className="profile-image-container">
                  <div className="profile-image">
                    {profilePicUrl ? (
                      <Image src={profilePicUrl} alt="Profile" className="uploaded-image" />
                    ) : (
                      <div className="placeholder-image py-5">
                        No image
                        <br />
                        uploaded
                      </div>
                    )}
                    <Button
                      className="add-icon-circle"
                      onClick={() => document.getElementById('profilePicUrl')?.click()}
                    >
                      <span className="add-icon">+</span>
                    </Button>
                    <input
                      id="profilePicUrl"
                      type="file"
                      accept="image/png, image/jpeg image/jpg"
                      style={{ display: 'none' }}
                      onChange={handleImgUpload}
                    />
                  </div>
                </div>
                {/* Form Section */}
                <Form onSubmit={handleSubmit((data) => onSubmit(data, session))}>
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
                          Create Profile
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

export default CreateProfile;
