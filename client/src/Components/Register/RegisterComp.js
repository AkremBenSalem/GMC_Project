import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {register} from "../../Redux/actions/user"

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


const RegisterComp = ({history}) => {
  const [user,setUser] = useState({})
  const dispatch = useDispatch();

  const handleRegister = (e) =>{
    e.preventDefault();
    dispatch(register(user,history));

  }
  const handleChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value})
  }
	return (
			<div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <div className="limiter">
          <div className="container-login100" >
            <div className="wrap-login100 p-t-30 p-b-50">
              <span className="login100-form-title p-b-41">
                Register Account
              </span>
              <form className="login100-form validate-form p-b-33 p-t-5" onSubmit={handleRegister}>
                <div className="wrap-input100 validate-input" data-validate="Enter name">
                  <input className="input100" type="text" name="name" placeholder="Name" required onChange={handleChange}/>
                  <span className="focus-input100" data-placeholder="" />
                </div>
                <div className="wrap-input100 validate-input" data-validate="Enter Email">
                  <input className="input100" type="email" name="email" placeholder="example@example.com" required onChange={handleChange}/>
                  <span className="focus-input100" data-placeholder="" />
                </div>
                <div className="wrap-input100 validate-input" data-validate="Enter password">
                  <input className="input100" type="password" name="password" placeholder="Password" required onChange={handleChange} />
                  <span className="focus-input100" data-placeholder="" />
                </div>
                <div className="container-login100-form-btn m-t-32">
                  <button className="login100-form-btn" onClick={handleRegister}>
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="dropDownSelect1" />
      </div>
	)
}

export default RegisterComp
