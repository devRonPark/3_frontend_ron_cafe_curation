import { createModal } from './Modal.js';
import createCloseBtn from '../button/CloseButton.js';

/* <div class="nav-modal">
  <div class="title screen-reader-text">
    <h2>네비게이션 메뉴 창</h2>
  </div>
  => <span class="modal__heading screen-reader-text">네비게이션 메뉴 창</span>
  <div class="close-area">
    <a href="javascript:void(0)" class="close-area__close-btn">
      <i class="far fa-times-circle"></i>
      <span class="screen-reader-text">닫기</span>
    </a>
  </div>
  => <div class="modal-top"></div>로 감싸주기
  <div class="nav-modal__content">
    <ul class="nav-menu__list">
      <li class="nav-menu__item">
        <a href="/account/login">로그인</a>
      </li>
      <li class="nav-menu__item">
        <a href="/main">메인</a>
      </li>
      <li class="nav-menu__item">
        <a href="/top-lists">평점 높은 카페 리스트</a>
      </li>
      <li class="nav-menu__item">
        <a href="/service#contact">문의하기</a>
      </li>
    </ul>
  </div>
</div> */

// 네비게이션 모달 창 콘텐츠 컴포넌트 생성
function createNavModalContent() {
  const btnListElem = document.createElement('ul');
  btnListElem.classList.add('nav-menu');

  const btnContentList = [
    { name: '로그인', link: '/account/login' },
    { name: '메인', link: '/main' },
    { name: '평점 높은 카페 리스트', link: '/top-list' },
    { name: '문의하기', link: '/service#contact' },
  ];

  btnContentList.forEach(btnContent => {
    const btnItemElem = document.createElement('li');
    const btnLinkElem = document.createElement('a');

    btnItemElem.classList.add('nav-menu__item');
    btnLinkElem.href = btnContent.link;

    btnLinkElem.textContent = btnContent.name;

    btnItemElem.appendChild(btnLinkElem);
    btnListElem.appendChild(btnItemElem);
  });
  return btnListElem;
}
// 모달 창 닫기 버튼 생성
const navModalCloseBtnElem = createCloseBtn(
  '네비게이션 모달 창 닫기 버튼',
  'x-mark',
  'mobile',
);
const navModalContentElem = createNavModalContent();
const navModalElem = createModal(
  'nav-modal',
  '네비게이션 메뉴 창',
  null,
  navModalContentElem,
  navModalCloseBtnElem,
);

export default navModalElem;
