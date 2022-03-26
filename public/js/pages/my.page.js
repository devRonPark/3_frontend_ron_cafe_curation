import '../templates/Header.js';
import '../templates/Popup.js';
import createCardList from '../templates/CardList.js';
import '../templates/MyReviewCard.js';

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
const reviewDataObj = [
  {cafeName: '카페 퍼블리코', userName: '박병찬', userProfile: '../images/1.jpg', starRating: "4", comment: '이 카페는 아주 분위기가 좋은 카페입니다.', createdAt: '25분 전'},
  {cafeName: '카페 퍼블리코', userName: '박병찬', userProfile: '../images/1.jpg', starRating: "4", comment: '이 카페는 아주 분위기가 좋은 카페입니다.', createdAt: '25분 전'},
  {cafeName: '카페 퍼블리코', userName: '박병찬', userProfile: '../images/1.jpg', starRating: "4", comment: '이 카페는 아주 분위기가 좋은 카페입니다.', createdAt: '25분 전'},
  {cafeName: '카페 퍼블리코', userName: '박병찬', userProfile: '../images/1.jpg', starRating: "4", comment: '이 카페는 아주 분위기가 좋은 카페입니다.', createdAt: '25분 전'},
  {cafeName: '카페 퍼블리코', userName: '박병찬', userProfile: '../images/1.jpg', starRating: "4", comment: '이 카페는 아주 분위기가 좋은 카페입니다.', createdAt: '25분 전'},
  {cafeName: '카페 퍼블리코', userName: '박병찬', userProfile: '../images/1.jpg', starRating: "4", comment: '이 카페는 아주 분위기가 좋은 카페입니다.', createdAt: '25분 전'},
  {cafeName: '카페 퍼블리코', userName: '박병찬', userProfile: '../images/1.jpg', starRating: "4", comment: '이 카페는 아주 분위기가 좋은 카페입니다.', createdAt: '25분 전'},
  {cafeName: '카페 퍼블리코', userName: '박병찬', userProfile: '../images/1.jpg', starRating: "4", comment: '이 카페는 아주 분위기가 좋은 카페입니다.', createdAt: '25분 전'},
  {cafeName: '카페 퍼블리코', userName: '박병찬', userProfile: '../images/1.jpg', starRating: "4", comment: '이 카페는 아주 분위기가 좋은 카페입니다.', createdAt: '25분 전'},
  {cafeName: '카페 퍼블리코', userName: '박병찬', userProfile: '../images/1.jpg', starRating: "4", comment: '이 카페는 아주 분위기가 좋은 카페입니다.', createdAt: '25분 전'},
  {cafeName: '카페 퍼블리코', userName: '박병찬', userProfile: '../images/1.jpg', starRating: "4", comment: '이 카페는 아주 분위기가 좋은 카페입니다.', createdAt: '25분 전'},
]

const myCafeLikesContainer = document.querySelector('#my_likes-content');
const myReviewContainer = document.querySelector('#my_reviews-content');
const cafeCardList = createCardList(cafeDataObj);

const myReviewCardsList = document.createElement('div');
myReviewCardsList.classList.add('review-list');
reviewDataObj.forEach(reviewData => {
  const {cafeName, userName, userProfile, starRating, comment, createdAt} = reviewData;
  const myReviewCard = document.createElement('my-review-card');
  myReviewCard.setAttribute('cafe-name', cafeName);
  myReviewCard.setAttribute('user-name', userName);
  myReviewCard.setAttribute('user-profile', userProfile);
  myReviewCard.setAttribute('star-rating', starRating);
  myReviewCard.setAttribute('comment', comment);
  myReviewCard.setAttribute('created-at', createdAt);
  myReviewCardsList.append(myReviewCard);
})

myCafeLikesContainer.appendChild(cafeCardList);
myReviewContainer.appendChild(myReviewCardsList);
