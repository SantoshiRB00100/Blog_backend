const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const fs = require("fs");
const https = require("https");

dotenv.config();
connectDB();

const app = express();

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

setInterval(() => {
  https.get("https://blog-backend-8aq5.onrender.com", (res) => {
    console.log("Keep-alive ping:", res.statusCode);
  });
}, 14 * 60 * 1000);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Blog API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});