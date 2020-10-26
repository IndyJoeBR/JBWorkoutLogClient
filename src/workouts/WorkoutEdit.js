import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const WorkoutEdit = (props) => {
  const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
  const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
  const [editRes, setEditRes] = useState(props.workoutToUpdate.result);


  const workoutUpdate = (event, workout) => {                                   // event avoids page reload, 'workout' specifies which is to be updated
    event.preventDefault();

    fetch(`http://localhost:3000/log/${ props.workoutToUpdate.id }`, {                                 // as found in workout.js and userControllers.js
      method: 'PUT',
      headers: new Headers({ "Content-Type": "application/json",
                             "Authorization": props.token }),                   // guarded route requires a session token
      body: JSON.stringify({log: {description: editDesc, definition: editDef, result: editRes} } )      // correlates to the order found in router.put to update
    })
    .then( (response) => {
      console.log("***** workoutUpdate fetch completed, in then before props.updateOff *****")
      props.updateOff();
      console.log("***** updateOff just complete, going to start props.fetchWorkouts *****")
      props.fetchWorkouts();    // fetch all workouts, including the updated, and display
      
    })
  };  //  end workoutUpdate


  return(
    <Modal isOpen={ true }>
      <ModalHeader>Update a Workout</ModalHeader>
      <ModalBody>
        <Form onSubmit={ workoutUpdate }>
          <FormGroup>
            <Label htmlFor="result">Edit result:</Label>
            <Input name="result" value={ editRes } onChange={ (event) => setEditRes(event.target.value) }/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Edit description:</Label>
            <Input name="description" value={ editDesc } onChange={ (event) => setEditDesc(event.target.value) }/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="definition">Edit definition:</Label>
            <Input type="select" name="definition" value={ editDef } onChange={ (event) => setEditDef(event.target.value) }>
              <option></option>
              <option value="Time">Time</option>
              <option value="Weight">Weight</option>
              <option value="Distance">Distance</option>
            </Input>
          </FormGroup>
          <Button type="submit">Update the workout!</Button>
        </Form>
      </ModalBody>
    </Modal>
  )


};  //  end of WorkoutEdit


export default WorkoutEdit;