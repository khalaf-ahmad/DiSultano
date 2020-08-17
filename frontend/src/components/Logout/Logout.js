import React,{ useContext, useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

const Logout = () => {
    const authContext = useContext(AuthContext);
    useEffect(() => {
        authContext.resetAuth();
    }, [authContext.resetAuth]);

    return  <Redirect to="/" />  ;
}

export default Logout;
