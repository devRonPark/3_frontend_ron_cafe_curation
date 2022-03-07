const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

const indexRouter = require("./src/routes/index.routes");

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
