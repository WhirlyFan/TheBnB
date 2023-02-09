import React, { useEffect, useState } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import SpotCard from "../SpotCard";
import "./Profile.css";
// import {getUserBookingsThunk} from "../../store/booking";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots.MySpots);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);

  useEffect(() => {
    dispatch(spotsActions.getMySpotsThunk()).then(() => {
      // dispatch(getUserBookingsThunk());
      setIsLoaded(true);
    });
  }, [dispatch, hasSubmit]);

  if (!sessionUser) return <Redirect to={"/"} />;
  if (!isLoaded) return null;
  if (!spots) return null;

  const clickDelete = (spot) => {
    dispatch(spotsActions.deleteSpotThunk(spot.id)).then(() => {
      setHasSubmit(!hasSubmit);
      return;
    });
  };

  const clickEdit = (spot) => {
    history.push(`/spots/${spot.id}/edit`);
  };

  return (
    <div className="profile">
      <div className="about-me">
        <h1>Welcome {sessionUser.username}!</h1>
        {/* <span>Joined in __year__</span> */}
        <span>About Me Page Coming Soon!</span>
      </div>
      <div className="my-spots">
        <h1>Your Spots</h1>
        {Object.values(spots).map((spot) => {
          return (
            <div key={`spot-${spot.id}`}>
              <SpotCard spot={spot} />
              <div className="edit-delete-buttons">
                <button
                  className="button"
                  onClick={() => {
                    clickEdit(spot);
                  }}
                >
                  Edit
                </button>
                <button
                  className="button"
                  onClick={() => {
                    clickDelete(spot);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="profile-bookings">
        <h1>Your Bookings</h1>
      </div>
    </div>
  );
}
