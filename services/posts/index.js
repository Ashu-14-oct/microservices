require('dotenv').config();
const express = require("express");
const PORT = process.env.PORT || 8001;
const mongodb = require('./config/mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", require('./routes/index'));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
