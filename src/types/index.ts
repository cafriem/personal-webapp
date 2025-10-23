export interface FileSystemItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  icon: string;
  content?: string;
  children?: FileSystemItem[];
}

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: React.ReactNode;
}