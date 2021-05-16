import { unwrapResult } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../../../store';
import ErrorMessage from '../../../../common/ui/components/error-message';
import Loader from '../../../../common/ui/components/loader';
import notify from '../../../../common/ui/components/notify';
import { Task } from '../../../../tasks/domain/interfaces/task';
import { loginPayload } from '../../../domain/interfaces/loginPayload';
import { login } from '../../../store/index/actions';
import { isAuthLoadingSelector } from '../../../store/index/selectors';

type Props = {
  onDone?: () => void;
};

const AuthFormsLogin = (props: Props) => {
  const loading = useSelector(isAuthLoadingSelector);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<loginPayload>();

  const handleServerErrors = useCallback((errors) => {
    if (typeof errors === 'string') {
      const message = errors;
      notify({ message, type: 'danger' });
    } else {
      setError('password', { type: 'invalid', message: errors?.['password'] });
    }
  }, []);

  const onSubmit = useCallback<SubmitHandler<Task>>((task, event) => {
    dispatch(login(new FormData(event?.target)))
      .then(unwrapResult)
      .then((response) => {
        notify({ message: 'Login success', type: 'success' });
        props.onDone && props.onDone();
      })
      .catch((errors: Record<keyof Task, string>) => handleServerErrors(errors));
  }, []);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control isInvalid={!!errors.username} {...register('username', { required: true })} />
        <ErrorMessage error={errors.username} />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" isInvalid={!!errors.password} {...register('password', { required: true })} />
        <ErrorMessage error={errors.password} />
      </Form.Group>
      <Row>
        <Col></Col>
        <Col md="auto">
          <Button variant="primary" type="submit">
            Sing in
          </Button>
        </Col>
      </Row>
      <Loader visible={loading} />
    </Form>
  );
};

export default AuthFormsLogin;
