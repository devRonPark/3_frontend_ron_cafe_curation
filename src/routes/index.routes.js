const express = require("express");
const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  return res.send("Hello World!");
});

module.exports = indexRouter;
