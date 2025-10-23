import React, { useEffect } from 'react';
import styles from '../styles/Window.module.css';
import type { WindowState } from '../types';
import { useDraggable } from '../hooks/useDraggable';


interface WindowProps extends WindowState {
  onClose: () => void;
  onMinimize: () => void;
  onResize: (update: { width?: number; height?: number; x?: number; y?: number }) => void;
  onFocus?: () => void;
  zIndex?: number;
}

const Window: React.FC<WindowProps> = ({
  title,
  isMinimized,
  position,
  size,
  content,
  onClose,
  onMinimize,
  onResize,
  onFocus,
  zIndex,
}) => {
  const {
    position: currentPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useDraggable(position);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  if (isMinimized) return null;

  return (
    <div
      className={styles.window}
      style={{
        left: currentPosition.x,
        top: currentPosition.y,
        width: size.width,
        height: size.height,
        zIndex: zIndex ?? 100,
      }}
      onMouseDown={() => onFocus && onFocus()}
    >
      <div className={styles.titleBar} onMouseDown={handleMouseDown}>
        <span className={styles.title}>{title}</span>
        <div className={styles.controls}>
          <button onClick={onMinimize} className={styles.minimize}>—</button>
          <button onClick={onClose} className={styles.close}>×</button>
        </div>
      </div>
      <div className={styles.content}>
        {content}
      </div>
        {/* Resize handles for all sides and corners */}
        {/* Top */}
        <div className={styles.resizeHandleTop}
          onMouseDown={e => {
            e.stopPropagation();
            const startY = e.clientY;
            const startHeight = size.height;
            const startPosY = currentPosition.y;
            const onMouseMove = (moveEvent: MouseEvent) => {
              const deltaY = moveEvent.clientY - startY;
              const newHeight = Math.max(100, startHeight - deltaY);
              const newY = startPosY + deltaY;
              onResize({ height: newHeight, y: newY });
            };
            const onMouseUp = () => {
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          }}
        />
        {/* Right */}
        <div className={styles.resizeHandleRight}
          onMouseDown={e => {
            e.stopPropagation();
            const startX = e.clientX;
            const startWidth = size.width;
            const onMouseMove = (moveEvent: MouseEvent) => {
              const newWidth = Math.max(200, startWidth + (moveEvent.clientX - startX));
              onResize({ width: newWidth, height: size.height });
            };
            const onMouseUp = () => {
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          }}
        />
        {/* Bottom */}
        <div className={styles.resizeHandleBottom}
          onMouseDown={e => {
            e.stopPropagation();
            const startY = e.clientY;
            const startHeight = size.height;
            const onMouseMove = (moveEvent: MouseEvent) => {
              const newHeight = Math.max(100, startHeight + (moveEvent.clientY - startY));
              onResize({ width: size.width, height: newHeight });
            };
            const onMouseUp = () => {
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          }}
        />
        {/* Left */}
        <div className={styles.resizeHandleLeft}
          onMouseDown={e => {
            e.stopPropagation();
            const startX = e.clientX;
            const startWidth = size.width;
            const startPosX = currentPosition.x;
            const onMouseMove = (moveEvent: MouseEvent) => {
              const deltaX = moveEvent.clientX - startX;
              const newWidth = Math.max(200, startWidth - deltaX);
              const newX = startPosX + deltaX;
              onResize({ width: newWidth, x: newX });
            };
            const onMouseUp = () => {
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          }}
        />
        {/* Corners */}
        {/* Top-left */}
        <div className={styles.resizeHandleTopLeft}
          onMouseDown={e => {
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = size.width;
            const startHeight = size.height;
            const startPosX = currentPosition.x;
            const startPosY = currentPosition.y;
            const onMouseMove = (moveEvent: MouseEvent) => {
              const deltaX = moveEvent.clientX - startX;
              const deltaY = moveEvent.clientY - startY;
              const newWidth = Math.max(200, startWidth - deltaX);
              const newHeight = Math.max(100, startHeight - deltaY);
              const newX = startPosX + deltaX;
              const newY = startPosY + deltaY;
              onResize({ width: newWidth, height: newHeight, x: newX, y: newY });
            };
            const onMouseUp = () => {
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          }}
        />
        {/* Top-right */}
        <div className={styles.resizeHandleTopRight}
          onMouseDown={e => {
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = size.width;
            const startHeight = size.height;
            const startPosY = currentPosition.y;
            const onMouseMove = (moveEvent: MouseEvent) => {
              const deltaX = moveEvent.clientX - startX;
              const deltaY = moveEvent.clientY - startY;
              const newWidth = Math.max(200, startWidth + deltaX);
              const newHeight = Math.max(100, startHeight - deltaY);
              const newY = startPosY + deltaY;
              onResize({ width: newWidth, height: newHeight, y: newY });
            };
            const onMouseUp = () => {
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          }}
        />
        {/* Bottom-left */}
        <div className={styles.resizeHandleBottomLeft}
          onMouseDown={e => {
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = size.width;
            const startHeight = size.height;
            const startPosX = currentPosition.x;
            const onMouseMove = (moveEvent: MouseEvent) => {
              const deltaX = moveEvent.clientX - startX;
              const deltaY = moveEvent.clientY - startY;
              const newWidth = Math.max(200, startWidth - deltaX);
              const newHeight = Math.max(100, startHeight + deltaY);
              const newX = startPosX + deltaX;
              onResize({ width: newWidth, height: newHeight, x: newX });
            };
            const onMouseUp = () => {
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          }}
        />
        {/* Bottom-right */}
        <div className={styles.resizeHandleBottomRight}
          onMouseDown={e => {
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = size.width;
            const startHeight = size.height;
            const onMouseMove = (moveEvent: MouseEvent) => {
              const newWidth = Math.max(200, startWidth + (moveEvent.clientX - startX));
              const newHeight = Math.max(100, startHeight + (moveEvent.clientY - startY));
              onResize({ width: newWidth, height: newHeight });
            };
            const onMouseUp = () => {
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          }}
        />
    </div>
  );
};

export default Window;