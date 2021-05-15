import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../../../store';
import CommonList from '../../../../common/ui/components/list';
import Loader from '../../../../common/ui/components/loader';
import { Task } from '../../../domain/interfaces/task';
import { loadTasks } from '../../../store/index/actions';
import { isLoadingSelector, tasksSelector } from '../../../store/index/selectors';

const TasksListItem = (task: Task) => {
  return <div>{task.email}</div>;
};

const TasksPagesIndex = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(tasksSelector);
  const loading = useSelector(isLoadingSelector);
  useEffect(() => {
    dispatch(loadTasks());
  }, []);
  return (
    <>
      <CommonList data={tasks} renderItem={TasksListItem}></CommonList>
      <Loader visible={loading}></Loader>
    </>
  );
};

export default TasksPagesIndex;
