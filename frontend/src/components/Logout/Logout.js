import React, { useContext, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthContext from '../../context/auth-context';
import { USER_LOGOUT } from '../../store/actions/actionTypes';

function Logout() {
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();
  const logout = useCallback(() => dispatch({ type: USER_LOGOUT }), [dispatch]);
  useEffect(() => {
    logout();
    authContext.resetAuth();
  }, [authContext, logout]);

  return <Redirect to="/login" />;
}

export default Logout;
