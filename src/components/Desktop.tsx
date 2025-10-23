import React from 'react';
import styles from '../styles/Desktop.module.css';

interface DesktopProps {
  children: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  return (
    <div className={styles.desktop}>
      {children}
    </div>
  );
};

export default Desktop;