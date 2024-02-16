import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { useDocumentContext } from '../../contexts/DocumentsContext';
import SavedDocument from '../SavedDocument';

/**
 * A list of the users saved documents
 */
function DocumentsList() {
  const { documents, handleReOrderDocs } = useDocumentContext();

  const handleDragDrop = (result: DropResult) => {
    //    result = {
    //   draggableId: string;
    //   type: string;
    //   source: {
    //     index: number;
    //     droppableId: string;
    //   };
    //   reason: string;
    //   mode: string;
    //   destination: {
    //     droppableId: string;
    //     index: number;
    //   } | null;
    //   combine: null;
    // };

    const { source, destination, type } = result;

    // return if drop destination is not valid
    if (!destination) return;

    // return if destination is the same as the starting location
    // droppable id would be the same in this case but incase if more droppable's are added, this would work properly
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    if (type === 'group') {
      const reOrderedDocs = [...documents];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedDoc] = reOrderedDocs.splice(sourceIndex, 1);
      reOrderedDocs.splice(destinationIndex, 0, removedDoc);

      handleReOrderDocs(reOrderedDocs);
    }
  };

  return (
    <DragDropContext
      // onDragStart={}
      // onDragUpdate={}
      onDragEnd={handleDragDrop}
    >
      <Droppable droppableId='ROOT' type='group'>
        {(provided) => {
          return (
            <Ul {...provided.droppableProps} ref={provided.innerRef}>
              {documents.map((doc, index) => (
                <SavedDocument key={index} document={doc} index={index} />
              ))}
            </Ul>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}

export default DocumentsList;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  list-style: none;
`;
