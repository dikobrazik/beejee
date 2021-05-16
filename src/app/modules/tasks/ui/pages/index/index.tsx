import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../../../store';
import CommonList from '../../../../common/ui/components/list';
import Loader from '../../../../common/ui/components/loader';
import CommonPagination from '../../../../common/ui/components/paginator';
import { SortParams } from '../../../domain/interfaces/sortParams';
import { loadTasks } from '../../../store/index/actions';
import {
  isLoadingSelector,
  tasksCountSelector,
  tasksPageSelector,
  tasksSelector,
} from '../../../store/index/selectors';
import TaskCardComponent from '../../components/task-card';
import TasksCreateForm from '../../forms/create';

const sorts = 'id,username,email,status'
  .split(',')
  .reduce(
    (sorts, field) => sorts.concat('asc,desc'.split(',').map((direction) => `${field} ${direction}`)),
    [] as string[]
  );

const TasksPagesIndex = () => {
  const [isCreateModalShown, setIsCreateModalShown] = useState(false);
  const handleShow = useCallback(() => setIsCreateModalShown(true), []);
  const handleClose = useCallback(() => setIsCreateModalShown(false), []);

  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(tasksSelector);
  const loading = useSelector(isLoadingSelector);
  const tasksCount = useSelector(tasksCountSelector);
  const tasksPage = useSelector(tasksPageSelector);

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const onSortChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const value = event?.target?.value;
    const [field, direction] = value?.split(' ') as [SortParams['field'], SortParams['direction']];
    dispatch(loadTasks({ sort: { field, direction } }));
  }, []);

  const onPageChange = useCallback((page) => {
    dispatch(loadTasks({ page }));
  }, []);

  return (
    <>
      <Row className="mb-4">
        <Col md="auto">
          <Button variant="primary" onClick={handleShow}>
            Добавить задачу
          </Button>
        </Col>
        <Col></Col>
        <Col md="auto">
          <Form.Control as="select" custom onChange={onSortChange}>
            {sorts.map((sort) => (
              <option key={sort}>{sort}</option>
            ))}
          </Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <CommonList data={tasks} renderItem={TaskCardComponent}></CommonList>
          <CommonPagination total={tasksCount} active={tasksPage} onChange={onPageChange} />
        </Col>
      </Row>
      <Modal show={isCreateModalShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создание задачи</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TasksCreateForm onDone={handleClose}></TasksCreateForm>
        </Modal.Body>
      </Modal>
      <Loader visible={loading}></Loader>
    </>
  );
};

export default TasksPagesIndex;
