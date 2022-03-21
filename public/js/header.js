// const dataForDropdownMenu = require('../js/loadDongData');
const navBtn = document.querySelector('.header .header__nav .header__nav-btn');
const navModal = document.querySelector('.header__nav .nav-modal');
const navModalCloseBtn = document.querySelector(
  '.nav-modal .close-area__close-btn',
);
const navModalOverlay = document.querySelector('.nav-modal__overlay');
const searchBtn = document.querySelector('.header__search-btn');
const searchModal = document.querySelector('.search-modal');
const searchModalCloseBtn = document.querySelector(
  '.search-modal__header .close-btn',
);
const searchFilterBtn = document.querySelector('.search-form__filter-btn');
const searchFilterModal = document.querySelector('.search-filter-modal');
const searchFilterCloseBtn = document.querySelector(
  '.search-filter-modal__close-btn',
);
const citySelect = {
  field: document.getElementById('citySelectField'),
  text: document.getElementById('citySelectText'),
  list: document.getElementById('cityList'),
  options: document.querySelector('#cityList .option'),
  arrowIcon: document.querySelector('#citySelectField .arrowIcon'),
};
const guSelect = {
  field: document.getElementById('guSelectField'),
  text: document.getElementById('guSelectText'),
  list: document.getElementById('guList'),
  options: document.querySelectorAll('#guList .option'),
  arrowIcon: document.querySelector('#guSelectField .arrowIcon'),
};
const dongSelect = {
  field: document.getElementById('dongSelectField'),
  text: document.getElementById('dongSelectText'),
  list: document.getElementById('dongList'),
  options: document.querySelector('#dongList .option'),
  arrowIcon: document.querySelector('#dongSelectField .arrowIcon'),
};
let dongDataForOptions;

// 모달 창 열기 및 닫기
const handleModalOpen = (evt, domElem) => {
  domElem.classList.toggle('active');
  console.log(domElem.classList);
};
// 셀렉트 박스 선택 옵션들 활성화 여부 제어
const handleSearchFilterOptionOpen = (evt, obj) => {
  // 선택 옵션들 열기 및 닫기
  obj.list.classList.toggle('hide');
  // 화살표 아이콘 회전
  obj.arrowIcon.classList.toggle('rotate');
};
// 선택 옵션들 중 하나 선택 시 이벤트 제어
const handleSelectOption = (evt, obj) => {
  const target = evt.target;
  // 구 옵션을 선택한 경우
  if (target.parentElement.id === 'guList') {
    const guName = target.textContent;
    // 이전에 추가되어 있던 동 옵션 초기화
    resetDongOptions();
    // 구 옵션에 맞는 동 데이터 불러와 동 옵션 추가
    addDongOptionsByGuName(guName);
  }

  // 선택된 옵션 텍스트가 선택되었음을 화면에 보여줌.
  obj.text.innerHTML = target.textContent;
  obj.list.classList.toggle('hide');
  obj.arrowIcon.classList.toggle('rotate');
};

// 서울시 내 동 데이터 불러오기
const getData = async () => {
  try {
    const dongData = await fetch('../json/dongDataInSeoul.json').then(data =>
      data.json(),
    );
    return dongData;
  } catch (err) {
    console.log(err);
  }
};
// 동 데이터 selectOption에 적합한 형태로 가공하기
const parseDongDataForOptions = async () => {
  try {
    const dongData = await getData();
    const dataForOptions = {};
    for (let i = 0; i < dongData.length; i++) {
      const guName = dongData[i]['구'];
      const dongName = dongData[i]['동'];
      if (!dataForOptions[guName]) {
        dataForOptions[guName] = [dongName];
      } else {
        dataForOptions[guName].push(dongName);
      }
    }
    // 가공 결과 다음과 같은 데이터 형태를 가진다.
    // {
    //   [gu]: [ dongList ],
    //   "종로구": [
    //     "청운효자동", "사직동", "삼청동", "부암동", "평창동", "무악동", "교남동", "가회동", ...
    //   ],
    //   ...
    // }
    return dataForOptions;
  } catch (err) {
    console.log(err);
  }
};
// 동 셀렉트 박스에 추가할 DOM 템플릿 정의하기
// <li class="option">${dongName}</li>
const makeDongOptionTemplate = dongName => {
  const li = document.createElement('li');
  li.className = 'option';
  li.append(dongName);
  return li;
};
// 선택된 구 이름에 따라 동 데이터 필터링 후 동 셀렉트 박스에 추가하기
const addDongOptionsByGuName = guName => {
  try {
    const dongNamesByGuName = dongDataForOptions[guName];
    for (let i = 0; i < dongNamesByGuName.length; i++) {
      const dongOptionElem = makeDongOptionTemplate(dongNamesByGuName[i]);
      // 생성된 동 옵션에 클릭 이벤트 리스너 부착
      dongOptionElem.addEventListener('click', evt =>
        handleSelectOption(evt, dongSelect),
      );
      // 생성된 동 옵션 DOM에 추가
      // <ul id="dongList" class="list hide">
      //   <li class="option">${dongName}</li>
      //   ...
      // </ul>
      dongSelect.list.append(dongOptionElem);
    }
  } catch (err) {
    console.log(err);
  }
};
// 동 옵션들 초기화
const resetDongOptions = () => {
  const dongOptionList = dongSelect.list;
  // <ul id="dongList"></ul> 요소 내 자식 요소들 모두 삭제
  while (dongOptionList.hasChildNodes()) {
    dongOptionList.removeChild(dongOptionList.firstChild);
  }
};

window.addEventListener('load', async () => {
  dongDataForOptions = await parseDongDataForOptions();
  // navigation 메뉴 버튼 클릭 시 메뉴 모달 창 활성화
  navBtn.addEventListener('click', evt =>
    handleModalOpen(evt, navModalOverlay),
  );
  // navigation 메뉴 모달 창 닫기 버튼 클릭 시 메뉴 모달 창 비활성화
  navModalCloseBtn.addEventListener('click', evt =>
    handleModalOpen(evt, navModalOverlay),
  );
  // navigation 메뉴 모달 창 이외의 요소 클릭 시 메뉴 모달 창 비활성화
  navModalOverlay.addEventListener('click', e => {
    const evt = e.target;
    if (evt.classList.contains('nav-modal__overlay')) {
      navModalOverlay.classList.toggle('active');
    }
  });
  // navigation 메뉴 모달 창 활성화 상태에서 Esc 키 누를 시 메뉴 모달 창 비활성화
  window.addEventListener('keyup', e => {
    if (navModalOverlay.classList.contains('active') && e.key === 'Escape') {
      navModalOverlay.classList.toggle('active');
    }
  });
  searchBtn.addEventListener('click', evt => handleModalOpen(evt, searchModal));
  searchModalCloseBtn.addEventListener('click', evt =>
    handleModalOpen(evt, searchModal),
  );
  searchFilterModal.addEventListener('click', evt => {
    const target = evt.target;

    // 닫기 버튼 제외
    if (target.classList.contains('search-filter-modal__close-btn')) return;

    // class 명이 search-filter-modal인 요소, label 요소를 클릭하는 경우
    if (
      target === evt.currentTarget ||
      target.classList.contains('filterName')
    ) {
      // 각각 cityList, guList, dongList 에 hide 가 없으면 hide를 추가해준다.
      if (!citySelect.list.classList.contains('hide'))
        citySelect.list.classList.add('hide');
      if (!guSelect.list.classList.contains('hide'))
        guSelect.list.classList.add('hide');
      // dong 옵션 리스트가 열려 있는 경우
      if (!dongSelect.list.classList.contains('hide')) {
        dongSelect.list.classList.add('hide');
        // gu 옵션이 지정되어 있지 않은 경우 동 옵션 리셋
        if (guSelect.text === '구를 선택해주세요.') {
          resetDongOptions();
        }
      }
    }
  });
  searchFilterBtn.addEventListener('click', evt =>
    handleModalOpen(evt, searchFilterModal),
  );
  searchFilterCloseBtn.addEventListener('click', evt =>
    handleModalOpen(evt, searchFilterModal),
  );
  citySelect.field.addEventListener('click', evt =>
    handleSearchFilterOptionOpen(evt, citySelect),
  );
  guSelect.field.addEventListener('click', evt =>
    handleSearchFilterOptionOpen(evt, guSelect),
  );
  dongSelect.field.addEventListener('click', evt =>
    handleSearchFilterOptionOpen(evt, dongSelect),
  );
  citySelect.options.addEventListener('click', evt =>
    handleSelectOption(evt, citySelect),
  );
  for (let option of guSelect.options) {
    option.addEventListener('click', evt => handleSelectOption(evt, guSelect));
  }
});
