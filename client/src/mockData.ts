export type FileInfo = {
  name: string;
  type: 'file' | 'directory';
  size?: number;
  creationDate: string;
  lastModifiedDate: string;
};

export const mockFileSystem: Record<string, FileInfo[]> = {
  '/': [
    {
      name: 'App.tsx',
      type: 'file',
      size: 3051,
      creationDate: '2025-03-05T08:02:19.978Z',
      lastModifiedDate: '2025-03-09T20:32:13.173Z',
    },
    {
      name: 'TEST1',
      type: 'directory',
      creationDate: '2025-03-09T21:03:33.951Z',
      lastModifiedDate: '2025-03-09T21:03:38.979Z',
    },
    {
      name: 'assets',
      type: 'directory',
      creationDate: '2025-03-05T08:02:19.978Z',
      lastModifiedDate: '2025-03-05T08:58:45.674Z',
    },
    {
      name: 'components',
      type: 'directory',
      creationDate: '2025-03-05T12:44:05.644Z',
      lastModifiedDate: '2025-03-09T20:45:38.434Z',
    },
    {
      name: 'generateMockData.js',
      type: 'file',
      size: 2308,
      creationDate: '2025-03-09T20:39:42.948Z',
      lastModifiedDate: '2025-03-09T20:44:08.981Z',
    },
    {
      name: 'helpers',
      type: 'directory',
      creationDate: '2025-03-05T12:30:04.668Z',
      lastModifiedDate: '2025-03-05T18:01:08.925Z',
    },
    {
      name: 'index.css',
      type: 'file',
      size: 237,
      creationDate: '2025-03-05T08:02:19.978Z',
      lastModifiedDate: '2025-03-05T18:09:07.587Z',
    },
    {
      name: 'main.tsx',
      type: 'file',
      size: 366,
      creationDate: '2025-03-05T08:02:19.978Z',
      lastModifiedDate: '2025-03-05T18:09:11.034Z',
    },
    {
      name: 'store',
      type: 'directory',
      creationDate: '2025-03-05T10:11:36.827Z',
      lastModifiedDate: '2025-03-05T10:16:40.964Z',
    },
    {
      name: 'types',
      type: 'directory',
      creationDate: '2025-03-05T10:04:39.093Z',
      lastModifiedDate: '2025-03-05T10:04:44.472Z',
    },
    {
      name: 'vite-env.d.ts',
      type: 'file',
      size: 38,
      creationDate: '2025-03-05T08:02:19.978Z',
      lastModifiedDate: '2025-03-05T08:02:19.978Z',
    },
  ],
  '/TEST1': [
    {
      name: 'TEST2',
      type: 'directory',
      creationDate: '2025-03-09T21:03:38.979Z',
      lastModifiedDate: '2025-03-09T21:03:43.585Z',
    },
  ],
  '/TEST1/TEST2': [
    {
      name: 'TEST3',
      type: 'directory',
      creationDate: '2025-03-09T21:03:43.585Z',
      lastModifiedDate: '2025-03-09T21:03:50.630Z',
    },
  ],
  '/TEST1/TEST2/TEST3': [
    {
      name: 'TEST4',
      type: 'directory',
      creationDate: '2025-03-09T21:03:50.630Z',
      lastModifiedDate: '2025-03-09T21:03:57.888Z',
    },
  ],
  '/TEST1/TEST2/TEST3/TEST4': [
    {
      name: 'text.txt',
      type: 'file',
      size: 11,
      creationDate: '2025-03-09T21:03:57.888Z',
      lastModifiedDate: '2025-03-09T21:04:02.203Z',
    },
  ],
  '/assets': [
    {
      name: 'fonts',
      type: 'directory',
      creationDate: '2025-03-05T08:58:45.674Z',
      lastModifiedDate: '2025-03-05T09:35:33.138Z',
    },
  ],
  '/assets/fonts': [
    {
      name: 'VGA437.ttf',
      type: 'file',
      size: 82676,
      creationDate: '2025-03-05T09:00:17.043Z',
      lastModifiedDate: '2025-03-05T08:57:28.427Z',
    },
  ],
  '/components': [
    {
      name: 'Breadcrumbs.tsx',
      type: 'file',
      size: 525,
      creationDate: '2025-03-05T12:45:46.717Z',
      lastModifiedDate: '2025-03-06T08:16:22.987Z',
    },
    {
      name: 'Button.tsx',
      type: 'file',
      size: 458,
      creationDate: '2025-03-05T12:59:17.642Z',
      lastModifiedDate: '2025-03-05T13:13:59.173Z',
    },
    {
      name: 'FileDetailsContent.tsx',
      type: 'file',
      size: 612,
      creationDate: '2025-03-05T12:47:37.622Z',
      lastModifiedDate: '2025-03-05T18:07:25.409Z',
    },
    {
      name: 'FileListContent.tsx',
      type: 'file',
      size: 3951,
      creationDate: '2025-03-05T12:47:10.062Z',
      lastModifiedDate: '2025-03-09T20:59:13.135Z',
    },
    {
      name: 'FileTreeContent.tsx',
      type: 'file',
      size: 4405,
      creationDate: '2025-03-05T12:47:23.470Z',
      lastModifiedDate: '2025-03-05T18:07:33.581Z',
    },
    {
      name: 'Panel.tsx',
      type: 'file',
      size: 995,
      creationDate: '2025-03-05T12:45:57.198Z',
      lastModifiedDate: '2025-03-09T20:20:44.160Z',
    },
  ],
  '/helpers': [
    {
      name: 'api.ts',
      type: 'file',
      size: 1247,
      creationDate: '2025-03-05T12:30:12.396Z',
      lastModifiedDate: '2025-03-09T20:15:27.431Z',
    },
    {
      name: 'helpers.ts',
      type: 'file',
      size: 345,
      creationDate: '2025-03-05T18:01:08.925Z',
      lastModifiedDate: '2025-03-05T18:02:50.301Z',
    },
  ],
  '/store': [
    {
      name: 'appSlice.ts',
      type: 'file',
      size: 2101,
      creationDate: '2025-03-05T10:16:40.964Z',
      lastModifiedDate: '2025-03-09T20:26:04.229Z',
    },
    {
      name: 'store.ts',
      type: 'file',
      size: 279,
      creationDate: '2025-03-05T10:11:47.858Z',
      lastModifiedDate: '2025-03-05T18:08:35.159Z',
    },
  ],
  '/types': [
    {
      name: 'types.ts',
      type: 'file',
      size: 1030,
      creationDate: '2025-03-05T10:04:44.472Z',
      lastModifiedDate: '2025-03-09T20:16:49.233Z',
    },
  ],
};
