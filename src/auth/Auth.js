import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Signup from './Signup';
import Login from './Login';


  const Auth = (props) => {                         // Stateless component that will pull in props; it will hold the login and sign-up forms
    
  // Signup & Login will pass the token as a prop to the Signup/Login functions
    return (
      <Container className="auth-container">
        <Row>
          <Col md="6">
            <Signup updateToken={ props.updateToken } />
          </Col>
          <Col md="6" className="login-col">
            <Login updateToken={ props.updateToken } />
          </Col>
        </Row>
      </Container>
    );
};


export default Auth;