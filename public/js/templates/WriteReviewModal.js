import { createModal } from '../components/modal/Modal.js';
import createCloseBtn from '../components/button/CloseButton.js';

/*
<div class="review-write-modal">
  <div class="modal-top">
    <button type="button" class="desktop-close-btn only-desktop">
      <i class="fa fa-close"></i>
      <span class="screen-reader-text">닫기</span>
    </button>
    <button type="button" class="mobile-close-btn only-mobile">
      <i class="fa fa-arrow-left"></i>
      <span class="screen-reader-text">닫기</span>
    </button>
  </div>
  <div class="modal-content">
    <form class="review-write-form">
      <div class="review-write-form__heading">리뷰 작성하기</div>
      <div class="review-write-form__star-widget">
        <input type="radio" name="rate" id="rate-5" />
        <label for="rate-5" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-4" />
        <label for="rate-4" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-3" />
        <label for="rate-3" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-2" />
        <label for="rate-2" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-1" />
        <label for="rate-1" class="fas fa-star"></label>
        <span class="emoji-wrap"></span>
      </div>
      <textarea
        class="review-write-form__input"
        placeholder="리뷰를 작성하세요."
      ></textarea>
      <button class="review-write-form__submit-btn" type="submit" disabled>
        등록하기
      </button>
    </form>
  </div>
</div>
*/

// 리뷰 작성창 컴포넌트화하기
// 모달 창 닫기 버튼 생성
const closeBtnForDesktop = createCloseBtn(
  '리뷰 작성 모달 창 닫기 버튼',
  'x-mark',
  'desktop',
);
closeBtnForDesktop.classList.add('desktop-close-btn');
const closeBtnForMobile = createCloseBtn(
  '리뷰 작성 모달 창 닫기 버튼',
  'arrow-left',
  'mobile',
);
closeBtnForMobile.classList.add('mobile-close-btn');

const closeBtnList = [closeBtnForDesktop, closeBtnForMobile];
// 모달 콘텐츠 요소
const createStarShape = id => {
  const radioInput = document.createElement('input');
  const inputLabel = document.createElement('label');
  radioInput.type = 'radio';
  radioInput.id = id;
  radioInput.name = 'rate';
  inputLabel.classList.add(...['fas', 'fa-star']);
  inputLabel.htmlFor = id;

  return [radioInput, inputLabel];
};
const createReviewWriteForm = () => {
  const form = document.createElement('form');
  const formHeading = document.createElement('div');
  const formStarWidget = document.createElement('div');
  const emojiWrapper = document.createElement('span');
  const reviewWriteInput = document.createElement('textarea');
  const reviewWriteBtn = document.createElement('button');

  form.classList.add('review-write-form');
  formHeading.classList.add('review-write-form__heading');
  formStarWidget.classList.add('review-write-form__star-widget');
  emojiWrapper.classList.add('emoji-wrap');

  // 평점 모양
  for (let i = 5; i >= 1; i--) {
    const [radioInput, inputLabel] = createStarShape(`rate-${i}`);
    formStarWidget.appendChild(radioInput);
    formStarWidget.appendChild(inputLabel);
  }
  formStarWidget.appendChild(emojiWrapper);

  // 리뷰 작성 인풋
  reviewWriteInput.placeholder = '리뷰를 작성하세요.';
  reviewWriteInput.classList.add('review-write-form__input');
  // 리뷰 작성 버튼
  reviewWriteBtn.innerText = '등록하기';
  reviewWriteBtn.classList.add('review-write-form__submit-btn');
  reviewWriteBtn.type = 'button';
  reviewWriteBtn.dataset.btnType = 'create';
  reviewWriteBtn.disabled = true;

  formHeading.innerText = '리뷰 작성하기';

  form.appendChild(formHeading);
  form.appendChild(formStarWidget);
  form.appendChild(reviewWriteInput);
  form.appendChild(reviewWriteBtn);
  return form;
};
const reviewWriteForm = createReviewWriteForm();
const reviewWriteModalElem = createModal(
  'review-write-modal',
  '리뷰 작성 창',
  null,
  reviewWriteForm,
  closeBtnList,
);

export default reviewWriteModalElem;
