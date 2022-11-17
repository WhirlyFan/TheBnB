import React, { useEffect, useState } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/review";
import "./SpotDetails.css";

export default function SpotDetails() {
  const spot = useSelector((state) => state.spots.SpotDetails);
  const reviews = useSelector((state) => state.review.Reviews);
  const user = useSelector((state) => state.session.user);
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);

  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    dispatch(spotsActions.getSpotDetailsThunk(spotId));
    dispatch(reviewActions.getSpotReviewsThunk(spotId));
  }, [dispatch, spotId, hasClicked]);

  console.log(reviews);
  // if (!reviews) return null;
  if (!spot) return null;

  const clickEdit = (review, spotId) => {
    history.push(`/spots/${spotId}/reviews/${review.id}/edit`);
  };
  const clickDelete = (reviewId) => {
    dispatch(reviewActions.deleteSpotReviewThunk(reviewId)).then(() => {
      setHasClicked(!hasClicked);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(
      reviewActions.createReviewThunk(
        {
          review,
          stars,
        },
        spot.id
      )
    )
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
      .then(() => {
        setHasClicked(!hasClicked);
      });
  };

  return (
    <div className="spot-card">
      <div>
        {spot.name}
        <div>
          <span>★{spot.avgStarRating}</span>
          <span>{spot.numReviews} reviews</span>
        </div>
        <div>
          <span>Share</span>
          <span>Save</span>
        </div>
      </div>
      <div>
        {spot.SpotImages.map((spot) => {
          return (
            <img
              key={`spot-${spot.id}`}
              className="spot-details-images"
              src={spot.url}
              alt={`spot-${spot.id}`}
            ></img>
          );
        })}
      </div>
      <div>{spot.description}</div>
      <div className="spot-reviews">
        {reviews && Object.values(reviews).length > 0 ? (
          <>
            <h2>Reviews</h2>
            <ul>
              {Object.values(reviews).map((review) => {
                return (
                  <div className={"review"} key={`review-${review.id}`}>
                    <li>{review.review}</li>
                    {user && user.id === review.userId && (
                      <div className={"my-buttons"}>
                        <button
                          onClick={() => {
                            clickEdit(review, spot.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            clickDelete(review.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </ul>
          </>
        ) : (
          <h2>No Reviews</h2>
        )}
        {user && (
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              Review
              <textarea
                type="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                placeholder="This place was great!"
              />
            </label>
            <label>
              Stars
              <input
                type="number"
                min="1"
                max="5"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                required
                placeholder="5"
              />
            </label>
            <button type="submit">Add Review</button>
          </form>
        )}
      </div>
    </div>
  );
}
