const express = require("express");
const path = require("path");
var morgan = require('morgan');
const { databaseCRUD } = require("./routes/databaseCRUD");

module.exports = (app) => {
  app.use(morgan(':method :url :status  -:response-time ms'))
  app.use(express.json())
  app.use("/files", express.static(path.join(__dirname, "../")))

  databaseCRUD(app);
  app.get("/", (req, res) => res.status(200).send("Welcome to APOD api V1 (mint)."))
  // error handling
}
