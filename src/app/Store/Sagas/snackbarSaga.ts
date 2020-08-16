import { put, takeLatest } from 'redux-saga/effects';
import { Action } from '../Models/ReduxModels';

import { OPEN_SNACKBAR, OpenSnackbar } from '../Ducks/snackbarDuck';
import { GET_FILETREE_FAILURE, DELETE_FILE_FAILURE, FILE_UPDATE_FAILURE, GET_FILE_FAILURE } from '../Ducks/onlineEditorDuck';

// retorna uma mensagem de acordo com o TYPE da action que deu erro
// declarada no getAllFailuresSaga
function getFailureMessage(type: string): string {
  switch (type) {
    default: {
      return 'Ocorreu um erro. Por favor tente novamente.';
    }
  }
}

// retorna uma mensagem de acordo com o TYPE da action que deu sucesso
// declarada no getAllSuccessSaga
function getSuccessMessage(type: string): string {
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
      return 'Informações salvas com sucesso';
    }
  }
}

// trata os errors das TYPEs declaradas no takeLatest do export default
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

// trata os success das TYPEs declaradas no takeLatest do export default
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
  takeLatest([], getAllSuccessSaga),
];
