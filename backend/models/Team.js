const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: String,
    designation: String,
    city: String,
    image: String
});

module.exports = mongoose.model("Team", teamSchema);