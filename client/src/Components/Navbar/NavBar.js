import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
import { logout } from "../../Redux/actions/user";
import './NavBar.css'
const NavBar = () => {
  const isAuth = useSelector(state => state.userReducer.isAuth)
  const dispatch = useDispatch();
  return (
    <>
        {/*  Meta  */}
        <meta charSet="UTF-8" />
        <title>Smooth navigation</title>
        {/*  Styles  */}
        
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
        <header className="main-header">
          <div className="container">
            <nav className="navbar navbar-expand-lg main-nav px-0">
            <Link to="/">
                <img className="navbar-brand" style={{maxWidth:40}} src="http://rajeshdas.com/assets/images/logo.svg" alt="Dashboard" />
                </Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainMenu" aria-controls="mainMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="icon-bar icon-bar-1" />
                <span className="icon-bar icon-bar-2" />
                <span className="icon-bar icon-bar-3" />
              </button>
              <div className="collapse navbar-collapse" id="mainMenu">
                
                  {isAuth ? (
                     <ul className="navbar-nav ml-auto text-uppercase f1"> 
                     <li onClick={() => dispatch(logout())}>
                     <Link to="/">Logout</Link>
                   </li>
                   <li>
                  <Link to="/Profile">Profile</Link>
                  </li>
                   </ul>
                  ) : (
                    <ul className="navbar-nav ml-auto text-uppercase f1"> <li>
                    <Link to="/register">Register</Link>
                  </li>
                  <li>
                  <Link to="/login">Log in</Link>
                  </li>
                  </ul>
                  ) };
                  
                
              </div>
            </nav>
          </div>
          {/* /.container */}
        </header>
        {/*

    Wow! What do you want to build?

    You have so many possibilities right now... Looking for something to kick off?
    How about a simple folio page to show off everything you're going to make!
   
  */}
        {/* Bootstrap core JavaScript
    ================================================== */}
        {/* Placed at the end of the document so the pages load faster */}
        {/* Scripts */}
      </>
  );
};

export default NavBar;
