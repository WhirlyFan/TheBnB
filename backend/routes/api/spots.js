const express = require("express");
const router = express.Router();

const {
  Spot,
  SpotImage,
  User,
  Review,
  Booking,
  Sequelize,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required")
    .isLength({ min: 0 })
    .isLength({ max: 255 })
    .withMessage("Address must be 255 characters or less"),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("City is required")
    .isLength({ min: 0 })
    .isLength({ max: 255 })
    .withMessage("City name must be 255 characters or less"),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("State is required")
    .isLength({ min: 0 })
    .isLength({ max: 255 })
    .withMessage("City name must be 255 characters or less"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid")
    .isLength({ min: 0 })
    .isLength({ max: 255 })
    .withMessage("Latitude must be 255 characters or less"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid")
    .isLength({ min: 0 })
    .isLength({ max: 255 })
    .withMessage("Longitude must be 255 characters or less"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required")
    .isLength({ min: 0 })
    .isLength({ max: 255 })
    .withMessage("Description must be 255 characters or less"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

const requireAuthor = async function (req, _res, next) {
  const ownerId = await Spot.findByPk(req.params.spotId, {
    attributes: ["ownerId"],
  });
  if (ownerId) {
    if (req.user.id === ownerId.toJSON().ownerId) return next();
    else {
      const err = new Error("Forbidden");
      err.errors = ["Forbidden"];
      err.status = 403;
      return next(err);
    }
  } else {
    const err = new Error("Couldn't find a Spot with the specified id");
    err.title = "Couldn't find a Spot with the specified id";
    err.errors = ["Spot couldn't be found"];
    err.status = 404;
    return next(err);
  }
};

const notOwner = async function (req, _res, next) {
  const ownerId = await Spot.findByPk(req.params.spotId, {
    attributes: ["ownerId"],
  });
  if (ownerId) {
    if (req.user.id !== ownerId.toJSON().ownerId) return next();
    else {
      const err = new Error("Forbidden");
      err.errors = ["Forbidden"];
      err.status = 403;
      return next(err);
    }
  } else {
    const err = new Error("Couldn't find a Spot with the specified id");
    err.title = "Couldn't find a Spot with the specified id";
    err.errors = ["Spot couldn't be found"];
    err.status = 404;
    return next(err);
  }
};

//GET all spots
router.get("/", async (req, res, next) => {
  //pagination
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  page = parseInt(page);
  size = parseInt(size);

  if (isNaN(page)) page = 1;
  if (isNaN(size)) size = 20;

  let pagination = {};
  pagination.limit = size;
  pagination.offset = size * (page - 1);

  const err = new Error("Query parameter validation errors");
  err.title = "Query parameter validation errors";
  err.errors = [];
  err.status = 400;

  whereObj = {};

  if (minLat) {
    console.log(minLat);
    console.log(parseFloat(minLat) - ~~minLat);
    if (parseFloat(minLat) - ~~minLat) {
      whereObj.lat = { [Op.gte]: minLat };
    } else {
      err.errors.push("Minimum latitude is invalid");
    }
  }

  if (maxLat) {
    if (parseFloat(maxLat) - ~~maxLat) {
      whereObj.lat = { [Op.lte]: maxLat };
    } else {
      err.errors.push("Maximum latitude is invalid");
    }
  }

  if (minLng) {
    console.log(minLng);
    console.log(parseFloat(minLng) - ~~minLng);
    if (parseFloat(minLng) - ~~minLng) {
      whereObj.lng = { [Op.gte]: minLng };
    } else {
      err.errors.push("Minimum latitude is invalid");
    }
  }

  if (maxLng) {
    if (parseFloat(maxLng) - ~~maxLng) {
      whereObj.lng = { [Op.lte]: maxLng };
    } else {
      err.errors.push("Maximum latitude is invalid");
    }
  }

  if (minPrice) {
    if (parseFloat(minPrice) - ~~minPrice || parseFloat(minPrice) === 0) {
      //fix this for when 100.00
      if (parseFloat(minPrice) >= 0) {
        whereObj.price = { [Op.gte]: minPrice };
      } else {
        err.errors.push("Minimum price must be greater than or equal to 0");
      }
    } else {
      err.errors.push("Minimum price is invalid");
    }
  }

  if (maxPrice) {
    if (parseFloat(maxPrice) - ~~maxPrice || parseFloat(maxPrice) === 0) {
      if (parseFloat(maxPrice) >= 0) {
        whereObj.price = { [Op.lte]: maxPrice };
      } else {
        err.errors.push("Maximum price must be greater than or equal to 0");
      }
    } else {
      err.errors.push("Maximum price is invalid");
    }
  }

  const spotsList = await Spot.findAll({
    where: whereObj,
    ...pagination,
  });
  const Spots = [];

  for (let i = 0; i < spotsList.length; i++) {
    let spot = spotsList[i];
    const review = await spot.getReviews({
      //aggregate function to find average of Stars column
      attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]],
    });
    spot = spot.toJSON();
    spot.avgRating = review[0].dataValues.avgRating;
    const previewImage = await SpotImage.findOne({
      where: { preview: true, spotId: spot.id },
    });
    spot.previewImage = previewImage ? previewImage.toJSON().url : null;
    Spots.push(spot);
  }
  if (err.errors.length) {
    return next(err);
  }
  return res.json({
    Spots,
    page,
    size,
  });
});

//GET spot of current user
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const spotsList = await Spot.findAll({ where: { ownerId: user.id } });
  const Spots = [];

  for (let i = 0; i < spotsList.length; i++) {
    let spot = spotsList[i];
    const review = await spot.getReviews({
      //aggregate function to find average of Stars column
      attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]],
    });
    spot = spot.toJSON();
    spot.getRating = review[0].dataValues.avgRating;
    const previewImage = await SpotImage.findOne({
      where: { preview: true, spotId: spot.id },
    });
    spot.previewImage = previewImage ? previewImage.toJSON().url : null;
    Spots.push(spot);
  }

  return res.json({
    Spots,
  });
});

//Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (spot) {
    let Reviews = [];
    const reviewsList = await Review.findAll({
      where: { spotId: req.params.spotId },
    });
    for (let i = 0; i < reviewsList.length; i++) {
      let review = reviewsList[i];

      let user = await review.getUser({
        attributes: { exclude: ["username"] },
      });

      let reviewImages = await review.getReviewImages({
        attributes: { exclude: ["reviewId", "createdAt", "updatedAt"] },
      });
      const ReviewImages = [];
      for (let i = 0; i < reviewImages.length; i++) {
        ReviewImages.push(reviewImages[i].toJSON());
      }
      review = review.toJSON();
      review.User = user.toJSON();
      review.ReviewImages = ReviewImages;
      Reviews.push(review);
    }
    return res.json({ Reviews });
  }
  const err = new Error("Couldn't find a Spot with the specified id");
  err.title = "Couldn't find a Spot with the specified id";
  err.errors = ["Spot couldn't be found"];
  err.status = 404;
  return next(err);
});

//Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, notOwner, async (req, res) => {
  const Bookings = await Booking.findAll({
    where: { spotId: req.params.spotId },
    attributes: ["spotId", "startDate", "endDate"],
  });
  return res.json({ Bookings });
});

//GET Details of Spot by Id
router.get("/:spotId", async (req, res, next) => {
  let spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const err = new Error("Couldn't find a Spot with the specified id");
    err.title = "Couldn't find a Spot with the specified id";
    err.errors = ["Spot couldn't be found"];
    err.status = 404;
    return next(err);
  }
  const avgStarRating = await spot.getReviews({
    //aggregate function to find average of Stars column
    attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]],
  });
  const numReviews = await spot.getReviews({
    attributes: [[Sequelize.fn("COUNT", Sequelize.col("stars")), "numReviews"]],
  });

  spot = spot.toJSON();
  spot.numReviews = numReviews[0].dataValues.numReviews;
  spot.avgStarRating = avgStarRating[0].dataValues.avgRating;

  spot.SpotImages = await SpotImage.findAll({
    where: { spotId: req.params.spotId },
    attributes: ["id", "url", "preview"],
  });

  spot.Owner = await User.findByPk(spot.ownerId, {
    attributes: { exclude: ["username"] },
  });

  return res.json(spot);
});

//Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, async (req, res, next) => {
  const { id } = req.user;
  const { review, stars } = req.body;
  let { spotId } = req.params;
  if (!isNaN(spotId)) spotId = Number(spotId);

  const spot = await Spot.findByPk(spotId);

  if (review.length > 255) {
    const err = new Error("Review too long");
    err.title = "Review too long";
    err.errors = ["Review must be 255 characters or less"];
    err.status = 403;
    return next(err);
  }

  if (!spot) {
    const err = new Error("Couldn't find a Spot with the specified id");
    err.title = "Couldn't find a Spot with the specified id";
    err.errors = ["Spot couldn't be found"];
    err.status = 404;
    return next(err);
  }

  const reviews = await spot.getReviews({ where: { userId: id } });

  if (reviews.length) {
    const err = new Error(
      "Review from the current user already exists for the Spot"
    );
    err.title = "User already has a review for this spot";
    err.errors = ["User already has a review for this spot"];
    err.status = 403;
    return next(err);
  }

  const newReview = await Review.create({
    spotId,
    userId: id,
    review,
    stars,
  });
  return res.status(201).json(newReview);
});

//Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", requireAuthor, requireAuth, async (req, res) => {
  const { url, preview } = req.body;
  const { spotId } = req.params;

  if (url.length > 255) {
    const err = new Error("Image URL too long");
    err.title = "Image URL too long";
    err.errors = ["Image URL must be 255 characters or less"];
    err.status = 403;
    return next(err);
  }

  const spotImage = await SpotImage.create({
    spotId,
    url,
    preview,
  });
  const image = spotImage.toJSON();
  return res.json({
    id: image.id,
    url: image.url,
    preview: image.preview,
  });
});

//POST a spot
router.post("/", validateSpot, requireAuth, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const newSpot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  return res.status(201).json(newSpot);
});

//Create a Booking from a Spot based on the Spot's id
router.post(
  "/:spotId/bookings",
  requireAuth,
  notOwner,
  async (req, res, next) => {
    const { startDate, endDate } = req.body;
    let newStartTime = new Date(startDate);
    newStartTime = new Date(newStartTime.toDateString()).getTime(); // get rid of hr/min/sec later
    let newEndTime = new Date(endDate);
    newEndTime = new Date(newEndTime.toDateString()).getTime();
    let { spotId } = req.params;
    if (!isNaN(spotId)) spotId = Number(spotId);

    if (newEndTime <= newStartTime) {
      const err = new Error("Validation error");
      err.title = "Validation error";
      err.errors = ["End date cannot be on or before start date"];
      err.status = 400;
      return next(err);
    }

    const bookings = await Booking.findAll({
      attributes: ["startDate", "endDate"],
    });
    for (let i = 0; i < bookings.length; i++) {
      let booking = bookings[i];

      let { startDate, endDate } = booking;
      startDate = new Date(startDate.toDateString()).getTime();
      endDate = new Date(endDate.toDateString()).getTime();

      if (newStartTime >= startDate && newStartTime <= endDate) {
        const err = new Error(
          "Sorry, this spot is already booked for the specified dates"
        );
        err.title = " Booking conflict";
        err.errors = ["Start date conflicts with an existing booking"];
        err.status = 403;
        return next(err);
      }

      if (newEndTime >= startDate && newEndTime <= endDate) {
        const err = new Error(
          "Sorry, this spot is already booked for the specified dates"
        );
        err.title = " Booking conflict";
        err.errors = ["End date conflicts with an existing booking"];
        err.status = 403;
        return next(err);
      }
    }

    const booking = await Booking.create({
      spotId,
      userId: req.user.id,
      startDate,
      endDate,
    });
    return res.json(booking);
  }
);

//edit a spot
router.put(
  "/:spotId",
  requireAuth,
  requireAuthor,
  validateSpot,
  async (req, res) => {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    spot.set({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    await spot.save();
    return res.json(spot);
  }
);

//Delete a Spot
router.delete("/:spotId", requireAuth, requireAuthor, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  spot.destroy();
  return res.json({
    message: "Successfully deleted",
    statusCode: res.statusCode,
  });
});

module.exports = router;
