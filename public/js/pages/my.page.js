import createCardList from '../templates/CardList.js';

const cafeDataObj = [
  {name: "카페 퍼블리코", address: "동작구 대방동 395-18 헬로우빌딩 B동 1, 2층"},
  {name: "카페 퍼블리코", address: "동작구 대방동 395-18 헬로우빌딩 B동 1, 2층"},
  {name: "카페 퍼블리코", address: "동작구 대방동 395-18 헬로우빌딩 B동 1, 2층"},
  {name: "카페 퍼블리코", address: "동작구 대방동 395-18 헬로우빌딩 B동 1, 2층"},
  {name: "카페 퍼블리코", address: "동작구 대방동 395-18 헬로우빌딩 B동 1, 2층"},
  {name: "카페 퍼블리코", address: "동작구 대방동 395-18 헬로우빌딩 B동 1, 2층"},
  {name: "카페 퍼블리코", address: "동작구 대방동 395-18 헬로우빌딩 B동 1, 2층"},
  {name: "카페 퍼블리코", address: "동작구 대방동 395-18 헬로우빌딩 B동 1, 2층"},
  {name: "카페 퍼블리코", address: "동작구 대방동 395-18 헬로우빌딩 B동 1, 2층"},
  {name: "카페 퍼블리코", address: "동작구 대방동 395-18 헬로우빌딩 B동 1, 2층"}
];

const myCafeLikesContainer = document.querySelector('#my_likes-content');
const cafeCardList = createCardList(cafeDataObj);

myCafeLikesContainer.appendChild(cafeCardList);
