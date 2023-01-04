import reviewWriteModalElem from '../templates/WriteReviewModal.js';
import {
  checkUserLoggedInAPI,
  getCafeDetailInfoAPI,
  getCafeReviewsAPI,
  getCafeUserLikeOrNotAPI,
  getCafeLikeCountAPI,
  getCafeAverageRatingsAPI,
  registerReviewAPI,
  editReviewAPI,
  likeCafeAPI,
  dislikeCafeAPI,
  increaseCafeViewCountAPI,
} from '../controllers/apiController.js';
import { backendBaseUrl } from '../lib/constants.js';
import { debounce, toStringByFormatting } from '../lib/util.js';
import { handleModalOpen } from '../controllers/modal.js';
import '../templates/MyReviewCard.js';

// 카페 상세 정보 페이지에 리뷰 작성 모달 추가
const popupArea = document.querySelector('.popup');
popupArea.insertBefore(reviewWriteModalElem, popupArea.firstChild);

// 카페 정보를 주입할 DOM 요소에 접근
const cafeThumbnailImgElem = document.querySelector('.cafe-photo .thumb img');
const cafeNameElem = document.querySelector('.cafe_title_wrap .cafe_name');
const cafeRatePointElem = document.querySelector(
  '.cafe_title_wrap .rate-point',
);
const viewCountBoxOnTop = document.querySelector('.view_count .point');
const reviewCountBoxOnTop = document.querySelector('.review_count .point');
const likeCountBoxOnTop = document.querySelector('.like_count .point');
const desktopRoadAddressElem = document.querySelector(
  '.cafe__detailInfoList .cafe__infoItemLabel--roadAddress .address-text',
);
const desktopJibunAddressElem = document.querySelector(
  '.cafe__detailInfoList .cafe__infoItemLabel--jibunAddress .address-text',
);
const mobileRoadAddressElem = document.querySelector(
  '.cafe__infoList .cafe__infoItemLabel--roadAddress .address-text',
);
const mobileJibunAddressElem = document.querySelector(
  '.cafe__infoList .cafe__infoItemLabel--jibunAddress .address-text',
);
const desktopTelElem = document.querySelector('.cafe__detailInfoList .tel td');
const mobileTelElem = document.querySelector('.cafe__infoItem .tel-text');
const updatedAtElem = document.querySelector('.update_date');
const menuDataElem = document.querySelector('.menu td');
const operHoursDataElem = document.querySelector('.operating-hours td');
const mapContainer = document.querySelector('.cafe__infoItemMapContainer');
const reviewSearchInput = document.querySelector('.review-search__input');
const reviewSearchBtn = document.querySelector('.btn-search');
const reviewBoxContainer = document.querySelector('.review-box-container');
const reviewCountBox = document.querySelector(
  '.average-rating__total-customers ',
);
const averageRatingsStarsBox = document.querySelector(
  '.average-ratings__stars',
);
const starAverageRatingScoreElem = document.querySelector(
  '.stars__average-rating-score',
);
const wannagoBtn = document.querySelector('.wannago_btn');
const likeIcon = wannagoBtn.querySelector('i');
const reviewWriteModalOpenBtn = document.querySelector('.review-write__btn');
const reviewWriteModal = document.querySelector('.review-write-modal');
const reviewWriteModalCloseBtnForDesktop = reviewWriteModal.querySelector(
  '.modal__close-btn.only-desktop',
);
const reviewWriteModalCloseBtnForMobile = reviewWriteModal.querySelector(
  '.modal__close-btn.only-mobile',
);
const starWidgetBox = reviewWriteModal.querySelector(
  '.review-write-form__star-widget',
);
const scoreOneMark = reviewWriteModal.querySelector('#rate-1');
const scoreTwoMark = reviewWriteModal.querySelector('#rate-2');
const scoreThreeMark = reviewWriteModal.querySelector('#rate-3');
const scoreFourMark = reviewWriteModal.querySelector('#rate-4');
const scoreFiveMark = reviewWriteModal.querySelector('#rate-5');
const reviewWriteInput = reviewWriteModal.querySelector(
  '.review-write-form__input',
);
const reviewWriteBtn = reviewWriteModal.querySelector(
  '.review-write-form__submit-btn',
);
let isRatingsChecked = false;
let isReviewWritten = false;

// URI에서 cafeId 값을 가져온다.
const pathname = window.location.pathname;
const cafeId = pathname.replace('/cafes/', '');
// 사용자 id
const userId = localStorage.getItem('me')
  ? JSON.parse(localStorage.getItem('me')).id
  : null;

(async () => {
  // 병렬적으로 처리하고자 하는 것들
  // getCafeDetailInfoReq, getCafeUserLikeOrNotReq, getCafeLikeCountReq, getCafeReviewsReq, getCafeAverageRatingsReq
  Promise.allSettled([
    getCafeDetailInfoAPI(cafeId),
    getCafeUserLikeOrNotAPI(cafeId, userId),
    getCafeLikeCountAPI(cafeId),
    getCafeReviewsAPI(cafeId),
    getCafeAverageRatingsAPI(cafeId),
  ])
    .then(response => {
      return response.map(elem => {
        if (elem.status === 'fulfilled') return elem.value.data;
        else if (elem.status === 'rejected') return null;
      });
    })
    .then(
      async ([
        cafeDetailInfo,
        isCafeUserLike,
        cafeLikeCount,
        cafeReviews,
        cafeAvgRatings,
      ]) => {
        const { cafeData } = cafeDetailInfo;
        const { likeCount } = cafeLikeCount;
        const { avgRatings } = cafeAvgRatings;
        const cafeInfo = cafeData;

        // 카페 메뉴 정보 동적 삽입
        if (menuData?.length > 0) {
          const ul = document.createElement('ul');
          menuDataElem.innerText = '';
          menuData.forEach(v => {
            const li = document.createElement('li');
            li.innerText = `${v.name} : ${v.price}`;
            ul.appendChild(li);
          });
          menuDataElem.appendChild(ul);
        }

        innerTextAboutCafeInfo(cafeInfo, cafeDetailInfo.message);
        showCafeLocationOnMap(cafeInfo);
        checkIsUserCafeLike(isCafeUserLike.data.message);
        innerTextAboutLikeCount(likeCount, cafeLikeCount.message);
        innerTextAboutCafeReviews(cafeInfo, cafeReviews);
        innerTextAboutAvgRatings(avgRatings, cafeAvgRatings.message);
        // 본 페이지 접근 시 카페 조회 수 + 1
        const resultOfIncreaseViews = await increaseCafeViewCountAPI(cafeId, {
          views: cafeInfo.views,
        });
        const { viewCount } = resultOfIncreaseViews.data;
        viewCountBoxOnTop.innerText = viewCount;
      },
    )
    .catch(error => {
      console.log(error);
    });

  // 카페 정보, DOM 요소에 동적 삽입
  const innerTextAboutCafeInfo = (cafeInfo, messages = null) => {
    const { name, image_path, road_address, jibun_address, tel, created_at } =
      cafeInfo;
    const updatedAt = new Date(created_at);
    // 가져온 카페 정보를 각 DOM 요소에 주입한다.
    cafeThumbnailImgElem.src =
      image_path !== '' ? image_path : '../images/cafe_thumbnail_mobile.jpg';
    cafeNameElem.innerText = name;
    desktopRoadAddressElem.innerText = road_address;
    desktopJibunAddressElem.innerText = jibun_address;
    mobileRoadAddressElem.innerText = road_address;
    mobileJibunAddressElem.innerText = jibun_address;
    desktopTelElem.innerText = tel ? tel : '준비중';
    mobileTelElem.innerText = tel ? tel : '준비중';
    updatedAtElem.innerText = `업데이트: ${toStringByFormatting(updatedAt)}`;

    // 메시지가 존재하는 경우
    messages &&
      messages.forEach(message => {
        if (message === 'CAFE_MENU_INFO_NOT_EXIST') {
          menuDataElem.innerText = '준비중';
        } else if (message === 'CAFE_OPERATING_HOURS_INFO_NOT_EXIST') {
          operHoursDataElem.innerText = '준비중';
        }
      });
  };
  // 카페 위치(위도, 경도), 카카오맵 위에 마커로 표시
  const showCafeLocationOnMap = cafeInfo => {
    const { latitude, longitude } = cafeInfo;
    if (!latitude || !longitude) return;

    const mapOption = {
      center: new kakao.maps.LatLng(latitude, longitude),
      // 지도의 중심 좌표(임의 설정)
      level: 3,
      // 지도의 확대 레벨(임의 설정)
    };

    //설정한 지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);
    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    //카카오맵 클릭 이벤트 추가
    kakao.maps.event.addListener(map, 'click', mouseEvent => {
      //클릭한 위도, 경도 정보 불러오기
      const latlng = mouseEvent.latLng;
      //마커 위치를 클릭한 위치로 이동
      marker.setPosition(latlng);
      marker.setMap(map);
    });
  };
  // 로그인한 사용자의 해당 카페 좋아요 여부 체크
  const checkIsUserCafeLike = (message = null) => {
    if (message === 'USER_LIKE_CAFE') {
      wannagoBtn.classList.add('like-active');
      likeIcon.classList.remove('far');
      likeIcon.classList.add('fas');
    }
  };
  // 카페 좋아요 수, DOM 요소에 동적 삽입
  const innerTextAboutLikeCount = (likeCount, message = null) => {
    if (message && message === 'CAFE_LIKE_COUNT_ZERO') {
      likeCountBoxOnTop.innerText = '0';
    } else {
      likeCountBoxOnTop.innerText = likeCount;
    }
  };
  // 사용자 리뷰 카드 생성
  const makeUserReviewCard = (cafeInfo, reviewData) => {
    const {
      id,
      name,
      profile_image_path,
      ratings,
      comment,
      created_at,
      updated_at,
    } = reviewData;

    const writeDate = updated_at
      ? toStringByFormatting(new Date(updated_at))
      : toStringByFormatting(new Date(created_at));
    const reviewBox = document.createElement('my-review-card');
    reviewBox.setAttribute('review-id', id);
    reviewBox.setAttribute('cafe-id', cafeId);
    reviewBox.setAttribute('cafe-name', cafeInfo.name);
    reviewBox.setAttribute('user-name', name);
    reviewBox.setAttribute(
      'user-profile',
      `${backendBaseUrl}${profile_image_path.replace('/uploads', '')}`,
    );
    reviewBox.setAttribute('star-rating', ratings);
    reviewBox.setAttribute('comment', comment);
    reviewBox.setAttribute('created-at', writeDate);
    return reviewBox;
  };
  // 각 점수 별 퍼센트 표시
  const showEveryRatingsPercentage = () => {
    const singleStarAverageBoxList = document.querySelectorAll(
      '.reviews__single-star-average',
    );
    // 각 점수 별 사용자 수
    const ratingsCountObj = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    // 각 점수 별 퍼센트 계산
    for (const prop in ratingsCountObj) {
      const ratings = prop;
      const count = ratingsCountObj[ratings];
      const percentage = count === 0 ? 0 : (count / reviewCount) * 100;
      const progressBarElem = singleStarAverageBoxList[
        ratings - 1
      ].querySelector('.progress-bar__data');
      const percentageElem = singleStarAverageBoxList[
        ratings - 1
      ].querySelector('.single-star-average__percentage');
      progressBarElem.value = percentage;
      percentageElem.innerText = `${percentage}%`;
    }
  };
  // 카페 리뷰 정보, DOM 요소에 동적 삽입
  const innerTextAboutCafeReviews = (cafeName, reviewData) => {
    const { reviewCount, reviews } = reviewData;

    if (!reviewData) {
      reviewCountBox.innerText = '총 리뷰 수(0)';
      reviewCountBoxOnTop.innerText = '0';
    } else {
      reviewCountBoxOnTop.innerText = reviewCount;
      reviewCountBox.innerText = `총 리뷰 수(${reviewCount})`;

      reviews.forEach(review => {
        const userReviewCard = makeUserReviewCard(cafeName, review);
        reviewBoxContainer.appendChild(userReviewCard);
      });
    }

    showEveryRatingsPercentage();
  };
  // 평균 점수를 기준으로 별점 표시
  const showAverageRatingsOnStars = avgRatings => {
    const starMarkList = averageRatingsStarsBox.querySelectorAll(
      '.stars__single .fa-star',
    );

    for (let i = 0; i < starMarkList.length; i++) {
      // ratings 에 따라 채워지는 별의 종류가 달라짐.
      // <i class="fas fa-star"></i>
      if (i + 1 <= avgRatings) {
        starMarkList[i].classList.remove('far');
        starMarkList[i].classList.add('fas');
      }
    }

    // 0.3
    const decimalRatings = avgRatings - Math.floor(avgRatings);
    if (decimalRatings !== 0) {
      const targetIdx = Math.ceil(avgRatings);
      // 소수점에 해당하는 스타일링 해줘야 함.
      starMarkList[targetIdx].style.gradient = `yellow: ${
        decimalRatings * 100
      }% white: ${100 - decimalRatings * 100}`;
    }
  };
  // 평점 데이터, DOM 요소에 동적 삽입
  const innerTextAboutAvgRatings = (avgRatings, message = null) => {
    // 사용자 평점 데이터가 존재하지 않는 경우
    if (
      (message && message === 'CAFE_RATINGS_NOT_EXIST') ||
      avgRatings === null
    ) {
      avgRatings = '0.0';
      // 사용자 평점 데이터가 존재하는 경우
    } else {
      avgRatings =
        avgRatings.toString().length === 1 ? `${avgRatings}.0` : avgRatings;

      // 평균 점수를 기준으로 별점 표시
      showAverageRatingsOnStars(avgRatings);
    }
    cafeRatePointElem.innerText = avgRatings;
    starAverageRatingScoreElem.innerText = `${avgRatings} / 5`;
  };
})();

// 리뷰 작성 폼에서 평점 체크
// 평점 및 리뷰 작성될 시 등록하기 버튼 disabled 해제
const handleStarMarkChecked = evt => {
  const target = evt.target;

  if (target.checked && target.checked === true) isRatingsChecked = true;
  if (isRatingsChecked && isReviewWritten) reviewWriteBtn.disabled = false;
};
// 리뷰 작성 폼에서 리뷰 작성 여부 체크
// 평점 및 리뷰 작성될 시 등록하기 버튼 disabled 해제
const handleCheckReviewInput = evt => {
  const input = evt.currentTarget;
  const inputVal = input.value;

  if (inputVal.length >= 10) isReviewWritten = true;
  if (isRatingsChecked && isReviewWritten) reviewWriteBtn.disabled = false;
};

// 사용자 작성 리뷰 등록 or 수정
const handleReviewSubmit = async evt => {
  try {
    const btn = evt.currentTarget;
    const btnType = btn.dataset.btnType;
    // 평점
    // #rate-5:checked => 5
    // #rate-4:checked => 4
    // #rate-3:checked => 3
    // #rate-2:checked => 2
    // #rate-1:checked => 1
    let ratings = 0;

    ratings = scoreFiveMark.checked
      ? 5
      : scoreFourMark.checked
      ? 4
      : scoreThreeMark.checked
      ? 3
      : scoreTwoMark.checked
      ? 2
      : scoreOneMark.checked
      ? 1
      : 0;
    // 작성 댓글
    const comment = reviewWriteInput.value;
    // 백엔드로 보내야 할 데이터
    // cafeId, userId, starRatings, comment
    const formData = { userId, ratings, comment };

    // 리뷰 등록하는 경우
    if (btnType === 'create') {
      const response = await registerReviewAPI(cafeId, formData);
      // 201 Created
      if (response.status === 201) {
        // 사용자 리뷰 저장된 후 페이지 리로드
        window.location.href = window.location.pathname;
      }
      // 리뷰 수정하는 경우
    } else if (btnType === 'edit') {
      // reviewId 는 어디서 가지고 오지?
      const reviewId = reviewWriteModal.dataset.reviewId;
      // 백엔드 서버에 리뷰 수정 요청
      const response = await editReviewAPI(cafeId, reviewId, formData);
      if (response.status === 200) {
        alert('리뷰 수정이 완료되었습니다.');
        // 사용자 리뷰 저장된 후 페이지 리로드
        window.location.href = window.location.pathname;
      }
    }
  } catch (err) {
    console.error(err);
  }
};
// 카페 좋아요 활성화 혹은 해제
const handleCafeLikeOrNot = async evt => {
  try {
    const target = evt.target;
    const likeBtn = target.parentElement;

    // 카페 좋아요 요청
    if (!likeBtn.classList.contains('like-active')) {
      // 백엔드로 카페 좋아요 요청 보내기
      const response = await likeCafeAPI(cafeId);
      const { message } = response.data;

      if (response.status === 200 && message && message === 'LOGIN_REQUIRED') {
        alert('로그인이 필요합니다.');
      } else if (response.status === 201) {
        likeBtn.classList.add('like-active');
        target.classList.remove('far');
        target.classList.add('fas');
      }
      // 카페 좋아요 해제 요청
    } else {
      target.classList.remove('fas');
      target.classList.add('far');
      // 백엔드로 카페 좋아요 해제 요청 보내기
      const response = await dislikeCafeAPI(cafeId, userId);
      if (response.status === 204) {
        likeBtn.classList.remove('like-active');
        console.log('카페 좋아요 해제 완료');
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const handleCafeReviewSearch = async evt => {
  evt.preventDefault();
  try {
    const searchText = reviewSearchInput.value;
    if (searchText === '') {
      alert('검색어를 입력해주세요.');
      return;
    }

    // searchText 를 기준으로 review-box-container에서 조회
    const reviewCardList =
      reviewBoxContainer.querySelectorAll('my-review-card');

    if (reviewCardList.length > 1) {
      reviewCardList.forEach(reviewCard => {
        if (reviewCard.getAttribute('user-name').indexOf(searchText) === -1)
          reviewCard.remove();
      });
    }
  } catch (err) {
    console.error(err);
  }
};

reviewSearchBtn.addEventListener('click', handleCafeReviewSearch);

// 리뷰 작성 모달 창 열기
reviewWriteModalOpenBtn.addEventListener('click', async evt => {
  try {
    // 백엔드에 요청하여 사용자 로그인 여부 체크
    const response = await checkUserLoggedInAPI();
    const { isUserLoggedIn } = response.data;
    if (!isUserLoggedIn) {
      // 리뷰 작성 버튼 클릭 시, 사용자가 로그인한 상태가 아닌 경우 로그인이 필요합니다. 라는 경고창 띄우기
      alert('로그인이 필요합니다.');
      return;
    }
    // 리뷰 작성 버튼 클릭 시, 사용자가 로그인한 상태라면 리뷰 작성 창 띄우기
    handleModalOpen(evt, reviewWriteModal);
  } catch (err) {
    console.error(err);
  }
});
// 리뷰 작성 모달 창 닫기
reviewWriteModalCloseBtnForDesktop.addEventListener('click', evt =>
  handleModalOpen(evt, reviewWriteModal),
);
reviewWriteModalCloseBtnForMobile.addEventListener('click', evt =>
  handleModalOpen(evt, reviewWriteModal),
);
starWidgetBox.addEventListener('click', handleStarMarkChecked);
reviewWriteInput.addEventListener('input', handleCheckReviewInput);
// 백엔드 API와 연동하여 DB에 사용자의 리뷰 정보 등록 or 수정
reviewWriteBtn.addEventListener('click', handleReviewSubmit);
// 좋아요 버튼 활성화
wannagoBtn.addEventListener('click', debounce(handleCafeLikeOrNot, 1000));
