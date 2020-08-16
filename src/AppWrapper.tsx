import React from 'react';
import RotateLoader from 'react-spinners/RotateLoader';
import { ReduxStore } from 'app/Store';
import { css } from '@emotion/core';
import { useDispatch, useSelector } from 'react-redux';

import CustomSnackbar from 'app/Core/Components/CustomSnackbar';
import { setSnackbarOpened } from 'app/Store/Ducks/snackbarDuck';

const override = css`
  display: block;
  margin: 0 auto;
`;

const AppWrapper: React.FC<{}> = (props) => {
  const { children } = props;

  const dispatch = useDispatch();
  const state = useSelector((state: ReduxStore) => state);

  const { snackbar } = state;

  let loading = false;

  // Checks loading status on any redux.
  Object.keys(state).forEach((key) => {
    // @ts-ignore
    if (state[key].loading) {
      loading = true;

      return;
    }
  });

  const { message, opened, style } = snackbar;

  const handleSetOpened = (opened: boolean) => {
    dispatch(setSnackbarOpened(opened));
  };

  return (
    <>
      {loading && (
        <div
          className='loading-wrapper'
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50% -50%)',
            zIndex: 9999,
          }}
        >
          <RotateLoader css={override} size={20} margin={2} color='#73bc64' loading={loading} />
        </div>
      )}

      <CustomSnackbar message={message} opened={opened} setOpened={handleSetOpened} snacbkarStyle={style} />

      {children}
    </>
  );
};

export default AppWrapper;
