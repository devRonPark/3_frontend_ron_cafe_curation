import {
  deleteReviewReq,
  dislikeCafeAPI,
  getLoggedInUsernameAPI,
} from './apiController.js';
import { handleModalOpen } from '../controllers/modal.js';

// 관심 목록 카드 혹은 리뷰 카드의 드롭다운 메뉴 버튼 클릭 시 .btn-list 요소에 active 클래스가 붙는다.(display: block)
export const handleCardMenuListOpen = e => {
  // 이벤트 리스너가 붙은 대상
  const target = e.target;
  const selectedReviewBox =
    target.parentElement.parentElement.parentElement.parentElement;

  if (target.parentNode.classList.contains('select-menu-btn')) {
    const btnList = target.parentNode.nextSibling;

    // 카페 상세 페이지의 리뷰 카드인 경우,
    if (window.location.pathname.indexOf('/cafes') > -1) {
      // 드롭다운 메뉴 리스트에 show-block 클래스가 붙어 있지 않은 경우
      if (!btnList.classList.contains('show-block')) {
        // 리뷰 작성자 이름
        const reviewerName = selectedReviewBox.getAttribute('user-name');

        // 현재 로그인한 사용자와 리뷰 작성자 이름 일치 여부 확인
        getLoggedInUsernameReq()
          .then(response => {
            if (response.status === 200) {
              const { name } = response.data;

              if (reviewerName === name) {
                console.log('드롭다운 메뉴가 열림.');
                // 이때만 드롭다운 메뉴 열어준다.
                btnList.classList.add('show-block');
              } else {
                alert('리뷰 작성자만 접근 가능한 메뉴입니다.');
              }
            }
          })
          .catch(err => console.error(err));
        // 드롭다운 메뉴 리스트에 show-block 클래스가 붙은 경우
      } else {
        console.log('드롭다운 메뉴가 닫힘.');
        btnList.classList.remove('show-block');
      }
    } else {
      // 드롭다운 메뉴 리스트에 show-block 클래스가 붙어 있지 않은 경우
      if (!btnList.classList.contains('show-block')) {
        console.log('드롭다운 메뉴가 열림.');
        // 이때만 드롭다운 메뉴 열어준다.
        btnList.classList.add('show-block');
        // 드롭다운 메뉴 리스트에 show-block 클래스가 붙은 경우
      } else {
        console.log('드롭다운 메뉴가 닫힘.');
        btnList.classList.remove('show-block');
      }
    }
  }
};

// 드롭다운 메뉴 버튼 클릭 시 동작
export const handleCardMenuClick = evt => {
  const target = evt.target;
  const btnType = target.dataset.btnType;
  const selectedCard =
    target.parentElement.parentElement.parentElement.parentElement
      .parentElement;
  const btnList = target.parentElement.parentElement;
  console.log('btnList: ', btnList);
  const reviewId = selectedCard.getAttribute('review-id');
  const pathname = window.location.pathname;
  console.log('pathname: ', pathname);
  console.log('pathname: ', pathname.indexOf('cafes'));
  const cafeId =
    pathname.indexOf('cafes') > -1
      ? pathname.replace('/cafes/', '')
      : selectedCard.dataset.cafeId;
  const userId = localStorage.getItem('me')
    ? JSON.parse(localStorage.getItem('me')).id
    : null;

  // data-btnType: dislike || edit || delete
  if (btnType === 'dislike') {
    // 사용자 관심 목록에서 제거
    dislikeCafeAPI(cafeId, userId)
      .then(response => {
        if (response.status === 204) {
          // 카페 카드 제거
          selectedCard.remove();
        }
      })
      .catch(err => console.error(err));
  } else if (btnType === 'edit') {
    btnList.classList.remove('show-block');
    // 리뷰 수정할 수 있는 모달 창 오픈
    const ratings = selectedCard.getAttribute('star-rating');
    const comment = selectedCard.getAttribute('comment');

    const reviewWriteModal = document.querySelector('.review-write-modal');
    const reviewWriteModalFormHeading = reviewWriteModal.querySelector(
      '.review-write-form__heading',
    );
    const reviewEditBtn = reviewWriteModal.querySelector(
      '.review-write-form__submit-btn',
    );
    const reviewBox = reviewWriteModal.querySelector(
      '.review-write-form__input',
    );

    reviewWriteModal.dataset.reviewId = reviewId;
    reviewWriteModalFormHeading.innerText = '리뷰 수정하기';
    reviewEditBtn.dataset.btnType = 'edit';
    reviewEditBtn.innerText = '수정하기';
    reviewEditBtn.disabled = false;
    reviewBox.innerText = comment;
    // 평점 정보 표시
    let scoreMark = reviewWriteModal.querySelector(`#rate-${ratings}`);
    scoreMark.checked = true;

    // 리뷰 수정 모달 창 열기
    handleModalOpen(evt, reviewWriteModal);
    // 리뷰 인풋 커서 활성화
    setTimeout(() => {
      const commentLength = comment.length;

      reviewBox.focus();
      // 커서를 문장의 맨 끝으로 이동시킴.
      reviewBox.setSelectionRange(commentLength, commentLength);
    }, 50);
  } else if (btnType === 'delete') {
    // 삭제하시겠습니까? 컨펌창 띄우기
    const isReviewDelete = confirm('해당 리뷰를 삭제하시겠습니까?');
    if (isReviewDelete) {
      // 백엔드 서버에 해당 리뷰 삭제 요청
      console.log('백엔드 서버에 리뷰 데이터 삭제 요청함');
      deleteReviewReq(cafeId, reviewId)
        .then(response => {
          // 204 No Content
          if (response.status === 204) {
            alert('리뷰 삭제가 완료되었습니다.');
          }
        })
        .catch(err => console.error(err));
    }
  }
};
