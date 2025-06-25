const express = require("express");
const connectDB = require("./src/config/database");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AuthRoute = require("./src/routes/auth.route");
const UserRoute = require("./src/routes/user.route");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);

connectDB()
  .then(() => {
    console.log("connected to database");
    app.listen(8000, () => {
      console.log("server is running on port 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
