import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotImages } from "../../store/spotImages";
import "./SpotImages.css";

export default function SpotImages() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spotImages = useSelector((state) => state.spotImages);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSpotImages(spotId)).then(() => setLoaded(true));
  }, [dispatch, spotId]);

  return (
    <div className="spot-images-container">
      {loaded &&
        spotImages.map((image) => (
          <img
            className="spot-image"
            key={image.id}
            src={image.image_url}
            alt="Spot"
          />
        ))}
    </div>
  );
}
