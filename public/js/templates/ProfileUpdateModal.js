import { createModal } from '../components/modal/Modal.js';
import createCloseBtn from '../components/button/CloseButton.js';
import { createModalTitle } from '../components/modal/Modal.js';
import { makeBtn } from '../lib/util.js';

/* 
<!-- 프로필 변경 모달 -->
<div class="profile-change-modal hidden">
  <div class="modal-top">
    <div class="profile-change__heading">프로필 변경</div>
    <button type="button" class="close-btn">
      <i class="fa fa-close"></i>
      <span class="screen-reader-text">닫기</span>
    </button>
  </div>
  <div class="modal-content">
    <div class="profile-upload">
      <!-- 사진 업로드 전 -->
      <label for="input-image">+ 사진 업로드</label>
      <input
        type="file"
        id="input-image"
        class="hidden"
        name="image"
        accept=".jpg, .png, .gif"
      />
      <!-- userProfileInput.files[0] 가 존재한다면,
      경로 값을 img 태그의 src 속성 값으로 넣어준다. -->
      <!-- 사진 업로드 후 -->
      <img
        id="preview-image"
        src=""
        alt="사용자 프로필 변경 전 미리보기"
      />
      <!-- 취소 버튼 클릭 시, 변경 사항 삭제, 변경 사항을 삭제하시겠어요? Confirm 창 띄움. 
      취소 or 삭제 
      취소 버튼 클릭 시 다시 이전 상태로, 삭제 버튼 클릭 시 파일 업로드 전 상태로 이동 -->
      <button type="button">취소</button>
      <!-- 서버로 submit 요청 -->
      <button type="button">저장</button>
    </div>
  </div>
</div>
*/

const modalTitle = createModalTitle('프로필 업데이트');
// 모달 창 닫기 버튼 생성
const modalCloseBtn = createCloseBtn('프로필 변경 모달 창 닫기 버튼', 'x-mark');
// 모달 콘텐츠 요소
const profileUploadWrapper = document.createElement('div');
const profileUploadLabel = document.createElement('label');
const profileUploadInput = document.createElement('input');
const profilePreview = document.createElement('img');
const btnList = document.createElement('div');
const cancelBtn = makeBtn('취소', ['cancel-btn', 'hidden']);
const saveBtn = makeBtn('저장', ['save-btn', 'hidden']);

profileUploadWrapper.classList.add('profile-upload');
profileUploadLabel.setAttribute('for', 'input-image');
profileUploadLabel.innerText = '+ 사진 업로드';
profileUploadInput.type = 'file';
profileUploadInput.id = 'input-image';
profileUploadInput.accept = '.jpg, .png, .gif';
profilePreview.id = 'modal-preview-image';
profilePreview.classList.add('hidden');
btnList.classList.add('btn-list');

profileUploadWrapper.appendChild(profileUploadLabel);
profileUploadWrapper.appendChild(profileUploadInput);
profileUploadWrapper.appendChild(profilePreview);
btnList.appendChild(cancelBtn);
btnList.appendChild(saveBtn);
profileUploadWrapper.appendChild(btnList);

const profileUploadModal = createModal(
  'profile-upload-modal',
  '프로필 변경',
  [modalTitle],
  profileUploadWrapper,
  modalCloseBtn,
);

export default profileUploadModal;
