import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ButtonBase from '@material-ui/core/ButtonBase';

import './styles.scss';

import { ReduxStore } from 'app/Store';
import { fileUpdate, setOnlineEditorData } from 'app/Store/Ducks/onlineEditorDuck';

/**
 * Editor based on react-codemirro2
 * Source: https://github.com/scniro/react-codemirror2
 *
 * Author: Bruno Lucena
 */
function FileView() {
  const dispatch = useDispatch();
  const { onlineEditor } = useSelector((state: ReduxStore) => state);

  const { file, fileDeleted, fileUpdated } = onlineEditor;

  const [hasChanges, setHasChanges] = useState(false);
  const [text, setText] = useState(file.content);

  function saveChanges() {
    dispatch(
      fileUpdate({
        content: text,
        fileId: file.id,
        name: file.name,
      })
    );
  }

  function undoChanges() {
    setText(file.content);
    setHasChanges(false);
  }

  // Watch changes on fileDeleted to clear state.
  useEffect(() => {
    if (fileDeleted) {
      setHasChanges(false);
      setText('');
      dispatch(setOnlineEditorData({ fileDeleted: false }));
    }
  }, [dispatch, fileDeleted]);

  // Watch changes on fileUpdated to clear state.
  useEffect(() => {
    if (fileUpdated) {
      setHasChanges(false);
      dispatch(setOnlineEditorData({ fileUpdated: false }));
    }
  }, [dispatch, fileUpdated]);

  // Watch changes on active file to correctly set state.
  useEffect(() => {
    setHasChanges(false);
    setText(file.content);
  }, [dispatch, file]);

  return (
    <div className='file-wrapper'>
      <CodeMirror
        value={text}
        options={{
          autocorrect: true,
          autofocus: true,
          lineNumbers: true,
          spellcheck: true,
          pasteLinesPerSelection: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setHasChanges(true);
          setText(value);
        }}
      />

      {hasChanges && (
        <div className='buttons-wrapper'>
          <ButtonBase className='button button-cancel' onClick={undoChanges}>
            <div>DESFAZER ALTERAÇÕES</div>
          </ButtonBase>

          <ButtonBase className='button button-save' onClick={saveChanges}>
            <div>SALVAR ALTERAÇÕES</div>
          </ButtonBase>
        </div>
      )}
    </div>
  );
}

export default FileView;
