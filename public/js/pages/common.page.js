import '../templates/Header.js';
import '../templates/Popup.js';
import { createModalOverlay } from '../components/modal/Modal.js';
import createMyProfileBox from '../templates/MyProfileBox.js';
import navModalElem from '../templates/NavModal.js';
import searchModalElem from '../templates/SearchModal.js';
import searchFilterModalElem from '../templates/SearchFilterModal.js';
import { checkUserLoggedInAPI } from '../controllers/apiController.js';

const popupArea = document.querySelector('.popup');
// navigation 모달 오버레이 요소 생성
const modalOverlayElem = createModalOverlay();

// 페이지 별 공통 모달
popupArea.appendChild(navModalElem);
popupArea.appendChild(searchModalElem);
popupArea.appendChild(searchFilterModalElem);
popupArea.appendChild(modalOverlayElem);

const mainHeader = document.querySelector('.header');
const searchFilterModal = document.querySelector('.search-filter-modal');
const citySelect = {
  field: document.querySelector('#city-selected-field'),
  text: document.querySelector('#city-selected-text'),
  list: document.querySelector('#city-option-list'),
  options: document.querySelector('#city-option-list .option'),
  arrowIcon: document.querySelector('#city-selected-field .arrow-icon'),
};
const guSelect = {
  field: document.querySelector('#gu-selected-field'),
  text: document.querySelector('#gu-selected-text'),
  list: document.querySelector('#gu-option-list'),
  options: document.querySelectorAll('#gu-option-list .option'),
  arrowIcon: document.querySelector('#gu-selected-field .arrow-icon'),
};
const dongSelect = {
  field: document.querySelector('#dong-selected-field'),
  text: document.querySelector('#dong-selected-text'),
  list: document.querySelector('#dong-option-list'),
  options: document.querySelector('#dong-option-list .option'),
  arrowIcon: document.querySelector('#dong-selected-field .arrow-icon'),
};
let dongDataForOptions;
const optionResetAllBtn = document.querySelector(
  '.search-filter-modal .reset-btn',
);

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
  if (target.parentElement.id === 'gu-option-list') {
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

document.addEventListener('scroll', evt => {
  const { scrollTop } = evt.target.scrollingElement;

  if (scrollTop > 10) {
    mainHeader.classList.add('scroll-active');
  } else {
    mainHeader.classList.remove('scroll-active');
  }
});

window.addEventListener('load', async () => {
  // 페이지 별 사용자 로그인 여부 체크(브라우저 <-> 백엔드 API)
  const response = await checkUserLoggedInAPI();
  if (response.status === 200) {
    const { isUserLoggedIn } = response.data;
    const pathname = window.location.pathname;
    // 로그인 안 한 사용자 접근 차단
    const notLoggedInUserBlockedPath = [
      '/account/mypage',
      '/account/info',
      '/account/delete',
    ];
    // 로그인한 사용자 접근 차단
    const loggedInUserBlockedPath = [
      '/account/register',
      '/account/login',
      '/account/find-email',
      '/account/find-email-result',
      '/account/find-password',
      '/account/find-password-result',
    ];

    // 로그인 안 한 사용자 페이지 접근 차단
    if (isUserLoggedIn && loggedInUserBlockedPath.indexOf(pathname) > -1) {
      alert('로그인한 사용자는 접근할 수 없는 페이지입니다.');
      window.location.href = '/account/login';
    }

    // 로그인한 사용자 페이지 접근 차단
    if (!isUserLoggedIn && notLoggedInUserBlockedPath.indexOf(pathname) > -1) {
      alert('로그인한 사용자만 접근할 수 있는 페이지입니다.');
      window.location.href = '/';
    }

    const navMenuContainer = document.querySelector('.nav-modal .nav-menu');
    const navMenuList = document.querySelectorAll(
      '.nav-modal .nav-menu .nav-menu__item',
    );
    // 로컬 스토리지에서 로그인한 사용자 정보 불러오기
    let myInfo = localStorage.getItem('me');

    // 사용자가 로그인한 상태인 경우,
    if (isUserLoggedIn) {
      myInfo = JSON.parse(myInfo);

      navMenuList.forEach(navMenuItem => {
        // 사용자 프로필 박스 생성
        if (navMenuItem.children[0].innerText === '로그인') {
          navMenuItem.remove();
          const myProfileBox = createMyProfileBox(
            myInfo?.nickname,
            myInfo?.imagePath,
          );
          navMenuContainer.insertAdjacentElement('afterbegin', myProfileBox);
          return;
        }
      });
      // 로그인하지 않은 상태인 경우
    } else {
      if (!myInfo) {
        // 로컬스토리지에 저장된 사용자 데이터 삭제
        localStorage.removeItem('me');
      }
    }
  }

  dongDataForOptions = await parseDongDataForOptions();
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
  // 검색 옵션 모두 초기화
  optionResetAllBtn.addEventListener('click', evt => {
    // 시, 구, 동 옵션 리셋
    citySelect.text.innerText = '시 선택';
    guSelect.text.innerText = '구 선택';
    dongSelect.text.innerText = '동 선택';
  });
});
