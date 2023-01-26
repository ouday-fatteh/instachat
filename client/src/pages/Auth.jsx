import React from 'react'
import { Signin, Signup } from '../components'
import { useLocation } from "react-router-dom";

const Auth = () => {
    //read auth type from url
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const type = params.get('authtype');

    if (type === 'signup') return <Signup />
    else return <Signin />;

}

export default Auth