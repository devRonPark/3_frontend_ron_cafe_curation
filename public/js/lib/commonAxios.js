// axios 인스턴스 만들 때 구성 기본 값 설정
// 라이브러리의 timeout 기본 값은 2.5초
// 인스턴스의 모든 요청은 2.5초 간만 대기한 후 타임아웃 처리.
const instance = axios.create({
  baseURL: 'https://backend.jjincafe-in-seoul.com/',
  timeout: 2500,
});

export default instance;
