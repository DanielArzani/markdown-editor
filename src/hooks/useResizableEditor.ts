import { useEffect, useState, RefObject, useRef } from 'react';

type UseResizableEditorProps = {
  initialWidth: string;
  minWidth: number;
  maxWidth: string;
  resizerRef: RefObject<HTMLDivElement>;
  isPreviewOpen: boolean;
};

/**
 * Custom hook to manage the resizing of an editor component.
 * @param initialWidth - The initial width of the editor.
 * @param minWidth - The minimum width the editor can be resized to.
 * @param maxWidth - The maximum width the editor can be resized to.
 * @param resizerRef - A reference to the resizing element.
 * @param isPreviewOpen - State variable for indicating whether the previewPane is open or not, if its not then the editor should take the full width
 */
export const useResizableEditor = ({
  initialWidth,
  minWidth,
  maxWidth,
  resizerRef,
  isPreviewOpen,
}: UseResizableEditorProps) => {
  const [editorWidth, setEditorWidth] = useState<string>(initialWidth);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const calculateMaxWidth = () => {
      if (maxWidth.endsWith('%')) {
        // Convert percentage to pixels
        const maxPercentage = parseFloat(maxWidth) / 100;
        return window.innerWidth * maxPercentage;
      } else if (maxWidth.endsWith('vw')) {
        // Convert vw to pixels
        const maxVW = parseFloat(maxWidth);
        return window.innerWidth * (maxVW / 100);
      }
      return parseFloat(maxWidth); // If it's not a percentage or vw, parse as float
    };

    const maxEditorWidth = calculateMaxWidth();

    // Function to handle the resizing action
    const handleResize = (e: MouseEvent) => {
      const newWidth = e.clientX - (document.body.offsetLeft || 0);
      if (newWidth > minWidth && newWidth < maxEditorWidth) {
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

    // Adjust editor width based on preview pane state after a short delay (in order to animate it)
    if (!isPreviewOpen) {
      // Clear any existing timeout to avoid multiple setEditorWidth calls
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Set a timeout to delay the resizing
      timeoutRef.current = setTimeout(() => {
        setEditorWidth('100%');
      }, 500); // Adjust the delay here if needed
    } else if (resizerRef.current) {
      setEditorWidth(initialWidth);
      // Clear the timeout when the preview is opened
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    // Attach the mousedown event listener to the resizer element
    const resizer = resizerRef.current;
    if (resizer) {
      resizer.addEventListener('mousedown', startResizing);

      // Clean up the event listener on unmount
      return () => {
        resizer.removeEventListener('mousedown', startResizing);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [minWidth, maxWidth, resizerRef, isPreviewOpen, initialWidth]);

  return editorWidth;
};
