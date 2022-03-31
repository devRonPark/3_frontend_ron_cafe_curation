/* 네비게이션 모달 창 관련 요소 */
const navBtn = document.querySelector('.header__nav .header__nav-btn');
const navModal = document.querySelector('.popup .nav-modal');
const navModalCloseBtn = document.querySelector(
  '.nav-modal .modal__top .modal__close-btn',
);

/* 검색 모달 창 관련 요소 */
const searchBtn = document.querySelector('.header__search-btn');
const searchModal = document.querySelector('.popup .search-modal');
const searchModalCloseBtn = document.querySelector(
  '.search-modal .modal__close-btn',
);
/* 검색 필터 모달 창 관련 요소 */
const searchFilterBtn = document.querySelector(
  '.search-filter .search-filter__btn',
);
const searchFilterModal = document.querySelector('.popup .search-filter-modal');
const searchFilterCloseBtn = document.querySelector(
  '.popup .search-filter-modal .modal__top .modal__close-btn',
);
// 공통 모달 오버레이 요소
const modalOverlay = document.querySelector('.popup .modal-overlay');

// 모달 창 열기 및 닫기
export const handleModalOpen = (evt, domElem) => {
  console.log(domElem);
  // window.getComputedStyle() : 엘리먼트에 최종적으로 적용된 모든 CSS 속성 값을 담은 객체
  if (window.getComputedStyle(domElem).flexDirection === 'column') {
    domElem.classList.toggle('show-flex');
  } else {
    domElem.classList.toggle('show-block');
  }
};

// navigation 메뉴 버튼 클릭 시 메뉴 모달 창 활성화
navBtn.addEventListener('click', evt => handleModalOpen(evt, navModal));
// navigation 메뉴 모달 창 닫기 버튼 클릭 시 메뉴 모달 창 비활성화
navModalCloseBtn.addEventListener('click', evt =>
  handleModalOpen(evt, navModal),
);
// 헤더 검색 버튼 클릭 시 검색 모달 창 활성화
searchBtn.addEventListener('click', evt => handleModalOpen(evt, searchModal));
// 검색 모달 창 닫기 버튼 클릭 시 검색 모달 창 비활성화
searchModalCloseBtn.addEventListener('click', evt =>
  handleModalOpen(evt, searchModal),
);
// 검색 필터 버튼 클릭
searchFilterBtn.addEventListener('click', evt =>
  handleModalOpen(evt, searchFilterModal),
);
// 검색 필터 모달 닫기 버튼 클릭
searchFilterCloseBtn.addEventListener('click', evt =>
  handleModalOpen(evt, searchFilterModal),
);

// 모달 창 이외의 요소 클릭 시 현재 활성화되어 있는 메뉴 모달 창 비활성화
// 데스크톱 버전에서 여러 개의 모달 창이 하나의 모달 오버레이 요소를 공통으로 사용가능하도록 변경.
modalOverlay.addEventListener('click', e => {
  const target = e.target;
  const modalList = target.parentElement.children;

  if (target.classList.contains('modal-overlay')) {
    for (let i = 0; i < modalList.length; i++) {
      const modalElem = modalList[i];
      console.log('현재 활성화된 모달: ', modalElem);

      if (modalElem.classList.contains('show-block')) {
        modalElem.classList.toggle('show-block');
        return;
      } else if (modalElem.classList.contains('show-flex')) {
        modalElem.classList.toggle('show-flex');
        return;
      }
    }
  }
});
