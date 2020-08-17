import { put, takeLatest } from 'redux-saga/effects';
import { Action } from '../Models/ReduxModels';

import { OPEN_SNACKBAR, OpenSnackbar } from '../Ducks/snackbarDuck';
import {
  DELETE_FILE_FAILURE,
  FILE_UPDATE_FAILURE,
  FILE_UPDATE_SUCCESS,
  GET_FILETREE_FAILURE,
  GET_FILE_FAILURE,
} from '../Ducks/onlineEditorDuck';

// returns a message for the redux TYPE that was dispatched
function getFailureMessage(type: string): string {
  switch (type) {
    case DELETE_FILE_FAILURE: {
      return 'Não foi possível excluir o arquivo';
    }

    case FILE_UPDATE_FAILURE: {
      return 'Não foi possível atualizar o arquivo';
    }

    case GET_FILE_FAILURE: {
      return 'Não foi possível carregar o arquivo';
    }

    case GET_FILETREE_FAILURE: {
      return 'Não foi possível carregar a lista de arquivos';
    }

    default: {
      return 'Ocorreu um erro. Por favor tente novamente.';
    }
  }
}

// returns a message for the redux TYPE that was dispatched
function getSuccessMessage(type: string): string {
  switch (type) {
    case FILE_UPDATE_SUCCESS: {
      return 'Arquivo salvo com sucesso!';
    }

    default: {
      return 'Informações salvas com sucesso';
    }
  }
}

export function* getAllFailuresSaga(action: any) {
  try {
    const data: OpenSnackbar = {
      type: OPEN_SNACKBAR,
      payload: {
        message: getFailureMessage(action?.type || ''),
        style: 'error',
      },
    };

    yield put(data);
  } catch (e) {
    console.log({ e });
  }
}

export function* getAllSuccessSaga(action: Action<any>) {
  try {
    const data: OpenSnackbar = {
      type: OPEN_SNACKBAR,
      payload: {
        message: getSuccessMessage(action?.type || ''),
        style: 'success',
      },
    };

    yield put(data);
  } catch (e) {
    console.log({ e });
  }
}

export default [
  takeLatest([DELETE_FILE_FAILURE, FILE_UPDATE_FAILURE, GET_FILE_FAILURE, GET_FILETREE_FAILURE], getAllFailuresSaga),
  takeLatest([FILE_UPDATE_SUCCESS], getAllSuccessSaga),
];
