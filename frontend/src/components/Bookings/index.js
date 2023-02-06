import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Calendar from "./Calendar";
import { createBookingThunk } from "../../store/bookings";
import format from "date-fns/format";

export default function Bookings({ spot }) {
  const dispatch = useDispatch();
  const [guests, setGuests] = useState("");
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [disabled, isDisabled] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (range[0].startDate && range[0].endDate && guests) {
      isDisabled(false);
    }
  }, [range, guests]);

  let rating = spot.avgStarRating;
  rating = parseFloat(rating).toFixed(1);

  const handleSubmit = (booking, spotId) => {
    console.log(booking);
    console.log(spotId);
    dispatch(createBookingThunk(booking, spotId))
      .then(async (data) => {
        console.log(data)
        alert(
          `Successfully created a booking at ${format(
            data.startDate,
            "MM/dd/yyyy"
          )} - ${format(data.endDate, "MM/dd/yyyy")}`
        );
      })
      .catch(async (res) => {
        const data = await res.json();
        setErrors(data.errors);
      });
  };

  return (
    <div className="bookings">
      <div className="bookings_header">
        <div>${spot.price} night</div>
        <div>
          ★{rating} · {spot.numReviews} reviews
        </div>
      </div>
      <div className="bookings_inputs">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="error">
              {error}
            </li>
          ))}
        </ul>
        <Calendar range={range} setRange={setRange} />
        <div>
          <input
            type={"number"}
            value={guests}
            placeholder="Add Guests"
            className="inputBox add_guests"
            min={1}
            max={20}
            // add maxGuests tag to spot model later
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
      </div>
      <div className="bookings_button_container">
        <button
          className="bookings_button"
          disabled={disabled}
          onClick={() => handleSubmit(range[0], spot.id)}
        >
          Reserve
        </button>
        {/* <button className="bookings_button">Check Availability</button> */}
      </div>
    </div>
  );
}
