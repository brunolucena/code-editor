import { call, put, takeLatest } from 'redux-saga/effects';

import Api from '../Services/Api';
import { Action } from '../Models/ReduxModels';

import { DeleteFileRequest, FileUpdateRequest, GetFileRequest } from '../Ducks/onlineEditorDuck/models';
import {
  DELETE_FILE,
  DELETE_FILE_FAILURE,
  DELETE_FILE_SUCCESS,
  FILE_UPDATE,
  FILE_UPDATE_FAILURE,
  FILE_UPDATE_SUCCESS,
  GET_FILE,
  GET_FILETREE,
  GET_FILETREE_FAILURE,
  GET_FILETREE_SUCCESS,
  GET_FILE_FAILURE,
  GET_FILE_SUCCESS,
} from '../Ducks/onlineEditorDuck';

function* deleteFileSaga(action: Action<DeleteFileRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({ type: DELETE_FILE_SUCCESS, payload });
  } catch (e) {
    yield put({ type: DELETE_FILE_FAILURE, payload: e });
  }
}

function* fileUpdateSaga(action: Action<FileUpdateRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({ type: FILE_UPDATE_SUCCESS, payload });
  } catch (e) {
    yield put({ type: FILE_UPDATE_FAILURE, payload: e });
  }
}

function* getFileSaga(action: Action<GetFileRequest>) {
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
