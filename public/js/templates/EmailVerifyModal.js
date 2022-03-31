import { createModal } from '../components/modal/Modal.js';
import createCloseBtn from '../components/button/CloseButton.js';

/* 
  <div class="modal email-verification-modal">
    <div class="modal__top">
      <div class="modal__title">이메일 인증</div>
      <button class="modal__close-btn" type="button">
        <i class="fas fa-close"></i>
        <span class="screen-reader-text">이메일 인증 모달 창 닫기 버튼</span>
      </button>
    </div>
    <div class="modal__content">
      <form   
        class="check-email-form"
        name="check-email"
        action="https//backend.jjincafe-in-seoul.com/api/auth/email"
        method="post"
      >
        <div>
          <p class="email-info">example@example.com</p>
          <button class="req-send-btn" type="submit">전송 요청</button>
        </div>
        <p class="form-desc">위 이메일로 인증번호를 전송합니다.</p>
      </form>
      <form 
        class="check-verify-number-form"
        name="check-verify-number"
      >
        <p class="input-desc">위 이메일로 보내드린 인증번호를 입력하시기 바랍니다.</p>
        <div class="form-control">
          <input 
            class="verify-number-input"
            type="text"
            placeholder="인증번호 입력"
            required
          />
          <button class="check-verify-number-btn" type="submit">확인</button>
          <span class="timer">10:00</span>
        </div>
        <p class="verify-number-desc">인증번호는 최대 10분간만 유효합니다.</p>
      </form>
      <div class="btn-list-wrapper">
        <ul class="btn-list">
          <li class="btn-list__item">
            <button class="resend-btn" type="button">인증번호 재전송</button>
          </li>
          <li class="btn-list__item">
            <button class="edit-email-btn" type="button">이메일 수정</button>
          </li>
        </ul>
        <p class="resend-desc">인증번호를 등록하신 이메일로 다시 받기 원하시면 [인증번호 재전송] 버튼을 클릭해 주세요.</p>
        <p class="edit-email-desc">이메일 주소가 틀렸거나 다른 계정을 이용하시려면 [이메일 수정] 버튼을 클릭하셔서, 이메일 주소를 수정하시기 바랍니다.</p>
      </div>
    </div>
  </div>
*/

function createModalTitle(titleName) {
  const titleElem = document.createElement('div');
  titleElem.classList.add('modal__title');
  titleElem.textContent = titleName;
  return titleElem;
}
function createCheckEmailForm() {
  const checkEmailForm = document.createElement('form');
  const wrapper = document.createElement('div');
  const emailInfo = document.createElement('p');
  const sendMailBtn = document.createElement('button');
  const formDescription = document.createElement('p');

  checkEmailForm.classList.add('check-email-form');
  sendMailBtn.classList.add('send-req-btn');
  emailInfo.classList.add('email-info');
  formDescription.classList.add('form-desc');

  // checkEmailForm.action = 'https//backend.jjincafe-in-seoul.com/api/auth/email';
  // checkEmailForm.method = 'post';
  checkEmailForm.name = 'check-email-form';

  sendMailBtn.type = 'button';
  emailInfo.textContent = 'example@example.com';
  sendMailBtn.textContent = '전송 요청';
  formDescription.textContent = '위 이메일로 인증번호를 전송합니다.';

  wrapper.appendChild(emailInfo);
  wrapper.appendChild(sendMailBtn);
  checkEmailForm.appendChild(wrapper);
  checkEmailForm.appendChild(formDescription);

  return checkEmailForm;
}
function createCheckVerifyNumberForm() {
  const checkVerifyNumberForm = document.createElement('form');
  const inputDescription = document.createElement('p');
  const wrapper = document.createElement('div');
  const verifyNumberInput = document.createElement('input');
  const checkVerifyNumberBtn = document.createElement('button');
  const timerBox = document.createElement('span');
  const verifyNumberDescription = document.createElement('p');

  checkVerifyNumberForm.classList.add('check-verify-number-form');
  inputDescription.classList.add('input-desc');
  wrapper.classList.add('form-control');
  checkVerifyNumberBtn.classList.add('check-verify-number-btn');
  verifyNumberInput.classList.add('verify-number-input');
  timerBox.classList.add('timer');
  verifyNumberDescription.classList.add('verify-number-desc');

  inputDescription.textContent =
    '위 이메일로 보내드린 인증번호를 입력하시기 바랍니다.';
  verifyNumberInput.type = 'text';
  verifyNumberInput.placeholder = '인증번호 입력';
  verifyNumberInput.required = true;

  checkVerifyNumberBtn.type = 'button';
  checkVerifyNumberBtn.textContent = '확인';
  verifyNumberDescription.textContent = '인증번호는 최대 10분간만 유효합니다.';
  timerBox.textContent = '10:00';

  checkVerifyNumberForm.name = 'check-verify-number-form';

  wrapper.appendChild(verifyNumberInput);
  wrapper.appendChild(checkVerifyNumberBtn);
  wrapper.appendChild(timerBox);
  checkVerifyNumberForm.appendChild(inputDescription);
  checkVerifyNumberForm.appendChild(wrapper);
  checkVerifyNumberForm.appendChild(verifyNumberDescription);
  return checkVerifyNumberForm;
}
function createBtnList() {
  const btnList = document.createElement('ul');
  const btnItemInfoList = [
    { type: 'button', class: 'resend-btn', name: '인증번호 재전송' },
    { type: 'button', class: 'edit-email-btn', name: '이메일 수정' },
  ];

  btnList.classList.add('btn-list');

  btnItemInfoList.forEach(btnItemInfo => {
    const btnItemWrapper = document.createElement('li');
    const btnItem = document.createElement('button');

    btnItemWrapper.classList.add('btn-list__item');
    btnItem.classList.add(btnItemInfo.class);
    btnItem.type = btnItemInfo.type;
    btnItem.textContent = btnItemInfo.name;

    btnItemWrapper.appendChild(btnItem);
    btnList.appendChild(btnItemWrapper);
  });
  return btnList;
}
function createBtnDesc(descClass, descText) {
  const btnDesc = document.createElement('p');
  btnDesc.classList.add(descClass);
  btnDesc.textContent = descText;
  return btnDesc;
}

// 모달 타이틀 요소 생성
const modalTitleElem = createModalTitle('이메일 인증');
// 모달 창 닫기 버튼 생성
const emailVerifyModalCloseBtnElem = createCloseBtn(
  '이메일 인증 모달 창 닫기 버튼',
  'x-mark',
);
const checkEmailForm = createCheckEmailForm();
const checkVerifyNumberForm = createCheckVerifyNumberForm();
const btnListWrapper = document.createElement('div');
btnListWrapper.classList.add('btn-list-wrapper');
const btnList = createBtnList();
const resendBtnDesc = createBtnDesc(
  'resend-desc',
  '인증번호를 등록하신 이메일로 다시 받기 원하시면 [인증번호 재전송] 버튼을 클릭해 주세요.',
);
const editEmailBtnDesc = createBtnDesc(
  'edit-email-desc',
  '이메일 주소가 틀렸거나 다른 계정을 이용하시려면 [이메일 수정] 버튼을 클릭하셔서, 이메일 주소를 수정하시기 바랍니다.',
);
btnListWrapper.appendChild(btnList);
btnListWrapper.appendChild(resendBtnDesc);
btnListWrapper.appendChild(editEmailBtnDesc);

const emailVerifyModalContentElem = [
  checkEmailForm,
  checkVerifyNumberForm,
  btnListWrapper,
];

const emailVerifyModalElem = createModal(
  'email-verify-modal',
  '이메일 인증 모달 창',
  [modalTitleElem],
  emailVerifyModalContentElem,
  emailVerifyModalCloseBtnElem,
);

export default emailVerifyModalElem;
