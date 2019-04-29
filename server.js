const express = require("express");
const app = express();

const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const dbName = "appDB";

app.use(express.urlencoded( { extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes);

mongoose.connect(process.env.MONGODV_URI || `mongodb://localhost/${dbName}`, { useNewUrlParser: true } );

app.listen(PORT, function() {
    console.log(`API server now listening on port ${PORT}`);
});