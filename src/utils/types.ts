import { ColumnType } from './enums';

export type CollectionOfTaskType = {
  needs: TaskModel[];
  inWork: TaskModel[];
  completed: TaskModel[];
}


export interface TaskModel {
  id: string;
  title: string;
  description: string
  column: ColumnType;
  isEditing: boolean
  color: string;
}


export interface DragItem {
  index: number;
  id: TaskModel['id'];
  from: ColumnType;
}


export type ActionsTypes = {
  type:  "ADD_TASK"|"REMOVE_TASK"|"DROP_TASK_FROM"|"SWAP_TASK"|"EDIT_TASK";
  task: TaskModel;
  tasksId: string;
  taskCollection: CollectionOfTaskType,
  editableTask: TaskModel,
}



