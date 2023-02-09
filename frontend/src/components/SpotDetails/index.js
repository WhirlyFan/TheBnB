import React, { useEffect, useState } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./SpotDetails.css";
import Bookings from "../Bookings";
import Reviews from "../Reviews";

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
      .then(() => {
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
    <div className="spot-details">
      <div className="spot-info">
        <h1>{spot.name}</h1>
        <div className="reviews-address">
          <span>
            ★{!isNaN(rating) ? rating : "No Reviews"} · {spot.numReviews}{" "}
            reviews · {spot.address}
          </span>
          {/* <div className="share-save">
          <span>Share</span>
          <span>Save</span>
        </div> */}
        </div>
        <div>
          <div className="preview">
            <img src={spot.SpotImages[0].url} alt="spot-preview"></img>
          </div>
          {/* {spot.SpotImages.map((spot) => {
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
        <div className="spot-details-main">
          <div>
            <div>
              <h2>Spot hosted by {spot.Owner.firstName}</h2>
              <hr></hr>
              <div>
                <img
                  className="air-cover"
                  src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
                  alt="aircover"
                ></img>
                <p className="spot-details-overflow">
                  Every booking includes free protection from Host
                  cancellations, listing inaccuracies, and other issues like
                  trouble checking in.sssssssssssssssssssss
                </p>
              </div>
              <hr></hr>
              <p className="spot-details-overflow">{spot.description}</p>
              <hr></hr>
            </div>
          </div>
          <Bookings spot={spot} />
        </div>
        <Reviews
          spot={spot}
          setHasClicked={setHasClicked}
          hasClicked={hasClicked}
          user={user}
        />
      </div>
    </div>
  );
}
