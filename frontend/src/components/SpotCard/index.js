import React from "react";
import { useHistory } from "react-router-dom";

export default function SpotCard({spot}) {
  const history = useHistory();
  function handleClick(spotId) {
    history.push(`/spots/${spotId}`);
  }

  return (
    <div key={`spot-${spot.id}`} onClick={() => handleClick(spot.id)}>
      {`id: ${spot.id},  address: ${spot.address}, avgRating: ${spot.avgRating}, price: ${spot.price}`}
    </div>
  );
}
