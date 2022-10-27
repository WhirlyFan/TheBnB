const express = require("express");
const router = express.Router();

const { Spot, SpotImage, User, Review, Sequelize } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
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

//GET all spots
router.get("/", async (req, res) => {
  const spotsList = await Spot.findAll();
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
  const reviewsList = await Review.findAll({
    where: { spotId: req.params.spotId },
  });
  let Reviews = [];
  if (reviewsList.length) {
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
  } else {
    const err = new Error("Couldn't find a Spot with the specified id");
    err.title = "Couldn't find a Spot with the specified id";
    err.errors = ["Spot couldn't be found"];
    err.status = 404;
    return next(err);
  }
  return res.json({ Reviews });
});

//GET spot by id
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
  const spotImage = await SpotImage.create({
    spotId,
    url,
    preview,
  });
  return res.json(spotImage);
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

module.exports = router;
