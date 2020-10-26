import React from 'react';
import {Table, Button} from 'reactstrap';


const WorkoutTable = (props) => {     // includes props to be used here

  const deleteWorkout = (workout) => {                            // expects a workout which it will use to strip the id
    fetch(`http://localhost:3000/log/${workout.id}`, {            // endpoint from logControllers.js; .id taken from 'workout'
      method: 'DELETE',
      headers: new Headers({ "Content-Type": "application/json",
                             "Authorization": props.token         // guarded route requires a session token
      }),
    })
    .then( () => props.fetchWorkouts() )                          // then re-fetch all the remaining workouts for re-display
    
  }; //  end of deleteWorkout


  const workoutMapper = () => {
    return props.workouts.map( (workout, index) => {
      return(
        <tr key={ index }>
          <th scope="row">{workout.id}</th>
          <td>{workout.result}</td>
          <td>{workout.description}</td>
          <td>{workout.definition}</td>
          <td>
            <Button color="warning" onClick={ () => { props.editUpdateWorkout(workout); props.updateOn() } } >Update</Button>
            <Button color="danger" onClick={ () => {deleteWorkout(workout) } }>Delete</Button>
          </td>
        </tr>
      )
    })
  };  //  end of workoutMapper
      //  When 'update' is clicked, a new workout is set and should toggle visibility of the WorkoutEdit component

  return(
    <>
      <h3>Workout History</h3>
      <hr />
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Result</th>
            <th>Description</th>
            <th>Definition</th>
          </tr>
        </thead>
        <tbody>
          {workoutMapper()}
        </tbody>
      </Table>
    </>
  )

}; //  end of WorkoutTable


export default WorkoutTable;