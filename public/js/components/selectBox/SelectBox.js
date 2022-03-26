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
export default function createSelectMenuBox() {
  const btnClassObj = {
    buttonElem: "select-menu-btn",
    iconElem: ["fas", "fa-ellipsis-h"],
    textElem: "screen-reader-text"
  }
  const selectMenuBoxWrapper = document.createElement('div');
  const selectMenuBtn = createBtnElem(btnClassObj, 'button', '메뉴 선택 버튼');
  const btnList = document.createElement('ul');
  
  /* button item component */
  const btnItemWrapper = document.createElement('li');
  const btnItem = document.createElement('button');
  btnItem.type = "button";
  btnItem.textContent = "관심 해제";
  btnItemWrapper.classList.add('btn-list__item');
  btnItemWrapper.appendChild(btnItem);

  selectMenuBoxWrapper.classList.add("select-menu-box");
  btnList.classList.add('btn-list');

  btnList.appendChild(btnItemWrapper);
  selectMenuBoxWrapper.appendChild(selectMenuBtn);
  selectMenuBoxWrapper.appendChild(btnList);

  return selectMenuBoxWrapper;
}