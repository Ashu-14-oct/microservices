const mongoose = require("mongoose");

const mongodb = mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("successfully connected to the data base");
  })
  .catch((err) => {
    console.log(err);
  });

  module.exports = mongodb;
