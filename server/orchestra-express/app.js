require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const errorHandling = require("./middlewares/errorHandling");
const port = process.env.PORT || 10000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandling);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
