import { ColumnType } from './enums';

export type CollectionOfTaskType = {
  needs: TaskModel[];
  inWork: TaskModel[];
  completed: TaskModel[];
}


export interface TaskModel {
  id: string;
  title: string;
  description?: string
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
  type: any;
  task: any;
  tasksId: string;
  taskCollection: any;
  columnTask: any;
}


