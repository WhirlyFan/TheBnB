import React, { useEffect, useState } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSpotPreviewImageThunk } from "../../store/spotImages";
import "./EditSpotImages.css";
import {
  deleteSpotImageThunk,
  createSpotImageThunk,
} from "../../store/spotImages";

export default function EditSpotImages() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.SpotDetails);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  //   const [hasClicked, setHasClicked] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [newImage, setNewImage] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [otherErrors, setOtherErrors] = useState([]);

  useEffect(() => {
    dispatch(spotsActions.getSpotDetailsThunk(spotId))
      .then((res) => {
        setPreviewImage(res.SpotImages.find((image) => image.preview).url);
        setImages(res.SpotImages.filter((image) => !image.preview));
        setIsLoaded(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }, [dispatch, spotId, user, history]);

  if (!spot || !isLoaded) return null;

  const editPreviewImage = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(editSpotPreviewImageThunk({ url: previewImage }, spotId))
      .then((data) => {
        if (data) {
          setPreviewImage(data.url);
          alert("Preview image has been updated.");
        } else {
          setPreviewImage("");
        }
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const deleteImage = (imageId) => {
    setOtherErrors([]);
    if (window.confirm("Are you sure you want to delete this image?")) {
    }
    dispatch(deleteSpotImageThunk(imageId))
      .then(() => {
        setImages(images.filter((image) => image.id !== imageId));
        alert("Image has been deleted.");
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) otherErrors(data.errors);
      });
  };

  const addImage = (e) => {
    e.preventDefault();
    setOtherErrors([]);
    dispatch(createSpotImageThunk({ url: newImage }, spotId))
      .then((data) => {
        if (data) {
          setImages([...images, data]);
          setNewImage("");
          alert("Image has been added.");
        } else {
          setNewImage("");
        }
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setOtherErrors(data.errors);
      });
  };

  return (
    <div className="edit-spot-images-container">
      <div className="edit-preview-image">
        <h1>Edit Spot Images</h1>
        <form onSubmit={editPreviewImage} className="form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx} className="error">
                {error}
              </li>
            ))}
          </ul>
          <div>
            <label>Preview Image</label>
            <input
              type="url"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              placeholder="https://www.imageurl.com/image.jpg"
              required
              className="edit-spot-images-input"
            />
          </div>
          <button type="submit" className="button">
            Save
          </button>
          <div className="spot-image-container-1">
            {previewImage.length > 0 && (
              <div className="spot-image-container-2">
                <img
                  src={previewImage}
                  alt="preview"
                  className="edit-spot-image"
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
        </form>
      </div>
      <div className="edit-preview-image">
        <form onSubmit={addImage} className="form">
          <ul>
            {otherErrors.map((error, idx) => (
              <li key={idx} className="error">
                {error}
              </li>
            ))}
          </ul>
          <label>{"Add Additional Images (max: 4)"}</label>
          <input
            type="url"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="https://www.imageurl.com/image.jpg"
            required
            className="edit-spot-images-input"
          />
          <button type="submit" className="button">
            Save
          </button>
        </form>
      </div>
      <h2>Spot Images</h2>
      <div className="edit-spot-images">
        {images.length > 0 && (
          <div className="edit-spot-images">
            {images.map((image) => {
              return (
                <div
                  key={`image-${image.id}`}
                  className="spot-image-container-1"
                >
                  <div className="spot-image-container-2">
                    <img
                      src={image.url}
                      alt="preview"
                      className="edit-spot-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
                      }}
                    />
                    <i
                      className={`fas fa-remove fa-lg remove-icon`}
                      onClick={() => deleteImage(image.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
