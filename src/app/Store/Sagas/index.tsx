import { all } from 'redux-saga/effects';

import onlineEditorSagas from './onlineEditorSagas';
import snackbarSaga from './snackbarSaga';

// Create sagas.
const mySaga = function* rootSaga() {
  yield all([...onlineEditorSagas, ...snackbarSaga]);
};

export default mySaga;
