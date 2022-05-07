import { Router } from 'express';
import path from 'path';
import axios from 'axios';

const indexRouter = Router();

// 브라우저가 메인 페이지 접근 시,
indexRouter.get('/', (req, res) => {
  return res.sendFile(path.resolve('public/html/main.html'));
});
// 로그인 페이지
indexRouter.get('/account/login', (req, res) => {
  return res.sendFile(path.resolve('public/html/login.html'));
});
// 브라우저 -> 프론트 서버 사용자 인증 요청
indexRouter.post('/account/login', (req, res) => {
  const baseURL = 'https://backend.jjincafe-in-seoul.com';
  // 한 명이라도 사용자가 로그인을 하면 쿠키가 남잖아요.
  // 쿠키가 다른 클라이언트들과 공유를 하고 있다. 로그인할 당시의 클라이언트에서는 쿠키가 삭제됐겠찌만,
  // 다른 클라이언트들에게는 아닌 거죠?
  // 프론트 서버 -> 백엔드 서버에 사용자 인증 요청
  axios
    .post(`${baseURL}/api/auth/local`, req.body, {
      // 쿠키를 요청에 포함하고 싶으면 설정해줘야 함.
      withCredentials: true,
    })
    .then(response => {
      // 백엔드 서버에서 발급된 세션 쿠키, 브라우저로 전달
      // 응답 헤더에 set-cookie 값으로 session ID를 가짐.
      res.setHeader('set-cookie', response.headers['set-cookie']);
      return res.sendStatus(200);
    })
    .catch(err => console.error(err));
});
// 브라우저 -> 프론트 서버 사용자 인증 요청
indexRouter.delete('/account/logout', async (req, res) => {
  const baseURL = 'https://backend.jjincafe-in-seoul.com';
  // 프론트 서버 -> 백엔드 서버에 사용자 인증 요청
  await axios
    .delete(`${baseURL}/api/auth/local`, {
      // 브라우저로부터 전달받은 쿠키를 담아주기
      headers: {
        cookie: req.headers.cookie,
      },
    })
    .then(response => {
      console.log('req.cookies: ', req.cookies);
      res.clearCookie('connect.sid');
      res.clearCookie('userid');
      res.clearCookie('loginCookie');
      return res.sendStatus(204);
    })
    .catch(err => console.error(err));
});
indexRouter.get('/account/register', (req, res) => {
  return res.sendFile(path.resolve('public/html/register.html'));
});
indexRouter.get('/account/find-email', (req, res) => {
  return res.sendFile(path.resolve('public/html/findEmail.html'));
});
indexRouter.get('/account/find-email-result', (req, res) => {
  return res.sendFile(path.resolve('public/html/findEmailResult.html'));
});
indexRouter.get('/account/find-password', (req, res) => {
  return res.sendFile(path.resolve('public/html/findPassword.html'));
});
indexRouter.get('/account/find-password-result', (req, res) => {
  return res.sendFile(path.resolve('public/html/findPasswordResult.html'));
});
indexRouter.get('/account/info', (req, res) => {
  return res.sendFile(path.resolve('public/html/editUserInfo.html'));
});
indexRouter.get('/account/mypage', (req, res) => {
  return res.sendFile(path.resolve('public/html/my_page.html'));
});
indexRouter.get('/account/delete', (req, res) => {
  return res.sendFile(path.resolve('public/html/deleteUser.html'));
});
indexRouter.get('/users/:userId/reset-password/:tokenVal', (req, res) => {
  return res.sendFile(path.resolve('public/html/passwordUpdate.html'));
});
indexRouter.get('/cafes', (req, res) => {
  return res.sendFile(path.resolve('public/html/cafes.html'));
});
indexRouter.get('/search', (req, res) => {
  return res.sendFile(path.resolve('public/html/search.html'));
});
indexRouter.get('/cafes/top-list', (req, res) => {
  return res.sendFile(path.resolve('public/html/topCafeList.html'));
});
indexRouter.get('/cafes/:cafeId', (req, res) => {
  return res.sendFile(path.resolve('public/html/cafeDetail.html'));
});
export default indexRouter;
