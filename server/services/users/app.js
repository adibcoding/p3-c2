const cors = require("cors");
const express = require("express");
const router = require("./routers/user");
const { mongoConnect } = require("./config/mongoConnection");
const errorHandling = require("./middlewares/errorHandling");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", router);

(async () => {
  try {
    await mongoConnect();
    app.use(errorHandling);
    app.listen(PORT, (_) => console.log(`Apps is listening at PORT ${PORT}`));
  } catch (err) {
    console.log(`Failed to connect to mongodb`);
  }
})();
