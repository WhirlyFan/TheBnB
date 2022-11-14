import { csrfFetch } from "./csrf";

//types
const GET_ALL_SPOTS = "spots/getAllSpots";

//action creators
export const getAllSpots = (spots) => {
  //action object
  return {
    type: GET_ALL_SPOTS,
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

//reducer
export default function spotsReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = [...action.spots];
      return newState;
    default:
      return state;
  }
}
