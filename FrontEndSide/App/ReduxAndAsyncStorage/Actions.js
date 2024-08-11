// Actions.js

import { saveToken as asyncStoreToken, getToken as asyncGetToken, removeToken as asyncRemoveToken } from './Storage';
import { saveToken } from './BookSlice';

export const storeToken = (token) => async (dispatch) => {
  await asyncStoreToken(token);
  dispatch(saveToken(token));
};

export const loadToken = () => async (dispatch) => {
  const token = await asyncGetToken();
  if (token) {
    dispatch(saveToken(token));
  }
};

export const clearToken = () => async (dispatch) => {
  await asyncRemoveToken();
  dispatch(saveToken(''));
};
