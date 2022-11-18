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
    <div className="spot-details">
      <div className="spot-info">
        <span>{spot.name}</span>
        <div className="spot-details-lower-header">
          <div>
            <span>★{spot.avgStarRating}</span>
            <span>{spot.numReviews} reviews</span>
          </div>
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
        <hr></hr>
        <h2>Spot hosted by {spot.Owner.firstName}</h2>
        <p>{spot.description}</p>
        <div className="spot-reviews">
          {reviews && Object.values(reviews).length > 0 ? (
            <>
              <hr></hr>
              <h2>Reviews</h2>
              <ul>
                {Object.values(reviews).map((review) => {
                  return (
                    <div className={"review"} key={`review-${review.id}`}>
                      <div>
                        {review.User.firstName}{" "}
                        {review.User.lastName.slice(0, 1)}
                      </div>
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
            <form className="add-review" onSubmit={handleSubmit}>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <label>Review</label>
              <textarea
                type="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                placeholder="How was your stay?"
              />
              <label>Stars</label>
              <input
                type="number"
                min="1"
                max="5"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                required
                placeholder="Rate your stay from 1-5 stars!"
              />
              <button type="submit">Add Review</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
