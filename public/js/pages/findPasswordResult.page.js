import { tempPwdResetMailSendAPI } from '../controllers/apiController.js';

const resultForUserExist = document.querySelector(
  '.result-form__content--user-yes',
);
const resultForUserNotExist = document.querySelector(
  '.result-form__content--user-no',
);
const nicknameValueElem = document.querySelector('#nickname');
const emailValueElem = document.querySelector('#email');
const getPasswordBtn = document.querySelector(
  '.result-form .form-result__button',
);

let resultObj = sessionStorage.getItem('findPasswordResult');
resultObj = JSON.parse(resultObj);
// 닉네임 및 이메일 정보가 존재하는 경우
if (resultObj?.name && resultObj?.email) {
  const { name, email } = resultObj;
  resultForUserNotExist.classList.add('hidden');
  nicknameValueElem.innerText = name;
  emailValueElem.innerText = email;
  // 닉네임 및 이메일 정보가 존재하지 않는 경우
} else {
  resultForUserExist.classList.add('hidden');
}
const handleGetPwd = async evt => {
  try {
    let userInfo = sessionStorage.getItem('findPasswordResult');
    userInfo = JSON.parse(userInfo);
    const formData = { id: userInfo.id, email: userInfo.email };
    const response = await tempPwdResetMailSendAPI(formData);

    if (response.status === 200) {
      alert(
        '임시 비밀번호 발송이 완료되었습니다. 등록하신 이메일을 확인하시어 임시 비밀번호로 로그인하신 후 반드시 비밀번호를 변경해주시기 바랍니다.',
      );
      // 로그인 페이지로 이동
      window.location.href = '/account/login';
    }
  } catch (err) {
    console.error(err);
  }
};

// 비밀번호 받기 버튼 클릭 시,
getPasswordBtn.addEventListener('click', handleGetPwd);
