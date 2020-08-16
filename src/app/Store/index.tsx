import onlineEditor, { State as OnlineEditorState } from './Ducks/onlineEditorDuck';
import snackbar, { State as SnackbarState } from './Ducks/snackbarDuck';

// Interface da store. Todas as redux (ducks) devem ter seu State declarado aqui.
export interface ReduxStore {
  onlineEditor: OnlineEditorState;
  snackbar: SnackbarState;
}

// Objeto da store (redux).
const reducers: any = {
  onlineEditor,
  snackbar,
};

export default reducers;
