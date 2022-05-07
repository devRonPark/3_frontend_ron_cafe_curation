import { createModal } from '../components/modal/Modal.js';
import createCloseBtn from '../components/button/CloseButton.js';
import { createModalTitle } from '../components/modal/Modal.js';
/*
<!-- 비밀번호 변경 메일 발송 모달 -->
<div class="password-update-modal hidden">
  <div class="modal-top">
    <button type="button" class="close-btn">
      <i class="fa fa-close"></i>
      <span class="screen-reader-text">닫기</span>
    </button>
    <div class="modal__title">비밀번호 변경</div>
  </div>
  <div class="modal-content">
    <div class="password-update">
      <div>
        <p class="email-address">gildong@gildong.com</p>
        <button class="send-mail-req-btn" type="button">전송 요청</button>
      </div>
      <p class="send-mail-desc">위 메일로 비밀번호 초기화 메일을 발송합니다.</p>
    </div>
  </div>
</div>
*/

const modalTitle = createModalTitle('비밀번호 변경');
// 모달 창 닫기 버튼 생성
const modalCloseBtn = createCloseBtn(
  '비밀번호 변경 모달 창 닫기 버튼',
  'x-mark',
);

const createPasswordUpdateModalContent = () => {
  const passwordUpdateWrapper = document.createElement('div');
  const emailInfoWrapper = document.createElement('div');
  const emailAddrInfo = document.createElement('p');
  const sendMailReqBtn = document.createElement('button');
  const sendMailDesc = document.createElement('p');

  passwordUpdateWrapper.classList.add('password-update');
  emailAddrInfo.classList.add('email-address');
  sendMailReqBtn.classList.add('send-mail-req-btn');
  sendMailDesc.classList.add('send-mail-desc');

  let myInfo = localStorage.getItem('me');
  myInfo = JSON.parse(myInfo);
  const { email } = myInfo;

  emailAddrInfo.innerText = email;
  sendMailReqBtn.innerText = '전송 요청';
  sendMailDesc.innerText = '위 메일로 비밀번호 초기화 메일을 발송합니다.';

  emailInfoWrapper.appendChild(emailAddrInfo);
  emailInfoWrapper.appendChild(sendMailReqBtn);
  passwordUpdateWrapper.appendChild(emailInfoWrapper);
  passwordUpdateWrapper.appendChild(sendMailDesc);
  return passwordUpdateWrapper;
};
// 모달 콘텐츠 생성
const passwordUpdateWrapper = createPasswordUpdateModalContent();

const passwordUpdateModal = createModal(
  'password-update-modal',
  '비밀번호 변경',
  [modalTitle],
  passwordUpdateWrapper,
  modalCloseBtn,
);

export default passwordUpdateModal;
