'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
import s3 from '@/lib/s3';
import { Container, Row, Col, Card, Form, Button, Dropdown, DropdownButton, Image } from 'react-bootstrap';
import { CollegeRole } from '@prisma/client';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { editProfile, getProfile } from '@/lib/dbActions';
import { CreateProfileSchema } from '@/lib/validationSchemas';
import '../../styles/editProfile.style.css';

const EditProfile: React.FC = () => {
  const { data: session, status } = useSession();
  const [selectedRole, setSelectedRole] = useState<CollegeRole | null>(null);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

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
            if (profileData.profilePicUrl) {
              setValue('profilePicUrl', profileData.profilePicUrl);
              setProfilePicUrl(profileData.profilePicUrl);
            }

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
    profilePicUrl: string;
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

  function handleImgUpload(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const uploadParams = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!, // Your S3 bucket name
        Key: `public/${file.name}`,
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
