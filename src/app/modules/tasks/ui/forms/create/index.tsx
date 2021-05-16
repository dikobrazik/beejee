import { useCallback } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../../../store';
import ErrorMessage from '../../../../common/ui/components/error-message';
import Loader from '../../../../common/ui/components/loader';
import { Task } from '../../../domain/interfaces/task';
import { createTask } from '../../../store/index/actions';
import { isLoadingSelector } from '../../../store/index/selectors';

type Props = {
  task?: Task;
  onDone?: (task: Task) => any;
};

const emailPattern =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const TasksCreateForm = (props: Props) => {
  const { task } = props;
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(isLoadingSelector);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm({ defaultValues: task });

  const onSubmit = useCallback<SubmitHandler<Task>>((task, event) => {
    dispatch(createTask(new FormData(event?.target)))
      .then(() => {
        props.onDone && props.onDone(task);
      })
      .catch((errors: Record<keyof Task, string>) => {
        Object.entries(errors).forEach(([key, message]) => setError(key as keyof Task, { type: 'validate', message }));
      });
  }, []);
  return (
    <Form onSubmit={handleSubmit(onSubmit, console.log)}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control isInvalid={!!errors.username} {...register('username', { required: true })} />
        <ErrorMessage error={errors.username} />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
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

export default TasksCreateForm;