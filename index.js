const express = require("express");
const PORT = 8000;
const proxy = require("express-http-proxy");
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res)=>{
  res.redirect('https://documenter.getpostman.com/view/25241279/2s9Ykj9i9V');
});
app.use("/posts", proxy("http://localhost:8001"));
app.use("/comments", proxy("http://localhost:8002"));
app.use("/user", proxy("http://localhost:8003"));

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
