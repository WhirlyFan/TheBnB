import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsThunk } from "../../store/bookings";
import "./Trips.css";
import { formatDate } from "../Bookings/index";

export default function Trips() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.booking?.Bookings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserBookingsThunk(user.id)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, user.id]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="my-bookings">
      <h1>Trips</h1>
      {bookings.map((booking) => {
        return (
          <div key={booking.id} className="booking">
            <div>{booking.Spot.name}</div>
            <div>{booking.Spot.location}</div>
            <div>
              {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
