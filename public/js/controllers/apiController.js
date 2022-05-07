import { backendBaseUrl } from '../lib/constants.js';

axios.defaults.withCredentials = true;
// 닉네임 존재 여부 확인
export const checkUserNameExistAPI = async formData => {
  const response = await axios.post(
    `${backendBaseUrl}/api/auth/local/property/name`,
    formData,
  );
  return response;
};
// 이메일 존재 여부 확인
export const checkEmailExistAPI = async formData => {
  const response = await axios.post(
    `${backendBaseUrl}/api/auth/local/property/email`,
    formData,
  );
  return response;
};
// 이메일 인증용 메일 발송
export const sendAuthEmailAPI = async formData => {
  const response = await axios.post(
    `${backendBaseUrl}/api/auth/email`,
    formData,
  );
  return response;
};
// 인증번호 일치 여부 확인
export const checkVerifyNumberAPI = async formData => {
  const response = await axios.post(
    `${backendBaseUrl}/api/auth/email-verify`,
    formData,
  );
  return response;
};
// 사용자 로그인 여부 확인
export const checkUserLoggedInAPI = async () => {
  const response = await axios.get(`${backendBaseUrl}/api/auth/session-check`);
  return response;
};
// 아이디 찾기 페이지에서 사용자 이메일 찾기
export const findEmailAPI = async formData => {
  const response = await axios.post(
    `${backendBaseUrl}/api/users/find-email`,
    formData,
  );
  return response;
};
// 비밀번호 찾기 페이지에서 사용자 존재 여부 확인
export const checkUserExistAPI = async formData => {
  const response = await axios.post(
    `${backendBaseUrl}/api/users/find-user`,
    formData,
  );
  return response;
};
// 백엔드 서버로 회원가입 요청
export const registerUserAPI = async formData => {
  const response = await axios.post(
    `${backendBaseUrl}/api/auth/local/new-user`,
    formData,
    {
      'Content-type': 'multipart/form-data',
    },
  );
  return response;
};
// 백엔드 서버로 로그인 요청
export const loginAPI = async formData => {
  const response = await axios.post(
    `${backendBaseUrl}/api/auth/local`,
    formData,
    {
      withCredentials: true,
    },
  );
  return response;
};
// 백엔드 서버로 로그아웃 요청
export const logoutReq = () => {
  return axios.delete(`${backendBaseUrl}/api/auth/local`, {
    withCredentials: true,
  });
};
// 백엔드 서버로 프로필 업데이트 요청
export const profileUpdateAPI = async (userId, formData) => {
  const response = await axios.patch(
    `${backendBaseUrl}/api/users/${userId}/profile`,
    formData,
    {
      'Content-type': 'multipart/form-data',
    },
  );
  return response;
};
// 백엔드 서버로 닉네임 업데이트 요청
export const nicknameUpdateAPI = async (userId, formData) => {
  const response = await axios.patch(
    `${backendBaseUrl}/api/users/${userId}`,
    formData,
    {
      'Content-type': 'application/json',
    },
  );
  return response;
};
// 임시 비밀번호 발급 메일 발송
export const tempPwdResetMailSendAPI = async formData => {
  const response = await axios.post(
    `${backendBaseUrl}/api/users/forget-password/send`,
    formData,
  );
  return response;
};
// 백엔드 서버로 비밀번호 초기화 메일 발송 요청
export const passwordResetMailSendAPI = async (userId, formData) => {
  const response = await axios.post(
    `${backendBaseUrl}/api/users/${userId}/reset-password/send`,
    formData,
  );
  return response;
};
// 백엔드 서버로 비밀번호 업데이트 요청
export const passwordUpdateAPI = async (pathname, formData) => {
  const apiPath = pathname.replace('reset-password', 'password');
  const response = await axios.patch(
    `${backendBaseUrl}/api${apiPath}`,
    formData,
  );
  return response;
};
// 카페 데이터 불러오기
export const getCafeListAPI = async pageNum => {
  const response = await axios.get(
    `${backendBaseUrl}/api/cafes/?page=${pageNum}`,
  );
  return response;
};
// 카페 정보 검색
export const findCafeListAPI = async (searchOption, pageNum) => {
  const { searchText, city, gu, dong } = searchOption;
  const params = `${searchText ? `name=${searchText}&` : ''}${
    city && !(city === '시 선택') ? `city=${city}&` : ''
  }${gu && !(gu === '구 선택') ? `gu=${gu}&` : ''}${
    dong && !(dong === '동 선택') ? `dong=${dong}&` : ''
  }${pageNum && `page=${pageNum}`}`;
  const response = await axios.get(
    `${backendBaseUrl}/api/cafes/search?${params}`,
  );
  return response;
};
// 카페 상세 정보 가져오기
export const getCafeDetailInfoAPI = async cafeId => {
  const response = await axios.get(`${backendBaseUrl}/api/cafes/${cafeId}`);

  return response;
};
// 카페 리뷰 데이터 불러오기
export const getCafeReviewsAPI = async cafeId => {
  const response = await axios.get(
    `${backendBaseUrl}/api/cafes/${cafeId}/reviews`,
  );
  return response;
};
// 카페 좋아요 눌렀는지 여부 체크
export const getCafeUserLikeOrNotAPI = async (cafeId, userId) => {
  const response = await axios.get(
    `${backendBaseUrl}/api/cafes/${cafeId}/likes/${userId}`,
  );
  return response;
};
// 카페 좋아요 수 조회
export const getCafeLikeCountAPI = async cafeId => {
  const response = await axios.get(
    `${backendBaseUrl}/api/cafes/${cafeId}/likes`,
  );
  return response;
};
// 카페 평균 평점 조회
export const getCafeAverageRatingsAPI = async cafeId => {
  const response = await axios.get(
    `${backendBaseUrl}/api/cafes/${cafeId}/ratings`,
  );
  return response;
};

// 카페 리뷰 등록하기
export const registerReviewAPI = async (cafeId, formData) => {
  const response = await axios.post(
    `${backendBaseUrl}/api/cafes/${cafeId}/reviews`,
    formData,
    {
      withCredentials: true,
    },
  );
  return response;
};
// 내가 작성한 카페 리뷰 데이터 불러오기
export const getMyCafeReviewsAPI = async userId => {
  const response = await axios.get(
    `${backendBaseUrl}/api/users/${userId}/reviews`,
  );
  return response;
};
// 현재 로그인한 사용자 이름 데이터 가져오기
export const getLoggedInUsernameAPI = async () => {
  const response = await axios.get(
    `${backendBaseUrl}/api/users/logged-in/name`,
  );
  return response;
};
// 현재 로그인한 사용자 이메일 데이터 가져오기
export const getLoggedInUserEmailReq = userId => {
  return axios({
    method: 'get',
    url: `${backendBaseUrl}/api/users/${userId}/email`,
  });
};
// 현재 로그인한 사용자 계정 비밀번호 일치 여부 파악하기
export const checkIsPwdSameAPI = async (userId, formData) => {
  const response = await axios.post(
    `${backendBaseUrl}/api/users/${userId}/password`,
    formData,
    {
      withCredentials: true,
    },
  );
  return response;
};
// 회원 탈퇴
export const deleteUserAPI = async userId => {
  const response = await axios.delete(`${backendBaseUrl}/api/users/${userId}`);
  return response;
};
// 카페 리뷰 수정하기
export const editReviewAPI = async (cafeId, reviewId, formData) => {
  const response = await axios.put(
    `${backendBaseUrl}/api/cafes/${cafeId}/reviews/${reviewId}`,
    formData,
    {
      withCredentials: true,
    },
  );
  return response;
};
// 카페 리뷰 삭제하기
export const deleteReviewReq = async (cafeId, reviewId) => {
  const response = await axios.delete(
    `${backendBaseUrl}/api/cafes/${cafeId}/reviews/${reviewId}`,
  );
  return response;
};
// 내가 좋아요 누른 카페 데이터 불러오기
export const getMyLikeCafesAPI = async userId => {
  const response = await axios.get(
    `${backendBaseUrl}/api/users/${userId}/likes`,
  );
  return response;
};
// 카페 찜하기 요청
export const likeCafeAPI = async cafeId => {
  const response = await axios.post(
    `${backendBaseUrl}/api/cafes/${cafeId}/likes`,
    null,
    {
      withCredentials: true,
    },
  );
  return response;
};
// 카페 찜하기 해제 요청
export const dislikeCafeAPI = async (cafeId, userId) => {
  const response = await axios.delete(
    `${backendBaseUrl}/api/cafes/${cafeId}/likes/${userId}`,
    null,
    {
      withCredentials: true,
    },
  );
  return response;
};
// 카페 조회 수 + 1
export const increaseCafeViewCountAPI = async (cafeId, formData) => {
  const response = await axios.post(
    `${backendBaseUrl}/api/cafes/${cafeId}/views`,
    formData,
  );
  return response;
};
// 카페 별 조회 수 조회
export const getCafeViewCountAPI = async cafeId => {
  const response = await axios.get(
    `${backendBaseUrl}/api/cafes/${cafeId}/views`,
  );
  return response;
};
