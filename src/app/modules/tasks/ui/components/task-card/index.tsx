import { Card, Row, Col } from 'react-bootstrap';
import { Task } from '../../../domain/interfaces/task';
import TaskStatusComponent from '../task-status';

const TaskCardComponent = (task: Task) => {
  return (
    <Card className="mb-4" key={task.id}>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col md="auto">{task.username}</Col>
            <Col></Col>
            <Col md="auto">
              <TaskStatusComponent status={task.status}></TaskStatusComponent>
            </Col>
          </Row>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{task.email}</Card.Subtitle>
        <Card.Text>{task.text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TaskCardComponent;
