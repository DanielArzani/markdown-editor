import React from 'react';
import BaseButton from '../BaseButton';
import styled from 'styled-components';

function NewDocumentButton() {
  return (
    <Button padding={'.75rem 2rem'} width='100%'>
      + New Document
    </Button>
  );
}

export default NewDocumentButton;

const Button = styled(BaseButton)``;
