import Calendar from "./Calendar";

export default function Bookings({ spot }) {
  let rating = spot.avgStarRating;
  rating = parseFloat(rating).toFixed(1);
  return (
    <div className="bookings">
      <div className="bookings_header">
        <div>${spot.price}5 night</div>
        <div>
          ★{rating} · {spot.numReviews} reviews
        </div>
      </div>
      <Calendar />
      <div className="bookings_button_container">
        <button className="bookings_button">Check Availability</button>
      </div>
    </div>
  );
}
