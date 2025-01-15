const express = require("express");
const connectDB = require("./config/db");
const router = require("./routes/UserRoute");
const cors = require("cors")
require("dotenv").config();

const app = express();

app.use(
    cors({
      origin: "http://localhost:3000", 
      credentials: true,
    })
  );
app.use(express.json());
app.use("/api/auth", router); 

connectDB();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
