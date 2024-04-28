import React from 'react';

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
];

/**
 * A select component for choosing which font to use for the editor pane
 */
function FontSelect({ fontFamily, handleFontChange }: FontSelectType) {
  return (
    <select
      value={fontFamily}
      onChange={handleFontChange}
      style={{ marginBottom: '10px' }}
    >
      {fonts.map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </select>
  );
}

export default FontSelect;
