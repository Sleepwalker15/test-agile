import { Box, ScaleFade, Button, Text } from '@chakra-ui/react';
import _ from 'lodash';
import { memo, useState } from 'react';
import { useTaskDragAndDrop } from '../hooks/useTaskDragAndDrop';
import { TaskModel } from '../utils/models';
import { useDispatch } from "react-redux";
import TaskModal from './TaskModal';

type TaskProps = {
  index: number;
  task: TaskModel;
  isEditing: boolean;
  onUpdate?: (id: TaskModel['id'], updatedTask: TaskModel) => void;
  onDelete: (id: TaskModel['id']) => void;
  onDropHover: (i: number, j: number) => void;
};

const Task = ({
  index,
  task,
  onUpdate: handleUpdate,
  onDropHover: handleDropHover,
  onDelete: handleDelete,
  isEditing
}: TaskProps) => {

  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>(
    { task, index: index },
    handleDropHover,
  );

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirme, setConfirme] = useState<boolean>(true);

  const isEditable = task.column === "needs" ? true : false;
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    handleDelete(task.id);
  };


  const handleUpdateClick = () => {
    setModalOpen(true);
    console.log(task.id, task);
  }

  const onCloseModal =  () => {
    setModalOpen(false)
  }

  const handleConfirm = () => {
    setConfirme(!confirme)
  }

  return (
    <ScaleFade in={true} unmountOnExit>
      <Box
        ref={ref}
        as="div"
        role="group"
        position="relative"
        rounded="lg"
        pl={3}
        pr={7}
        pt={3}
        pb={1}
        boxShadow="xl"
        cursor="grab"
        fontWeight="bold"
        userSelect="none"
        bgColor={task.color}
        opacity={isDragging ? 0.5 : 1}
      > 
        <Text
          color="gray.700"
        >{task.title}
        </Text>
        <Text
          fontSize='sm'
          as='abbr'
        >{task.description}
        </Text>
       
         {isEditable ? (
          <div style={{display:'flex', justifyContent: 'flex-end'}}>
            {confirme ? (
            <div>
              <Button size='xs' onClick={handleConfirm} variant='ghost' colorScheme='red'>Удалить</Button>
              <Button size='xs' onClick={handleUpdateClick}  variant='ghost' colorScheme='blue'>Редактировать</Button>
            </div>
            ): (
              <div style={{display:'flex', justifyContent: 'flex-end', width:'150px'}}>
                <Text fontSize='xs' as='abbr' style={{margin:'auto'}} >Удалить?</Text>
                  <Button size='xs' onClick={handleDeleteClick} variant='ghost' colorScheme='red'>Да</Button>
                  <Button size='xs' onClick={handleConfirm} variant='ghost' colorScheme='blue'>Нет</Button>
                </div>
            )}
            
          </div>
        ) : (<div></div>)}
      </Box>
      <TaskModal
        isOpen={modalOpen}
        onClose={onCloseModal}
        title={`Редактировать: ${task.title}`}
        task={task}
        addingTask={false}
      />
    </ScaleFade>
  );
}
export default memo(Task, (prev, next) => {
  if (
    _.isEqual(prev.task, next.task) &&
    _.isEqual(prev.index, next.index) &&
    prev.onDelete === next.onDelete &&
    prev.onDropHover === next.onDropHover &&
    prev.onUpdate === next.onUpdate
  ) {
    return true;
  }
  return false;
});
