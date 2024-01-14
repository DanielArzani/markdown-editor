import React from 'react';
import styled from 'styled-components';

import SavedDocument from '../SavedDocument';

/**
 * A list of the users saved documents
 */
function DocumentsList() {
  return <Ul></Ul>;
}

export default DocumentsList;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  list-style: none;
`;
