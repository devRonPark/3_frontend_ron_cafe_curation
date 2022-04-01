import axios from '../lib/commonAxios.js';

// 닉네임 유효성 검사
const isNickname = nickname => {
  return /^[가-힣]{3,16}$/.test(nickname);
};
// 이메일 유효성 검사
const isEmail = email => {
  return /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/.test(email);
};
// 비밀번호 유효성 검사
const isPassword = password => {
  // 8자 이상 16자 이하
  // 숫자, 문자, 특수문자 중 무조건 2개 이상 포함
  return /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?])*.{8,16}$/.test(
    password,
  );
};
// 인풋 데이터가 규칙 만족 시 적용되는 스타일링
// @params: domElemList = {inputElem, btnElem}
export const displayInputValid = domElemList => {
  const { inputElem, btnElem } = domElemList;
  // 인풋 보더 색깔 파란색으로 변경
  inputElem.style.borderColor = '#2e9cdf';
  // 버튼 disabled 해제 및 배경색 변경
  btnElem.disabled = false;
  btnElem.style.backgroundColor = '#2e9cdf';
  btnElem.style.color = '#fff';
};
// 인풋 데이터가 규칙 불만족 시 적용되는 스타일링
// @params: domElemList = {inputElem, btnElem}
export const displayInputInvalid = domElemList => {
  const { inputElem, btnElem } = domElemList;
  // 인풋 보더 색깔 빨간색으로 변경
  inputElem.style.borderColor = 'red';
  // 버튼 disabled 설정 및 배경색, 글자 색깔 변경
  btnElem.disabled = true;
  btnElem.style.backgroundColor = 'rgba(0, 0, 0, 0.25)';
  btnElem.style.color = '#10104D';
};
// 중복확인 버튼 스타일링(인풋 데이터가 체크 후 버튼 상태)
// 인풋 데이터 검증 후 버튼에 스타일을 적용한다.
// review) 중복 체크 버튼하고 inputChecked하고 매칭이 안된다.
export const displayInputChecked = domElem => {
  domElem.textContent = '✅';
  domElem.disabled = true;
};
// 중복확인 버튼 스타일링(인풋 데이터 체크 전 버튼 상태)
export const displayInputCheckedBefore = domElem => {
  domElem.textContent = '중복 확인';
  domElem.style.backgroundColor = 'rgba(0, 0, 0, 0.25)';
};
// 사용자 닉네임 중복 확인
export const checkUsernameExist = nameValue => {
  const nicknameInput = document.querySelector('#nickname');
  const nicknameCheckBtn = document.querySelector('.nickname-check');
  // 우선 사용자가 입력한 닉네임 데이터가 지정한 url로 잘 전달되는지 확인
  // POST /api/auth/local/property/name
  axios({
    method: 'post',
    url: '/api/auth/local/property/name',
    data: {
      name: nameValue,
    },
  })
    .then(data => {
      if (data.status === 200) {
        // 버튼 콘텐츠 초록색 O로 변경
        displayInputChecked(nicknameCheckBtn);
        // 인풋 비활성화 상태로 변경
        nicknameInput.disabled = true;
        nicknameInput.style.borderColor = '#2DB400';
      }
    })
    .catch(err => console.error('error: ', err));
};
// 사용자 이메일 중복 확인
export const checkEmailExist = emailValue => {
  const emailInput = document.querySelector('#email-address');
  const emailCheckBtn = document.querySelector('.email-check');
  // 우선 사용자가 입력한 닉네임 데이터가 지정한 url로 잘 전달되는지 확인
  // POST /api/auth/local/property/name
  axios({
    method: 'post',
    url: '/api/auth/local/property/email',
    data: {
      email: emailValue,
    },
  })
    .then(data => {
      if (data.status === 200) {
        // 버튼 콘텐츠 초록색 O로 변경
        displayInputChecked(emailCheckBtn);
        // 인풋 비활성화 상태로 변경
        emailInput.disabled = true;
        emailInput.style.borderColor = '#2DB400';
      }
    })
    .catch(err => console.error('error: ', err));
};
// 인풋 검사 후 에러 메시지 표시
const setErrorFor = (input, message) => {
  const formControl = input.parentElement.parentElement;
  const errorMessageBox = formControl.querySelector('.error-message');
  formControl.className = 'form-control error';
  // innerText와 textContent의 차이?
  errorMessageBox.innerText = message;
};
// 인풋 유효성 검사 후 성공 시 스타일링 적용
const setSuccessFor = input => {
  const formControl = input.parentElement.parentElement;
  formControl.className = 'form-control success';
};

// TODO
// 이미지 파일 첨부 용량 및 형식 검증
// @params inputsObj = {username, email, password, passwordConfirmation}
export const checkRegisterFormInputs = (inputsObj, inputsStatusObj) => {
  // DOM Element
  const { userProfile, nickname, email, password, passwordConfirmation } =
    inputsObj;
  // review) confirmed 라는 단어 수정.
  // boolean 값
  const { isNicknameConfirmed, isEmailConfirmed, isEmailVerified } =
    inputsStatusObj;

  const userProfileValue = userProfile.value;
  // 공백을 제거하기 위해 trim() 메소드 호출
  const nicknameValue = nickname.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordConfirmationValue = passwordConfirmation.value.trim();

  if (!userProfileValue) {
    setErrorFor(userProfile, '프로필 이미지를 반드시 첨부해주시기 바랍니다.');
  } else {
    setSuccessFor(userProfile);
  }

  if (nicknameValue === '') {
    setErrorFor(nickname, '닉네임을 반드시 입력해주시기 바랍니다.');
  } else if (!isNickname(nicknameValue)) {
    setErrorFor(
      nickname,
      '닉네임은 반드시 한글로만 3자 이상 16자 이하로 입력해주시기 바랍니다.',
    );
  } else if (!isNicknameConfirmed) {
    setErrorFor(nickname, '닉네임은 반드시 중복확인해주시기 바랍니다.');
  } else {
    setSuccessFor(nickname);
  }

  if (emailValue === '') {
    setErrorFor(email, '이메일 주소를 반드시 입력해주시기 바랍니다.');
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, '올바르지 않은 이메일 형식입니다.');
  } else if (!isEmailConfirmed) {
    setErrorFor(email, '이메일 주소를 반드시 중복확인해주시기 바랍니다.');
  } else if (!isEmailVerified) {
    setErrorFor(email, '이메일 주소를 반드시 인증해주시기 바랍니다.');
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === '') {
    setErrorFor(password, '비밀번호를 입력해주시기 바랍니다.');
  } else if (!isPassword(passwordValue)) {
    setErrorFor(
      password,
      '비밀번호는 숫자, 문자, 특수문자 중 반드시 2개를 포함하여 8자 이상 16자 이하로 입력해주시기 바랍니다.',
    );
  } else {
    setSuccessFor(password);
  }

  if (passwordConfirmationValue === '') {
    setErrorFor(
      passwordConfirmation,
      '비밀번호를 다시 한 번 입력해주시기 바랍니다.',
    );
  } else if (passwordValue !== passwordConfirmationValue) {
    setErrorFor(passwordConfirmation, '입력하신 비밀번호와 일치하지 않습니다.');
  } else {
    setSuccessFor(passwordConfirmation);
  }
};
// 로그인 폼 유효성 검증
export const checkLoginFormInputs = inputsObj => {
  // DOM Element
  const { email, password } = inputsObj;

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  // 로그인 폼 인풋 중 하나라도 유효성 검사 통과 못할 시 false
  let isLoginFormValidated = false;

  if (emailValue === '') {
    setErrorFor(email, '이메일 주소를 반드시 입력해주시기 바랍니다.');
    isLoginFormValidated = false;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, '올바르지 않은 이메일 형식입니다.');
    isLoginFormValidated = false;
  } else {
    setSuccessFor(email);
    isLoginFormValidated = true;
  }

  if (passwordValue === '') {
    setErrorFor(password, '비밀번호를 입력해주시기 바랍니다.');
    isLoginFormValidated = false;
  } else if (!isPassword(passwordValue)) {
    setErrorFor(
      password,
      '비밀번호는 숫자, 문자, 특수문자 중 반드시 2개를 포함하여 8자 이상 16자 이하로 입력해주시기 바랍니다.',
    );
    isLoginFormValidated = false;
  } else {
    setSuccessFor(password);
    isLoginFormValidated = true;
  }

  return isLoginFormValidated;
};
