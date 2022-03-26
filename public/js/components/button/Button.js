/*
  @params(classNameObj, btnType, btnName)
    ex) classNameObj = {buttonElem: "header__search-btn", iconElem: [fas, fa-search], textElem: "screen-reader-text"}

  @returns 
    <button type="button" class="header__search-btn">
      <i class="search-btn__icon fas fa-search"></i>
      <span class="screen-reader-text">검색 버튼</span>
    </button> 
*/
// TODO 아이콘이 없는 경우 대응 필요!!!
// 인자의 기본값 설정 중요(기본값을 설정할 인자는 뒤로 빼는 거)
// 얼마나 다양한 상황에 대응할 수 있는가?
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
