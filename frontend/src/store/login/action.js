import { post } from '../../helpers/backend';
import { SIGNIN, SIGNUP, CREATEMAIL } from '../../helpers/url_helper';
import { RESET_USER, USER, USER_FAILED, USER_SUCCESS } from './types';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER,
    });
    const result = await post(SIGNIN, {
      email,
      password,
    });
    localStorage.setItem('user', JSON.stringify(result));
    // console.log(result);
    return dispatch({
      type: USER_SUCCESS,
      payload: result,
    });
  } catch (error) {
    return dispatch({
      type: USER_FAILED,
      payload: error,
    });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER,
    });
    const result = await post(SIGNUP, {
      username,
      email,
      password,
    });
    localStorage.setItem('user', JSON.stringify(result));
    return dispatch({
      type: USER_SUCCESS,
      payload: result,
    });
  } catch (error) {
    return dispatch({
      type: USER_FAILED,
      payload: error,
    });
  }
};

export const userMail =
  (emailTo, subject, description, filePassword, imageUrl) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER,
      });
      const result = await post(CREATEMAIL, {
        emailTo,
        subject,
        description,
        filePassword,
        imageUrl,
      });
      localStorage.setItem('mail', JSON.stringify({ filePassword, imageUrl }));
      //localStorage.setItem('mail', JSON.stringify(imageUrl));
      return dispatch({
        type: USER_SUCCESS,
        payload: result,
      });
    } catch (error) {
      return dispatch({
        type: USER_FAILED,
        payload: error,
      });
    }
  };

export const resetUser = () => {
  return {
    type: RESET_USER,
  };
};
