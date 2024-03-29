// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import SpotDetails from "./components/SpotDetails";
import Profile from "./components/Profile";
import NewSpot from "./components/NewSpot";
import EditSpot from "./components/EditSpot";
import EditReview from "./components/EditReview";
import MyBookings from "./components/MyBookings";
import EditSpotImages from "./components/EditSpotImages";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={"/"}>
            <AllSpots />
          </Route>
          <Route exact path={`/spots/new`}>
            <NewSpot />
          </Route>
          <Route exact path={`/spots/:spotId`}>
            <SpotDetails />
          </Route>
          <Route exact path={`/spots/:spotId/edit`}>
            <EditSpot />
          </Route>
          <Route exact path={`/spots/:spotId/images/edit`}>
            <EditSpotImages />
          </Route>
          <Route exact path={`/spots/:spotId/reviews/:reviewId/edit`}>
            <EditReview />
          </Route>
          <Route exact path={`/:username/profile`}>
            <Profile />
          </Route>
          <Route exact path={`/:username/trips`}>
            <MyBookings />
          </Route>
          <Route path={"/"}>
            <Redirect to={"/"} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
