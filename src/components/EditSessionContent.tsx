'use client';

import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { TrashFill, BoxArrowInUp } from 'react-bootstrap-icons';
import { useEffect, useState, ChangeEvent } from 'react';
import s3 from '@/lib/s3';
import { updateSession, getSessionById, deleteSession } from '@/lib/dbActions';
import { useForm, Controller } from 'react-hook-form';
import swal from 'sweetalert';
import DatePicker from 'react-datepicker';
import { useSearchParams } from 'next/navigation';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/createSession.style.css';

interface FormData {
  title: string;
  description: string;
  class: string;
  place: string;
  sessionDate: Date;
  startTime: Date;
  endTime: Date;
  image: string;
}

interface Session {
  id: number;
  title: string;
  description: string;
  class: string;
  place: string;
  sessionDate: Date;
  startTime: Date;
  endTime: Date;
  userId: number;
  image: string;
}

const EditSessionContent = ({ currentUser }: { currentUser: number }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [session, setSession] = useState<Session | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const { register, handleSubmit, control, setValue } = useForm<FormData>();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        if (!id) return;

        const sessionData = await getSessionById(parseInt(id, 10));

        if (!sessionData) return;

        if (sessionData) {
          if (sessionData.image) {
            const latestImage = sessionData.image;
            setValue('image', latestImage);
            setImage(latestImage);
          }
        }

        setSession(sessionData);
        setValue('title', sessionData.title);
        setValue('description', sessionData.description);
        setValue('class', sessionData.class);
        setValue('place', sessionData.place);
        setValue('sessionDate', new Date(sessionData.sessionDate));
        setValue('startTime', new Date(sessionData.startTime));
        setValue('endTime', new Date(sessionData.endTime));
      } catch (error) {
        console.log('Error fetching session:', error);
        swal('Error', 'Error fetching session', 'error');
      }
    };
    fetchSession();
  }, [id, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      if (!id || !session) return;

      await updateSession(parseInt(id, 10), {
        ...data,
        userId: session.userId,
      });

      swal('Success', 'Session Updated', 'success', {
        timer: 1500,
      });
    } catch (error) {
      console.error('Error updating session:', error);
      swal('Error', 'Error updating session', 'error');
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
      };

      s3.upload(uploadParams, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          console.error('Error uploading image:', err);
          swal('Error', 'Failed to upload image', 'error');
        } else {
          setValue('image', data.Location);
          setImage(data.Location);
          swal('Success', 'Session image uploaded. Please complete editing other fields.', 'success');
        }
      });
    }
  }

  return (
    <div className="p-5">
      <h1 className="createSessionTitle text-center">
        <strong>Edit Session</strong>
      </h1>
      {currentUser === session?.userId ? (
        <Container className="py-3">
          <Row className="justify-content-center">
            <Col xs={10}>
              <Card className="cardBox">
                <Card.Body>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Session Title</Form.Label>
                          <input
                            type="text"
                            {...register('title')}
                            className="form-control"
                            placeholder="Enter Title"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Date</Form.Label>
                          <Controller
                            name="sessionDate"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                selected={field.value}
                                className="form-control"
                                onChange={(date) => field.onChange(date)}
                                dateFormat="MMMM d, yyyy"
                                placeholderText="Select session date"
                                todayButton="Today"
                              />
                            )}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Start Time</Form.Label>
                          <Controller
                            name="startTime"
                            control={control}
                            render={({ field }) => (
                              <input
                                id="startTime"
                                type="time"
                                className="form-control"
                                value={field.value ? field.value.toTimeString().slice(0, 5) : ''}
                                onChange={(e) => {
                                  const time = new Date();
                                  const [hours, minutes] = e.target.value.split(':');
                                  time.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                                  field.onChange(time);
                                }}
                              />
                            )}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>End Time</Form.Label>
                          <Controller
                            name="endTime"
                            control={control}
                            render={({ field }) => (
                              <input
                                id="endTime"
                                type="time"
                                className="form-control"
                                value={field.value ? field.value.toTimeString().slice(0, 5) : ''}
                                onChange={(e) => {
                                  const time = new Date();
                                  const [hours, minutes] = e.target.value.split(':');
                                  time.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                                  field.onChange(time);
                                }}
                              />
                            )}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Description</Form.Label>
                          <input
                            type="text"
                            {...register('description')}
                            className="form-control"
                            placeholder="Enter Session Description"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Session Image</Form.Label>
                          <div className="imageDiv">
                            <div className="sessionImg">
                              {image ? (
                                <Image src={image} alt="Session Image" className="uploaded-image" />
                              ) : (
                                <div className="placeholder-image py-3">
                                  No image
                                  <br />
                                  uploaded
                                </div>
                              )}
                            </div>
                            <div className="addBtnDiv">
                              <Button
                                className="add-icon-circle"
                                onClick={() => document.getElementById('sessionImgUrl')?.click()}
                              >
                                <span className="add-icon">
                                  <i className="bi bi-box-arrow-in-up" />
                                  <BoxArrowInUp />
                                </span>
                              </Button>
                            </div>
                          </div>
                          <input
                            id="sessionImgUrl"
                            type="file"
                            accept="image/png, image/jpeg image/jpg"
                            style={{ display: 'none' }}
                            onChange={handleImgUpload}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Row>
                          <Col>
                            <Form.Group>
                              <Form.Label>Class</Form.Label>
                              <input
                                type="text"
                                {...register('class')}
                                className="form-control"
                                placeholder="Enter Class"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group>
                              <Form.Label>Place</Form.Label>
                              <input
                                type="text"
                                {...register('place')}
                                className="form-control"
                                placeholder="Where to study"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Form.Group className="form-group">
                      <Row className="pt-3">
                        <Col />
                        <Col />
                        <Col />
                        <Col>
                          <Button className="cSbutton" type="submit" variant="primary">
                            Save
                          </Button>
                        </Col>
                        <Col />
                        <Col />
                        <Col />
                      </Row>
                    </Form.Group>
                    <Button
                      className="deleteBtn"
                      type="button"
                      variant="danger"
                      onClick={() => {
                        swal({
                          title: 'Confirm Deletion',
                          text: 'Are you sure you want to delete this session? This action cannot be undone.',
                          icon: 'warning',
                          buttons: ['Cancel', 'Delete'],
                          dangerMode: true,
                        }).then(async (isConfirmed) => {
                          if (isConfirmed) {
                            await deleteSession(parseInt(id as string, 10));
                            swal('Session has been successfully deleted.', {
                              icon: 'success',
                            });
                          } else {
                            swal('Deletion has been canceled.');
                          }
                        });
                      }}
                    >
                      <TrashFill />
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <div />
      )}
    </div>
  );
};

export default EditSessionContent;
