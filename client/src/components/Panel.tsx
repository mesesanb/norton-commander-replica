import React from 'react';
import { PanelConfig, FileInfo } from './types/types';
import FileListContent from './FileListContent';
import FileTreeContent from './FileTreeContent';
import FileDetailsContent from './FileDetailsContent';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';

interface PanelProps {
  config: PanelConfig;
  currentPath: string;
  files: FileInfo[];
  selectedFile: string | null;
  setSelectedFile: (name: string | null) => void;
  setCurrentPath: (path: string) => void;
  handleFileClick: (name: string) => void; // Accepta handleFileClick ca prop
}

const Panel: React.FC<PanelProps> = ({
  config,
  //   currentPath,
  files,
  selectedFile,
  setSelectedFile,
  //   setCurrentPath,
  handleFileClick,
}) => {
  let contentComponent;
  //   const dispatch = useDispatch<AppDispatch>();

  switch (config.content) {
    case 'fileList':
      contentComponent = (
        <FileListContent
          files={files}
          onFileClick={handleFileClick}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      );
      break;
    case 'fileTree':
      contentComponent = <FileTreeContent />;
      break;
    case 'fileDetails':
      contentComponent = <FileDetailsContent />;
      break;
    default:
      contentComponent = (
        <FileListContent
          files={files}
          onFileClick={handleFileClick}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      );
  }

  return <div className="w-1/2 min-h-full bg-gray-900 text-white p-2">{contentComponent}</div>;
};

export default Panel;
