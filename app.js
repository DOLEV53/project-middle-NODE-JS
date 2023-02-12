const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./Routes/userRoute");
const cardRoute = require("./Routes/cardRoute");
const cookieParser = require("cookie-parser");
const port = 3000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/cards", cardRoute);

// connecting to database in mongo db compass
mongoose
  .connect("mongodb://localhost/REST_API", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB"));

http.listen(port, () => console.log(`Listening on port ${port}`));
