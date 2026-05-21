const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));

const itemRoutes = require("./routes/itemRoutes");

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("MongoDB Connected");

})

.catch((err) => {

  console.log(err);

});

app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {

  res.send("API Running");

});

const PORT = 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});