import React, { useState, useEffect } from 'react';
import SiteBar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';

function App() {

  const [ sessionToken, setSessionToken ] = useState('');   // create sessionToken as a state variable with empty string

  useEffect( () => {                                        // at mount, 
    if(localStorage.getItem('token')){                      // if there is already a token in local storage, (truthy)
      setSessionToken(localStorage.getItem('token'));       // use that token as the session token
    }
  }, []);

  // Store and set token in localStorage
  const updateToken = (newToken) => {                       // used to get a new token,
    localStorage.setItem('token', newToken);                // it is stored in local storage and
    setSessionToken(newToken);                              // set as the session token,
    console.log(sessionToken);                              // and log
  };


  const clearToken = () => {
    localStorage.clear();                                   // clears out local storage
    setSessionToken('');                                    // resets session token to empty string
  }

  const protectedViews = () => {                            // function will return one of two possible tokens
    return (sessionToken === localStorage.getItem('token')  // if the session token is found in local storage
      ? <WorkoutIndex token={ sessionToken } />             // WorkoutIndex gets the token as a prop
      : <Auth updateToken={ updateToken } />                // if not, the user is authenticated for an updated token
    )
  };


  return (
    <div>
      <SiteBar clickLogout={ clearToken } />
      {protectedViews()}
    </div>
  );
}

export default App;
