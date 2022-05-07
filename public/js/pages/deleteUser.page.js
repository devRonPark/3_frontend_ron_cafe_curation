import {
  getLoggedInUserEmailAPI,
  checkIsPwdSameAPI,
  deleteUserAPI,
} from '../controllers/apiController.js';

// 폼
const deleteUserForm = document.querySelector('#delete-user-form');
// 계정 정보 보여주는 텍스트
const accountInfoElem = document.querySelector(
  '#delete-user-form .account-wrap .account-info',
);
// 비밀번호 인풋
const passwordInput = document.querySelector('#delete-user-form #password');
// 회원 탈퇴 버튼
const deleteUserBtn = document.querySelector(
  '#delete-user-form .delete-user-btn',
);
const userId = localStorage.getItem('me')
  ? JSON.parse(localStorage.getItem('me')).id
  : null;

const handleUserDelete = async evt => {
  const passwordValue = passwordInput.value;
  console.log('비밀번호 정보: ', passwordValue);

  // 비밀번호 일치 여부 먼저 확인
  const formData = { password: passwordValue };
  const response = await checkIsPwdSameAPI(userId, formData);
  const { isPwdMatch } = response.data;

  if (isPwdMatch) {
    alert('비밀번호가 일치함.');
    // 백엔드에 요청하여 회원 탈퇴 처리 후 응답 데이터로 deleted_at 받아와야 함.
    const response = await deleteUserAPI(userId);
    const { deleted_at } = response.data;
    alert(`${accountInfo} 님께서는 ${deleted_at} 회원에서 탈퇴하셨습니다.`);
    // 회원 탈퇴 처리 후 메인 페이지로 이동
    // window.location.href = '/';
  } else {
    alert('비밀번호가 일치하지 않습니다. 다시 입력해주시기 바랍니다.');
  }
};

(async () => {
  try {
    let accountInfo;

    // 백엔드에 요청하여 현재 로그인한 사용자 계정 정보 불러오기
    const response = await getLoggedInUserEmailAPI(userId);
    const { email } = response.data;
    accountInfo = email;
    accountInfoElem.innerText = email;

    // 회원 탈퇴 폼 엔터 누를 시,
    deleteUserForm.addEventListener('submit', handleUserDelete);
    // 회원 탈퇴 버튼 클릭 시,
    deleteUserBtn.addEventListener('click', handleUserDelete);
  } catch (err) {
    console.error(err);
  }
})();
