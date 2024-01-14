import { useCallback, useEffect } from 'react';

/**
 * Custom hook to handle document save operation with Cmd/Ctrl + S.
 * @param onSave - Callback function to execute when save key combination is pressed.
 */
function useSaveShortcut(onSave: () => void) {
  // Function to handle key press
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault(); // Prevent the default save action
        onSave();
      }
    },
    [onSave]
  );

  useEffect(() => {
    // Add event listener for keydown
    document.addEventListener('keydown', handleKeyPress);
    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onSave, handleKeyPress]); // Depend on onSave to re-attach the listener if the onSave function changes
}

export default useSaveShortcut;
