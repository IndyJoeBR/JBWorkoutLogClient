import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/user/login', {                                 // as found in workout.js and userControllers.js
      method: 'POST',
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({user: {username: username, password: password} })   // correlates to body.user.username and .user.password
    })
    .then( (response) => response.json() )
    .then( (data) => { props.updateToken(data.sessionToken) } )
    .catch( (error) => console.log(error) );
  };


  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={ handleSubmit }>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input onChange={ (event) => setUsername(event.target.value) } name="username" value={username} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input onChange={ (event) => setPassword(event.target.value) } name="password" value={password} />
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
    </div>

  );
  
};


export default Login;