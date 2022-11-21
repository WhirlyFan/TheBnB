import React, { useEffect, useState } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import SpotCard from "../SpotCard";
import "./AllSpots.css";

export default function AllSpots() {
  const spots = useSelector((state) => state.spots.Spots);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(spotsActions.getAllSpotsThunk()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  if (!spots) return null;
  if (!isLoaded) return null;

  return (
    <div className="all-spots">
      {Object.values(spots).map((spot) => {
        return <SpotCard key={`spot-${spot.id}`} spot={spot} />;
      })}
    </div>
  );
}
