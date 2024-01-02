import React from 'react';
import SavedDocument from '../SavedDocument';

function DocumentsList() {
  return (
    <ol>
      <li>
        <SavedDocument />
      </li>
      <li>
        <SavedDocument />
      </li>
    </ol>
  );
}

export default DocumentsList;
