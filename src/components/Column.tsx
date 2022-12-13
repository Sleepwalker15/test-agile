import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import useColumnDrop from "../hooks/useColumnDrop";
import { ColumnType } from "../utils/enums";
import Task from "./Task";
import TaskModal from "./TaskModal";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { TaskModel } from "../utils/models";
import { swap } from "../utils/helpers";

const ColumnColorScheme: Record<ColumnType, string> = {
  needs: "blue",
  inWork: "red",
  completed: "green",
};

const ColumnNameScheme: Record<ColumnType, string> = {
  needs: "Нужно",
  inWork: "В работе",
  completed: "Выполнено",
};

const Column = ({ column }: { column: ColumnType }) => {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const isAddable = column === "needs" ? true : false;

  const taskCollection = useSelector((state) => state);

  const tasks = taskCollection[column];

  const addEmptyTask = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => {
    setModalOpen(false);
  };

  const deleteTask = (id: string) => {
    dispatch({
      type: "REMOVE_TASK",
      tasksId: id,
    });
  };

  const swapTasks = (i: number, j: number) => {

    const columnTasks = taskCollection[column];

    dispatch({
      type: "SWAP_TASK",
      taskCollection: {
        ...taskCollection,
        [column]: swap(columnTasks, i, j),
      },
    });
  };

  const dropTaskFrom = (from: ColumnType, id: TaskModel["id"]) => {
    const fromColumnTasks = taskCollection[from];

    const toColumnTasks = taskCollection[column];

    const movingTask = fromColumnTasks.find(
      (task: TaskModel) => task.id === id
    );

    dispatch({
      type: "DROP_TASK_FROM",
      taskCollection: {
        ...taskCollection,

        [from]: fromColumnTasks.filter((task: TaskModel) => task.id !== id),

        [column]: [{ ...movingTask, column }, ...toColumnTasks],
      },
    });
  };

  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks = tasks.map((task: TaskModel, index: number) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      onDropHover={swapTasks}
      onDelete={deleteTask}
      isEditing={task.isEditing}
    />
  ));

  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge
          px={2}
          py={1}
          rounded="lg"
          colorScheme={ColumnColorScheme[column]}
        >
          {ColumnNameScheme[column]}
        </Badge>
      </Heading>
      {isAddable ? (
        <IconButton
          size="xs"
          w="full"
          color={useColorModeValue("gray.500", "gray.400")}
          bgColor={useColorModeValue("gray.100", "gray.700")}
          _hover={{ bgColor: useColorModeValue("gray.400", "gray.900") }}
          py={2}
          variant="solid"
          onClick={addEmptyTask}
          colorScheme="black"
          aria-label="add-task"
          icon={<AddIcon />}
        />
      ) : (
        <div></div>
      )}

      <Stack
        ref={dropRef}
        direction={{ base: "row", md: "column" }}
        h={{ base: 300, md: isAddable ? 568 : 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue("gray.50", "gray.900")}
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        opacity={isOver ? 0.85 : 1}
      >
        {ColumnTasks}
      </Stack>
      <TaskModal
        isOpen={modalOpen}
        onClose={onCloseModal}
        title="Новая задача"
        addingTask
      />
    </Box>
  );
};

export default Column;
