import profileUploadModal from '../templates/ProfileUpdateModal.js';
import nicknameUpdateModal from '../templates/NicknameUpdateModal.js';
import passwordUpdateModal from '../templates/PasswordUpdateModal.js';
import { handleModalOpen } from '../controllers/modal.js';
import { backendBaseUrl } from '../lib/constants.js';
import {
  checkUserNameExistAPI,
  nicknameUpdateAPI,
  passwordResetMailSendAPI,
  profileUpdateAPI,
} from '../controllers/apiController.js';
import { handleInputChange } from '../lib/util.js';
import { nicknameRegExp } from '../lib/constants.js';
import {
  displayInputChecked,
  displayInputCheckedBefore,
  displayInputInvalid,
} from '../controllers/userValidate.js';

const popupArea = document.querySelector('.popup');
popupArea.insertBefore(profileUploadModal, popupArea.firstChild);
popupArea.insertBefore(nicknameUpdateModal, popupArea.firstChild);
popupArea.insertBefore(passwordUpdateModal, popupArea.firstChild);

const profileUploadModalOpenBtn = document.querySelector('.profile-update');
const profileUploadModalElem = document.querySelector('.profile-upload-modal');
const profileUploadModalCloseBtn =
  profileUploadModal.querySelector('.modal__close-btn');
const profileUploadBtn = profileUploadModal.querySelector(
  '.profile-upload label',
);
const profileUploadInput = profileUploadModalElem.querySelector('#input-image');
const previewImage = profileUploadModalElem.querySelector(
  '#modal-preview-image',
);
const uploadCancelBtn = profileUploadModalElem.querySelector('.cancel-btn');
const profileSaveBtn = profileUploadModalElem.querySelector('.save-btn');
const nicknameUpdateModalOpenBtn = document.querySelector('.nickname-change');
const nicknameUpdateModalElem = document.querySelector(
  '.nickname-update-modal',
);
const nicknameUpdateModalCloseBtn =
  nicknameUpdateModalElem.querySelector('.modal__close-btn');
const nicknameInput = nicknameUpdateModalElem.querySelector('#nickname');
const nicknameCheckBtn =
  nicknameUpdateModalElem.querySelector('.nickname-check');
const errorMessage = nicknameUpdateModalElem.querySelector('.error-message');
const nicknameUpdateCancelBtn =
  nicknameUpdateModalElem.querySelector('.cancel-btn');
const nicknameUpdateBtn = nicknameUpdateModalElem.querySelector('.update-btn');
const passwordUpdateModalOpenBtn = document.querySelector('.password-change');
const passwordUpdateModalElem = document.querySelector(
  '.password-update-modal',
);
const passwordUpdateModalCloseBtn =
  passwordUpdateModalElem.querySelector('.modal__close-btn');
const sendMailReqBtn =
  passwordUpdateModalElem.querySelector('.send-mail-req-btn');
const myProfile = document.querySelector('#preview-image');
const myEmailInfo = document.querySelector(
  '.editUserInfo__password .info-wrap span',
);
const myNameInfo = document.querySelector(
  '.editUserInfo__nickname .info-wrap span',
);

const handleUserProfileUpload = evt => {
  const input = evt.target;

  // 인풋 태그에 파일이 있는 경우
  if (input.files && input.files[0]) {
    // FileReader 인스턴스 생성
    const reader = new FileReader();

    // 이미지가 로드된 경우
    reader.addEventListener('load', evt => {
      profileUploadBtn.classList.add('hidden');
      previewImage.classList.remove('hidden');
      uploadCancelBtn.classList.remove('hidden');
      profileSaveBtn.classList.remove('hidden');
      previewImage.src = evt.target.result;
    });

    // reader가 이미지 읽도록 하기
    reader.readAsDataURL(input.files[0]);
  }
};
const handleProfileUploadModalReset = () => {
  // 파일 업로드 전 상태로 되돌아간다.
  profileUploadBtn.classList.remove('hidden');
  previewImage.classList.add('hidden');
  uploadCancelBtn.classList.add('hidden');
  profileSaveBtn.classList.add('hidden');
};
const handleNickUpdateModalReset = () => {
  // 닉네임 인풋 처음 상태로
  nicknameInput.disabled = false;
  nicknameInput.classList.remove('input-validated');
  nicknameInput.value = '';
  nicknameInput.focus();
  // 메시지 초기화
  errorMessage.innerText = '';
  // 중복확인 버튼 처음 상태로
  displayInputCheckedBefore(nicknameCheckBtn);
  //  취소, 업데이트 버튼 비활성화
  nicknameUpdateCancelBtn.classList.add('hidden');
  nicknameUpdateBtn.classList.add('hidden');
};

// 모달 창 열기/닫기 제어
profileUploadModalOpenBtn.addEventListener('click', evt =>
  handleModalOpen(evt, profileUploadModal),
);
profileUploadModalCloseBtn.addEventListener('click', evt =>
  handleModalOpen(evt, profileUploadModal),
);
nicknameUpdateModalOpenBtn.addEventListener('click', evt =>
  handleModalOpen(evt, nicknameUpdateModal),
);
nicknameUpdateModalCloseBtn.addEventListener('click', evt => {
  handleModalOpen(evt, nicknameUpdateModal);
  handleNickUpdateModalReset();
});
passwordUpdateModalOpenBtn.addEventListener('click', evt =>
  handleModalOpen(evt, passwordUpdateModal),
);
passwordUpdateModalCloseBtn.addEventListener('click', evt =>
  handleModalOpen(evt, passwordUpdateModal),
);

// 이미지 파일이 업로드되면,
profileUploadInput.addEventListener('change', handleUserProfileUpload);
// 이미지 파일 업로드 취소 버튼 클릭 시,
uploadCancelBtn.addEventListener('click', handleProfileUploadModalReset);

const handleSaveProfileImg = async evt => {
  try {
    // 로컬 스토리지에 저장된 사용자 id 불러오기
    const myData = JSON.parse(localStorage.getItem('me'));
    const userId = myData.id;
    // 백엔드로 보낼 폼 데이터 만들기
    const formData = new FormData();
    formData.append('image_path', profileUploadInput.files[0]);
    // 백엔드에 프로필 사진을 전송한다.
    const response = await profileUpdateAPI(userId, formData);
    if (response.status === 200) {
      alert('프로필 업데이트가 완료되었습니다.');
      // 업데이트 완료된 후, 프로필 업데이트 모달 창이 닫힌다.
      handleModalOpen(evt, profileUploadModal);
      // 로컬 스토리지에 업데이트된 이미지 경로 저장
      const updatedImagePath = response.data.updatedImagePath;
      myData.imagePath = updatedImagePath;
      localStorage.setItem('me', JSON.stringify(myData));
      // 사용자 프로필 업데이트
      myProfile.src = `${backendBaseUrl}${updatedImagePath.replace(
        '/uploads',
        '',
      )}`;
    }
    // 응답으로 새로운 프로필 사진의 저장 경로 값을 받아온다.
  } catch (err) {
    console.error(err);
  }
};

const handleNicknameCheck = async evt => {
  try {
    const formData = { name: nicknameInput.value };
    // 백엔드에 닉네임 존재 여부 확인
    const response = await checkUserNameExistAPI(formData);
    if (response.status === 200) {
      //  취소, 업데이트 버튼 활성화
      nicknameUpdateCancelBtn.classList.remove('hidden');
      nicknameUpdateBtn.classList.remove('hidden');
      // 중복확인 버튼 스타일링(인풋 데이터 체크 완료)
      displayInputChecked(nicknameCheckBtn);
      // 인풋 비활성화 상태로 변경
      nicknameInput.disabled = true;
      nicknameInput.classList.remove('input-correct');
      nicknameInput.classList.add('input-validated');
      // 입력한 [nicknameInput.value] 은(는) 사용 가능한 닉네임입니다.
      errorMessage.innerText = `입력하신 [${nicknameInput.value}] 은(는) 사용 가능한 닉네임입니다.`;
    }
  } catch (err) {
    console.error(err);
    // 인풋 데이터 검증 결과 불만족
    displayInputInvalid({
      inputElem: nicknameInput,
      btnElem: nicknameCheckBtn,
    });
    // 인풋 커서 활성화
    nicknameInput.focus();
    // 입력한 [nicknameInput.value] 은(는) 이미 존재하는 닉네임입니다.
    errorMessage.innerText = `입력하신 [${nicknameInput.value}] 은(는) 이미 존재하는 닉네임입니다.`;
  }
};
const handleNicknameUpdate = async evt => {
  try {
    // 로컬 스토리지에 저장된 사용자 id 불러오기
    const myData = JSON.parse(localStorage.getItem('me'));
    const userId = myData.id;
    const formData = { name: nicknameInput.value };
    // 닉네임 업데이트 요청
    const response = await nicknameUpdateAPI(userId, formData);
    if (response.status === 200) {
      alert('닉네임 업데이트가 완료되었습니다.');
      // 업데이트 완료된 후, 닉네임 업데이트 모달 창이 닫힌다.
      handleModalOpen(evt, nicknameUpdateModal);
      // 로컬 스토리지에 업데이트된 이미지 경로 저장
      const updatedNickname = response.data.updatedNickname;
      myData.nickname = updatedNickname;
      localStorage.setItem('me', JSON.stringify(myData));
      // 사용자 닉네임 업데이트
      myNameInfo.innerText = updatedNickname;
    }
  } catch (err) {
    console.error(err);
  }
};
const handleSendMail = async evt => {
  try {
    // 로컬 스토리지에 저장된 사용자 id 불러오기
    const myData = JSON.parse(localStorage.getItem('me'));
    const userId = myData.id;

    const formData = { email: myData.email };
    const response = await passwordResetMailSendAPI(userId, formData);
    if (response.status === 200) {
      alert('이메일 전송이 완료되었습니다.');
    }
  } catch (err) {
    console.error(err);
  }
};

// 이미지 파일 저장 버튼 클릭 시,
profileSaveBtn.addEventListener('click', handleSaveProfileImg);
// 닉네임 인풋에 값을 입력하는데 규칙을 만족시킬 경우에만 중복확인 버튼 활성화
nicknameInput.addEventListener('input', evt =>
  handleInputChange(evt, 'nickname', nicknameRegExp, nicknameCheckBtn),
);
// 닉네임 중복 확인 버튼 클릭 시,
nicknameCheckBtn.addEventListener('click', handleNicknameCheck);
nicknameUpdateCancelBtn.addEventListener('click', handleNickUpdateModalReset);
// 백엔드에 변경할 닉네임 업데이트 요청
nicknameUpdateBtn.addEventListener('click', handleNicknameUpdate);
sendMailReqBtn.addEventListener('click', handleSendMail);

window.addEventListener('DOMContentLoaded', evt => {
  // 현재 로그인한 사용자 정보 불러오기
  let myInfo = localStorage.getItem('me');
  myInfo = JSON.parse(myInfo);
  const { email, nickname, imagePath } = myInfo;

  myProfile.src = `${backendBaseUrl}${imagePath.replace('/uploads', '')}`;
  myEmailInfo.innerText = email;
  myNameInfo.innerText = nickname;
});
