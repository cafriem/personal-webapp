import React from 'react';
import styles from '../styles/Icon.module.css';
import type { FileSystemItem } from '../types';

interface IconProps {
  item: FileSystemItem;
  onClick: () => void;
}

const Icon: React.FC<IconProps> = ({ item, onClick }) => {
  // Drag-and-drop logic
  const [dragging, setDragging] = React.useState(false);
  const [pos, setPos] = React.useState<{x: number, y: number}>({x: 0, y: 0});
  const iconRef = React.useRef<HTMLDivElement>(null);

  const dragThreshold = 5;
  const dragState = React.useRef<{dragged: boolean, startX: number, startY: number}>({dragged: false, startX: 0, startY: 0});

  const gridSize = 80;
  const handleMouseDown = (e: React.MouseEvent) => {
    dragState.current.dragged = false;
    dragState.current.startX = e.clientX;
    dragState.current.startY = e.clientY;
    setDragging(true);
    const startX = e.clientX - pos.x;
    const startY = e.clientY - pos.y;
    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = Math.abs(moveEvent.clientX - dragState.current.startX);
      const dy = Math.abs(moveEvent.clientY - dragState.current.startY);
      if (dx > dragThreshold || dy > dragThreshold) {
        dragState.current.dragged = true;
      }
      setPos({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      });
    };
    const onMouseUp = () => {
      setDragging(false);
      // Snap to grid on drag end
      setPos(prev => ({
        x: Math.round(prev.x / gridSize) * gridSize,
        y: Math.round(prev.y / gridSize) * gridSize,
      }));
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!dragState.current.dragged) {
      onClick();
    }
  };

  return (
    <div
      ref={iconRef}
      className={styles.icon}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
  style={{ position: 'absolute', left: pos.x, top: pos.y, zIndex: dragging ? 10 : 1 }}
    >
      <div className={styles.iconImage}>
        {item.icon}
      </div>
      <span className={styles.iconName}>{item.name}</span>
    </div>
  );
};

export default Icon;