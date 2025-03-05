const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./connectionHelper/db");
const customerRoutes = require("./routes/customerRoutes");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));