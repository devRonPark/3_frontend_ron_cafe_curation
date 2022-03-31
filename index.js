import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import indexRouter from './src/routes/index.routes.js';

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve();

// TODO 내가 허용한 폴더만 접근 가능하도록 public/html 로 변경
app.use(express.static(__dirname + '/public/html'));
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
