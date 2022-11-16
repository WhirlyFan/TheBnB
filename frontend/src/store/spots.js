import { csrfFetch } from "./csrf";

//types
const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_SPOT_DETAILS = "spots/getSpotDetails";
const GET_MY_SPOTS = "spots/getMySpots";
const CREATE_SPOT = "spots/createSpot";
const EDIT_SPOT = "spots/editSpot";
const DELETE_SPOT = "spots/deleteSpot";

//action creators
export const getAllSpots = (payload) => {
  //action object
  return {
    type: GET_ALL_SPOTS,
    payload,
  };
};

export const getSpotDetails = (payload) => {
  return {
    type: GET_SPOT_DETAILS,
    payload,
  };
};

export const getMySpots = (payload) => {
  return {
    type: GET_MY_SPOTS,
    payload,
  };
};

export const createASpot = (payload) => {
  return {
    type: CREATE_SPOT,
    payload,
  };
};

export const editSpot = (payload) => {
  return {
    type: EDIT_SPOT,
    payload,
  };
};

export const deleteSpot = (payload) => {
  return {
    type: DELETE_SPOT,
    payload,
  };
};

//thunk
export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots", { method: "GET" });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllSpots(data));
    return data;
  } else {
    throw response;
  }
};

export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, { method: "GET" });
  if (response.ok) {
    const data = await response.json();
    dispatch(getSpotDetails(data));
    return data;
  } else {
    throw response;
  }
};

export const getMySpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`, { method: "GET" });
  if (response.ok) {
    const data = await response.json();
    dispatch(getMySpots(data));
    return data;
  } else {
    throw response;
  }
};

export const createASpotThunk = (spot, preview) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/`, {
    method: "POST",
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createASpot(data));
    const imageResponse = await csrfFetch(`/api/spots/${data.id}/images`, {
      method: "POST",
      body: JSON.stringify(preview),
    });
    if (imageResponse.ok) {
      return data
    } else {
      throw imageResponse;
    }
  } else {
    throw response;
  }
};

export const editSpotThunk = (spot, preview, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editSpot(data));
    const imageResponse = await csrfFetch(`/api/spots/${data.id}/images`, {
      method: "POST",
      body: JSON.stringify(preview),
    });
    if (imageResponse.ok) {
      return data
    } else {
      throw imageResponse;
    }
  } else {
    throw response;
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSpot(data));
    return data;
  } else {
    throw response;
  }
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
      const allSpots = normalizedData(action.payload.Spots);
      newState["Spots"] = allSpots;
      return newState;
    case GET_SPOT_DETAILS:
      newState["SpotDetails"] = action.payload;
      return newState;
    case GET_MY_SPOTS:
      const mySpots = normalizedData(action.payload.Spots);
      newState["MySpots"] = mySpots;
      return newState;
    case CREATE_SPOT:
      // const key = action.payload.id;
      // newState["Spots"][key] = action.payload;
      // newState["NewSpot"] = action.payload;
      return newState;
    case EDIT_SPOT:
      return newState
    case DELETE_SPOT:
      // delete newState["Spots"][action.payload.id];
      return newState;
    default:
      return state;
  }
}
