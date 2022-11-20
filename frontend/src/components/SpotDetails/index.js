import React, { useEffect, useState } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/review";
import "./SpotDetails.css";

export default function SpotDetails() {
  const spot = useSelector((state) => state.spots.SpotDetails);
  const reviews = useSelector((state) => state.review.Reviews);
  const user = useSelector((state) => state.session.user);
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    dispatch(spotsActions.getSpotDetailsThunk(spotId))
      .then(() => {
        dispatch(reviewActions.getSpotReviewsThunk(spotId));
      })
      .then(() => {
        setIsLoaded(true);
        setReview("");
        setStars("");
      });
  }, [dispatch, spotId, hasClicked, user]);

  if (!spot) return null;
  if (!isLoaded) return null;

  const clickEdit = (review, spotId) => {
    history.push(`/spots/${spotId}/reviews/${review.id}/edit`);
  };
  const clickDelete = (reviewId) => {
    dispatch(reviewActions.deleteSpotReviewThunk(reviewId)).then(() => {
      setHasClicked(!hasClicked);
    });
  };

  // const validate = () => {
  //   setErrors([])
  //   const newErrors = [];
  //   if (firstName.length > 20 || firstName.length < 3) {
  //     newErrors.push("First name must be 3-20 characters long.");
  //   }
  //   if (lastName.length > 20 || lastName.length < 3) {
  //     newErrors.push("Last name must be 3-20 characters long.");
  //   }
  //   if (password !== confirmPassword) {
  //     newErrors.push(
  //       "Confirm Password field must be the same as the Password field."
  //     );
  //   }
  //   setErrors(newErrors);
  //   if (errors.length) return true;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
        // let errorHandler = validate();
    // if (errorHandler) return console.log('pass');
    // return console.log('fail')
    setErrors([]);
    dispatch(
      reviewActions.createReviewThunk(
        {
          review,
          stars,
        },
        spot.id
      )
    )
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
      .then(() => {
        setHasClicked(!hasClicked);
      });
  };

  let rating = spot.avgStarRating;
  rating = parseFloat(rating).toFixed(1);

  return (
    <div className="spot-details">
      <div className="spot-info">
        <h1>{spot.name}</h1>
        <div className="reviews-address">
          <span>
            ★{!isNaN(rating) ? rating : "No Reviews"} · {spot.numReviews}{" "}
            reviews · {spot.address}
          </span>
          {/* <div className="share-save">
          <span>Share</span>
          <span>Save</span>
        </div> */}
        </div>
        <div>
          <div className="preview">
            <img src={spot.SpotImages[0].url} alt="spot-preview"></img>
          </div>
          {/* {spot.SpotImages.map((spot) => {
          return (
            <img
              key={`spot-${spot.id}`}
              className="spot-details-images"
              src={spot.url}
              alt={`spot-${spot.id}`}
            ></img>
          );
        })} */}
        </div>
        <h2>Spot hosted by {spot.Owner.firstName}</h2>
        <hr></hr>
        <div>
          <img
            className="air-cover"
            src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
            alt="aircover"
          ></img>
          <p>
            Every booking includes free protection from Host cancellations,
            listing inaccuracies, and other issues like trouble checking in.
          </p>
        </div>
        <hr></hr>
        <p>{spot.description}</p>
        <hr></hr>

        <div className="spot-reviews">
          {reviews && Object.values(reviews).length > 0 ? (
            <>
              <h2>Reviews</h2>
              <ul>
                {Object.values(reviews).map((review) => {
                  return (
                    <div className={"review"} key={`review-${review.id}`}>
                      <div>
                        {review.User.firstName}{" "}
                        {review.User.lastName.slice(0, 1)}
                      </div>
                      <li>{review.review}</li>
                      {user && user.id === review.userId && (
                        <div className={"my-buttons"}>
                          <button
                            className="button"
                            onClick={() => {
                              clickEdit(review, spot.id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="button"
                            onClick={() => {
                              clickDelete(review.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </ul>
            </>
          ) : (
            <h2>No Reviews</h2>
          )}
          {user && (
            <form className="add-review" onSubmit={handleSubmit}>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <label>Review</label>
              <textarea
                type="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                placeholder="How was your stay?"
              />
              <label>Stars</label>
              <input
                type="number"
                min="1"
                max="5"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                required
                placeholder="Rate your stay from 1-5 stars!"
              />
              <button className="button" type="submit">
                Add Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
