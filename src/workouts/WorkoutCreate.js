import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const WorkoutCreate = (props) => {
  const [description, setDescription] = useState('');
  const [definition, setDefinition] = useState('');
  const [result, setResult] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/log/', {        // as found in workout.js and userControllers.js, '.../log/'   is endpoint for all 'log' interaction, rest is on method
      method: 'POST',
      headers: new Headers({ "Content-Type": "application/json",
                             "Authorization": props.token }),       // guarded route requires a session token
      body: JSON.stringify( { log: { description: description, definition: definition, result: result } } )   // correlates to logControllers.js in server
    })
    .then( (response) => response.json() )        // JSONifies returned data from log
    .then( (logData) => {                         // after that is complete
        console.log(logData);                     // console.logs the data for verification
        setDescription('');                       // resets the state variables in
        setDefinition('');                        //     preparation for fresh input
        setResult('');
        props.fetchWorkouts();                    // and does this which is #8, but they fail to explain in the Analysis
    } )
    //.catch( (error) => console.log(error) );
  }; //  end of handleSubmit



  return(
    <>
      <h3>Log a Workout</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" value={ description } onChange={ (event) => setDescription(event.target.value) } />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="definition">Definition</Label>
          <Input type="select" id="definition" name="definition" value={ definition } onChange={ (event) => setDefinition(event.target.value) } >
            <option></option>
            <option value="Time">Time</option>
            <option value="Weight">Weight</option>
            <option value="Distance">Distance</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="result">Result</Label>
          <Input id="result" name="result" value={ result } onChange={ (event) => setResult(event.target.value) } />
        </FormGroup>
        <Button type="submit">Click to Submit</Button>
      </Form>
    </>

  )

};  //  end of WorkoutCreate

export default WorkoutCreate;