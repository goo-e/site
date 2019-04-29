const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PrefsSchema = new Schema({
  prefsArr: {
    type: Array,
    required: true
  }
});

const Prefs = mongoose.model("Prefs", PrefsSchema);

module.exports = Prefs;
