require("dotenv").config();
const express = require("express");
const app = express();
const { sequelize } = require("./models");
const cors = require("cors");

const port = process.env.APP_PORT;
const userRoute = require("./routes");

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRoute);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
