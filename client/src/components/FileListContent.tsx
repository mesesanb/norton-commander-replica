import React from 'react';
import { FileInfo } from '../types/types';
import { extractDateTime } from '../helpers/helpers';
interface FileListContentProps {
  files: FileInfo[];
  onFileClick: (name: string) => void;
  selectedFile: string | null;
  setSelectedFile: (name: string | null) => void;
}

const FileListContent: React.FC<FileListContentProps> = ({ files, onFileClick, selectedFile, setSelectedFile }) => {
  return (
    <div className="text-nortonText bg-nortonBackground h-full">
      <div className="grid grid-cols-4 p-2">
        <div className="text-nortonInfo">Name</div>
        <div className="text-nortonInfo">Size</div>
        <div className="text-nortonInfo">Date</div>
        <div className="text-nortonInfo">Time</div>
      </div>
      {files.map((file) => (
        <div
          key={file.name}
          className={`grid grid-cols-4 p-2 cursor-pointer ${
            selectedFile === file.name ? 'bg-gray-800' : 'hover:bg-gray-800'
          }`}
          onClick={() => {
            onFileClick(file.name);
            setSelectedFile(file.name);
          }}>
          <div>{file.name}</div>
          <div>{file.type === 'directory' ? 'SUB-DIR' : file.size}</div>
          <div>{extractDateTime(file.lastModifiedDate).date}</div>
          <div>{extractDateTime(file.lastModifiedDate).time}</div>
        </div>
      ))}
    </div>
  );
};

export default FileListContent;
