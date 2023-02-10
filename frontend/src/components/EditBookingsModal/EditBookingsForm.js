import React, { useState } from "react";
import Calendar from "../Bookings/Calendar";
import { formatDate } from "../Bookings";
import { useDispatch } from "react-redux";
import { editBookingThunk } from "../../store/bookings";
import "./EditBookingsForm.css";

export default function EditBookingsForm({ booking }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [range, setRange] = useState([
    {
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
      key: "selection",
    },
  ]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // console.log("range", range[0]);
    if (
      window.confirm(
        `Are you sure you want to change this booking to ${formatDate(
          range[0].startDate
        )} - ${formatDate(range[0].endDate)}?`
      )
    ) {
      dispatch(editBookingThunk(booking.id, range[0])).then((data) => {
        console.log("booking", data);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-bookings-form">
      <div>Change Booking</div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx} className="error">
            {error}
          </li>
        ))}
      </ul>
      <Calendar range={range} setRange={setRange} />
      <button type="submit" className="bookings_button">
        Submit
      </button>
    </form>
  );
}
