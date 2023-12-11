const mongoose = require("mongoose");
const mongodb = mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });
