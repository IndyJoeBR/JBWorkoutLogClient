import React, { useState, useEffect } from 'react';
import {Container, Row, Col} from 'reactstrap';
import WorkoutCreate from './WorkoutCreate';
import WorkoutTable from './WorkoutTable';
import WorkoutEdit from './WorkoutEdit';

const WorkoutIndex = (props) => {

  const [workouts, setWorkouts] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);        // used to conditionally display the WorkoutEdit component (no display when 'false')
                                                                  //   when the user clicks the 'update' button, it will toggle to true
  const [workoutToUpdate, setWorkoutToUpdate] = useState( {} );   // used as a prop by WorkoutEdit; when the user clicks on a row, that row's data will
                                                                  //   populate into workoutToUpdate

  const fetchWorkouts = () => {
    fetch('http://localhost:3000/log/', {               // *** NOTE ***  according to my server localhost:3000/log/   gets ALL logs
      method: 'GET',                                    //                                                        ^
      headers: new Headers ({
        'Content-Type': 'application/json',
        'Authorization': props.token
      })
    })
    .then( (response) => response.json() )
    .then( (logData) => { setWorkouts(logData) } )       // saves workout log data to state variable                
  };  //  end of fetchWorkouts


  const editUpdateWorkout = (workout) => {                        // updates workoutToUpdate based on input
    console.log("***** setWorkoutToUpdate working next *****")
    setWorkoutToUpdate(workout);
    console.log("***** console.log from editUpdateWorkout *****")
    console.log(workout);
  };  //  end of editUpdateWorkout

  const updateOn = () => {                                        // used to toggle WorkoutEdit display on
    setUpdateActive(true);
  };

  const updateOff = () => {                                       // used to toggle WorkoutEdit display off
    console.log("***** setUpdateActive working next *****")
    setUpdateActive(false);
    console.log("***** setUpdateActive set to falset *****")
  };


  useEffect( () => {                                    // when the page mounts
    fetchWorkouts();                                    // it fetches the workout log(s)
  }, []);


  return (
    <Container>
      <Row>
        <Col md="3">
          <WorkoutCreate fetchWorkouts={ fetchWorkouts } token={ props.token } />
        </Col>
        <Col md="9">
          <WorkoutTable workouts={ workouts }
                        editUpdateWorkout={ editUpdateWorkout }
                        updateOn={ updateOn }
                        fetchWorkouts={ fetchWorkouts }
                        token={ props.token } />
        </Col>
        { updateActive ? <WorkoutEdit workoutToUpdate={ workoutToUpdate } updateOff={ updateOff } token={ props.token } fetchWorkouts={ fetchWorkouts }/>
                       : <></> }
      </Row>
    </Container>
  )

};  //  end of WorkoutIndex

                        // workouts - workout objects the WorkoutTable will .map() to the page
                        // fetchWorkout - will allow user to update/delete the workouts
                        // token - delete workout will be a guarded endpoint

export default WorkoutIndex;