const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;


//middlewares
app.use(express.json());
app.use(cookieParser());
//!------------cors are very important dhyan se use karo 
app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
// ------> database connect
database.connect();

// -----> cloudinary connect
cloudinaryConnect();


//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);



// default routes
app.get("/",(req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running..."
    })
})

// activate the server
app.listen(PORT, () => {
    console.log("App  is running on port " + PORT);
})