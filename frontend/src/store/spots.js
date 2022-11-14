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
    default:
      return state;
  }
}
