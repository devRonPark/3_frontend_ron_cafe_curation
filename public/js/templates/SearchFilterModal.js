import { createModal } from '../components/modal/Modal.js';
import createCloseBtn from '../components/button/CloseButton.js';

/*
<div class="search-filter-modal">
  <button type="button" class="search-filter-modal__close-btn">
    <i class="far fa-times-circle"></i>
    <span class="screen-reader-text">닫기</span>
  </button>
  <div class="search-filter__option">
    <label class="filterName" for="city">
      시
    </label>
    <div id="city" class="selectBox">
      <div id="citySelectField" class="selectField">
        <p id="citySelectText" class="selectText">
          시를 선택해주세요.
        </p>
        <img src="../images/arrow.png" class="arrowIcon" />
      </div>
      <ul id="cityList" class="list hide">
        <li class="option">서울특별시</li>
      </ul>
    </div>
  </div>
  <div class="search-filter__option">
    <label class="filterName" for="gu">
      구
    </label>
    <div id="gu" class="selectBox">
      <div id="guSelectField" class="selectField">
        <p id="guSelectText" class="selectText">
          구를 선택해주세요.
        </p>
        <img src="../images/arrow.png" class="arrowIcon" />
      </div>
      <ul id="guList" class="list hide">
        <li class="option">강남구</li>
        <li class="option">강동구</li>
        <li class="option">강북구</li>
        <li class="option">강서구</li>
        <li class="option">관악구</li>
        <li class="option">광진구</li>
        <li class="option">구로구</li>
        <li class="option">금천구</li>
        <li class="option">노원구</li>
        <li class="option">도봉구</li>
        <li class="option">동대문구</li>
        <li class="option">동작구</li>
        <li class="option">마포구</li>
        <li class="option">서대문구</li>
        <li class="option">서초구</li>
        <li class="option">성동구</li>
        <li class="option">성북구</li>
        <li class="option">양천구</li>
        <li class="option">영등포구</li>
        <li class="option">용산구</li>
        <li class="option">은평구</li>
        <li class="option">종로구</li>
        <li class="option">중구</li>
        <li class="option">중랑구</li>
      </ul>
    </div>
  </div>
  <div class="search-filter__option">
    <label class="filterName" for="dong">
      동
    </label>
    <div id="dong" class="selectBox">
      <div id="dongSelectField" class="selectField">
        <p id="dongSelectText" class="selectText">
          동을 선택해주세요.
        </p>
        <img src="../images/arrow.png" class="arrowIcon" />
      </div>
      <ul id="dongList" class="list hide"></ul>
    </div>
  </div>
</div> */

// 선택된 필드 값을 보여주는 박스 요소 생성
// @params idObj = {fieldBox: '', fieldText: ''}
function createSelectedFieldBox(idObj, defaultSelectedFieldtext) {
  const selectedFieldBox = document.createElement('div');
  const selectedFieldText = document.createElement('p');
  const arrowIcon = document.createElement('img');

  selectedFieldBox.classList.add('selected-field');
  selectedFieldText.classList.add('selected-text');
  arrowIcon.classList.add('arrow-icon');

  selectedFieldBox.id = idObj.box;
  selectedFieldText.id = idObj.text;

  selectedFieldText.textContent = defaultSelectedFieldtext;

  arrowIcon.src = "../images/arrow.png";

  selectedFieldBox.appendChild(selectedFieldText);
  selectedFieldBox.appendChild(arrowIcon);

  return selectedFieldBox;
}

// 옵션 목록을 보여주는 박스 요소 생성
function createOptionListBox(id) {
  const optionListBox = document.createElement('ul');

  optionListBox.classList.add('option-list');
  optionListBox.id = id;

  return optionListBox;
}

// option의 종류에 따른 요소 별 id 정보 값 제공
// @params option = 'city' || 'gu' || 'dong'
function getOptionBoxIdInfo(option) {
  switch (option) {
    case 'city':
      return {fieldBox: 'city-selected-field', fieldText: 'city-selected-text', optionList: 'city-option-list'}
    case 'gu':
      return {fieldBox: 'gu-selected-field', fieldText: 'gu-selected-text', optionList: 'gu-option-list'};
    case 'dong':
      return {fieldBox: 'dong-selected-field', fieldText: 'dong-selected-text', optionList: 'dong-option-list'}
    default:
      return;
  }
}

// 검색 필터 옵션 박스 요소 생성
// @params option = 'city' || 'gu' || 'dong'
function createSearchFilterOption(option) {
  // {fieldBox: '...', fieldText: '...', optionList: '...'}
  const idObj = getOptionBoxIdInfo(option);
  const labelNameObj = {'city': '시', 'gu': '구', 'dong': '동'};
  const defaultSelectedFieldtext = labelNameObj[option] + ' 선택';

  // <div class="search-filter__option"></div>
  const filterOptionWrapper = document.createElement('div');
  // <label class="filter-name"></label>
  const filterOptionLabel = document.createElement('label');
  // <div class="select-box"></div>
  const filterOptionBox = document.createElement('div');
  // <div class="selected-field"></div>
  const selectedFieldBox = createSelectedFieldBox({box: idObj.fieldBox, text: idObj.fieldText}, defaultSelectedFieldtext);
  // <ul class="option-list"></ul>
  const optionListBox = createOptionListBox(idObj.optionList); 

  filterOptionWrapper.classList.add('search-filter__option');
  filterOptionLabel.classList.add('filter-name');
  filterOptionBox.classList.add('select-box');

  filterOptionBox.id = option;
  
  // 라벨 이름 추가
  filterOptionLabel.textContent = labelNameObj[option];


  filterOptionBox.appendChild(selectedFieldBox);
  filterOptionBox.appendChild(optionListBox);
  filterOptionWrapper.appendChild(filterOptionLabel);
  filterOptionWrapper.appendChild(filterOptionBox);
  
  return filterOptionWrapper;
}



// 모달 창 닫기 버튼 생성
const searchFilterModalCloseBtnElem = createCloseBtn('검색 필터 모달 창 닫기 버튼', 'x-mark');
const cityOptionElem = createSearchFilterOption('city');
const guOptionElem = createSearchFilterOption('gu');
const dongOptionElem = createSearchFilterOption('dong');
const searchFilterModalContentElem = [cityOptionElem, guOptionElem, dongOptionElem];
const searchFilterModalElem = createModal(
  'search-filter-modal',
  '검색 필터 창',
  null,
  searchFilterModalContentElem,
  searchFilterModalCloseBtnElem
);

export default searchFilterModalElem;

