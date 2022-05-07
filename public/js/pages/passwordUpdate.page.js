import { checkPasswordUpdateFormInputs } from '../controllers/userValidate.js';
import { pwdRegExp } from '../lib/constants.js';
import { passwordUpdateAPI } from '../controllers/apiController.js';
import { handlePwdReveal } from '../lib/util.js';

const passwordUpdateForm = document.querySelector('#password-update-form');
const currPwdInput = document.querySelector('#current-password');
const newPwdInput = document.querySelector('#new-password');
const newPwdCheckInput = document.querySelector('#new-password-check');
const pwdUpdateBtn = document.querySelector('.password-update-btn');
const pwdRevealBtnList = document.querySelectorAll('.pwd-reveal');

const handleCurrPwdValidate = () => {
  if (pwdRegExp.test(currPwdInput.value)) {
    // 인풋 보더 색깔 파란색으로 변경
    currPwdInput.classList.remove('input-wrong');
    currPwdInput.classList.add('input-correct');
  } else {
    // 인풋 보더 색깔 빨간색으로 변경
    currPwdInput.classList.remove('input-correct');
    currPwdInput.classList.add('input-wrong');
  }
};
const handleNewPwdValidate = () => {
  if (pwdRegExp.test(newPwdInput.value)) {
    // 인풋 보더 색깔 파란색으로 변경
    newPwdInput.classList.remove('input-wrong');
    newPwdInput.classList.add('input-correct');
  } else {
    // 인풋 보더 색깔 빨간색으로 변경
    newPwdInput.classList.remove('input-correct');
    newPwdInput.classList.add('input-wrong');
  }
};

const handleNewPwdCheckValidate = () => {
  if (newPwdInput.value === newPwdCheckInput.value) {
    // 인풋 보더 색깔 파란색으로 변경
    newPwdCheckInput.classList.remove('input-wrong');
    newPwdCheckInput.classList.add('input-correct');
  } else {
    // 인풋 보더 색깔 빨간색으로 변경
    newPwdCheckInput.classList.remove('input-correct');
    newPwdCheckInput.classList.add('input-wrong');
  }
};

const handlePwdUpdate = async evt => {
  evt.preventDefault();
  const pathname = window.location.pathname;
  const inputsObj = {
    currPwdInput,
    newPwdInput,
    newPwdCheckInput,
  };
  const inputsStatusObj = {
    isCurrPwdValidated: false,
    isNewPwdValidated: false,
    isNewPwdCheckValidated: false,
  };
  // 유효성 검사하기
  const { isCurrPwdValidated, isNewPwdValidated, isNewPwdCheckValidated } =
    checkPasswordUpdateFormInputs(inputsObj, inputsStatusObj);

  // {current_password, new_password, new_password_again}
  const formData = {
    current_password: currPwdInput.value,
    new_password: newPwdInput.value,
    new_password_check: newPwdCheckInput.value,
  };

  // 유효성 검사가 완전히 되야 요청이 허용됨.
  // 백엔드 서버에 비밀번호 업데이트 요청
  if (isCurrPwdValidated && isNewPwdValidated && isNewPwdCheckValidated) {
    try {
      const response = await passwordUpdateAPI(pathname, formData);
      const { message } = response.data;
      if (message && message === 'PASSWORD_IS_WRONG') {
        alert('입력하신 비밀번호가 일치하지 않습니다.');
        window.location.href = window.location.pathname;
      } else if (!message && response.status === 200) {
        console.log('백엔드 서버로부터 비밀번호 업데이트 응답 받음.');
        alert('비밀번호 업데이트가 완료되었습니다.');
        // 비밀번호 변경 후 로그인 페이지로 이동
        window.location.href = '/account/login';
      }
    } catch (err) {
      console.error(err);

      // 토큰이 만료된 경우
      if (err.response && err.response.status === 401) {
        alert(
          '해당 페이지는 더 이상 유효하지 않은 페이지입니다. 비밀번호를 초기화하기 위해서는 로그인하시어 다시 초기화 메일을 요청해주시기 바랍니다.',
        );
      }
    }
  }
};

// 현재 비밀번호 입력 인풋
currPwdInput.addEventListener('input', handleCurrPwdValidate);
// 새 비밀번호 입력 인풋
newPwdInput.addEventListener('input', handleNewPwdValidate);
// 새 비밀번호 다시 입력 인풋
newPwdCheckInput.addEventListener('input', handleNewPwdCheckValidate);
// 비밀번호 변경
passwordUpdateForm.addEventListener('submit', handlePwdUpdate);
pwdUpdateBtn.addEventListener('click', handlePwdUpdate);
// 비밀번호 인풋 텍스트 보여주기
pwdRevealBtnList.forEach(pwdRevealBtn => {
  pwdRevealBtn.addEventListener('click', handlePwdReveal);
});
