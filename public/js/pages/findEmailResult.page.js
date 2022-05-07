const resultForUserExist = document.querySelector(
  '.result-form__content--user-yes',
);
const resultForUserNotExist = document.querySelector(
  '.result-form__content--user-no',
);
const nicknameValueElem = document.querySelector('#nickname');
const emailValueElem = document.querySelector('#email');
const getFullEmailBtn = document.querySelector('.form-result__button');

let resultObj = sessionStorage.getItem('findEmailResult');
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
