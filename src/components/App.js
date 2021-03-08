import React from 'react';
import Signup from "./Signup"
//import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import AppointmentForm from "../containers/AppointmentForm"
import Calender from "./Calendar"
import ClientRequest from '../containers/ClientRequest'
const App = () => {

  return (
    <div className="w-100" >
      <Router >
        <AuthProvider >
          <Switch >
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/appointment-form" component={AppointmentForm}/>
            <Route path="/timetable" component={Calender}/>
            
            <Route path="/clientRequests" component={ClientRequest}/>
          </Switch>
        </AuthProvider>
      </Router>
    </div>


  );
};
export default App;
