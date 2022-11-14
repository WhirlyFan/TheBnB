import React, { useEffect } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";

export default function AllSpots() {
  const spots = useSelector((state) => state.spots.Spots);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotsActions.getAllSpotsThunk());
  }, [dispatch]);

  if (!spots) return null;

  return (
    <div>
      {Object.values(spots).map((spot) => {
        return (
          <div key={`spot-${spot.id}`}>
            {`id: ${spot.id},  address: ${spot.address}, avgRating: ${spot.avgRating}, price: ${spot.price}`}
          </div>
        );
      })}
    </div>
  );
}
