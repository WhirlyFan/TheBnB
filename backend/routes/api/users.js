// backend/routes/api/users.js
const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email.")
    .isLength({ max: 255 })
    .withMessage("Email must be 255 characters or less."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .isLength({ max: 50 })
    .withMessage("Please provide a username with 4-50 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .isLength({ max: 255 })
    .withMessage("Password must be 6-255 characters"),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First name is required")
    .isLength({ min: 0 })
    .isLength({ max: 255 })
    .withMessage("First Name must be 255 characters or less."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last name is required")
    .isLength({ min: 0 })
    .isLength({ max: 255 })
    .withMessage("Last name must be 255 characters or less."),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res, next) => {
  const { email, password, username, firstName, lastName } = req.body;

  const validateEmail = await User.findOne({ where: { email } });
  if (validateEmail) {
    const err = Error("User already exists");
    err.errors = { email: "User with that email already exists" };
    err.status = 403;
    next(err);
  }

  const validateUsername = await User.findOne({ where: { username } });
  if (validateUsername) {
    const err = Error("User already exists");
    err.errors = { username: "User with that username already exists" };
    err.status = 403;
    next(err);
  }

  const user = await User.signup({
    email,
    username,
    password,
    firstName,
    lastName,
  });

  const token = await setTokenCookie(res, user);

  return res.json({
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password,
      token: token,
    },
  });
});

module.exports = router;
