require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const paymentRoutes =require("./routes/paymentRoutes");

const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const registrationRoutes =require("./routes/registrationRoutes");
const attendanceRoutes =require("./routes/attendanceRoutes");
const app = express();
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/events", eventRoutes);
app.use("/users", userRoutes);
app.use( "/registrations",registrationRoutes);
app.use("/attendance",attendanceRoutes);
app.use("/payments",paymentRoutes);
app.use("/frontend", express.static(path.join(__dirname, "../frontend") ));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀Server running on port ${PORT}`); 
});