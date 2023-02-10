import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsThunk } from "../../store/bookings";
import "./MyBookings.css";
import { formatDate } from "../Bookings/index";
import SpotCard from "../SpotCard";

export default function Trips() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.booking?.Bookings);
  const [isLoaded, setIsLoaded] = useState(false);

  //change backend route to include user information
  useEffect(() => {
    dispatch(getUserBookingsThunk(user.id)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, user.id]);

  if (!isLoaded) {
    return null;
  }

  const clickDelete = (spot) => {};

  const clickEdit = (spot) => {};

  return (
    <div className="my-bookings">
      <h1>Your Trips</h1>
      <div className="bookings-body">
        {!bookings.length && <div>You have no bookings.</div>}
        {bookings.map((booking) => {
          return (
            <div key={booking.id} className="booking">
              <strong>
                Booking: {formatDate(booking.startDate)} -{" "}
                {formatDate(booking.endDate)}
              </strong>
              <SpotCard spot={booking.Spot} />
              <div className="edit-delete-buttons">
                <button
                  className="button"
                  onClick={() => {
                    clickEdit(booking);
                  }}
                >
                  Edit
                </button>
                <button
                  className="button"
                  onClick={() => {
                    clickDelete(booking);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
