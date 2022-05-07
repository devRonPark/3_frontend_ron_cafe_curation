import { findEmailAPI } from '../controllers/apiController.js';
import {
  isNickname,
  displayInputValid,
  displayInputInvalid,
} from '../controllers/userValidate.js';

const findEmailForm = document.querySelector('#find-email-form');
const findEmailBtn = document.querySelector('.find-email-btn');
const nicknameInput = document.querySelector('#nickname');

const handleFindEmail = async evt => {
  evt.preventDefault();
  try {
    const formData = { name: nicknameInput.value };
    const response = await findEmailAPI(formData);
    const { user, message } = response.data;

    if (message && message === 'USER_NOT_EXIST') {
      alert('입력하신 정보와 일치하는 사용자가 존재하지 않습니다.');
      window.location.href = '/account/find-email';
    } else {
      sessionStorage.setItem('findEmailResult', JSON.stringify(user));
      window.location.href = '/account/find-email-result';
    }
  } catch (err) {
    console.error(err);
  }
};

const handleNickValidate = evt => {
  const target = evt.currentTarget;
  if (isNickname(target.value)) {
    displayInputValid({ inputElem: nicknameInput, btnElem: findEmailBtn });
  } else {
    displayInputInvalid({ inputElem: nicknameInput, btnElem: findEmailBtn });
  }
};

findEmailForm.addEventListener('submit', handleFindEmail);
findEmailBtn.addEventListener('click', handleFindEmail);
nicknameInput.addEventListener('input', handleNickValidate);
