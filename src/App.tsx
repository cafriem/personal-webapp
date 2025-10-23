import { useState } from 'react';
import Desktop from './components/Desktop';
import Window from './components/Window';
import Icon from './components/Icon';
import Taskbar from './components/Taskbar';
import { useFileSystem } from './hooks/useFileSystem';
import type { WindowState, FileSystemItem } from './types';

const App: React.FC = () => {
  const { files } = useFileSystem();
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [windowOrder, setWindowOrder] = useState<string[]>([]); // array of window ids, last is top

  const handleIconClick = (file: FileSystemItem) => {
    const offset = 30;
    const openCount = windows.length;
    const newWindow: WindowState = {
      id: Math.random().toString(36).substr(2, 9),
      title: file.name,
      isOpen: true,
      isMinimized: false,
      position: { x: 50 + offset * openCount, y: 50 + offset * openCount },
      size: { width: 400, height: 300 },
      content: file.type === 'file' ? file.content : 'Folder contents will go here',
    };
    setWindows(prev => [...prev, newWindow]);
    setWindowOrder(prev => [...prev, newWindow.id]);
  };

  const handleWindowClose = (id: string) => {
    setWindows(prev => prev.filter(window => window.id !== id));
  };

  const handleWindowMinimize = (id: string) => {
    setWindows(prev => prev.map(window =>
      window.id === id ? { ...window, isMinimized: !window.isMinimized } : window
    ));
  };

  return (
    <div className="app">
      <Desktop>
        {files.map(file => (
          <Icon
            key={file.id}
            item={file}
            onClick={() => handleIconClick(file)}
          />
        ))}
        {windowOrder.map((id, idx) => {
          const window = windows.find(w => w.id === id);
          if (!window) return null;
          return (
            <Window
              key={window.id}
              {...window}
              zIndex={100 + idx}
              onClose={() => {
                handleWindowClose(window.id);
                setWindowOrder(prev => prev.filter(wid => wid !== window.id));
              }}
              onMinimize={() => handleWindowMinimize(window.id)}
              onResize={(update) => {
                setWindows(prev => prev.map(w =>
                  w.id === window.id
                    ? {
                        ...w,
                        size: {
                          width: update.width ?? w.size.width,
                          height: update.height ?? w.size.height,
                        },
                        position: {
                          x: update.x ?? w.position.x,
                          y: update.y ?? w.position.y,
                        },
                      }
                    : w
                ));
              }}
              onFocus={() => {
                setWindowOrder(prev => [...prev.filter(wid => wid !== window.id), window.id]);
              }}
            />
          );
        })}
      </Desktop>
      <Taskbar
        windows={windows}
        onWindowClick={(id) => {
          setWindows(prev => prev.map(window =>
            window.id === id ? { ...window, isMinimized: false } : window
          ));
        }}
      />
    </div>
  );
};

export default App;
