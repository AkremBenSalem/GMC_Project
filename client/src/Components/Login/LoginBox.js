import React, { useState } from 'react'
import './images/icons/favicon.ico'
import './vendor/bootstrap/css/bootstrap.min.css'
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import './fonts/Linearicons-Free-v1.0.0/icon-font.min.css'
import './vendor/animate/animate.css'
import './vendor/css-hamburgers/hamburgers.min.css'
import './vendor/animsition/css/animsition.min.css'
import './vendor/select2/select2.min.css'
import './vendor/daterangepicker/daterangepicker.css'
import './css/util.css'
import './css/main.css'
import { useDispatch } from 'react-redux'
import {login} from "../../Redux/actions/user"


const LoginBox = ({history}) => {
  const [user,setUser] = useState({})
  const dispatch = useDispatch();
  
  const handleLogin = (e) =>{
    e.preventDefault()
    dispatch(login(user,history));

  }
  const handleChange = (e) =>{
  setUser({...user,[e.target.name]:e.target.value});  
  }


	return (
			<div>
        <title>Login</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <div className="limiter">
          <div className="container-login100" style={{backgroundImage: 'url("images/bg-01.jpg")'}}>
            <div className="wrap-login100 p-t-30 p-b-50">
              <span className="login100-form-title p-b-41">
                Account Login
              </span>
              <form className="login100-form validate-form p-b-33 p-t-5" onSubmit = {handleLogin}>
                <div className="wrap-input100 validate-input" data-validate="Enter your Email">
                  <input className="input100" type="email" name="email" placeholder="Your Email" onChange={handleChange}/>
                  <span className="focus-input100" data-placeholder="" />
                </div>
                <div className="wrap-input100 validate-input" data-validate="Enter password">
                  <input className="input100" type="password" name="password" placeholder="Password" onChange={handleChange}/>
                  <span className="focus-input100" data-placeholder="" />
                </div>
                <div className="container-login100-form-btn m-t-32">
                  <button className="login100-form-btn" onClick = {handleLogin}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="dropDownSelect1" />
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
      </div>
	)
}

export default LoginBox
