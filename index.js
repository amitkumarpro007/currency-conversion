const express = require("express");
const process = require("process");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const routerService = require("./app/router/router");
const { errHandle } = require("./app/middlewares/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./app/swagger/swagger.json");
const { verifyDBConnection } = require("./app/database/databaseConnection");
const app = express();

// Load environment variable
dotenv.config({ path: path.join(process.cwd(), `.env`) });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

//swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var numOfRequest = 1;
app.use((req, res, next) => {
  req.startTime = Date.now();
  req.numOfRequest = numOfRequest;
  numOfRequest++;
  console.log("Hit : " + new Date(req.startTime) + " - " + req.originalUrl);
  next();
});

verifyDBConnection();

const port = process.env.PORT;
app.use("/api", routerService);

app.listen(port, () => {
  console.log(
    `Microservice ${process.env.SERVICE_NAME} is running on port ${port}.`
  );
});

app.get("/healthCheck", (req, res) => {
  res.send("successfully connnected");
});

app.use(errHandle);

module.exports = app; // Export app, not the server
