const userRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const config = require("config");

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //see if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //create new instance of User if doesn't already exist
      user = new User({
        name,
        email,
        password
      });

      //encrypt password with bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      //now save user to db with hashed password
      await user.save();

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

userRouter.put("/", (req, res) => {
  const { id, params } = req.body;

  User.findByIdAndUpdate(id, { prefs: params }, { new: true }, (err, user) => {
    // Handle any possible database errors
    if (err) return res.status(500).send(err);
    return res.send(user);
  });
});

module.exports = userRouter;
