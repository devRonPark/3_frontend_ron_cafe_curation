import { createModal } from './Modal.js';
import { createSearchInput, createSearchForm } from '../form/SearchForm.js';
import createCloseBtn from '../button/CloseButton.js';
/*
<div class="search-modal">
  <div class="title screen-reader-text">
    <h2>검색 창</h2>
  </div>
  <div class="search-modal__header">
    <button type="button" class="close-btn">
      <i class="fas fa-long-arrow-alt-left"></i>
      <span class="screen-reader-text">닫기</span>
    </button>
    <form action="/search" method="get" class="search-form">
      <label>
        <input type="search" class="search-form__input" />
        <button type="button" class="search-form__btn search-form__filter-btn">
          <i class="filter-btn__icon fas fa-sliders-h"></i>
          <span class="screen-reader-text">검색 필터 열기 버튼</span>
        </button>
        <button type="submit" class="search-form__btn search-form__search-btn">
          <i class="fas fa-search"></i>
          <span class="hidden">Search</span>
        </button>
      </label>
    </form>
  </div>
  <div class="search-modal__content">
    <div class="recent-keyword">
      <div class="recent-keyword__heading">최근 검색어</div>
      <ul class="recent-keyword__list">
        <li class="recent-keyword__item">
          <a href="/search?name=스타벅스">스타벅스</a>
        </li>
        <li class="recent-keyword__item">
          <a href="/search?name=스타벅스">스타벅스</a>
        </li>
        <li class="recent-keyword__item">
          <a href="/search?name=스타벅스">스타벅스</a>
        </li>
        <li class="recent-keyword__item">
          <a href="/search?name=스타벅스">스타벅스</a>
        </li>
        <li class="recent-keyword__item">
          <a href="/search?name=스타벅스">스타벅스</a>
        </li>
      </ul>
    </div>
  </div>
</div> */

/*
const btnContentList = [
  { name: '스타벅스', link: '/search?name="스타벅스' }
];
*/

// 검색 모달 창 콘텐츠 컴포넌트 생성
function createSearchModalContent(recentKeywordData) {
  const recentKeywordElem = document.createElement('div');
  const headingElem = document.createElement('div');
  const recentKeywordListElem = document.createElement('ul');

  recentKeywordElem.classList.add('recent-keyword');
  headingElem.classList.add('recent-keyword__heading');
  recentKeywordListElem.classList.add('recent-keyword__list');

  headingElem.textContent = '최근 검색어';

  const isRecentKeywordExist = !!(recentKeywordData?.length > 0);
  // 최근 검색어가 존재하는 경우,
  if (isRecentKeywordExist) {
    recentKeywordData.forEach(recentKeywordItem => {
      const keywordItemElem = document.createElement('li');
      const keywordLinkElem = document.createElement('a');

      keywordItemElem.classList.add('recent-keyword__item');
      keywordLinkElem.href = recentKeywordItem.link;

      keywordLinkElem.textContent = recentKeywordItem.name;

      keywordItemElem.appendChild(keywordLinkElem);
      recentKeywordListElem.appendChild(keywordItemElem);
    });
    // 최근 검색어가 존재하지 않는 경우,
  } else {
    const emptyKeywordOfMessage = document.createElement('p');
    emptyKeywordOfMessage.textContent = '최근 검색어가 없습니다.';
    emptyKeywordOfMessage.classList.add('empty-keyword-message');
    recentKeywordListElem.appendChild(emptyKeywordOfMessage);
  }

  recentKeywordElem.appendChild(headingElem);
  recentKeywordElem.appendChild(recentKeywordListElem);

  return recentKeywordElem;
}

// 모달 창 닫기 버튼 생성
const searchModalCloseBtnElem = createCloseBtn(
  '모달 창 닫기 버튼',
  'arrow-left',
  'mobile',
);
const searchInputOption = {
  className: 'search-form__input',
  maxLength: 50,
  placeholder: '카페 이름으로 검색해주세요.',
  autocomplete: 'off',
};
const searchInputElem = createSearchInput(searchInputOption);
const searchFormElem = createSearchForm(searchInputElem);
const searchModalContentElem = createSearchModalContent();
const searchModalElem = createModal(
  'search-modal',
  '검색 창',
  searchFormElem,
  searchModalContentElem,
  searchModalCloseBtnElem,
);

export default searchModalElem;
