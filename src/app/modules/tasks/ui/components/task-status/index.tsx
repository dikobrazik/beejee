import { TaskStatus, TaskStatusDescription } from '../../../domain/enums/taskStatus';

type Props = {
  status: TaskStatus;
};

const TaskStatusComponent = (props: Props) => {
  const { status } = props;
  return (
    <p>
      <small>{TaskStatusDescription[status]}</small>
    </p>
  );
};

export default TaskStatusComponent;
