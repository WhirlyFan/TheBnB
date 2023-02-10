import React from "react";
import "./SpotImages.css";

export default function SpotImages({ spot }) {
  if (!spot) return null;
  if (spot.SpotImages.length < 5) {
    const empty = 5 - spot.SpotImages.length;
    for (let i = 0; i < empty; i++) {
      spot.SpotImages.push({
        id: i,
        url: "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
      });
    }
  };

  const preview = spot.SpotImages.find((spot) => spot.preview);
  return (
    <div className="image-grid">
      {preview && (
        <img
          src={preview.url}
          alt="spot-preview"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
          }}
          className="image-grid-col-2 image-grid-row-2 preview"
        ></img>
      )}
      {spot.SpotImages.map((spot) => {
        if (!spot.preview) {
          return (
            <img
              key={`spot-${spot.id}`}
              src={spot.url}
              alt={`spot-${spot.id}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
              }}
            ></img>
          );
        }
        return null;
      })}
    </div>
  );
}
