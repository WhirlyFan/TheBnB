import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as spotsActions from "../../store/spots";

export default function NewSpot() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
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
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  if (!sessionUser) return <Redirect to={"/"} />;

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          placeholder="123 Disney Lane"
        />
      </label>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          placeholder="San Francisco"
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          placeholder="California"
        />
      </label>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          placeholder="United States of America"
        />
      </label>
      <label>
        Latitude
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
          placeholder="37.7645358"
        />
      </label>
      <label>
        Longitude
        <input
          type="text"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
          placeholder="-122.4730327"
        />
      </label>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="App Academy"
        />
      </label>
      <label>
        Description
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Place where web developers are created"
        />
      </label>
      <label>
        Price
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          placeholder="123"
        />
      </label>
      <label>
        Preview Image Url
        <input
          type="text"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          required
          placeholder="www.imageurl.com"
        />
      </label>

      <button type="submit">Create</button>
    </form>
  );
}
