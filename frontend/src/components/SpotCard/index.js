import React from "react";
import { useHistory } from "react-router-dom";
import "./SpotCard.css";

export default function SpotCard({ spot }) {
  const history = useHistory();
  function handleClick(spotId) {
    history.push(`/spots/${spotId}`);
  }

  let rating = spot.avgRating || spot.getRating;
  rating = parseFloat(rating).toFixed(1)

  return (
    <div className="spot-card" onClick={() => handleClick(spot.id)}>
      <img
        className={"spot-card-image"}
        src={spot.previewImage}
        alt={`spot-${spot.id}-preview`}
      ></img>
      <div>
      <h3>
        {spot.city}, {spot.state}
        {/* broken on heroku needs refactoring to prevent NaN on spots without reviews */}
      </h3>
      <h3>★ {!isNaN(rating) ? rating : "No Reviews"}</h3>
      </div>
      <h3>${spot.price} night</h3>
    </div>
  );
}
