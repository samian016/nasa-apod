const asyncMiddleware = require("../middlewares/asyncMiddleware");
const { getAllPost, updateToken } = require("../service.js/apodPost");

function databaseCRUD(app) {
  app.get("/api/v1/apod-posts", asyncMiddleware(getAllPost));
  app.post("/api/v1/update-token", asyncMiddleware(updateToken));
};

exports.databaseCRUD = databaseCRUD;