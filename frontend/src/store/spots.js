import { csrfFetch } from "./csrf";

//types
const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_SPOT_DETAILS = "spots/getSpotDetails";

//action creators
export const getAllSpots = (spots) => {
  //action object
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

export const getSpotDetails = (spots) => {
  return {
    type: GET_SPOT_DETAILS,
    spots,
  };
};

//thunk
export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots", { method: "GET" });
  const data = await response.json();
  dispatch(getAllSpots(data));
  return response;
};

export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, { method: "GET" });
  const data = await response.json();
  dispatch(getSpotDetails(data));
  return response;
};
//normalization array to object with id keys
const normalizedData = (data) => {
  const obj = {};
  data.map((el) => (obj[el.id] = el));
  return obj;
};

//reducer
export default function spotsReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_SPOTS:
      const allSpots = normalizedData(action.spots.Spots);
      newState["Spots"] = allSpots;
      return newState;
    case GET_SPOT_DETAILS:
      newState["SpotDetails"] = action.spots
      return newState
    default:
      return state;
  }
}
