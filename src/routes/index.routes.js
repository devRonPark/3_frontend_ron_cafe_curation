const express = require('express');
const path = require('path');
const indexRouter = express.Router();

indexRouter.get('/main', (req, res) => {
  return res.sendFile(path.resolve('public/html/main.html'));
});

module.exports = indexRouter;
