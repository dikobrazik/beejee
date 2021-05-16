import { unwrapResult } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../../../store';
import { isAuthorizedSelector } from '../../../../auth/store/index/selectors';
import ErrorMessage from '../../../../common/ui/components/error-message';
import Loader from '../../../../common/ui/components/loader';
import notify from '../../../../common/ui/components/notify';
import { Task } from '../../../domain/interfaces/task';
import { saveTask } from '../../../store/index/actions';
import { isLoadingSelector } from '../../../store/index/selectors';

type Props = {
  task?: Task;
  onDone?: (task: Task) => any;
};

const emailPattern =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const TasksForm = (props: Props) => {
  const { task } = props;
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(isLoadingSelector);
  const isAuthorized = useSelector(isAuthorizedSelector);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ defaultValues: task });

  const handleServerErrors = useCallback((errors: Record<keyof Task, string>) => {
    if (typeof errors === 'string') {
      const message = errors;
      notify({ message, type: 'danger' });
    } else {
      for (const [key, message] of Object.entries(errors)) {
        setError(key as keyof Task, { type: 'validate', message });
      }
    }
  }, []);

  const onSubmit = useCallback<SubmitHandler<Task>>((task, event) => {
    const payload = new FormData(event?.target);
    dispatch(saveTask(payload))
      .then(unwrapResult)
      .then(() => {
        notify({ message: 'Success', type: 'success' });
        props.onDone && props.onDone(task);
      })
      .catch((errors: Record<keyof Task, string>) => handleServerErrors(errors));
  }, []);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('id')} />
      {task?.id && isAuthorized && <Form.Check type="switch" id="status" label="Status" {...register('status')} />}
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control isInvalid={!!errors.username} readOnly={!!task} {...register('username', { required: true })} />
        <ErrorMessage error={errors.username} />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          readOnly={!!task}
          isInvalid={!!errors.email}
          {...register('email', { required: true, pattern: { value: emailPattern, message: 'Неверный email' } })}
        />
        <ErrorMessage error={errors.email} />
      </Form.Group>
      <Form.Group controlId="text">
        <Form.Label>Text</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          placeholder="Task text"
          isInvalid={!!errors.text}
          {...register('text', { required: true })}
        />
        <ErrorMessage error={errors.text} />
      </Form.Group>
      <Row>
        <Col></Col>
        <Col md="auto">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
      <Loader visible={loading}></Loader>
    </Form>
  );
};

export default TasksForm;
