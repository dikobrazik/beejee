import { useCallback, useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../../../store';
import CommonList from '../../../../common/ui/components/list';
import Loader from '../../../../common/ui/components/loader';
import { loadTasks } from '../../../store/index/actions';
import { isLoadingSelector, tasksSelector } from '../../../store/index/selectors';
import TaskCardComponent from '../../components/task-card';
import TasksCreateForm from '../../forms/create';

const TasksPagesIndex = () => {
  const [isCreateModalShown, setIsCreateModalShown] = useState(false);
  const handleShow = useCallback(() => setIsCreateModalShown(true), []);
  const handleClose = useCallback(() => setIsCreateModalShown(false), []);

  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(tasksSelector);
  const loading = useSelector(isLoadingSelector);

  useEffect(() => {
    dispatch(loadTasks());
  }, []);
  return (
    <>
      <Row className="mb-4">
        <Col></Col>
        <Col md="auto">
          <Button variant="primary" onClick={handleShow}>
            Добавить задачу
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <CommonList data={tasks} renderItem={TaskCardComponent}></CommonList>
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
