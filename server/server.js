const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// SHOW UPLOADED IMAGES
app.use("/uploads", express.static("uploads"));


// ROUTES
const itemRoutes = require("./routes/itemRoutes");

app.use("/api/items", itemRoutes);


// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI, {

    serverSelectionTimeoutMS: 5000

})
.then(() => {

    console.log("MongoDB Connected");

})
.catch((err) => {

    console.log("MongoDB Error:", err.message);

});


// HOME ROUTE
app.get("/", (req, res) => {

    res.send("Lost & Found API Running");

});


// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});