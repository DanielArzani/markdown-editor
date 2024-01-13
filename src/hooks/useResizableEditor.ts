import { useEffect, useState, RefObject } from 'react';

type UseResizableEditorProps = {
  initialWidth: string;
  minWidth: number;
  resizerRef: RefObject<HTMLDivElement>;
  isPreviewOpen: boolean;
};

/**
 * Custom hook to manage the resizing of an editor component.
 * @param initialWidth - The initial width of the editor.
 * @param minWidth - The minimum width the editor can be resized to.
 * @param resizerRef - A reference to the resizing element.
 * @param isPreviewOpen - State variable for indicating whether the previewPane is open or not, if its not then the editor should take the full width
 */
export const useResizableEditor = ({
  initialWidth,
  minWidth,
  resizerRef,
  isPreviewOpen,
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

    // Adjust editor width based on preview pane state
    if (!isPreviewOpen) {
      setEditorWidth('100%');
    } else if (resizerRef.current) {
      setEditorWidth(initialWidth);
    }

    // Attach the mousedown event listener to the resizer element
    const resizer = resizerRef.current;
    if (resizer) {
      resizer.addEventListener('mousedown', startResizing);

      // Clean up the event listener on unmount
      return () => {
        resizer.removeEventListener('mousedown', startResizing);
      };
    }
  }, [minWidth, resizerRef, isPreviewOpen, initialWidth]);

  return editorWidth;
};
