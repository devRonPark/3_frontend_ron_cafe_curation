/*
  @params(classNameObj, btnType, btnName)
    ex) classNameObj = {buttonElem: "header__search-btn", iconElem: [fas, fa-search], textElem: "screen-reader-text"}

  @returns 
    <button type="button" class="header__search-btn">
      <i class="search-btn__icon fas fa-search"></i>
      <span class="screen-reader-text">검색 버튼</span>
    </button> 
*/
export default function createBtnElem(classNameObj, btnType, btnName) {
  /* 필요한 DOM 요소 생성 */
  const btnElem = document.createElement('button');
  const iconElem = document.createElement('i');
  const btnNameElem = document.createElement('span');

  if (Array.isArray(classNameObj.buttonElem)) {
    btnElem.classList.add(...classNameObj.buttonElem);
  } else {
    btnElem.classList.add(classNameObj.buttonElem);
  }
  /* 각 요소 별 클래스 이름 추가 */
  iconElem.classList.add(...classNameObj.iconElem);
  btnNameElem.classList.add(classNameObj.textElem);

  /* 버튼 타입 지정 */
  btnElem.type = btnType;

  /* 버튼 이름 지정 */
  btnNameElem.textContent = btnName;

  /* 버튼의 자식 요소로 추가 */
  btnElem.appendChild(iconElem);
  btnElem.appendChild(btnNameElem);

  return btnElem;
}
