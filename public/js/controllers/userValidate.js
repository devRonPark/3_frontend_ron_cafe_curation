import { nicknameRegExp, emailRegExp, pwdRegExp } from '../lib/constants.js';
import { checkEmailExistAPI, checkUserNameExistAPI } from './apiController.js';

// 닉네임 유효성 검사
export const isNickname = nickname => {
  return nicknameRegExp.test(nickname);
};
// 이메일 유효성 검사
export const isEmail = email => {
  return emailRegExp.test(email);
};
// 비밀번호 유효성 검사
const isPassword = password => {
  // 8자 이상 16자 이하
  // 숫자, 문자, 특수문자 중 무조건 2개 이상 포함
  return pwdRegExp.test(password);
};
export const displayBtnValid = btnElem => {
  // 버튼 스타일 변경
  btnElem.disabled = false;
  btnElem.classList.remove('btn-inactive');
  btnElem.classList.add('btn-active');
};
// 인풋 데이터가 규칙 만족 시 적용되는 스타일링
// @params: domElemList = {inputElem, btnElem}
export const displayInputValid = domElemList => {
  // 인풋 보더 색깔 파란색으로 변경
  domElemList.inputElem.classList.remove('input-wrong');
  domElemList.inputElem.classList.add('input-correct');
  // 버튼 disabled 해제 및 배경색 변경
  domElemList.btnElem ? (domElemList.btnElem.disabled = false) : null;
  domElemList.btnElem
    ? domElemList.btnElem.classList.remove('btn-inactive')
    : null;
  domElemList.btnElem ? domElemList.btnElem.classList.add('btn-active') : null;
};
// 인풋 데이터가 규칙 불만족 시 적용되는 스타일링
// @params: domElemList = {inputElem, btnElem}
export const displayInputInvalid = domElemList => {
  const { inputElem, btnElem } = domElemList;
  // 인풋 보더 색깔 빨간색으로 변경
  inputElem.classList.remove('input-correct');
  inputElem.classList.add('input-wrong');
  // 버튼 disabled 설정 및 배경색, 글자 색깔 변경
  btnElem.disabled = true;
  btnElem.classList.remove('btn-active');
  btnElem.classList.add('btn-inactive');
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
  domElem.classList.remove('btn-active');
  domElem.classList.add('btn-inactive');
};
// 사용자 닉네임 중복 확인
export const checkUsernameExist = async nameValue => {
  const nicknameInput = document.querySelector('#nickname');
  const nicknameCheckBtn = document.querySelector('.nickname-check');

  try {
    const formData = { name: nameValue };
    // 우선 사용자가 입력한 닉네임 데이터가 지정한 url로 잘 전달되는지 확인
    // POST /api/auth/local/property/name
    const response = await checkUserNameExistAPI(formData);
    if (response.status === 200) {
      // 버튼 콘텐츠 초록색 O로 변경
      displayInputChecked(nicknameCheckBtn);
      // 인풋 비활성화 상태로 변경
      nicknameInput.disabled = true;
      nicknameInput.classList.remove('input-correct');
      nicknameInput.classList.add('input-validated');
    }
  } catch (err) {
    // 이미 존재하는 닉네임인 경우
    if (err.response && err.response.status === 409) {
      alert('이미 사용 중인 이메일입니다.');
      nicknameInput.classList.remove('input-correct');
      nicknameInput.value = '';
      nicknameInput.focus();
      nicknameCheckBtn.classList.remove('btn-active');
      nicknameCheckBtn.disabled = true;
    }
  }
};
// 사용자 이메일 중복 확인
export const checkEmailExist = async emailValue => {
  const emailInput = document.querySelector('#email-address');
  const emailCheckBtn = document.querySelector('.email-check');

  try {
    const inputData = { email: emailValue };
    // 우선 사용자가 입력한 닉네임 데이터가 지정한 url로 잘 전달되는지 확인
    // POST /api/auth/local/property/name
    const response = await checkEmailExistAPI(inputData);
    if (response.status === 200) {
      // 버튼 콘텐츠 초록색 O로 변경
      displayInputChecked(emailCheckBtn);
      // 인풋 비활성화 상태로 변경
      emailInput.disabled = true;
      emailInput.classList.remove('input-correct');
      emailInput.classList.add('input-validated');
    }
  } catch (err) {
    // 이미 사용 중인 이메일인 경우
    if (err.response && err.response.status === 409) {
      alert('이미 사용 중인 이메일입니다.');
      emailInput.classList.remove('input-correct');
      emailInput.value = '';
      emailInput.focus();
      emailCheckBtn.classList.remove('btn-active');
      emailCheckBtn.disabled = true;
    }
  }
};
// 인풋 검사 후 에러 메시지 표시
const setErrorFor = (input, message) => {
  const formControl = input.parentElement.parentElement;
  const errorMessageBox = formControl.querySelector('.error-message');
  formControl.className = 'form-control error';
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

  setSuccessFor(userProfile);

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
  let isEmailInputValidated = false;
  let isPasswordInputValidated = false;

  if (emailValue === '') {
    setErrorFor(email, '이메일 주소를 반드시 입력해주시기 바랍니다.');
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, '올바르지 않은 이메일 형식입니다.');
  } else {
    setSuccessFor(email);
    isEmailInputValidated = true;
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
    isPasswordInputValidated = true;
  }

  return [isEmailInputValidated, isPasswordInputValidated];
};

export const checkPasswordUpdateFormInputs = (inputsObj, inputsStatusObj) => {
  // DOM Element
  const { currPwdInput, newPwdInput, newPwdCheckInput } = inputsObj;
  let { isCurrPwdValidated, isNewPwdValidated, isNewPwdCheckValidated } =
    inputsStatusObj;
  const currPwdValue = currPwdInput.value;
  const newPwdValue = newPwdInput.value;
  const newPwdCheckValue = newPwdCheckInput.value;

  if (currPwdValue === '') {
    setErrorFor(currPwdInput, '현재 비밀번호를 입력해주시기 바랍니다.');
  } else if (!isPassword(currPwdValue)) {
    setErrorFor(
      currPwdInput,
      '비밀번호는 숫자, 문자, 특수문자 중 반드시 2개를 포함하여 8자 이상 16자 이하로 입력해주시기 바랍니다.',
    );
  } else {
    setSuccessFor(currPwdInput);
    isCurrPwdValidated = true;
  }

  if (newPwdValue === '') {
    setErrorFor(newPwdInput, '새로 변경할 비밀번호를 입력해주시기 바랍니다.');
  } else if (!isPassword(newPwdValue)) {
    setErrorFor(
      newPwdInput,
      '비밀번호는 숫자, 문자, 특수문자 중 반드시 2개를 포함하여 8자 이상 16자 이하로 입력해주시기 바랍니다.',
    );
  } else if (newPwdValue === currPwdValue) {
    setErrorFor(
      newPwdInput,
      '새로 변경할 비밀번호와 현재 비밀번호가 일치합니다.',
    );
  } else {
    setSuccessFor(newPwdInput);
    isNewPwdValidated = true;
  }

  if (newPwdCheckValue === '') {
    setErrorFor(
      newPwdCheckInput,
      '비밀번호를 다시 한 번 입력해주시기 바랍니다.',
    );
  } else if (newPwdValue !== newPwdCheckValue) {
    setErrorFor(newPwdCheckInput, '입력하신 비밀번호와 일치하지 않습니다.');
  } else {
    setSuccessFor(newPwdCheckInput);
    isNewPwdCheckValidated = true;
  }

  return { isCurrPwdValidated, isNewPwdValidated, isNewPwdCheckValidated };
};
