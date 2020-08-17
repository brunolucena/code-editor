import { call, put, takeLatest } from 'redux-saga/effects';

import Api from '../Services/Api';
import { Action } from '../Models/ReduxModels';

import {
  DELETE_FILE,
  DELETE_FILE_FAILURE,
  DELETE_FILE_SUCCESS,
  DeleteFile,
  DeleteFileSuccess,
  FILE_UPDATE,
  FILE_UPDATE_FAILURE,
  FILE_UPDATE_SUCCESS,
  FileUpdate,
  GET_FILE,
  GET_FILETREE,
  GET_FILETREE_FAILURE,
  GET_FILETREE_SUCCESS,
  GET_FILE_FAILURE,
  GET_FILE_SUCCESS,
  GetFile,
} from '../Ducks/onlineEditorDuck';

function* deleteFileSaga(action: DeleteFile) {
  try {
    yield call(Api, action);

    const fileId = action.fileId || 99999999;

    const actionSuccess: DeleteFileSuccess = { type: DELETE_FILE_SUCCESS, payload: { fileId } };

    yield put(actionSuccess);
  } catch (e) {
    yield put({ type: DELETE_FILE_FAILURE, payload: e });
  }
}

function* fileUpdateSaga(action: FileUpdate) {
  try {
    const payload = yield call(Api, action);

    yield put({ type: FILE_UPDATE_SUCCESS, payload });
  } catch (e) {
    yield put({ type: FILE_UPDATE_FAILURE, payload: e });
  }
}

function* getFileSaga(action: GetFile) {
  try {
    const payload = yield call(Api, action);

    yield put({ type: GET_FILE_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_FILE_FAILURE, payload: e });
  }
}

function* getFileTreeSaga(action: Action<{}>) {
  try {
    const payload = yield call(Api, action);

    yield put({ type: GET_FILETREE_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_FILETREE_FAILURE, payload: e });
  }
}

export default [
  takeLatest(DELETE_FILE, deleteFileSaga),
  takeLatest(FILE_UPDATE, fileUpdateSaga),
  takeLatest(GET_FILE, getFileSaga),
  takeLatest(GET_FILETREE, getFileTreeSaga),
];
