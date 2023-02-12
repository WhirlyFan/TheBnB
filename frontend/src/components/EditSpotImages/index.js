import React, { useEffect, useState } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSpotPreviewImageThunk } from "../../store/spotImages";
import "./EditSpotImages.css";

export default function EditSpotImages() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.SpotDetails);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  //   const [hasClicked, setHasClicked] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(spotsActions.getSpotDetailsThunk(spotId))
      .then((res) => {
        setPreviewImage(res.SpotImages.find((image) => image.preview).url);
        setImages(res.SpotImages.filter((image) => !image.preview));
        setIsLoaded(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) history.push("/");
      });
  }, [dispatch, spotId, user, history]);

  if (!spot || !isLoaded) return null;

  const editPreviewImage = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      editSpotPreviewImageThunk({ url: previewImage }, spotId)
    );
    if (data) {
      setPreviewImage(data.url);
      alert("Preview image has been updated.");
    } else {
      setPreviewImage("");
    }
  };

  return (
    <div className="edit-spot-images-container">
      <div className="edit-preview-image">
        <h1>Edit Spot Images</h1>
        <form onSubmit={editPreviewImage}>
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
                <div className="spot-image-container-1">
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
                      onClick={() => setPreviewImage("")}
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
