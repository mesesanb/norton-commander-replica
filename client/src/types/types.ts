export interface FileInfo {
  name: string;
  type: 'file' | 'directory';
  size?: number;
  creationDate: string;
  lastModifiedDate: string;
}

export type PanelContent = 'fileList' | 'fileTree' | 'fileDetails';

export interface PanelConfig {
  content: PanelContent;
  active: boolean;
}

export interface AppState {
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

export type Action =
  | { type: 'SET_LEFT_CURRENT_PATH'; payload: string }
  | { type: 'SET_RIGHT_CURRENT_PATH'; payload: string }
  | { type: 'SET_LEFT_SELECTED_FILE'; payload: string | null }
  | { type: 'SET_RIGHT_SELECTED_FILE'; payload: string | null }
  | { type: 'SET_LEFT_SELECTED_FILE_INFO'; payload: FileInfo | null }
  | { type: 'SET_RIGHT_SELECTED_FILE_INFO'; payload: FileInfo | null }
  | { type: 'SET_LEFT_PANEL_CONFIG'; payload: PanelConfig }
  | { type: 'SET_RIGHT_PANEL_CONFIG'; payload: PanelConfig }
  | { type: 'SET_LEFT_PANEL_FILES'; payload: FileInfo[] }
  | { type: 'SET_RIGHT_PANEL_FILES'; payload: FileInfo[] }
  | { type: 'TOGGLE_LEFT_EXPANDED_ITEM'; payload: string }
  | { type: 'TOGGLE_RIGHT_EXPANDED_ITEM'; payload: string };

export type Dispatch = (action: Action) => void;

export interface AppContext {
  state: AppState;
  dispatch: Dispatch;
}
