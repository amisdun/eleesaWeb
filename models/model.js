const mongoose = require("mongoose");
const schema = mongoose.Schema({
    programVal: Number,
    levelVal : Number,
    semVal : Number
});

const model = mongoose.model("searchedCourses", schema);

module.exports = model;

