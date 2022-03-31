import { Router } from 'express';
import path from 'path';
const indexRouter = Router();

indexRouter.get('/', (req, res) => {
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

export default indexRouter;
