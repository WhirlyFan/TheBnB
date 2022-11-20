import React from "react";
import { useHistory } from "react-router-dom";
import "./SpotCard.css";

export default function SpotCard({ spot }) {
  const history = useHistory();
  function handleClick(spotId) {
    history.push(`/spots/${spotId}`);
  }

  let rating = spot.avgRating || spot.getRating;
  rating = parseFloat(rating).toFixed(1);

  return (
    <div className="spot-card" onClick={() => handleClick(spot.id)}>
      <div className="preview-div">
        <img
          className={"spot-card-image"}
          src={spot.previewImage}
          alt={`spot-${spot.id}-preview`}
        ></img>
      </div>
      <div>
        <h3>
          {spot.city}, {spot.state}
        </h3>
        <span>★ {!isNaN(rating) ? rating : "No Reviews"}</span>
      </div>
      <div className="name-price">
        <span>{spot.name}</span>
        <span>
          <span className="spot-price">${spot.price}</span> night
        </span>
      </div>
    </div>
  );
}
