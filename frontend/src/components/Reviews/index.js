import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as reviewActions from "../../store/review";
import "./Reviews.css";

export default function Reviews({ spot, hasClicked, setHasClicked }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.review.Reviews);

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(reviewActions.getSpotReviewsThunk(spot.id)).then(() => {
      setReview("");
      setStars("");
    });
  }, [dispatch, spot.id, hasClicked]);

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
      .then(() => {
        setHasClicked(!hasClicked);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="spot-reviews">
      {reviews && Object.values(reviews).length > 0 ? (
        <>
          <h2>Reviews</h2>
          <ul>
            {Object.values(reviews).map((review) => {
              return (
                <div className={"review"} key={`review-${review.id}`}>
                  <div>
                    {review.User.firstName} {review.User.lastName.slice(0, 1)} ·
                    ★{review.stars}
                  </div>
                  <li>{review.review}</li>
                  {user && user.id === review.userId && (
                    <div className="review-buttons">
                      <button
                        className="button"
                        onClick={() => {
                          clickEdit(review, spot.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="button"
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
              <li key={idx} className="error">
                {error}
              </li>
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
          <button className="button" type="submit">
            Add Review
          </button>
        </form>
      )}
    </div>
  );
}
