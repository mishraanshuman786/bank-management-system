const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// app.get("/",(req,res) => {
//     res.send("hi bruh")
// })

app.use(express.json());
app.use(cors());
const userRoute = require("./routes/userData");
app.use("/api", userRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => console.log(`PORT is running at ${PORT}`));
