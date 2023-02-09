import { csrfFetch } from "./csrf";

//action creators
const GET_SPOT_IMAGES = "spotImages/GET_SPOT_IMAGES";

export const getSpotImages = (payload) => {
  return {
    type: GET_SPOT_IMAGES,
    payload,
  };
};

//thunks
export const getSpotImagesThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`);
  const data = await response.json();
  dispatch(getSpotImages(data));
  return data;
};

export const createSpotImageThunk = (image, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify(image),
  });
  const data = await response.json();
  return data;
};

export const editSpotImageThunk = (image, imageId) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method: "PUT",
    body: JSON.stringify(image),
  });
  const data = await response.json();
  return data;
};

export const deleteSpotImageThunk = (imageId) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

//reducer
const initialState = {};

export default function spotImagesReducer (state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_SPOT_IMAGES:
        newState = { ...action.payload };
        return newState;
        default:
        return state;
    }
}
