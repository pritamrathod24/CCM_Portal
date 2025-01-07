const express = require("express");
const { mongoose } = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.DB_URL;
app.use(cors({ origin: "*" }));
mongoose.connect(url);

const con = mongoose.connection;
app.use(express.json());
app.use("/api", require("./routes/routes"));
app.get("/", async (req, res) => {
  res.send("Server running...");
});
con.on("open", () => {
  console.log("DB Connected");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// JEk3DgvQKLp30O77
// rathodprit555
