const express = require('express');
const path = require('path');
const indexRouter = express.Router();

// TODO 로그인하지 않은 사용자가 접근 가능한 페이지인지 라우팅 처리 필요
indexRouter.get('/main', (req, res) => {
  return res.sendFile(path.resolve('public/html/main.html'));
});
indexRouter.get('/account/login', (req, res) => {
  return res.sendFile(path.resolve('public/html/login.html'));
});
indexRouter.get('/account/register', (req, res) => {
  return res.sendFile(path.resolve('public/html/register.html'));
});
indexRouter.get('/account/find-email', (req, res) => {
  return res.sendFile(path.resolve('public/html/findEmail.html'));
});
indexRouter.get('/account/find-password', (req, res) => {
  return res.sendFile(path.resolve('public/html/findPassword.html'));
});

module.exports = indexRouter;
