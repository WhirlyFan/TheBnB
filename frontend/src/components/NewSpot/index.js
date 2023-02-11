import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as spotsActions from "../../store/spots";
import "./NewSpot.css";

export default function NewSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  // const spotsObj = useSelector((state) => state.spots);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      spotsActions.createASpotThunk(
        {
          address,
          city,
          state,
          country,
          lat,
          lng,
          name,
          description,
          price,
        },
        { url: previewImage, preview: true }
      )
    )
      .then((res) => {
        history.push(`/spots/${res.id}`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  if (!sessionUser) return <Redirect to={"/"} />;

  return (
    <div className="form-div">
      <form className="form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="error">
              {error}
            </li>
          ))}
        </ul>
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          placeholder="123 Disney Lane"
        />
        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          placeholder="San Francisco"
        />
        <label>State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          placeholder="California"
        />
        <label>Country</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          placeholder="United States of America"
        />
        <label>Latitude</label>
        <input
          type="number"
          step="any"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
          placeholder="37.7645358"
        />
        <label>Longitude</label>
        <input
          type="number"
          step="any"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
          placeholder="-122.4730327"
        />
        <label>Name of location</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="App Academy"
        />
        <label>Description</label>
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Place where web developers are created"
        />
        <label>Price for a night</label>
        <input
          type="number"
          min="0"
          max="1000000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          placeholder="123"
        />
        <label>Preview Image Url</label>
        <input
          type="url"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          required
          placeholder="https://www.imageurl.com/image.jpg"
        />
        <div className="preview-image-container-1">
          {previewImage.length > 0 && (
            <div className="preview-image-container-2">
              <img
                src={previewImage}
                alt="preview"
                className="preview-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
                }}
              />
              <i
                className={`fas fa-remove fa-lg remove-icon`}
                onClick={() => setPreviewImage("")}
              ></i>
            </div>
          )}
        </div>
        {/* <label>Other Image Urls</label>
        <input type="url" placeholder="https://www.imageurl.com/image.jpg" /> */}
        <button className="button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
