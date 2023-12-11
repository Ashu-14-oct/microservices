require('dotenv').config();
const express = require("express");
const port = 8003;
const mongodb = require('./config/mongoose');

const app = express();


app.use(express.json());

app.use("/", require('./routes/index'));

app.listen(port, () => {
  console.log("server running on port 8003");
});
