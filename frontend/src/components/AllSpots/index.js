import React, { useEffect } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import SpotCard from "../SpotCard";

export default function AllSpots() {
  const spots = useSelector((state) => state.spots.Spots);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotsActions.getAllSpotsThunk());
  }, [dispatch]);

  if (!spots) return null;

  return (
    <div className="allSpots">
      {Object.values(spots).map((spot) => {
        return (
            <SpotCard spot={spot}/>
        );
      })}
    </div>
  );
}
