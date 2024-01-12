import React, { useEffect, useRef, CSSProperties, useState } from 'react';

type ResizableContainerProps = {
  initialWidth?: number;
  initialHeight?: number;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
};

/**
 * A ResizableContainer component allows resizing of its content
 * in all four directions: left, right, top, and bottom.
 *
 * @param initialWidth - set the initial width of the container
 * @param initialHeight - set the initial height of the container
 * @param style - can be used to apply custom styling
 * @param className - can be used to apply custom styling
 * @param children - the contents of the resizable container
 */
function ResizableContainer({
  initialWidth = 100,
  initialHeight = 100,
  className,
  style,
  children,
}: ResizableContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const refLeft = useRef<HTMLDivElement>(null);
  const refTop = useRef<HTMLDivElement>(null);
  const refRight = useRef<HTMLDivElement>(null);
  const refBottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizableElement = ref.current;
    if (!resizableElement) return;

    let width = initialWidth;
    let height = initialHeight;
    let x = 0;
    let y = 0;

    const onMouseMove = (resizeType: string) => (event: MouseEvent) => {
      if (!isResizing) return;

      const dx = event.clientX - x;
      const dy = event.clientY - y;
      x = event.clientX;
      y = event.clientY;

      switch (resizeType) {
        case 'right':
          width += dx;
          resizableElement.style.width = `${width}px`;
          break;
        case 'left':
          width -= dx;
          resizableElement.style.width = `${width}px`;
          break;
        case 'top':
          height -= dy;
          resizableElement.style.height = `${height}px`;
          break;
        case 'bottom':
          height += dy;
          resizableElement.style.height = `${height}px`;
          break;
        default:
          break;
      }
    };

    // Setup resizer event listeners
    const setupResizer = (
      resizerRef: React.RefObject<HTMLDivElement>,
      resizeType: string
    ) => {
      if (!resizerRef.current) return;

      const onMouseDown = (event: MouseEvent) => {
        x = event.clientX;
        y = event.clientY;
        document.addEventListener('mousemove', onMouseMove(resizeType));
        document.addEventListener('mouseup', onMouseUp);
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove(resizeType));
        document.removeEventListener('mouseup', onMouseUp);
      };

      resizerRef.current.addEventListener('mousedown', onMouseDown);
      return () =>
        resizerRef.current?.removeEventListener('mousedown', onMouseDown);
    };

    const cleanupFns = [
      setupResizer(refLeft, 'left'),
      setupResizer(refTop, 'top'),
      setupResizer(refRight, 'right'),
      setupResizer(refBottom, 'bottom'),
    ];

    return () => cleanupFns.forEach((cleanup) => cleanup && cleanup());
  }, [initialHeight, initialWidth, isResizing]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        width: initialWidth,
        height: initialHeight,
        position: 'relative',
      }}
    >
      <div ref={refLeft} className='resizer resizer-l'></div>
      <div ref={refTop} className='resizer resizer-t'></div>
      <div ref={refRight} className='resizer resizer-r'></div>
      <div ref={refBottom} className='resizer resizer-b'></div>
      {children}
    </div>
  );
}

export default ResizableContainer;
