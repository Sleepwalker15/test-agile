import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  
import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { TaskModel } from "../utils/models";

const persistConfig = {
  key: 'root',
  storage,
}


const defaultState = {
  'needs': [
    {
      id: uuidv4(),
      column: ColumnType.NEEDS,
      title: 'Задача 11',
      description: 'Описание задачи 1',
      isEditing: false,
      color: 'gray.300',
    },
    {
      id: uuidv4(),
      column: ColumnType.NEEDS,
      title: 'Задача 12',
      description: 'Описание задачи 12',
      isEditing: false,
      color: 'gray.300',
    },
  ],
  'inWork': [
    {
      id: uuidv4(),
      column: ColumnType.INWORK,
      title: 'Задача 2',
      description: 'Описание задачи 3',
      isEditing: false,
      color: 'gray.300',
    },
  ],
    'completed': [
    {
      id: uuidv4(),
      column: ColumnType.COMPLETED,
      title: 'Задача 3',
      description: 'Описание задачи 4',
      isEditing: false,
      color: 'gray.300',
    }
  ] 
};


  
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
          console.log({...state, needs:[...state.needs, action.payload]})
          return {...state, needs:[...state.needs, action.payload]};
        case 'REMOVE_TASK':
          return {...state, needs:[...action.payload] };
        case 'EDIT_TASK':
            return {}; 
        case 'DROP_TASK_FROM':
              return {...state, ...action.payload};     
        case 'SWAP_TASK':
            return {...state, ...action.payload}; 
        case 'CHANGE_TASK_STATUS':
            return{...state, needs:[...action.payload]}      
        default:
          return state;
      }
}
 

const persistedReducer = persistReducer(persistConfig, reducer)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}

export const store = createStore(persistedReducer);
export const persistor = persistStore(store)

export const addTask = ():{
  type: "ADD_TASK",
} => {
  return {
    type: "ADD_TASK",

  } as const;
}

export const removeTask = (
  ):{
  type: "REMOVE_TASK",
} => {
  return {
    type: "REMOVE_TASK",

  } as const;
}

export const dropTaskFrom = (
):{
  type: "DROP_TASK_FROM",
} => {
  return {
    type: "DROP_TASK_FROM",
  } as const;
}

export const swapTask = (
):{
  type: "SWAP_TASK",
} => {
  return {
    type: "SWAP_TASK",
  } as const;
}

export const change_task_status = (
):{
  type: "CHANGE_TASK_STATUS",
} => {
  return {
    type: "CHANGE_TASK_STATUS",
  } as const;
}
