import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/review";

export default function EditReview() {
  const { spotId } = useParams();
  const { reviewId } = useParams();
  const history = useHistory();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

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
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
      .then(() => {
        if (!errors.length) history.push(`/spots/${spotId}`);
      });
  };

  return (
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
      <button type="submit">Edit Review</button>
    </form>
  );
}
