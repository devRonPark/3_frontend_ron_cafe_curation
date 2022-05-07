import { checkLoginFormInputs } from '../controllers/userValidate.js';
import { loginAPI } from '../controllers/apiController.js';
import { handlePwdReveal } from '../lib/util.js';
// DOM 요소
const loginForm = document.querySelector('#login-form');
const emailInput = document.querySelector('#email-address');
const passwordInput = document.querySelector('#password');
const loginBtn = document.querySelector('.login-btn');
const autoLoginCheckBox = document.querySelector('#auto-login');
const pwdRevealBtn = document.querySelector('.pwd-reveal');

const handleLogin = async evt => {
  evt.preventDefault();

  try {
    const inputsObj = { email: emailInput, password: passwordInput };
    const loginFormData = {};
    // 이메일 인풋, 비밀번호 인풋 데이터 유효성 검증
    const [isEmailInputValidated, isPasswordInputValidated] =
      checkLoginFormInputs(inputsObj);
    // 인풋 유효성 검사 후 폼 데이터에 email, password 값 추가
    loginFormData.email = emailInput.value;
    loginFormData.password = passwordInput.value;
    // TODO 백엔드에서 isAutoLoginChecked 데이터에 따른 분기 필요
    loginFormData.isAutoLoginChecked = autoLoginCheckBox.checked;
    // 로그인 폼이 유효성 검사를 통과한다면,
    if (isEmailInputValidated && isPasswordInputValidated) {
      // 백엔드 서버에 POST 사용자 인증 요청
      const response = await loginAPI(loginFormData);
      // 로그인 성공 시,
      // 로그인 성공 응답과 함께 userId를 받음.
      if (response.status === 200) {
        const { message } = response.data;

        if (message && message === 'LOGIN_FAIL') {
          alert('아이디가 존재하지 않거나 비밀번호가 일치하지 않습니다.');
          window.location.href = '/account/login';
        } else {
          alert('로그인 성공');
          const userInfo = {
            id: response.data.userid,
            email: response.data.email,
            nickname: response.data.nickname,
            imagePath: response.data.imagePath,
          };
          // // 사용자 정보 로컬 스토리지에 저장
          // // 사용자 닉네임, 이메일 주소, 프로필 이미지 경로
          localStorage.setItem('me', JSON.stringify(userInfo));
          window.location.href = '/';
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// 로그인
loginForm.addEventListener('submit', handleLogin);
loginBtn.addEventListener('click', handleLogin);
// 비밀번호 보기/숨기기 기능
pwdRevealBtn.addEventListener('click', handlePwdReveal);
