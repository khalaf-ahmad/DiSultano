import React,{ useContext, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

const Logout = () => {
    const authContext = useContext(AuthContext);
    useEffect(() => {
        authContext.resetAuth();
    }, [authContext]);

    return  <Redirect to="/" />  ;
}

export default Logout;
