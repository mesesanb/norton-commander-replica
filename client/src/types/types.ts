export interface FileInfo {
  name: string;
  type: 'file' | 'directory';
  size?: number;
  creationDate: string;
  lastModifiedDate: string;
  fullPath: string;
}

type PanelContent = 'fileList' | 'fileTree' | 'fileDetails';

export interface PanelConfig {
  content: PanelContent;
  active: boolean;
}

