require("dotenv").config();
console.log("DB URL:", process.env.MONGODB_URL);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./db/mongoose");
const app = express();
const horseRouter = require("./routes/horse");
const userRouter = require("./routes/user");
const bookingRouter = require("./routes/booking");
app.use(express.json()); //must be before routes
app.use(cors());
app.use(horseRouter);
app.use(bookingRouter);
app.use(userRouter);
console.log("My Secret is:", process.env.JWT_SECRET);

app.listen(3000, () => {
  console.log("listening to port 3000");
});

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB: ", mongoose.connection.name);
});
