import React, { useEffect } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./SpotDetails.css";

export default function SpotDetails() {
  const spot = useSelector((state) => state.spots.SpotDetails);
  const { spotId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotsActions.getSpotDetailsThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;

  return (
    <div className="spot-card">
      <div>
        {spot.name}
        <div>
          <span>★{spot.avgStarRating}</span>
          <span>{spot.numReviews} reviews</span>
        </div>
        <div>
          <span>Share</span>
          <span>Save</span>
        </div>
      </div>
      <div>
        {spot.SpotImages.map((spot) => {
          return (
            <img
              key={`spot-${spot.id}`}
              className="spot-details-images"
              src={spot.url}
              alt={`spot-${spot.id}`}
            ></img>
          );
        })}
      </div>
      <div>{spot.description}</div>
      <div>{"reviews"}</div>
    </div>
  );
}
