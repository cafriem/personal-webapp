import { useCallback, useState } from 'react';
import type { FileSystemItem } from '../types';

const initialFiles: FileSystemItem[] = [
  {
    id: '1',
    name: 'Welcome.txt',
    type: 'file',
    icon: '📄',
    content: 'Welcome to your desktop! Click on files and folders to open them.'
  },
  {
    id: '2',
    name: 'Documents',
    type: 'folder',
    icon: '📁',
    children: [
      {
        id: '3',
        name: 'Notes.txt',
        type: 'file',
        icon: '📝',
        content: 'This is a sample note.'
      }
    ]
  }
];

export const useFileSystem = () => {
  const [files, setFiles] = useState<FileSystemItem[]>(initialFiles);

  const createItem = useCallback((item: Omit<FileSystemItem, 'id'>) => {
    const newItem: FileSystemItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
    };
    setFiles(prev => [...prev, newItem]);
  }, []);

  return {
    files,
    createItem,
  };
};