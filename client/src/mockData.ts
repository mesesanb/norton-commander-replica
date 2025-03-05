import { FileInfo } from './types/types';

export const mockFiles: FileInfo[] = [
  {
    name: 'documents',
    type: 'directory',
    size: 0,
    creationDate: '2025-10-26T10:00:00.000Z',
    lastModifiedDate: '2025-10-26T10:00:00.000Z',
    children: [
      {
        name: 'reports',
        type: 'directory',
        size: 0,
        creationDate: '2025-10-27T10:00:00.000Z',
        lastModifiedDate: '2025-10-27T10:00:00.000Z',
        children: [
          {
            name: 'report2023.pdf',
            type: 'file',
            size: 128000,
            creationDate: '2025-10-27T11:00:00.000Z',
            lastModifiedDate: '2025-10-27T11:00:00.000Z',
          },
        ],
      },
      {
        name: 'notes.txt',
        type: 'file',
        size: 512,
        creationDate: '2025-10-26T11:00:00.000Z',
        lastModifiedDate: '2025-10-26T11:00:00.000Z',
      },
    ],
  },
  {
    name: 'images',
    type: 'directory',
    size: 0,
    creationDate: '2025-10-25T14:30:00.000Z',
    lastModifiedDate: '2025-10-25T14:30:00.000Z',
  },
  {
    name: 'report.pdf',
    type: 'file',
    size: 256000,
    creationDate: '2025-10-27T09:15:00.000Z',
    lastModifiedDate: '2025-10-27T09:15:00.000Z',
  },
  {
    name: 'presentation.pptx',
    type: 'file',
    size: 1280000,
    creationDate: '2025-10-26T16:45:00.000Z',
    lastModifiedDate: '2025-10-26T16:45:00.000Z',
  },
  {
    name: 'notes.txt',
    type: 'file',
    size: 512,
    creationDate: '2025-10-27T11:20:00.000Z',
    lastModifiedDate: '2025-10-27T11:20:00.000Z',
  },
  {
    name: 'archive.zip',
    type: 'file',
    size: 5120000,
    creationDate: '2025-10-24T18:00:00.000Z',
    lastModifiedDate: '2025-10-24T18:00:00.000Z',
  },
];

export const mockFileDetails: FileInfo = {
  name: 'report.pdf',
  type: 'file',
  size: 256000,
  creationDate: '2025-10-27T09:15:00.000Z',
  lastModifiedDate: '2025-10-27T09:15:00.000Z',
};

export const mockDirectoryDetails: FileInfo = {
  name: 'documents',
  type: 'directory',
  size: 0,
  creationDate: '2025-10-26T10:00:00.000Z',
  lastModifiedDate: '2025-10-26T10:00:00.000Z',
};
