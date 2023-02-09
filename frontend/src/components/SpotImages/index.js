import React, { useState } from "react";
import "./SpotImages.css";

export default function SpotImages({ spot }) {
  return (
    <div>
      <div className="preview">
        <img src={spot.SpotImages[0].url} alt="spot-preview"></img>
      </div>
      {/* {spot.SpotImages.map((spot) => {
        console.log(spot)
        return (
          <img
            key={`spot-${spot.id}`}
            className="spot-details-images"
            src={spot.url}
            alt={`spot-${spot.id}`}
          ></img>
        );
      })} */}
    </div>
  );
}
