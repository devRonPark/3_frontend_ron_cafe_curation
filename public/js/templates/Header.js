import createWrapper from '../components/wrapper/Wrapper.js';
import createAreaElem from '../components/area/Area.js';
import createBtnElem from '../components/button/Button.js';


// navBtn 컴포넌트에 주입될 클래스 이름 목록 정의
const navBtnClassObj = {
  buttonElem: 'header__nav-btn',
  iconElem: ['nav-btn__icon', 'fas', 'fa-bars'],
  textElem: 'screen-reader-text',
};
// searchBtn 컴포넌트에 주입될 클래스 이름 목록 정의
const searchBtnClassObj = {
  buttonElem: 'header__search-btn',
  iconElem: ['search-btn__icon', 'fas', 'fa-search'],
  textElem: 'screen-reader-text',
};

/* ----- header에 필요한 DOM 요소 생성 ----- */
const headerElem = document.createElement('header');
/* <header class="header"></header> */
headerElem.classList.add('header');

const wrapperElem = createWrapper();
const headerNavAreaElem = createAreaElem('header__nav');
const headerLogoAreaElem = createAreaElem('header__logo');
const headerSearchAreaElem = createAreaElem('header__search');
// navBtn 요소 생성
const navBtnElem = createBtnElem(
  navBtnClassObj,
  'button',
  '네비게이션 메뉴 열기 버튼',
);

// searchBtn 요소 생성
const searchBtnElem = createBtnElem(searchBtnClassObj, 'button', '검색 버튼');
// logo 요소 생성
const logoElem = document.createElement('div');
const logoLinkElem = document.createElement('a');

/* <div class="logo"></div> */
logoElem.classList.add('logo');
/* <a href="/main" class="logo__link">JJINCAFE IN SEOUL</a> */
logoLinkElem.classList.add('logo__link');
logoLinkElem.textContent = 'JJINCAFE IN SEOUL';
/* --------------------------------- */

/* ----- DOM 요소 추가 ----- */
/* 생성된 logoLink 요소 부모 DOM 요소에 주입 */
logoElem.appendChild(logoLinkElem);
/* 생성된 navBtn, logo, searchBtn 요소 부모 DOM 요소에 주입 */
headerNavAreaElem.appendChild(navBtnElem);
headerLogoAreaElem.appendChild(logoElem);
headerSearchAreaElem.appendChild(searchBtnElem);
/* 생성된 headerNavArea, headerLogoArea, headerSearchArea 요소 부모 DOM 요소에 주입 */
wrapperElem.appendChild(headerNavAreaElem);
wrapperElem.appendChild(headerLogoAreaElem);
wrapperElem.appendChild(headerSearchAreaElem);
// 생성된 wrapper 요소 부모 DOM 요소에 주입
headerElem.appendChild(wrapperElem);
// header 요소 document.body에 주입
document.body.appendChild(headerElem);
/* --------------------- */
