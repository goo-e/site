const express = require("express");
const userRouter = express.Router();
const { check, validationResult } = require("express-validator/check");

//@route   POST api/user
//@desc    Register user
//@access  Public

userRouter.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter password with 8 or more characters"
    ).isLength({ min: 8, max: 25 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("User route");
  }
);

module.exports = userRouter;
