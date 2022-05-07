import createBtnElem from '../button/Button.js';
/*
  <div class="select-box">
    <button type="button">
      <i class="fas fa-ellipsis-h"></i>
      <span class="screen-reader-text">드롭다운 메뉴 버튼</span>
    </button>
    <ul class="btn-list">
      <li class="btn-list__item">
        <button type="button">좋아요 취소</button>
      </li>
    </ul>
  </div>
*/
function createMenuBtn(btnName, btnType) {
  /* button item component */
  const menuBtnWrapper = document.createElement('li');
  const menuBtn = document.createElement('button');
  menuBtn.type = 'button';
  menuBtn.textContent = btnName;
  menuBtn.dataset.btnType = btnType;
  menuBtnWrapper.classList.add('btn-list__item');
  menuBtnWrapper.appendChild(menuBtn);
  return menuBtnWrapper;
}
// @param1 optionsList = [{name: }, {name: }, ...]
// @param2 clickHandlerList = { menuBtnHandler: func, btnListHandler: func }
export default function createSelectMenuBox(menuNameList, clickHandlerObj) {
  const { menuBtnHandler, btnListHandler } = clickHandlerObj;
  const btnClassObj = {
    buttonElem: 'select-menu-btn',
    iconElem: ['fas', 'fa-ellipsis-h'],
    textElem: 'screen-reader-text',
  };
  const selectMenuBoxWrapper = document.createElement('div');
  const selectMenuBtn = createBtnElem(btnClassObj, 'button', '메뉴 선택 버튼');
  const btnList = document.createElement('ul');

  // menuBtnHandler 핸들러에서 로그인한 사용자와 리뷰 작성자 이름 일치 여부 확인 필요
  selectMenuBtn.addEventListener('click', menuBtnHandler);
  btnList.addEventListener('click', btnListHandler);

  // const btnItemWrapper = document.createElement('li');
  // const btnItem = document.createElement('button');
  // btnItem.type = "button";
  // btnItem.textContent = "관심 해제";
  // btnItemWrapper.classList.add('btn-list__item');
  // btnItemWrapper.appendChild(btnItem);

  selectMenuBoxWrapper.classList.add('select-menu-box');
  btnList.classList.add('btn-list');
  /* button item component */
  menuNameList.forEach(({ name, type }) => {
    const menuBtn = createMenuBtn(name, type);
    btnList.appendChild(menuBtn);
  });
  selectMenuBoxWrapper.appendChild(selectMenuBtn);
  selectMenuBoxWrapper.appendChild(btnList);

  return selectMenuBoxWrapper;
}
