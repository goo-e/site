const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();

//connect database
connectDB();

const routes = require("./routes");
const PORT = process.env.PORT || 3001;

//body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

app.listen(PORT, function() {
  console.log(`API server now listening on port ${PORT}`);
});
