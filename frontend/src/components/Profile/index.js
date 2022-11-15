import React, { useEffect } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots.MySpots);

  useEffect(() => {
    dispatch(spotsActions.getMySpotsThunk());
  }, [dispatch]);


  if (!sessionUser) return console.log('SAD')

//   if (!sessionUser) return <Redirect to={"/"} />;

  return (
    <>
      <div>
        <div className="about-me">
          <h1>Welcome {sessionUser.username}!</h1>
          <span>Joined in __year__</span>
        </div>
      </div>
    </>
  );
}
