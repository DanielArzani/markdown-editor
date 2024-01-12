import { useEffect, useState, RefObject } from 'react';

type UseResizableEditorProps = {
  initialWidth: string;
  minWidth: number;
  resizerRef: RefObject<HTMLDivElement>;
};

/**
 * Custom hook to manage the resizing of an editor component.
 * @param initialWidth - The initial width of the editor.
 * @param minWidth - The minimum width the editor can be resized to.
 * @param resizerRef - A reference to the resizing element.
 */
export const useResizableEditor = ({
  initialWidth,
  minWidth,
  resizerRef,
}: UseResizableEditorProps) => {
  const [editorWidth, setEditorWidth] = useState<string>(initialWidth);

  useEffect(() => {
    // Function to handle the resizing action
    const handleResize = (e: MouseEvent) => {
      // Calculate new width based on mouse position
      const newWidth = e.clientX - (document.body.offsetLeft || 0);
      // Update the width if it's greater than the minimum width
      if (newWidth > minWidth) {
        setEditorWidth(`${newWidth}px`);
      }
    };

    // Function to start resizing when the mouse is pressed down
    const startResizing = (e: MouseEvent) => {
      e.preventDefault();
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', stopResizing);
    };

    // Function to stop resizing when the mouse is released
    const stopResizing = () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', stopResizing);
    };

    // Attach the mousedown event listener to the resizer element
    const resizer = resizerRef.current;
    if (resizer) {
      resizer.addEventListener('mousedown', startResizing);

      // Clean up the event listener on unmount
      return () => {
        resizer.removeEventListener('mousedown', startResizing);
      };
    }
  }, [minWidth, resizerRef]);

  return editorWidth;
};
