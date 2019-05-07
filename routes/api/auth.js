const authRouter = require("express").Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

//@route   GET api/auth
//@desc    Test route

authRouter.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route   POST api/auth
//@desc    Authenticate user and get token
//@access  Public
authRouter.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.send({ error: "invalid credentials" });
      }

      //check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.send({ error: "invalid credentials" });
      }
      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = authRouter;
