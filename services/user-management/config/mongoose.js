require("dotenv").config();
const mongoose = require("mongoose");

console.log(process.env.MONGO_DB);
const mongodb = mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

  module.exports = mongodb;
