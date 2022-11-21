import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/review";

export default function EditReview() {
  const { spotId } = useParams();
  const { reviewId } = useParams();
  const sessionUser = useSelector((state) => state.session.user); const history = useHistory();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewActions.getSpotReviewsThunk(spotId))
      .then((res) => {
        let currReview = res.Reviews.find(review => review.id === Number(reviewId))
        setReview(currReview.review)
        setStars(currReview.stars)
        setIsLoaded(true)
      })
  }, [dispatch, spotId, reviewId]);

  if (!isLoaded) return null

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      reviewActions.editSpotReviewThunk(
        {
          review,
          stars,
        },
        reviewId
      )
    )
      .then(() => {
        history.push(`/spots/${spotId}`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  if (!sessionUser) return <Redirect to={"/"} />;

  return (
    <div className="form-div">
      <form className="form" onSubmit={handleSubmit}>
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
          required />
        <label>Stars</label>
        <input
          type="number"
          min="1"
          max="5"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required />
        <button className="button" type="submit">
          Edit Review
        </button>
      </form>
    </div>
  );
}
