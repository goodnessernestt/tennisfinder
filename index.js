import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Map from './Map';
import Tennis from './Tennis';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import SignUp from "./SignUp"
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./AuthContext";




function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Map} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signUp" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path='/tennis/:tennisId' element={<Tennis />} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
