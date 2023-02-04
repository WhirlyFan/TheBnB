import { csrfFetch } from "./csrf";
// import { normalizedData } from "./spots";

// action creators
const GET_SPOT_BOOKINGS = "bookings/GET_SPOT_BOOKINGS";
const GET_USER_BOOKINGS = "bookings/GET_USER_BOOKINGS";

export const getSpotBookings = (payload) => {
  return {
    type: GET_SPOT_BOOKINGS,
    payload,
  };
};

export const getUserBookings = (payload) => {
  return {
    type: GET_USER_BOOKINGS,
    payload,
  };
};

//thunks
export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getSpotBookings(data));
    return data;
  }
};

export const getUserBookingsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/current`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getUserBookings(data));
    return data;
  }
};

//reducer

const initialState = {};

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SPOT_BOOKINGS:
      return { ...state, ...action.payload };
    case GET_USER_BOOKINGS:
        return {...state, ...action.payload}
    default:
      return state;
  }
}
