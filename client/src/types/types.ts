export interface FileInfo {
  name: string;
  type: 'file' | 'directory';
  size?: number;
  creationDate: string;
  lastModifiedDate: string;
  children?: FileInfo[];
}

export type PanelContent = 'fileList' | 'fileTree' | 'fileDetails';

export interface PanelConfig {
  content: PanelContent;
}

export interface AppState {
  currentPath: string;
  files: FileInfo[];
  selectedFile: string | null;
  selectedFileInfo: FileInfo | null;
  leftPanelConfig: PanelConfig;
  rightPanelConfig: PanelConfig;
}

export type Action =
  | { type: 'SET_CURRENT_PATH'; payload: string }
  | { type: 'SET_FILES'; payload: FileInfo[] }
  | { type: 'SET_SELECTED_FILE'; payload: string | null }
  | { type: 'SET_SELECTED_FILE_INFO'; payload: FileInfo | null }
  | { type: 'SET_LEFT_PANEL_CONFIG'; payload: PanelConfig }
  | { type: 'SET_RIGHT_PANEL_CONFIG'; payload: PanelConfig };

export type Dispatch = (action: Action) => void;

export interface AppContext {
  state: AppState;
  dispatch: Dispatch;
}
