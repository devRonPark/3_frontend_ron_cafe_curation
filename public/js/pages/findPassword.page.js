import { checkUserExistAPI } from '../controllers/apiController.js';
import {
  isNickname,
  isEmail,
  displayInputValid,
  displayInputInvalid,
  displayBtnValid,
} from '../controllers/userValidate.js';

const findPasswordForm = document.querySelector('#find-password-form');
const findPasswordBtn = document.querySelector('.find-password-btn');
const emailInput = document.querySelector('#email-address');
const nicknameInput = document.querySelector('#nickname');
let isEmailValidate = false,
  isNicknameValidate = false;

const handleFindPassword = async evt => {
  evt.preventDefault();
  try {
    const formData = { email: emailInput.value, name: nicknameInput.value };
    const response = await checkUserExistAPI(formData);
    const { user, message } = response.data;

    if (message && message === 'USER_NOT_EXIST') {
      alert('입력하신 정보와 일치하는 사용자가 존재하지 않습니다.');
      window.location.href = '/account/find-password';
    } else {
      sessionStorage.setItem('findPasswordResult', JSON.stringify(user));
      window.location.href = '/account/find-password-result';
    }
  } catch (err) {
    console.error(err);

    if (err.response && err.response.status === 400) {
      return;
    }
  }
};

const handleNickValidate = evt => {
  const target = evt.currentTarget;
  if (isNickname(target.value)) {
    isNicknameValidate = true;
    displayInputValid({ inputElem: nicknameInput });
  } else {
    displayInputInvalid({ inputElem: nicknameInput, btnElem: findPasswordBtn });
  }

  if (isEmailValidate && isNicknameValidate) displayBtnValid(findPasswordBtn);
};

const handleEmailValidate = evt => {
  const target = evt.currentTarget;
  if (isEmail(target.value)) {
    isEmailValidate = true;
    displayInputValid({ inputElem: emailInput });
  } else {
    displayInputInvalid({ inputElem: emailInput, btnElem: findPasswordBtn });
  }

  if (isEmailValidate && isNicknameValidate) displayBtnValid(findPasswordBtn);
};

findPasswordForm.addEventListener('submit', handleFindPassword);
findPasswordBtn.addEventListener('click', handleFindPassword);
nicknameInput.addEventListener('input', handleNickValidate);
emailInput.addEventListener('input', handleEmailValidate);
