require('dotenv').config();
const express = require("express");
const mongodb = require('./config/mongoose');
const port = process.env.PORT || 8002;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", require('./routes/index'));

app.listen(port, () => {
  console.log("server running on port 8002");
});
