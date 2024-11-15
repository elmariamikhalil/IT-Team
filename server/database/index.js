require("dotenv").config(); // Load environment variables from .env

const { Sequelize } = require("sequelize");

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

// Export the sequelize instance
module.exports = sequelize;
