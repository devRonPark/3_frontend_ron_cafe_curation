/* 네비게이션 모달 창 관련 요소 */
const navBtn = document.querySelector('.header__nav .header__nav-btn');
const navModal = document.querySelector('.popup .nav-modal');
const navModalCloseBtn = document.querySelector(
  '.nav-modal .modal__top .modal__close-btn',
);

/* 검색 모달 창 관련 요소 */
const searchBtn = document.querySelector('.header__search-btn');
const searchModal = document.querySelector('.popup .search-modal');
const searchModalCloseBtn = searchModal.querySelector('.modal__close-btn');
const cafeSearchForm = searchModal.querySelector('.search-form');
const cafeSearchInput = searchModal.querySelector('.search-form__input');
const cafeSearchBtn = searchModal.querySelector('.search-form__submit-btn');

/* 검색 필터 모달 창 관련 요소 */
const searchFilterBtn = document.querySelector(
  '.search-filter .search-filter__btn',
);
const searchFilterModal = document.querySelector('.popup .search-filter-modal');
const cityOption = document.querySelector(
  '.popup .search-filter-modal #city-selected-text',
);
const guOption = document.querySelector(
  '.popup .search-filter-modal #gu-selected-text',
);
const dongOption = document.querySelector(
  '.popup .search-filter-modal #dong-selected-text',
);
const searchFilterCloseBtn = document.querySelector(
  '.popup .search-filter-modal .modal__top .modal__close-btn',
);
// 공통 모달 오버레이 요소
const modalOverlay = document.querySelector('.popup .modal-overlay');

// 모달 창 열기 및 닫기
export const handleModalOpen = (evt, domElem) => {
  // window.getComputedStyle() : 엘리먼트에 최종적으로 적용된 모든 CSS 속성 값을 담은 객체
  if (window.getComputedStyle(domElem).flexDirection === 'column') {
    domElem.classList.toggle('show-flex');
  } else {
    domElem.classList.toggle('show-block');
  }
};

const handleCafeSearch = evt => {
  evt.preventDefault();
  const searchText = cafeSearchInput.value ? cafeSearchInput.value : '';
  const cityInfo = cityOption.innerText;
  const guInfo = guOption.innerText;
  const dongInfo = dongOption.innerText;

  // 검색어 로컬 스토리지에 저장
  if (!(searchText === '')) {
    const recentKeywordsList = localStorage.getItem('recentKeywords')
      ? JSON.parse(localStorage.getItem('recentKeywords'))
      : [];
    recentKeywordsList.push(searchText);
    localStorage.setItem('recentKeywords', JSON.stringify(recentKeywordsList));
  }

  // 검색 결과 페이지로 이동
  const params = `${searchText ? `name=${searchText}&` : ''}${
    cityInfo && !(cityInfo === '시 선택') ? `city=${cityInfo}&` : ''
  }${guInfo && !(guInfo === '구 선택') ? `gu=${guInfo}&` : ''}${
    dongInfo && !(dongInfo === '동 선택') ? `dong=${dongInfo}&` : ''
  }`;

  // 검색어 혹은 검색 옵션이 선택된 경우에만 검색 결과 페이지로 이동
  if (!(params === '')) {
    window.location.href = `/search?${params}`;
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
// FIX 각 모달 별로 모달 창을 닫았을 때 모달 내 콘텐츠가 초기화되도록 하는 함수를 호출해야 함.
modalOverlay.addEventListener('click', e => {
  const target = e.target;
  const modalList = target.parentElement.children;

  if (target.classList.contains('modal-overlay')) {
    for (let i = 0; i < modalList.length; i++) {
      const modalElem = modalList[i];

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
// 카페 검색(이름 || 시, 구, 동)
cafeSearchBtn.addEventListener('click', handleCafeSearch);
cafeSearchForm.addEventListener('submit', handleCafeSearch);
