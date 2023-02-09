import React, { useEffect, useState } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./SpotDetails.css";
import Bookings from "../Bookings";
import Reviews from "../Reviews";
import SpotImages from "../SpotImages";
import SpotInfo from "../SpotInfo";

export default function SpotDetails() {
  const spot = useSelector((state) => state.spots.SpotDetails);
  const user = useSelector((state) => state.session.user);
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    dispatch(spotsActions.getSpotDetailsThunk(spotId))
      .then((data) => {
        console.log(data);
        setIsLoaded(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) history.push("/");
      });
  }, [dispatch, spotId, hasClicked, user, history]);

  if (!spot) return null;
  if (!isLoaded) return null;

  let rating = spot.avgStarRating;
  rating = parseFloat(rating).toFixed(1);

  return (
    <div className="spot-details-1">
      <div className="spot-details-2">
        <div className="spot-details-header">
          <h1>{spot.name}</h1>
          <div className="spot-details-sub-header">
            <span>
              ★{!isNaN(rating) ? rating : "No Reviews"} · {spot.numReviews}{" "}
              reviews · {spot.address}
            </span>
          </div>
        </div>
        <SpotImages spot={spot} />
        <SpotInfo spot={spot} />
        <Bookings spot={spot} />
        <Reviews
          spot={spot}
          setHasClicked={setHasClicked}
          hasClicked={hasClicked}
        />
      </div>
    </div>
  );
}
