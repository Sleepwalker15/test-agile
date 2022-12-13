import {} from '@chakra-ui/icons';
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './components/Column';
import { ColumnType } from './utils/enums';
import  AddTaskModal  from './components/TaskModal'


function App() {
  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="container.lg" px={4} py={10}>
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 16, md: 3 }}
          >
            <Column column={ColumnType.NEEDS} />
            <Column column={ColumnType.INWORK} />
            <Column column={ColumnType.COMPLETED} />
          </SimpleGrid>
          
        </Container>
      </DndProvider>
    </main>
  );
}

export default App;
