import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsThunk } from "../../store/bookings";
import "./Trips.css";
import { format } from "date-fns";

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
        let startDate = new Date(booking.startDate);
        let startOptions = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          //   hour: "numeric",
          //   minute: "numeric",
          //   timeZoneName: "short",
        };
        let formattedStartDate = startDate.toLocaleString(
          "en-US",
          startOptions
        );

        let endDate = new Date(booking.endDate);
        let endOptions = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          //   hour: "numeric",
          //   minute: "numeric",
          //   timeZoneName: "short",
        };
        let formattedEndDate = endDate.toLocaleString("en-US", endOptions);
        return (
          <div key={booking.id} className="booking">
            <div>{booking.Spot.name}</div>
            <div>{booking.Spot.location}</div>
            <div>
              {formattedStartDate} to {formattedEndDate}
            </div>
          </div>
        );
      })}
    </div>
  );
}
