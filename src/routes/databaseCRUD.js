const asyncMiddleware = require("../middlewares/asyncMiddleware");
const { getAllPost, updateToken, schedulerPost, schedulerUpdateToken } = require("../service.js/apodPost");

function databaseCRUD(app) {
  app.get("/api/v1/apod-posts", asyncMiddleware(getAllPost));
  app.post("/api/v1/update-token", asyncMiddleware(updateToken));
  app.get("/api/v1/scheduler-update-token", asyncMiddleware(schedulerUpdateToken));
  app.get("/api/v1/scheduler-post", asyncMiddleware(schedulerPost));
};

exports.databaseCRUD = databaseCRUD;