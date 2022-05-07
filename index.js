import express from 'express';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import path from 'path';
import indexRouter from './src/routes/index.routes.js';

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve();

app.use(
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser('ABCD1234EFGH!@'),
);
// TODO 내가 허용한 폴더만 접근 가능하도록 public/html 로 변경
// 중요한 코드는 public에서 빼서 다른 데에다가 위치하고, 공개할 꺼만 public에만 놓아라.
// css, js는 public 아님.
// img, fonts, html만 public에 위치.
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // const err = new Error('Not Found');
  // err.status = 404;
  // next(err);
  return res.sendFile(path.resolve('public/html/notFound.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
