import React, { useEffect } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import SpotCard from "../SpotCard";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots.MySpots);

  useEffect(() => {
    dispatch(spotsActions.getMySpotsThunk());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to={"/"} />;

  if (!spots) return null;

  const clickDelete = () => {
    return "test";
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
            <div>
              <SpotCard key={`spot-${spot.id}`} spot={spot} />
              <div>
                <button
                  onClick={() => {
                    clickEdit(spot);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => {}}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
