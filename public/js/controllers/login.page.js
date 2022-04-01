import { checkLoginFormInputs } from '../controllers/userValidate.js';
import axios from '../lib/commonAxios.js';
// DOM 요소
const emailInput = document.querySelector('#email-address');
const passwordInput = document.querySelector('#password');
const loginBtn = document.querySelector('.login-btn');
const autoLoginCheckBox = document.querySelector('#auto-login');

// 로그인 버튼 클릭
loginBtn.addEventListener('click', evt => {
  const inputsObj = { email: emailInput, password: passwordInput };
  const loginFormData = {};
  // 이메일 인풋, 비밀번호 인풋 데이터 유효성 검증
  const isLoginFormValidated = checkLoginFormInputs(inputsObj);
  // 인풋 유효성 검사 후 폼 데이터에 email, password 값 추가
  loginFormData.email = emailInput.value;
  loginFormData.password = passwordInput.value;
  // TODO 백엔드에서 isAutoLoginChecked 데이터에 따른 분기 필요
  loginFormData.isAutoLoginChecked = autoLoginCheckBox.value;

  // 로그인 폼이 유효성 검사를 통과한다면,
  if (isLoginFormValidated) {
    // 백엔드 서버에 POST 사용자 인증 요청
    axios({
      method: 'POST',
      url: '/api/auth/local',
      data: loginFormData,
    })
      .then(response => {
        // 로그인 성공 시,
        // 로그인 성공 응답과 함께 userId를 받음.
        if ((response.status = 200)) {
          alert('로그인 성공');
          const userInfo = response.data;
          // 사용자 정보 로컬 스토리지에 저장
          // 사용자 닉네임, 이메일 주소, 프로필 이미지 경로
          localStorage.setItem('me', userInfo);
        }
      })
      .catch(err => console.error(err));
  }
});

// 사용자 정보 저장 구현 방식
// 1. 로그인 후 서버로부터 기본적인 사용자 정보를 응답 받아 localStorage에 저장해두고, 필요할 때마다 꺼내서 쓴다.
// 사용자 정보 수정이 일어날 때만 localStorage에 저장된 사용자 정보를 변경해준다.
// 2. 로그인할 때 발급된 세션 정보를 활용하여 사용자 정보가 필요하마다 백엔드 서버에 요청해서 받아온다.
// 이 중 나는 첫 번째 방식 선택.
