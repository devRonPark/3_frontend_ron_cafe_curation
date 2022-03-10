const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const favicon = require('serve-favicon');
const path = require('path');

const indexRouter = require('./src/routes/index.routes');

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('req: ', req);
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
