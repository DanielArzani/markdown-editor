import React from 'react';
import styled from 'styled-components';

import { useDocumentContext } from '../../contexts/DocumentsContext';
import SavedDocument from '../SavedDocument';

/**
 * A list of the users saved documents
 */
function DocumentsList() {
  const { documents } = useDocumentContext();

  return (
    <Ul>
      {documents.map((doc, index) => (
        <SavedDocument key={index} document={doc} />
      ))}
    </Ul>
  );
}

export default DocumentsList;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  list-style: none;
`;
