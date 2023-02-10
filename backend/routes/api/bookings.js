const express = require("express");

const router = express.Router();

const { SpotImage, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const requireAuthor = async function (req, _res, next) {
  const userId = await Booking.findByPk(req.params.bookingId, {
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
    const err = new Error("Couldn't find a Booking with the specified id");
    err.title = "Couldn't find a Booking with the specified id";
    err.errors = ["Booking couldn't be found"];
    err.status = 404;
    return next(err);
  }
};

router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const bookings = await Booking.findAll({ where: { userId } });
  const Bookings = [];
  for (let i = 0; i < bookings.length; i++) {
    let booking = bookings[i];
    let spot = await booking.getSpot({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (spot) {
      spot = spot.toJSON();
      let previewImage = await SpotImage.findOne({
        where: { preview: true, spotId: spot.id },
      });
      spot.previewImage = previewImage ? previewImage.toJSON().url : null;
      booking = booking.toJSON();
      booking.Spot = spot;
      Bookings.push(booking);
    } else {
      Bookings.push(booking);
    }
  }
  return res.json({ Bookings });
});

router.put(
  "/:bookingId",
  requireAuth,
  requireAuthor,
  async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    let startDate = booking.dataValues.startDate.getTime();
    let endDate = booking.dataValues.endDate.getTime();
    let currentDate = new Date();
    currentDate = new Date(currentDate.toDateString()).getTime();

    if (!(currentDate > startDate && currentDate < endDate)) {
      const { startDate, endDate, guests } = req.body;
      const updatedBooking = await booking.update({
        startDate,
        endDate,
        guests,
      });
      return res.json(updatedBooking);
    } else {
      const err = new Error(
        "Bookings that have been started can't be modified"
      );
      err.title = "Bookings that have been started can't be modified";
      err.errors = ["Bookings that have been started can't be modified"];
      err.status = 403;
      return next(err);
    }
  }
);

//delete a booking
router.delete(
  "/:bookingId",
  requireAuth,
  requireAuthor,
  async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    let startDate = booking.dataValues.startDate.getTime();
    let endDate = booking.dataValues.endDate.getTime();
    let currentDate = new Date();
    currentDate = new Date(currentDate.toDateString()).getTime();

    if (!(currentDate > startDate && currentDate < endDate)) {
      booking.destroy();
      return res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode,
      });
    } else {
      const err = new Error("Bookings that have been started can't be deleted");
      err.title = "Bookings that have been started can't be deleted";
      err.errors = ["Bookings that have been started can't be deleted"];
      err.status = 403;
      return next(err);
    }
  }
);

module.exports = router;
