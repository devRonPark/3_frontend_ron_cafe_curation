import reviewWriteModalElem from '../templates/WriteReviewModal.js';
import {
  getMyCafeReviewsAPI,
  getMyLikeCafesAPI,
} from '../controllers/apiController.js';
import { backendBaseUrl } from '../lib/constants.js';
import { toStringByFormatting } from '../lib/util.js';
import '../templates/MyReviewCard.js';
import createUserLikeCafeCard from '../templates/UserLikeCafeCard.js';

// 마이 페이지에 리뷰 작성 모달 추가
const popupArea = document.querySelector('.popup');
popupArea.insertBefore(reviewWriteModalElem, popupArea.firstChild);

// 내가 좋아요 누른 카페 데이터 컨테이너
const myCafeLikesContainer = document.querySelector('#my_likes-content');
// 내가 리뷰 남긴 카페 데이터 컨테이너
const myReviewContainer = document.querySelector('#my_reviews-content');
const myReviewCardsList = document.createElement('div');
myReviewCardsList.classList.add('review-list');
const myLikeCafeCardList = document.createElement('ul');
myLikeCafeCardList.classList.add('cafe-list');
const userId = localStorage.getItem('me')
  ? JSON.parse(localStorage.getItem('me')).id
  : null;

(async () => {
  try {
    const [myLikeCafes, myCafeReviews] = await Promise.all([
      getMyLikeCafesAPI(userId),
      getMyCafeReviewsAPI(userId),
    ]);

    // 내가 좋아요 누른 카페 데이터 불러오기
    if (myLikeCafes.status === 200) {
      const { message, likes } = myLikeCafes.data;
      if (message && message === 'MY_LIKE_CAFES_NOT_EXIST') {
        return;
      }
      likes.forEach(cafe => {
        console.log('cafe: ', cafe);
        const myLikeCafeCard = createUserLikeCafeCard(cafe);
        myLikeCafeCardList.appendChild(myLikeCafeCard);
      });

      myCafeLikesContainer.appendChild(myLikeCafeCardList);
    }

    // 내가 쓴 리뷰 데이터 불러오기
    if (myCafeReviews.status === 200) {
      const { message, reviews } = myLikeCafes.data;
      if (message && message === 'MY_CAFE_REVIEWS_NOT_EXIST') {
        return;
      }
      reviews.forEach(review => {
        const {
          review_id,
          cafe_id,
          cafe_name,
          user_name,
          profile_image_path,
          ratings,
          comment,
          created_at,
          updated_at,
        } = review;
        const writeDate = updated_at
          ? toStringByFormatting(new Date(updated_at))
          : toStringByFormatting(new Date(created_at));

        const myReviewCard = document.createElement('my-review-card');
        myReviewCard.setAttribute('review-id', review_id);
        myReviewCard.setAttribute('cafe-id', cafe_id);
        myReviewCard.setAttribute('cafe-name', cafe_name);
        myReviewCard.setAttribute('user-name', user_name);
        myReviewCard.setAttribute(
          'user-profile',
          `${backendBaseUrl}${profile_image_path.replace('/uploads', '')}`,
        );
        myReviewCard.setAttribute('star-rating', ratings);
        myReviewCard.setAttribute('comment', comment);
        myReviewCard.setAttribute('created-at', writeDate);
        myReviewCardsList.appendChild(myReviewCard);
      });
      myReviewContainer.appendChild(myReviewCardsList);
    }
  } catch (err) {
    console.error(err);
  }
})();
