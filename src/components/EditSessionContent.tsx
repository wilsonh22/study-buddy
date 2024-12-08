'use client';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { TrashFill, BoxArrowInUp } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
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
}

const EditSessionContent = ({ currentUser }: { currentUser: number }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [session, setSession] = useState<Session | null>(null);
  const { register, handleSubmit, control, setValue } = useForm<FormData>();

  useEffect(() => {
    const fetchSession = async () => {
      if (!id) return;

      const sessionData = await getSessionById(parseInt(id, 10));

      if (!sessionData) return;

      setSession(sessionData);
      setValue('title', sessionData.title);
      setValue('description', sessionData.description);
      setValue('class', sessionData.class);
      setValue('place', sessionData.place);
      setValue('sessionDate', new Date(sessionData.sessionDate));
      setValue('startTime', new Date(sessionData.startTime));
      setValue('endTime', new Date(sessionData.endTime));
    };

    fetchSession();
  }, [id, setValue]);

  const onSubmit = async (data: FormData) => {
    if (!id || !session) return;

    await updateSession(parseInt(id, 10), {
      ...data,
      userId: session.userId,
    });

    swal('Success', 'Session Updated', 'success', {
      timer: 1500,
    });
  };
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
                            <div className="sessionImg" />
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
