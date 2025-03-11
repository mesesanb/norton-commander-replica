import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FileInfo, PanelConfig } from '../types/types';
import { mockFileSystem } from '../mockData';

interface AppState {
  leftCurrentPath: string;
  rightCurrentPath: string;
  leftSelectedFile: string | null;
  rightSelectedFile: string | null;
  leftSelectedFileInfo: FileInfo | null;
  rightSelectedFileInfo: FileInfo | null;
  leftPanelConfig: PanelConfig;
  rightPanelConfig: PanelConfig;
  leftPanelData: FileInfo[];
  rightPanelData: FileInfo[];
  leftExpandedItems: Record<string, boolean>;
  rightExpandedItems: Record<string, boolean>;
}

const initialState: AppState = {
  leftCurrentPath: '/',
  rightCurrentPath: '/',
  leftSelectedFile: null,
  rightSelectedFile: null,
  leftSelectedFileInfo: null,
  rightSelectedFileInfo: null,
  leftPanelConfig: { content: 'fileList', active: true },
  rightPanelConfig: { content: 'fileTree', active: false },
  leftPanelData: [],
  rightPanelData: [],
  leftExpandedItems: {},
  rightExpandedItems: {},
};

// async thunk to fetch files
export const fetchFiles = createAsyncThunk(
  'app/fetchFiles',
  async ({ path, panel }: { path: string; panel: 'left' | 'right' }) => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    const data = mockFileSystem[path] || [];
    return { panel, data };
  },
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLeftCurrentPath: (state, action: PayloadAction<string>) => {
      state.leftCurrentPath = action.payload;
    },
    setRightCurrentPath: (state, action: PayloadAction<string>) => {
      state.rightCurrentPath = action.payload;
    },
    setLeftSelectedFile: (state, action: PayloadAction<string | null>) => {
      state.leftSelectedFile = action.payload;
    },
    setRightSelectedFile: (state, action: PayloadAction<string | null>) => {
      state.rightSelectedFile = action.payload;
    },
    setLeftSelectedFileInfo: (state, action: PayloadAction<FileInfo | null>) => {
      state.leftSelectedFileInfo = action.payload;
    },
    setRightSelectedFileInfo: (state, action: PayloadAction<FileInfo | null>) => {
      state.rightSelectedFileInfo = action.payload;
    },
    setLeftPanelConfig: (state, action: PayloadAction<PanelConfig>) => {
      state.leftPanelConfig = action.payload;
    },
    setRightPanelConfig: (state, action: PayloadAction<PanelConfig>) => {
      state.rightPanelConfig = action.payload;
    },
    setLeftPanelData: (state, action: PayloadAction<FileInfo[]>) => {
      state.leftPanelData = action.payload;
    },
    setRightPanelData: (state, action: PayloadAction<FileInfo[]>) => {
      state.rightPanelData = action.payload;
    },
    setLeftExpandedItems: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.leftExpandedItems = action.payload;
    },
    setRightExpandedItems: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.rightExpandedItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.fulfilled, (state, action) => {
        const { panel, data } = action.payload;
        if (panel === 'left') {
          state.leftPanelData = data;
        } else {
          state.rightPanelData = data;
        }
      })
      .addCase(fetchFiles.rejected, (_state, action) => {
        console.error('error fetching files:', action.error.message);
      });
  },
});

export const {
  setLeftCurrentPath,
  setRightCurrentPath,
  setLeftSelectedFile,
  setRightSelectedFile,
  setLeftSelectedFileInfo,
  setRightSelectedFileInfo,
  setLeftPanelConfig,
  setRightPanelConfig,
  setLeftPanelData,
  setRightPanelData,
  setLeftExpandedItems,
  setRightExpandedItems,
} = appSlice.actions;

export default appSlice.reducer;
