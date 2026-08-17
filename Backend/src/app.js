require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./db/mongoose");
const app = express();
const horseRouter = require("./routes/horse");
const userRouter = require("./routes/user");
const bookingRouter = require("./routes/booking");
const inquiryRouter = require("./routes/inquiry")
app.use(express.json()); //must be before routes

const corsOptions = {
  origin: [
    "https://alhessn-stables-frontend.vercel.app",
    "http://localhost:5173", // remove this line once you no longer need local frontend testing against prod
  ],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(horseRouter);
app.use(bookingRouter);
app.use(userRouter);
app.use(inquiryRouter);

const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`listening on port ${PORT}`);
   });
mongoose.connection.once("open", () => {
  console.log("connected to mongoDB: ", mongoose.connection.name);
});