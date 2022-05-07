// 인터셉터와 API 파일을 사용하는 이유
// 1. 공통 부분을 인터셉터가 처리해주기 때문에 관리하기 쉽다. (헤더, baseUrl)
// 2. 실수가 줄어든다.

// axios 인스턴스 만들 때 구성 기본 값 설정
// 라이브러리의 timeout 기본 값은 2.5초
// 인스턴스의 모든 요청은 2.5초 간만 대기한 후 타임아웃 처리.
const instance = axios.create({
  timeout: 2500,
  withCredentials: true,
});

export default instance;
