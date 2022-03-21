import createBtnElem from '../button/Button.js';

/*
<form action="/search" method="get">
  <label>
    <input
      class="search__input"
      name="search"
      type="search"
      maxlength="50"
      placeholder="사용자 이름으로 리뷰 검색"
      autocomplete="off"
    />
  </label>
  <button class="btn-search" type="submit">
    <i class="fas fa-search"></i>
  </button>
</form>;
*/

// optionObj = {className: '', maxLength: 30, placeholder: '', autocomplete: 'on' || 'off'}
export function createSearchInput(optionObj) {
  const { className, maxLength, placeholder, autocomplete } = optionObj;

  if (!className && !maxLength && !placeholder && !autocomplete) {
    throw new Error('search input option is required');
  }

  const searchInputElem = document.createElement('input');
  searchInputElem.classList.add(className);
  searchInputElem.type = 'search';
  searchInputElem.name = 'search';
  searchInputElem.maxLength = maxLength;
  searchInputElem.placeholder = placeholder;
  searchInputElem.autocomplete = autocomplete;

  return searchInputElem;
}

// 검색 폼 컴포넌트 생성
export function createSearchForm(searchInput) {
  const searchBtnClassObj = {
    buttonElem: 'search-form__submit-btn',
    iconElem: ['fas', 'fa-search'],
    textElem: 'screen-reader-text',
  };

  const searchFormElem = document.createElement('form');
  const searchInputElem = searchInput;
  const searchInputLabelElem = document.createElement('label');
  const searchBtnElem = createBtnElem(searchBtnClassObj, 'submit', '검색 버튼');

  searchFormElem.classList.add('search-form');

  searchFormElem.action = '/search';
  searchFormElem.method = 'get';

  searchInputLabelElem.appendChild(searchInputElem);
  searchFormElem.appendChild(searchInputLabelElem);
  searchFormElem.appendChild(searchBtnElem);

  return searchFormElem;
}
