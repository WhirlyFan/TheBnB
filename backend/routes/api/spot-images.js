const express = require("express");
const router = express.Router();

const { Spot, SpotImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

//authenticate user owns id
const requireAuthor = async function (req, _res, next) {
  const spotId = await SpotImage.findByPk(req.params.imageId, {
    attributes: ["spotId"],
  });
  if (spotId) {
    const userId = await Spot.findByPk(spotId.toJSON().spotId, {
      attributes: ["ownerId"],
    });
    if (req.user.id === userId.toJSON().ownerId) return next();
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

//delete a spot image
router.delete("/:imageId", requireAuth, requireAuthor, async (req, res) => {
  const image = await SpotImage.findByPk(req.params.imageId);
  image.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: res.statusCode,
  });
});

module.exports = router;
