import * as actionTypes from './actionTypes';

export const fetch_users_initiate = () => {
  return {
    type: actionTypes.FETCH_USERS_INITIATE,
  };
};

export const fetch_users_start = () => {
  return {
    type: actionTypes.FETCH_USERS_START,
  };
};

export const fetch_users_succeed = (users) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users,
  };
};

export const fetch_users_fail = (error) => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error,
  };
};

export const update_user_status = (username, activated) => {
  return {
    type: actionTypes.UPDATE_USER_STATUS,
    username,
    activated,
  };
};

export const update_user_role = (username, role) => {
  return {
    type: actionTypes.UPDATE_USER_ROLE,
    username,
    role,
  };
};

export const save_user_init = (user) => {
  return {
    type: actionTypes.SAVE_USER_INIT,
    user,
  };
};

export const save_user_start = () => {
  return {
    type: actionTypes.SAVE_USER_START,
  };
};

export const save_user_success = (user) => {
  return {
    type: actionTypes.SAVE_USER_SUCESS,
    user,
  };
};

export const save_user_fail = (error) => {
  return {
    type: actionTypes.SAVE_USER_FAIL,
    error,
  };
};

export const delete_user_init = (userId) => {
  return {
    type: actionTypes.DELETE_USER_INIT,
    userId,
  };
};

export const delete_user_start = () => {
  return {
    type: actionTypes.DELETE_USER_START,
  };
};

export const delete_user_success = (userId) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    userId,
  };
};

export const delete_user_fail = (error) => {
  return {
    type: actionTypes.DELETE_USER_FAIL,
    error,
  };
};
