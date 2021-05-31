import React from 'react'
import { Redirect } from 'react-router';
import LoginBox from '../../Components/Login/LoginBox'

const Login = ({history}) => {
    const isLogged =localStorage.getItem("token");
    return (
        isLogged ? (<Redirect to = "/profile"/>) :
        (
            <LoginBox history={history}/>
        )
    )
}

export default Login
