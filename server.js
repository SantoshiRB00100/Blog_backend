const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const path = require("path");
const fs = require("fs");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("Blog API Running");
});

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});