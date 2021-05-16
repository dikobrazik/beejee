export enum TaskStatus {
  NOT_DONE = 0,
  NOT_DONE_EDITED = 1,
  DONE = 10,
  DONE_EDITED = 11,
}

export const TaskStatusDescription = {
  0: 'задача не выполнена',
  1: 'задача не выполнена, отредактирована админом',
  10: 'задача выполнена',
  11: 'задача отредактирована админом и выполнена',
};
