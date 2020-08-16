import { ActionPayload, BaseErrorResponse } from 'app/Store/Models/ReduxModels';
import { DeleteFileRequest, File, FileTreeItem, FileUpdateRequest, FileUpdateResponse, GetFileRequest } from './models';

export const DELETE_FILE = 'DELETE_FILE';
export const DELETE_FILE_FAILURE = 'DELETE_FILE_FAILURE';
export const DELETE_FILE_SUCCESS = 'DELETE_FILE_SUCCESS';

export const FILE_UPDATE = 'FILE_UPDATE';
export const FILE_UPDATE_FAILURE = 'FILE_UPDATE_FAILURE';
export const FILE_UPDATE_SUCCESS = 'FILE_UPDATE_SUCCESS';

export const GET_FILE = 'GET_FILE';
export const GET_FILE_FAILURE = 'GET_FILE_FAILURE';
export const GET_FILE_SUCCESS = 'GET_FILE_SUCCESS';

export const GET_FILETREE = 'GET_FILETREE';
export const GET_FILETREE_FAILURE = 'GET_FILETREE_FAILURE';
export const GET_FILETREE_SUCCESS = 'GET_FILETREE_SUCCESS';

export interface DeleteFile {
  type: typeof DELETE_FILE;
  payload: ActionPayload<{}>;
}
export interface DeleteFileFailure {
  type: typeof DELETE_FILE_FAILURE;
  payload: BaseErrorResponse;
}
export interface DeleteFileSuccess {
  type: typeof DELETE_FILE_SUCCESS;
}

export interface FileUpdate {
  type: typeof FILE_UPDATE;
  payload: ActionPayload<{}>;
}
export interface FileUpdateFailure {
  type: typeof FILE_UPDATE_FAILURE;
  payload: BaseErrorResponse;
}
export interface FileUpdateSuccess {
  type: typeof FILE_UPDATE_SUCCESS;
  payload: FileUpdateResponse;
}

export interface GetFile {
  type: typeof GET_FILE;
  payload: ActionPayload<{}>;
}
export interface GetFileFailure {
  type: typeof GET_FILE_FAILURE;
  payload: BaseErrorResponse;
}
export interface GetFileSuccess {
  type: typeof GET_FILE_SUCCESS;
  payload: File;
}

export interface GetFileTree {
  type: typeof GET_FILETREE;
  payload: ActionPayload<{}>;
}
export interface GetFileTreeFailure {
  type: typeof GET_FILETREE_FAILURE;
  payload: BaseErrorResponse;
}
export interface GetFileTreeSuccess {
  type: typeof GET_FILETREE_SUCCESS;
  payload: FileTreeItem[];
}

export type Actions =
  | DeleteFile
  | DeleteFileFailure
  | DeleteFileSuccess
  | FileUpdate
  | FileUpdateFailure
  | FileUpdateSuccess
  | GetFile
  | GetFileFailure
  | GetFileSuccess
  | GetFileTree
  | GetFileTreeFailure
  | GetFileTreeSuccess;

export interface State {
  loading: boolean;
  error: string;
  file: File;
  fileTree: FileTreeItem[];
}

const initialState: State = {
  loading: false,
  error: '',
  file: {
    content: '',
    id: 1,
    name: '',
  },
  fileTree: [],
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case DELETE_FILE: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELETE_FILE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível excluir o arquivo',
      };
    }
    case DELETE_FILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
      };
    }

    case FILE_UPDATE: {
      return {
        ...state,
        loading: true,
      };
    }
    case FILE_UPDATE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível atualizar o arquivo',
      };
    }
    case FILE_UPDATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
      };
    }

    case GET_FILETREE: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_FILETREE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível carregar a lista de arquivos',
      };
    }
    case GET_FILETREE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        fileTree: action.payload,
      };
    }

    case GET_FILE: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_FILE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível carregar o arquivo',
      };
    }
    case GET_FILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        file: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export function deleteFile(data: DeleteFileRequest): DeleteFile {
  return {
    type: DELETE_FILE,
    payload: {
      request: {
        method: 'DELETE',
        url: `/files/${data.fileId}`,
      },
    },
  };
}

export function fileUpdate(data: FileUpdateRequest): FileUpdate {
  return {
    type: FILE_UPDATE,
    payload: {
      request: {
        method: 'PUT',
        url: `/files/${data.fileId}`,
        data,
      },
    },
  };
}

export function getFile(data: GetFileRequest): GetFile {
  return {
    type: GET_FILE,
    payload: {
      request: {
        method: 'GET',
        url: `/files/${data.fileId}`,
      },
    },
  };
}

export function getFileTree(): GetFileTree {
  return {
    type: GET_FILETREE,
    payload: {
      request: {
        method: 'GET',
        url: '/filetree',
      },
    },
  };
}
