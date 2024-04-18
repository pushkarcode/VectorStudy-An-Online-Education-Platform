const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  timeDuration: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  videoUrl: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("subSection", subSectionSchema);
