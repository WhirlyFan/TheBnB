import React, { useEffect } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function SpotDetails() {
  const spot = useSelector((state) => state.spots.SpotDetails);
  const { spotId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotsActions.getSpotDetailsThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;

  return (
    <>
      <div>
        {"header"}
        <div>{"links"}</div>
      </div>
      <div>
        {'images'}
      </div>
      <div>
        {'details'}
      </div>
      <div>
        {'reviews'}
      </div>
    </>
  );
}
