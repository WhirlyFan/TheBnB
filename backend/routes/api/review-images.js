const express = require("express");
const router = express.Router();

const { Review, ReviewImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

//authenticate user owns id
const requireAuthor = async function (req, _res, next) {
  const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
    attributes: ["reviewId"],
  });
  if (reviewImage) {
    const review = await Review.findByPk(reviewImage.toJSON().reviewId, {
      attributes: ["userId"],
    });
    console.log(review);
    if (req.user.id === review.toJSON().userId) return next();
    else {
      const err = new Error("Forbidden");
      err.errors = ["Forbidden"];
      err.status = 403;
      return next(err);
    }
  } else {
    const err = new Error("Couldn't find a Review Image with the specified id");
    err.title = "Couldn't find a Review Image with the specified id";
    err.errors = ["Review Image couldn't be found"];
    err.status = 404;
    return next(err);
  }
};

//delete a review image
router.delete("/:imageId", requireAuth, requireAuthor, async (req, res) => {
  const image = await ReviewImage.findByPk(req.params.imageId);
  image.destroy();
  return res.json({
    message: "Successfully deleted",
    statusCode: res.statusCode,
  });
});

module.exports = router;
