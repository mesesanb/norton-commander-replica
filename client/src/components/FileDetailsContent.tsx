import React from 'react';
import { FileInfo } from '../types/types';

interface FileDetailsContentProps {
  file: FileInfo | null;
}

const FileDetailsContent: React.FC<FileDetailsContentProps> = ({ file }) => {
  if (!file) {
    return <div>Select a file to view details.</div>;
  }

  return (
    <div>
      <h2>{file.name}</h2>
      <p>Type: {file.type}</p>
      {file.size && <p>Size: {file.size} bytes</p>}
      <p>Creation Date: {file.creationDate.toLocaleString()}</p>
      <p>Last Modified Date: {file.lastModifiedDate.toLocaleString()}</p>
    </div>
  );
};

export default FileDetailsContent;
