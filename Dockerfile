# 가져올 이미지 정의
FROM node:16
#app 폴더 만들기 - NodeJS 어플리케이션 폴더
RUN mkdir -p /app
# 경로 설정하기
WORKDIR /app
# package.json 워킹 디렉토리에 복사
COPY package.json .
# 명령어 실행 (의존성 설치)
RUN npm install
# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
COPY . .
# 3000번 포트 노출
EXPOSE 3000
# npm start 스크립트 실행
CMD ["npm", "start"]
