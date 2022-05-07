import { createModal } from '../components/modal/Modal.js';
import createCloseBtn from '../components/button/CloseButton.js';
import { createModalTitle } from '../components/modal/Modal.js';
/* 
<!-- 닉네임 변경 모달 -->
<div class="nickname-update-modal hidden">
  <div class="modal-top">
    <button type="button" class="close-btn">
      <i class="fa fa-close"></i>
      <span class="screen-reader-text">닫기</span>
    </button>
    <div class="modal__title">닉네임 업데이트</div>
  </div>
  <div class="modal-content">
    <div class="nickname-update">
      <p class="nickname-rule-desc">새로 변경할 닉네임은 한글로 최소 3자 이상 입력해 주세요.</p>
      <div class="nickname-wrapper">
        <input
          id="nickname"
          autocomplete="off"
          placeholder="닉네임"
          required="required"
          type="text"
        />
        <button class="nickname-check" type="button" disabled>
          중복 확인
        </button>
      </div>
      <small class="error-message">에러 메시지</small>
      <button class="cancel-btn" type="button">취소</button>
      <button class="update-btn" type="button">변경</button>
    </div>
  </div>
</div>
*/

const modalTitle = createModalTitle('닉네임 업데이트');
// 모달 창 닫기 버튼 생성
const modalCloseBtn = createCloseBtn('닉네임 변경 모달 창 닫기 버튼', 'x-mark');

const createNicknameUpdateModalContent = () => {
  const nicknameUpdateWrapper = document.createElement('div');
  const nicknameRuleDesc = document.createElement('p');
  const nicknameInputWrapper = document.createElement('div');
  const nicknameInput = document.createElement('input');
  const nicknameCheckBtn = document.createElement('button');
  const errorMessage = document.createElement('small');
  const btnList = document.createElement('div');
  const cancelBtn = document.createElement('button');
  const updateBtn = document.createElement('button');

  nicknameUpdateWrapper.classList.add('nickname-update');
  nicknameRuleDesc.classList.add('nickname-rule-desc');
  nicknameInputWrapper.classList.add('nickname-input-wrapper');
  nicknameInput.id = 'nickname';
  nicknameCheckBtn.classList.add('nickname-check');
  errorMessage.classList.add('error-message');
  btnList.classList.add('btn-list');
  cancelBtn.classList.add('cancel-btn', 'hidden');
  updateBtn.classList.add('update-btn', 'hidden');

  // 닉네임 입력 인풋 속성 설정
  nicknameInput.type = 'text';
  nicknameInput.autocomplete = 'off';
  nicknameInput.required = true;
  nicknameInput.placeholder = '닉네임';
  nicknameCheckBtn.innerText = '중복확인';
  nicknameCheckBtn.disabled = true;

  // FIX: type이 button이고, 클래스명, 콘텐츠만 달라지는 버튼 생성 함수 활용 필요
  nicknameCheckBtn.type = 'button';
  cancelBtn.type = 'button';
  updateBtn.type = 'button';

  nicknameRuleDesc.innerText =
    '새로 변경할 닉네임은 한글로 최소 3자 이상 입력해 주세요.';
  cancelBtn.innerText = '취소';
  updateBtn.innerText = '변경';

  nicknameUpdateWrapper.appendChild(nicknameRuleDesc);
  nicknameInputWrapper.appendChild(nicknameInput);
  nicknameInputWrapper.appendChild(nicknameCheckBtn);
  nicknameUpdateWrapper.appendChild(nicknameInputWrapper);
  nicknameUpdateWrapper.appendChild(errorMessage);
  btnList.appendChild(cancelBtn);
  btnList.appendChild(updateBtn);
  nicknameUpdateWrapper.appendChild(btnList);

  return nicknameUpdateWrapper;
};
// 모달 콘텐츠 생성
const nicknameUpdateWrapper = createNicknameUpdateModalContent();

const nicknameUpdateModal = createModal(
  'nickname-update-modal',
  '닉네임 변경',
  [modalTitle],
  nicknameUpdateWrapper,
  modalCloseBtn,
);

export default nicknameUpdateModal;
