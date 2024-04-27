// * big things are happing in few days
const express = require("express");
const db = require("./config/database");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require("express-fileupload");
require("dotenv").config();
const cloudinary = require("./config/cloudinary");



const app = express();
// port find out
const PORT = process.env.PORT || 5000;

//Database Connection
db.connect();

//middleswares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:"http://localhost:3000",
    credentials: true,
  })
);
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

//connect with cloude
cloudinary.cloudinaryConnect();

// api route mount
const courseRoutes = require("./routes/Course");
const paymentsRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const userRoutes = require("./routes/User");

app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/payment", paymentsRoutes)


//activate server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


//! default route
app.get("/", () => {
    return res.json({
      success: true,
      message: "Welcome to Vector Study Platform",
    })
})