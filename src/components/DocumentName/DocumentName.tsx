import React from 'react';

import docLogo from '../../assets/icon-document.svg';
import styled from 'styled-components';
import media from '../../utils/mediaQueries';

/**
 * Component for re-naming a document. Also displays the current document name.
 */
function DocumentName() {
  return (
    <Wrapper>
      <ImgWrapper>
        <img src={docLogo} alt='' />
      </ImgWrapper>

      <InputWrapper>
        <Label htmlFor='docName'>Document Name</Label>
        <Input type='text' id='docName' defaultValue='Welcome.md' />
      </InputWrapper>
    </Wrapper>
  );
}

export default DocumentName;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  color: ${(props) => props.theme.docNameLabel};
  font-family: Roboto;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.docNameInputBg};
  border: none;
  color: ${(props) => props.theme.docNameInputText};
  font-family: Roboto;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  outline: none;
  padding-bottom: 0.25rem;

  &:focus {
    border-bottom: 1px solid ${(props) => props.theme.docNameInputText};
  }

  @media ${media.md} {
    width: 26rem;
  }
`;
