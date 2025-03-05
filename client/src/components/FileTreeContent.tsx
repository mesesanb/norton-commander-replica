import React, { useState, useRef, useEffect } from 'react';
import { FileInfo } from '../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getFiles } from '../helpers/api';

interface FileTreeContentProps {
  onFileClick: (name: string) => void;
}

const FileTreeContent: React.FC<FileTreeContentProps> = ({ onFileClick }) => {
  const currentPath = useSelector((state: RootState) => state.app.currentPath);
  const [expandedDirectories, setExpandedDirectories] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const fileRefs = useRef<HTMLLIElement[]>([]);
  const cache = useRef<{ [path: string]: FileInfo[] }>({});
  const [files, setFiles] = useState<FileInfo[]>([]);

  useEffect(() => {
    const loadFiles = async () => {
      if (cache.current[currentPath]) {
        setFiles(cache.current[currentPath]);
        setFocusedIndex(0);
      } else {
        const fetchedFiles = await getFiles(currentPath);
        setFiles(fetchedFiles);
        cache.current[currentPath] = fetchedFiles;
        setFocusedIndex(0);
      }
    };
    loadFiles();
  }, [currentPath]);

  useEffect(() => {
    if (fileRefs.current[focusedIndex]) {
      fileRefs.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const toggleDirectory = (name: string) => {
    if (expandedDirectories.includes(name)) {
      setExpandedDirectories(expandedDirectories.filter((dir) => dir !== name));
    } else {
      setExpandedDirectories([...expandedDirectories, name]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown') {
      setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, files.length - 1));
    } else if (event.key === 'ArrowUp') {
      setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === 'Enter') {
      const focusedFile = files[focusedIndex];
      if (focusedFile && focusedFile.type === 'directory') {
        toggleDirectory(focusedFile.name);
      }
    }
  };

  const renderTree = (fileItems: FileInfo[], level: number = 0): React.ReactNode => {
    return (
      <ul className="pl-4">
        {fileItems.map((file, index) => (
          <li key={file.name} className="file-item" ref={(el) => (fileRefs.current[index] = el!)} tabIndex={0}>
            <div
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-none ${
                file.type === 'directory' ? 'text-blue-300 hover:bg-blue-700' : 'text-nortonText hover:bg-gray-600'
              }`}
              onClick={() => {
                if (file.type === 'directory') {
                  toggleDirectory(file.name);
                } else {
                  onFileClick(file.name);
                }
              }}>
              <span className="file-icon">
                {file.type === 'directory' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={expandedDirectories.includes(file.name) ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </span>
              <span>{file.name}</span>
            </div>

            {file.type === 'directory' && file.children && expandedDirectories.includes(file.name) && (
              <div className="ml-4">{renderTree(file.children, level + 1)}</div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="text-nortonText bg-nortonBackground min-h-full" tabIndex={0} onKeyDown={handleKeyDown}>
      {renderTree(files)}
    </div>
  );
};

export default FileTreeContent;
