import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FileListContent from './FileListContent';
import { RootState } from '../store/store';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);
const initialState: RootState = {
  app: {
    leftCurrentPath: '/',
    rightCurrentPath: '/',
    leftSelectedFile: null,
    rightSelectedFile: null,
    leftSelectedFileInfo: null,
    rightSelectedFileInfo: null,
    leftPanelConfig: { content: 'fileList', active: true },
    rightPanelConfig: { content: 'fileTree', active: false },
    leftPanelData: [
      {
        name: 'file1.txt',
        type: 'file',
        size: 1234,
        creationDate: '2025-03-05T08:02:19.978Z',
        lastModifiedDate: '2025-03-09T20:32:13.173Z',
        fullPath: '/file1.txt',
      },
      {
        name: 'directory1',
        type: 'directory',
        creationDate: '2025-03-05T08:02:19.978Z',
        lastModifiedDate: '2025-03-09T20:32:13.173Z',
        fullPath: '/directory1',
      },
    ],
    rightPanelData: [],
    leftExpandedItems: {},
    rightExpandedItems: {},
  },
};

describe('FileListContent', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders the file list', () => {
    render(
      <Provider store={store}>
        <FileListContent panel="left" />
      </Provider>,
    );

    // Match text even if it's split into multiple elements
    expect(screen.getByText((content) => content.includes('file1'))).toBeInTheDocument();
    expect(screen.getByText('directory1')).toBeInTheDocument();
  });

  it('handles file click', () => {
    render(
      <Provider store={store}>
        <FileListContent panel="left" />
      </Provider>,
    );

    // Match file name flexibly if it's split
    fireEvent.click(screen.getByText((content) => content.includes('file1')));

    expect(store.getActions()).toContainEqual({
      type: 'app/setLeftSelectedFile',
      payload: '/file1.txt',
    });
  });

  it('handles directory click', () => {
    render(
      <Provider store={store}>
        <FileListContent panel="left" />
      </Provider>,
    );

    fireEvent.click(screen.getByText('directory1'));

    expect(store.getActions()).toContainEqual({
      type: 'app/setLeftCurrentPath',
      payload: '/directory1',
    });
  });
});
