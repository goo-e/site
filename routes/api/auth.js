const express = require("express");
const authRouter = express.Router();

//@route   GET api/auth

authRouter.get("/", (req, res) => res.send("Auth route"));

module.exports = authRouter;
