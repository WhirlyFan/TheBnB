import { csrfFetch } from "./csrf";
import { normalizedData } from "./spots";

const GET_SPOT_REVIEWS = "reviews/getSpotReviews";
const CREATE_REVIEW = "reviews/createReview";

export const getSpotReviews = (payload) => {
  return {
    type: GET_SPOT_REVIEWS,
    payload,
  };
};

export const createReview = (payload) => {
  return {
    type: CREATE_REVIEW,
    payload,
  };
};

export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getSpotReviews(data));
    return data;
  } else {
    throw response;
  }
};

export const createReviewThunk = (review, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createReview(data));
    return data;
  } else {
    throw response;
  }
};

export const editSpotReviewThunk = (review, reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw response;
  }
};

export const deleteSpotReviewThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw response;
  }
};

export default function reviewReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      const spotReviews = normalizedData(action.payload.Reviews);
      newState["Reviews"] = spotReviews;
      return newState;
    case CREATE_REVIEW:
      return newState;
    default:
      return newState;
  }
}
