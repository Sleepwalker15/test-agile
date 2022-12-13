import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { TaskModel } from "../utils/models";
import { v4 as uuidv4 } from "uuid";
import { pickChakraRandomColor } from "../utils/helpers";
import { ColumnType } from "../utils/enums";
import { useState } from "react";
import { values } from "lodash";
import { addTask } from "../store/store";

type AddTaskModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;

  task?: TaskModel;
  addingTask: boolean;
};

const TaskModal = ({
  isOpen,
  onClose,
  title,
  task,
  addingTask,
}: AddTaskModalProps) => {
  const dispatch = useDispatch();

  const taskCollection = useSelector((state) => state);
  const tasks = taskCollection["needs"];

  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [confirme, setConfirme] = useState<boolean>(true);

  const newColumnTask: TaskModel = {
    id: uuidv4(),
    title: taskTitle,
    description: taskDescription,
    color: pickChakraRandomColor(".300"),
    isEditing: false,
    column: ColumnType.NEEDS,
  };


  const addTask = () => {
    dispatch({ type: "ADD_TASK", task: newColumnTask });
    setTaskTitle("");
    setTaskDescription("");
    onClose();
  };

  const editTask = () => {
    const id = task.id;
    task.title = taskTitle;
    task.description = taskDescription;
    dispatch({
      type: "EDIT_TASK",
      columnTask: [...tasks.filter((task: TaskModel) => task.id !== id), task],
    });
    setTaskTitle("");
    setTaskDescription("");
    onClose();
  };

  const handleConfirm = () => {
    setConfirme(!confirme);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Заголовок задачи"
            style={{ marginBottom: "10px" }}
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
          />
          <Input
            placeholder="Описание задачи"
            value={taskDescription}
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
          />
        </ModalBody>
        <ModalFooter>
          {addingTask ? (
            <Button variant="ghost" onClick={addTask}>
              Добавить задачу
            </Button>
          ) : confirme ? (
            <Button variant="ghost" onClick={handleConfirm}>
              Сохранить задачу
            </Button>
          ) : (
            <div style={{ display: "flex", width: "220px" }}>
              <div style={{ margin: "auto" }}>Сохранить?</div>
              <Button onClick={editTask}>Да</Button>
              <Button variant="ghost" onClick={handleConfirm}>
                Нет
              </Button>
            </div>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
