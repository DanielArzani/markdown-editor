import React from 'react';
import styled from 'styled-components';

import SavedDocument from '../SavedDocument';

/**
 * A list of the users saved documents
 */
function DocumentsList() {
  return (
    <Ul>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((_, index) => {
        return <SavedDocument key={index} />;
      })}
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
