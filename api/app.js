"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const cors = require("cors"); //install cors

//Include sequelize in program by requiring the 'sequelize' module
const Sequelize = require("sequelize");
//Instantiate Sequelize by initializing a variable named sequelize to the Sequelize() constructor
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "fsjstd-restapi.db",
});
// use Sequelize authenticate function
// sync databse w/ async IIFE or Immediately Invoked Function Expression
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully");
    await sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();
app.use(express.json());
// setup morgan which gives us http request logging
app.use(morgan("dev"));
// Enable All CORS Requests
// configure CORS
app.use(cors());

// Add routes.
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

// setup a friendly greeting for the root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!",
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set("port", process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
