import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';


const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {       // takes in Submit event
    event.preventDefault();            // prevents refresh
    console.log("Sign-in data submitted.")

    if (username && password ) {

      console.log("User:", username, password);    // logs username & password
      
      fetch("http://localhost:3000/user/register", {                                // as found in workout.js and userControllers.js
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({user: {username: username, password: password} })    // correlates to body.user.username and .user.password
      })
      .then( (response) => response.json() )                                          // once received, JSONifies the response
      .then( (data) => { props.updateToken(data.sessionToken) } )                  // once JSONified, we call props.updateToken and pass it the token from the server
      .catch( (error) => console.log(error) );
    
    } else {
        alert("Both a username and password must be submitted.");
        console.log("But user failed to enter username.");
    }
  };


  return (
    <div>
      <h1>Sign Up</h1>
      <Form onSubmit={ handleSubmit }>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input onChange={ (event) => setUsername(event.target.value) }  name="username" value={username} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input onChange={ (event) => setPassword(event.target.value) } name="password" value={password} />
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>

      <br />
      <hr />

    </div>

  );
  
};


export default Signup;