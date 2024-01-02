import React from 'react';
import BaseButton from '../BaseButton';
import styled from 'styled-components';

function NewDocumentButton() {
  return <Button padding={'.75rem 3rem'}>+ New Document</Button>;
}

export default NewDocumentButton;

const Button = styled(BaseButton)``;
