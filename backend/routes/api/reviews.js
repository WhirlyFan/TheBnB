const express = require("express");
const router = express.Router();

const {
  User,
  Review,
  ReviewImage,
  SpotImage,
  Sequelize,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

const requireAuthor = async function (req, _res, next) {
  const userId = await Review.findByPk(req.params.reviewId, {
    attributes: ["userId"],
  });
  if (userId) {
    if (req.user.id === userId.toJSON().userId) return next();
    else {
      const err = new Error("Forbidden");
      err.errors = ["Forbidden"];
      err.status = 403;
      return next(err);
    }
  } else {
    const err = new Error("Couldn't find a Review with the specified id");
    err.title = "Couldn't find a Review with the specified id";
    err.errors = ["Review couldn't be found"];
    err.status = 404;
    return next(err);
  }
};

//Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const reviewList = await Review.findAll({ where: { userId } });
  const Reviews = [];
  for (let i = 0; i < reviewList.length; i++) {
    let review = reviewList[i];
    let user = await review.getUser({ attributes: { exclude: ["username"] } });
    let spot = await review.getSpot({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    spot = spot.toJSON();
    let previewImage = await SpotImage.findOne({
      where: { preview: true, spotId: spot.id },
    });
    spot.previewImage = previewImage ? previewImage.toJSON().url : null;
    let reviewImages = await review.getReviewImages({
      attributes: { exclude: ["reviewId", "createdAt", "updatedAt"] },
    });
    const ReviewImages = [];
    for (let i = 0; i < reviewImages.length; i++) {
      let image = reviewImages[i];
      image = image.toJSON();
      ReviewImages.push(image);
    }
    review = review.toJSON();
    review.User = user.toJSON();
    review.Spot = spot;
    review.ReviewImages = ReviewImages;
    Reviews.push(review);
  }

  return res.json({ Reviews });
});

//Add an Image to a Review based on the Review's id
router.post(
  "/:reviewId/images",
  requireAuth,
  requireAuthor,
  async (req, res, next) => {
    const { url } = req.body;
    let { reviewId } = req.params;
    if (!isNaN(reviewId)) reviewId = Number(reviewId);
    let review = await Review.findByPk(req.params.reviewId);
    let numReviewImages = await review.getReviewImages({
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("url")), "numReviewImages"],
      ],
    });
    numReviewImages = numReviewImages[0].toJSON().numReviewImages;
    if (numReviewImages < 10) {
      const image = await ReviewImage.create({
        reviewId,
        url,
      });

      return res.json({
        id: image.id,
        url: image.url,
      });
    } else {
      const err = new Error(
        "Maximum number of images for this resource was reached"
      );
      err.title = "Maximum number of images for this resource was reached";
      err.errors = [
        "Cannot add any more images because there is a maximum of 10 images per resource",
      ];
      err.status = 403;
      return next(err);
    }
  }
);

//Edit a Review
router.put(
  "/:reviewId", requireAuth, requireAuthor, validateReview,
  async (req, res) => {
    const { review, stars } = req.body;
    const update = await Review.findByPk(req.params.reviewId);
    update.set({
      review,
      stars,
    });
    await update.save();
    return res.json(update);
  }
);

//Delete a Review
router.delete("/:reviewId", requireAuth, requireAuthor, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);
  review.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: res.statusCode,
  });
});

module.exports = router;
