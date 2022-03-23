/* 네비게이션 모달 창 관련 요소 */
const navBtn = document.querySelector('.header__nav .header__nav-btn');
const navModal = document.querySelector('.popup .nav-modal');
const navModalCloseBtn = document.querySelector(
  '.nav-modal .modal__top .modal__close-btn',
);
const navModalOverlay = document.querySelector('.popup .modal-overlay');
/* 검색 모달 창 관련 요소 */
const searchBtn = document.querySelector('.header__search-btn');
const searchModal = document.querySelector('.popup .search-modal');
const searchModalCloseBtn = document.querySelector(
  '.search-modal .modal__close-btn',
);
/* 검색 필터 모달 창 관련 요소 */
const searchFilterBtn = document.querySelector('.search-filter .search-filter__btn');
const searchFilterModal = document.querySelector('.popup .search-filter-modal');
const searchFilterCloseBtn = document.querySelector('.popup .search-filter-modal .modal__top .modal__close-btn');

// 모달 창 열기 및 닫기
const handleModalOpen = (evt, domElem) => {
  domElem.classList.toggle('active');
};

// navigation 메뉴 버튼 클릭 시 메뉴 모달 창 활성화
navBtn.addEventListener('click', evt => handleModalOpen(evt, navModal));
// navigation 메뉴 모달 창 닫기 버튼 클릭 시 메뉴 모달 창 비활성화
navModalCloseBtn.addEventListener('click', evt =>
  handleModalOpen(evt, navModal),
);
// navigation 메뉴 모달 창 이외의 요소 클릭 시 메뉴 모달 창 비활성화
navModalOverlay.addEventListener('click', e => {
  const evt = e.target;
  if (evt.classList.contains('modal-overlay')) {
    navModal.classList.toggle('active');
  }
});
// 헤더 검색 버튼 클릭 시 검색 모달 창 활성화
searchBtn.addEventListener('click', evt => handleModalOpen(evt, searchModal));
// 검색 모달 창 닫기 버튼 클릭 시 검색 모달 창 비활성화
searchModalCloseBtn.addEventListener('click', evt =>
  handleModalOpen(evt, searchModal),
);
// 검색 필터 버튼 클릭
searchFilterBtn.addEventListener('click', evt => handleModalOpen(evt, searchFilterModal));
// 검색 필터 모달 닫기 버튼 클릭
searchFilterCloseBtn.addEventListener('click', evt => handleModalOpen(evt, searchFilterModal));