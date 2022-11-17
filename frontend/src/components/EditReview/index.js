import React, { useEffect, useState } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/review";

export default function EditReview() {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      spotsActions.editSpotThunk({
        review,
        stars,
      })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
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
        Edit Review
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          placeholder="some dumb review"
        />
      </label>
      <label>
        Stars
        <input
          type="text"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
          placeholder="some dumb rating"
        />
      </label>
      <button type="submit">Add Review</button>
    </form>
  );
}
