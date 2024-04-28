import React from 'react';
import styled from 'styled-components';

type FontSelectType = {
  fontFamily: string;
  handleFontChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

// list of usable fonts, the first one is my chosen font which will be downloaded by the user while the rest are common fonts that should be usable by all systems
const fonts = [
  'Dancing Script', // default
  'Arial',
  'Verdana',
  'Helvetica',
  'Times New Roman',
  'Courier New',
  'Lucida Console',
  'Georgia',
  'Tahoma',
  'Trebuchet MS',
  'Comic Sans MS',
];

/**
 * A select component for choosing which font to use for the editor pane
 */
function FontSelect({ fontFamily, handleFontChange }: FontSelectType) {
  return (
    <Select
      value={fontFamily}
      onChange={handleFontChange}
      style={{ marginBottom: '10px' }}
    >
      {fonts.map((font) => (
        <Option key={font} value={font}>
          {font}
        </Option>
      ))}
    </Select>
  );
}

export default FontSelect;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;

  /* Styling for focus state */
  &:focus {
    border-color: ${(props) => props.theme.fontSelect};
    outline: none;
  }

  /* Adding a custom arrow indicator */
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpolygon%20fill%3D%22%230056b3%22%20points%3D%220%2C0%2012%2C0%206%2C12%22/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 12px 12px;
`;

const Option = styled.option`
  font-family: inherit; /* This makes sure the font in the dropdown matches the surrounding text */
  padding: 8px 10px;

  /* Styling for disabled options */
  &:disabled {
    color: #aaa;
  }
`;
