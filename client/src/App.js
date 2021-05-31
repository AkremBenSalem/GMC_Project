import { Route, Switch } from 'react-router';
import './App.css';
import Landpage from "./Pages/Landpage/Landpage"
import Register from "./Pages/Register/Register"
import Login from "./Pages/Login/Login"
import Profile from "./Pages/Profile/Profile"
import Errors from "./Pages/Errors/Errors"
import NavBar from './Components/Navbar/NavBar';
import PrivateRoute from './router/PrivateRoute';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { current } from "./Redux/actions/user";
import Dashboard from './Pages/Dashboard/Dashboard';
function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    console.log("dispatching current from app")
    dispatch(current())

  }, [])

  return (
    <div >
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Landpage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/*" component={Errors} />
      </Switch>
    </div>
  );
}

export default App;
