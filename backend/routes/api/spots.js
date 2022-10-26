const express = require("express");
const router = express.Router();

const { Spot } = require("../../db/models");

router.use("/", async (req, res) => {
  const Spots = await Spot.findAll();
  console.log(Spots.id);
  //   const avgRating = await Spot.findAll({where: {ownerId: Spots.id}})
  //   const previewImage = await
  res.json({
    Spots,
    // avgRating,
    // previewImage
  });
});

module.exports = router;
