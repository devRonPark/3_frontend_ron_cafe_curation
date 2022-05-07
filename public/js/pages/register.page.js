import '../controllers/modal.js';
import emailVerifyModalElem from '../templates/EmailVerifyModal.js';
import {
  checkUsernameExist,
  checkEmailExist,
  displayInputValid,
  displayInputInvalid,
  displayInputCheckedBefore,
  displayInputChecked,
  checkRegisterFormInputs,
} from '../controllers/userValidate.js';
import { handleModalOpen } from '../controllers/modal.js';
import { tenMinuteTimer } from '../lib/util.js';
import { nicknameRegExp, emailRegExp, pwdRegExp } from '../lib/constants.js';
import {
  checkVerifyNumberAPI,
  registerUserAPI,
  sendAuthEmailAPI,
} from '../controllers/apiController.js';
import { handleInputChange, handlePwdReveal } from '../lib/util.js';

// 회원가입 페이지에 이메일 인증 모달 추가
const popupArea = document.querySelector('.popup');
popupArea.insertBefore(emailVerifyModalElem, popupArea.firstChild);

const registerForm = document.querySelector('#register-form');
const inputImage = document.querySelector('#input-image');
const nicknameInputWrapper = document.querySelector('.nickname-wrap');
const emailInputWrapper = document.querySelector('.emailInput-wrap');
const userProfileInput = document.querySelector('#input-image');
const nicknameInput = document.querySelector('#nickname');
const emailInput = document.querySelector('#email-address');
const passwordInput = document.querySelector('#password');
const passwordConfirmationInput = document.querySelector(
  '#password-confirmation',
);
const nicknameCheckBtn = document.querySelector('.nickname-check');
const emailCheckBtn = document.querySelector('.email-check');
// 이메일 인증 여부를 보여주는 텍스트 요소
const verifyStatus = document.querySelector('.verify-wrap .verify-status');
// 이메일 인증 모달 창 열기 버튼
const emailVerifyBtn = document.querySelector('.email-verify-btn');
// 이메일 인증 모달 창
const emailVerifyModal = document.querySelector('.popup .email-verify-modal');
// 이메일 인증 모달 창의 이메일 정보 요소
const emailVerifyModalEmailInfo = document.querySelector(
  '.popup .email-verify-modal .check-email-form .email-info',
);
// 이메일 인증 모달 창 닫기 버튼
const emailVerifyModalCloseBtn = document.querySelector(
  '.email-verify-modal .modal__close-btn',
);
// 인증번호 전송 요청 버튼
const emailSendRequstBtn = document.querySelector(
  '.email-verify-modal .send-req-btn',
);
// 인증번호 재전송 요청 버튼
const emailResendRequstBtn = document.querySelector(
  '.email-verify-modal .resend-btn',
);
// 인증번호 입력 인풋
const verifyNumberInput = document.querySelector(
  '.email-verify-modal .verify-number-input',
);
// 인증번호 확인 버튼
const checkVerifyNumberBtn = document.querySelector(
  '.email-verify-modal .check-verify-number-btn',
);
// 이메일 수정 버튼
const emailEditBtn = document.querySelector(
  '.email-verify-modal .edit-email-btn',
);
// 인증번호 타이머 요소
const timerForVerifyNumber = document.querySelector(
  '.email-verify-modal .check-verify-number-form .timer',
);
// 비밀번호 인풋 텍스트 보여주기 버튼
const pwdRevealBtnList = document.querySelectorAll('.pwd-reveal');
// 가입하기 버튼
const registerBtn = document.querySelector('.registerBtn');

// 인증번호 타이머를 제어하는 타이머 id
let timerId;
// 닉네임 중복 여부, 이메일 중복 여부, 이메일 인증 여부를 알 수 있는 플래그
let isNicknameConfirmed = false,
  isEmailConfirmed = false,
  isEmailVerified = false;

const handleUserProfileUpload = evt => {
  const input = evt.target;

  // 인풋 태그에 파일이 있는 경우
  if (input.files && input.files[0]) {
    // FileReader 인스턴스 생성
    const reader = new FileReader();

    // 이미지가 로드된 경우
    reader.addEventListener('load', evt => {
      const previewImage = document.getElementById('preview-image');
      previewImage.src = evt.target.result;
    });

    // reader가 이미지 읽도록 하기
    reader.readAsDataURL(input.files[0]);
  }
};

const handleNicknameCheck = async evt => {
  try {
    await checkUsernameExist(nicknameInput.value);
    // 닉네임 중복 확인됨
    isNicknameConfirmed = true;
  } catch (err) {
    return;
  }
};
const handleEmailCheck = async evt => {
  try {
    await checkEmailExist(emailInput.value);
    // 이메일 중복 확인됨
    isEmailConfirmed = true;
  } catch (err) {
    return;
  }
};
// 이메일 인증 모달 창 닫기 기능
const handleEmailVerifyModalClose = evt => {
  handleModalOpen(evt, emailVerifyModal);
  // 타이머 요소 기본 값 설정 및 숨김
  timerForVerifyNumber.textContent = '10:00';
  timerForVerifyNumber.classList.remove('visible');
  // 활성화된 타이머가 있다면 강제 종료 및 타이머 아이디 값 초기화
  timerId && clearInterval(timerId);
  timerId = null;
  // 전송 요청 버튼 비활성화인 경우 전송 요청 버튼 다시 활성화 상태로
  // disabled가 false이면 true로 바꾼다.
  emailSendRequstBtn.disabled = !emailSendRequstBtn.disabled && true;
};

const handleNicknameInputClick = evt => {
  const target = evt.target;
  if (target.disabled === true) {
    // 인풋 변경할 지 여부 묻는 창 띄우기
    const isEditOrNot = confirm('변경하시겠습니까?');
    if (isEditOrNot === true) {
      target.disabled = false;
      target.focus();
      displayInputCheckedBefore(nicknameCheckBtn);
    }
  }
};
const handleEmailInputClick = evt => {
  const target = evt.target;
  if (target.disabled === true) {
    // 인풋 변경할 지 여부 묻는 창 띄우기
    const isEditOrNot = confirm('변경하시겠습니까?');
    if (isEditOrNot === true) {
      target.disabled = false;
      target.focus();
      displayInputCheckedBefore(emailCheckBtn);
    }
  }
};

const handleEmailVerifyModalOpen = evt => {
  // 이메일 입력 및 중복확인 하지 않을 시 이메일 인증 모달 창 열리지 않음.
  if (emailInput.disabled !== true) {
    alert('이메일 입력 및 중복확인을 먼저 해주시기 바랍니다!!!');
    emailInput.focus();
    return;
  }
  // 사용자가 입력한 이메일 값
  const emailValue = emailInput.value;
  // 사용자가 입력한 이메일 값으로 이메일 인증 모달 창의 이메일 주소 값 교체
  emailVerifyModalEmailInfo.textContent = emailValue;
  // 이메일 인증 모달 창 화면에 띄우기
  handleModalOpen(evt, emailVerifyModal);
};

// 이메일 인증 메일 발송 핸들러
const handleAuthEmailSend = async evt => {
  try {
    // 여러 번 전송 요청하는 걸 막아야 한다.
    // 한 번 클릭 후에 disabled 시키자.
    evt.currentTarget.disabled = true;
    // 사용자가 회원가입 시 입력한 이메일 값에 접근
    const emailValue = evt.target.parentNode.firstChild.textContent;
    // 이전에 활성화된 타이머가 있다면 강제 종료
    timerId && clearInterval(timerId);
    const formData = { email: emailValue };
    const response = await sendAuthEmailAPI(formData);

    if (response.status === 200) {
      // 인증번호 발송 완료 얼럿 창 띄우기
      alert('인증번호 발송이 완료되었습니다.');
      const responseTime = new Date();
      // 10분 간 인증메일 카운트 시작
      timerForVerifyNumber.classList.add('visible');
      timerId = tenMinuteTimer(responseTime, leftTime => {
        timerForVerifyNumber.textContent = leftTime;
      });
    }
  } catch (err) {
    console.error(err);
  }
};
// 이메일 인증 메일 재발송 핸들러
const handleAuthEmailResend = async evt => {
  try {
    const emailValue = emailInput.value;
    // 타이머 요소 기본 값으로 설정
    timerForVerifyNumber.textContent = '10:00';
    // 이전에 활성화된 타이머가 있다면 강제 종료
    timerId && clearInterval(timerId);
    // 이메일 재전송 요청
    const formData = { email: emailValue };
    const response = await sendAuthEmailAPI(formData);

    if (response.status === 200) {
      // 인증번호 발송 완료 얼럿 창 띄우기
      alert('인증번호 발송이 완료되었습니다.');
      const responseTime = new Date();
      // 10분 간 인증메일 카운트 다시 시작
      timerForVerifyNumber.classList.add('visible');
      timerId = tenMinuteTimer(responseTime, leftTime => {
        timerForVerifyNumber.textContent = leftTime;
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// 인증번호 체크 핸들러
const handleVerifyNumberCheck = async evt => {
  try {
    const formData = {
      email: emailInput.value,
      authKey: verifyNumberInput.value,
      clickedAt: new Date(),
    };
    const response = await checkVerifyNumberAPI(formData);
    const data = response.data;
    // 인증번호가 일치하여 이메일 인증이 완료된 경우
    if (data.isEmailVerified) {
      alert('이메일 인증이 완료되었습니다.');
      // 이메일 인증 모달창 DOM에서 제거
      emailVerifyModal.remove();
      // 이메일 인증되었음을 보여줌.
      verifyStatus.textContent = '인증';
      verifyStatus.style.color = '#e74c3c';
      // 이메일 인증 모달 창 열기 버튼 비활성화
      displayInputChecked(emailVerifyBtn);
      isEmailVerified = true;
      // 인증번호 불일치 이메일 인증 실패
    } else if (!data.isEmailVerified && data.desc === 'AUTH_KEY_NOT_SAME') {
      alert('인증번호가 일치하지 않습니다.');
      verifyNumberInput.textContent = '';
      verifyNumberInput.focus();
      // 인증번호 유효시간 초과로 이메일 인증 실패
    } else if (!data.isEmailVerified && data.desc === 'AUTH_KEY_EXPIRED') {
      alert(
        '인증번호의 유효시간이 초과되었습니다. 인증번호를 재발급해주시기 바랍니다.',
      );
      verifyNumberInput.textContent = '';
    }
  } catch (err) {
    console.error(err);
  }
};

// 이메일 주소 수정 핸들러
const handleEmailEdit = evt => {
  // 현재 활성화된 이메일 인증 모달 창을 종료한다.
  handleEmailVerifyModalClose(evt);
  // 이메일 주소 수정을 한다.
  // => 회원가입 내 이메일 인풋 활성화
  // => 중복확인 버튼 초기화(disabled 해제 및 버튼 콘텐츠 기본값 설정)
  emailInput.disabled = false;
  emailInput.focus();
  displayInputCheckedBefore(emailCheckBtn);
};

// 사용자 회원가입 핸들러
const handleUserRegister = async evt => {
  evt.preventDefault();
  try {
    const inputsObj = {
      userProfile: userProfileInput,
      nickname: nicknameInput,
      email: emailInput,
      password: passwordInput,
      passwordConfirmation: passwordConfirmationInput,
    };
    const inputsStatusObj = {
      isNicknameConfirmed,
      isEmailConfirmed,
      isEmailVerified,
    };
    // 서버로 전송할 회원가입 폼 데이터 객체 생성
    const registerFormData = new FormData();
    registerFormData.append('name', nicknameInput.value);
    registerFormData.append(
      'image_path',
      userProfileInput.files ? userProfileInput.files[0] : null,
    );
    registerFormData.append('email', emailInput.value);
    registerFormData.append('password', passwordInput.value);
    registerFormData.append(
      'password_confirmation',
      passwordConfirmationInput.value,
    );

    // 회원가입 폼 데이터 유효성 검증
    checkRegisterFormInputs(inputsObj, inputsStatusObj);
    // 사용자 정보 백엔드 서버로 전송
    // name, profile_image_path, email, password
    const response = await registerUserAPI(registerFormData);
    if (response.status === 201) {
      alert('회원가입이 완료되었습니다.');
      // 백엔드 서버에서 제어해야 하는 부분 : 회원가입 완료 후 로그인 페이지로 이동
      // 페이지 제어는 되도록 백엔드에서 좀 더 백엔드가 신뢰할 수 있다.
      window.location.href = '/account/login';
    }
  } catch (err) {
    console.error(err);
  }
};

// input file에 change 이벤트 부여
inputImage.addEventListener('change', handleUserProfileUpload);
// 인풋에 값을 입력하는데 각 인풋 별 규칙을 만족시킬 경우에만 중복확인 버튼 활성화
nicknameInput.addEventListener('input', evt =>
  handleInputChange(evt, 'nickname', nicknameRegExp, nicknameCheckBtn),
);
emailInput.addEventListener('input', evt =>
  handleInputChange(evt, 'email', emailRegExp, emailCheckBtn),
);
// 비밀번호 인풋 유효성 검증
passwordInput.addEventListener('input', evt =>
  handleInputChange(evt, 'password', pwdRegExp, null),
);
// 비밀번호 재입력 인풋 유효성 검증
passwordConfirmationInput.addEventListener('input', evt => {
  if (passwordConfirmationInput.value === passwordInput.value) {
    displayInputValid({ inputElem: passwordConfirmationInput });
  } else {
    displayInputInvalid({ inputElem: passwordConfirmationInput });
  }
});
// 중복확인 체크 기능
nicknameCheckBtn.addEventListener('click', handleNicknameCheck);
emailCheckBtn.addEventListener('click', handleEmailCheck);
// 닉네임 수정 기능 => 변경하시겠습니까? 묻는 창 띄우기
nicknameInputWrapper.addEventListener('click', handleNicknameInputClick);
// 이메일 수정 기능 => 변경하시겠습니까? 묻는 창 띄우기
emailInputWrapper.addEventListener('click', handleEmailInputClick);
// 이메일 인증 모달 창 열기
emailVerifyBtn.addEventListener('click', handleEmailVerifyModalOpen);
// 이메일 인증 모달 창 닫기
emailVerifyModalCloseBtn.addEventListener('click', handleEmailVerifyModalClose);
// 인증번호 이메일로 전송 요청 기능
emailSendRequstBtn.addEventListener('click', handleAuthEmailSend);
// 인증번호 이메일로 재전송 요청 기능
emailResendRequstBtn.addEventListener('click', handleAuthEmailResend);
// 인증번호 확인 기능
checkVerifyNumberBtn.addEventListener('click', handleVerifyNumberCheck);
// 이메일 주소 수정 기능
emailEditBtn.addEventListener('click', handleEmailEdit);
// 비밀번호 보기/숨기기 기능
pwdRevealBtnList.forEach(pwdRevealBtn => {
  pwdRevealBtn.addEventListener('click', handlePwdReveal);
});
// 회원가입 하기
registerForm.addEventListener('submit', handleUserRegister);
registerBtn.addEventListener('click', handleUserRegister);
