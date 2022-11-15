import React, { useEffect } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SpotCard from "../SpotCard";

export default function Profile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots.MySpots);

  useEffect(() => {
    dispatch(spotsActions.getMySpotsThunk());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to={"/"} />;

  if (!spots) return null;

  return (
    <div>
      <div className="about-me">
        <h1>Welcome {sessionUser.username}!</h1>
        <span>Joined in __year__</span>
      </div>
      <div className="my-spots">
        <h1>My Spots</h1>
        {Object.values(spots).map((spot) => {
          return <SpotCard key={`spot-${spot.id}`} spot={spot} />;
        })}
      </div>
    </div>
  );
}
