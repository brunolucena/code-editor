export interface GetFileRequest {
  fileId: number;
}

export interface FileUpdateRequest {
  fileId: number;
  name: string;
  content: string;
}
export interface FileUpdateResponse {
  id: number;
}

export interface DeleteFileRequest {
  fileId: number;
}

export interface SetOnlineEditorDataRequest {
  loading?: boolean;
  error?: string;
  file?: File;
  fileTree?: FileTreeItem[];
  fileDeleted?: boolean;
  fileUpdated?: boolean;
}

export interface FileTreeItem {
  id: number;
  name: string;
  isDirectory: boolean;
  children?: FileTreeItem[];
}

export interface File {
  id: number;
  name: string;
  content: string;
}
