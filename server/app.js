const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./database"); // Update path if necessary
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth"); // Import auth route

app.use(express.json()); // Parse incoming JSON requests
app.use(cors());
app.use(bodyParser.json());
app.use("/api", authRoutes); // Register the authentication routes

sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => console.error("Error creating database tables:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
