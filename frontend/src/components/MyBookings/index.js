import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserBookingsThunk,
  deleteBookingThunk,
  editBookingThunk,
} from "../../store/bookings";
import "./MyBookings.css";
import { formatDate } from "../Bookings/index";
import SpotCard from "../SpotCard";
import EditBookingsModal from "../EditBookingsModal";

export default function Trips() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.booking?.Bookings);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  //change backend route to include user information
  useEffect(() => {
    dispatch(getUserBookingsThunk(user.id)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, user.id, hasClicked]);

  if (!isLoaded) {
    return null;
  }

  const clickEdit = (booking) => {
    if (window.confirm("Are you sure you want to edit this booking?")) {
      // dispatch(editBookingThunk(booking.id)).then(() => {
      //   setHasClicked(!hasClicked);
      // });
    }
  };

  const clickDelete = (booking) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      dispatch(deleteBookingThunk(booking.id)).then(() => {
        setHasClicked(!hasClicked);
      });
    }
  };

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
                <EditBookingsModal booking={booking} />
                {/* <button
                  className="button"
                  onClick={() => {
                    clickEdit(booking);
                  }}
                >
                  Edit
                </button> */}
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
