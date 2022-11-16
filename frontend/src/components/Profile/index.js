import React, { useEffect, useState } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import SpotCard from "../SpotCard";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots.MySpots);

  const [hasSubmit, setHasSubmit] = useState(false);

  useEffect(() => {
    dispatch(spotsActions.getMySpotsThunk());
  }, [dispatch, hasSubmit]);


  if (!sessionUser) return <Redirect to={"/"} />;

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
    <div>
      <div className="about-me">
        <h1>Welcome {sessionUser.username}!</h1>
        {/* <span>Joined in __year__</span> */}
      </div>
      <div className="my-spots">
        <h1>Your Spots</h1>
        {Object.values(spots).map((spot) => {
          return (
            <div key={`spot-${spot.id}`}>
              <SpotCard spot={spot} />
              <div>
                <button
                  onClick={() => {
                    clickEdit(spot);
                  }}
                >
                  Edit
                </button>
                <button
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
    </div>
  );
}
