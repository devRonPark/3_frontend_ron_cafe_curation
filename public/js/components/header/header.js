import { createAreaElem } from './area.js';
import { createBtnElem } from './button.js';

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

const headerElem = document.createElement('header');
/* <header class="header"></header> */
headerElem.classList.add('header');

const headerNavAreaElem = createAreaElem('header__nav');
const headerLogoAreaElem = createAreaElem('header__logo');
const headerSearchAreaElem = createAreaElem('header__search');
// navBtn 컴포넌트 생성
const navBtnElem = createBtnElem(
  navBtnClassObj,
  'button',
  '네비게이션 메뉴 열기 버튼',
);
// searchBtn 컴포넌트 생성
const searchBtnElem = createBtnElem(searchBtnClassObj, 'button', '검색 버튼');
const logoElem = document.createElement('div');
const logoLinkElem = document.createElement('a');

/* <div class="logo"></div> */
logoElem.classList.add('logo');
/* <a href="/main" class="logo__link">JJINCAFE IN SEOUL</a> */
logoLinkElem.classList.add('logo__link');
logoLinkElem.textContent = 'JJINCAFE IN SEOUL';

/* 생성된 logoLink 요소 부모 DOM 요소에 주입 */
logoElem.appendChild(logoLinkElem);
/* 생성된 navBtn, logo, searchBtn 요소 부모 DOM 요소에 주입 */
headerNavAreaElem.appendChild(navBtnElem);
headerLogoAreaElem.appendChild(logoElem);
headerSearchAreaElem.appendChild(searchBtnElem);
/* 생성된 headerNavArea, headerLogoArea, headerSearchArea 요소 부모 DOM 요소에 주입 */
headerElem.appendChild(headerNavAreaElem);
headerElem.appendChild(headerLogoAreaElem);
headerElem.appendChild(headerSearchAreaElem);

document.body.appendChild(headerElem);
