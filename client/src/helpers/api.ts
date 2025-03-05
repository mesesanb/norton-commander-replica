import { FileInfo } from '../types/types';
import { mockFiles } from '../mockData';

export const getFiles = async (path: string): Promise<FileInfo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (path === '/documents/') {
        resolve(mockFiles[0].children || []);
      } else if (path === '/documents/reports/') {
        resolve(mockFiles[0].children![0].children || []);
      } else {
        resolve(mockFiles);
      }
    }, 100);
  });
};

/**
 * simulate getting details of a file or directory.
 * @param path path of the file or directory.
 * @returns details of the specified file or directory.
 */
export const getFileDetails = async (path: string): Promise<FileInfo | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pathParts = path.split('/').filter(Boolean);
      let currentDirectory: FileInfo[] = mockFiles;

      //navigate through the directory structure
      for (const part of pathParts) {
        const dir = currentDirectory.find((item) => item.type === 'directory' && item.name === part);
        if (dir && dir.children) {
          currentDirectory = dir.children;
        } else {
          const file = currentDirectory.find((item) => item.type === 'file' && item.name === part);
          if (file) {
            resolve(file); //return the file if found
            return;
          } else {
            reject('File or directory not found');
            return;
          }
        }
      }

      reject('Invalid path'); //reject if no valid file or directory found
    }, 100);
  });
};
