const express = require("express");
const router = express.Router();

const { Spot, SpotImage, Sequelize } = require("../../db/models");
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

const requireAuthentication = async function (req, _res, next) {
  // console.log(req.params.spotId)
  const ownerId = await Spot.findByPk(req.params.spotId, {
    attributes: ["ownerId"],
  });
  if (req.user.id === ownerId.toJSON().ownerId) return next();

  const err = new Error("Unauthorized");
  err.title = "Unauthorized";
  err.errors = ["Unauthorized"];
  err.status = 401;
  return next(err);
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

  res.json({
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

  res.json({
    Spots,
  });
});

//GET spot of id
router.get("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const spotsList = await Spot.findAll({ where: { id: spotId } });
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
  res.json({
    Spots,
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
  res.status(201).json(newSpot);
});

//Add an Image to a Spot based on the Spot's id
router.post(
  "/:spotId/images",
  requireAuthentication,
  requireAuth,
  async (req, res) => {
    const { url, preview } = req.body;
    const { spotId } = req.params;
    // if (!spotId) {
    //   (res.statusCode = 404),
    //     res.json({
    //       message: "Spot couldn't be found",
    //       statusCode,
    //     });
    // }
    const spotImage = await SpotImage.create({
      spotId,
      url,
      preview,
    });
    res.json(spotImage);
  }
);

module.exports = router;
