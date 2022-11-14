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
  console.log(spot)
  return <div>test</div>;
}
