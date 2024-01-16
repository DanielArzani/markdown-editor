import React from 'react';
import { useDocumentContext } from '../../contexts/DocumentsContext';
import styled from 'styled-components';

function DownloadBackupButton() {
  const { documents } = useDocumentContext();

  const downloadBackup = () => {
    const dataStr = JSON.stringify(documents);
    const blob = new Blob([dataStr], { type: 'text/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'backup.json';
    link.click();
  };

  return <Button onClick={downloadBackup}>Download Backup Files</Button>;
}

export default DownloadBackupButton;

const Button = styled.button`
  background-color: ${(props) => props.theme.saveBtnBg};
  color: ${(props) => props.theme.saveBtnText};
  border: none;
  border-radius: 4px;
  padding: 5px 7.5px;
  cursor: pointer;
  font-size: 1rem;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.saveBtnBgHover};
    color: ${(props) => props.theme.saveBtnTextHover};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.saveBtnBg};
  }
`;
