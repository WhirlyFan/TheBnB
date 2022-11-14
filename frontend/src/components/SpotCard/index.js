import React from "react";
import { useHistory } from "react-router-dom";

export default function SpotCard({ spot }) {
  const history = useHistory();
  function handleClick(spotId) {
    history.push(`/spots/${spotId}`);
  }
  console.log(spot.previewImage);
  return (
    <div
      key={`spot-${spot.id}`}
      className="spotCard"
      onClick={() => handleClick(spot.id)}
    >
      <img src={spot.previewImage} alt={`spot-${spot.id}-preview`}></img>
      <h3>
        {spot.city}, {spot.state}
      </h3>
      <h3>${spot.price} night</h3>
    </div>
  );
}
