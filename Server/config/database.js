const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {})
    .then(() => {
      console.log("database connection established Golu");
    })
    .catch((err) => {
      console.log("database connection error: " + err);
      process.exit(1);
    });
};


