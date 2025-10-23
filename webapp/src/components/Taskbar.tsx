import React from 'react';
import styles from '../styles/Taskbar.module.css';
import type { WindowState } from '../types';

interface TaskbarProps {
  windows: WindowState[];
  onWindowClick: (id: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onWindowClick }) => {
  return (
    <div className={styles.taskbar}>
      {windows.map(window => (
        <div
          key={window.id}
          className={`${styles.taskbarItem} ${window.isMinimized ? styles.minimized : ''}`}
          onClick={() => onWindowClick(window.id)}
        >
          {window.title}
        </div>
      ))}
    </div>
  );
};

export default Taskbar;