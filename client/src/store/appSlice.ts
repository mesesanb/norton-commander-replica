import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileInfo, PanelConfig } from '../types/types';

interface AppState {
  leftCurrentPath: string;
  rightCurrentPath: string;
  leftFiles: FileInfo[];
  rightFiles: FileInfo[];
  leftSelectedFile: string | null;
  rightSelectedFile: string | null;
  leftSelectedFileInfo: FileInfo | null;
  rightSelectedFileInfo: FileInfo | null;
  leftPanelConfig: PanelConfig;
  rightPanelConfig: PanelConfig;
}

const initialState: AppState = {
  leftCurrentPath: '/',
  rightCurrentPath: '/',
  leftFiles: [],
  rightFiles: [],
  leftSelectedFile: null,
  rightSelectedFile: null,
  leftSelectedFileInfo: null,
  rightSelectedFileInfo: null,
  leftPanelConfig: { content: 'fileList' },
  rightPanelConfig: { content: 'fileDetails' },
};

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
    setLeftFiles: (state, action: PayloadAction<FileInfo[]>) => {
      state.leftFiles = action.payload;
    },
    setRightFiles: (state, action: PayloadAction<FileInfo[]>) => {
      state.rightFiles = action.payload;
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
  },
});

export const {
  setLeftCurrentPath,
  setRightCurrentPath,
  setLeftFiles,
  setRightFiles,
  setLeftSelectedFile,
  setRightSelectedFile,
  setLeftSelectedFileInfo,
  setRightSelectedFileInfo,
  setLeftPanelConfig,
  setRightPanelConfig,
} = appSlice.actions;

export default appSlice.reducer;
