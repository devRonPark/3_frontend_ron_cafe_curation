import createBtnElem from './Button.js';

// 닫기 버튼 생성
// shape: 'x-mark' || 'arrow-left'
// device: 'desktop' || 'mobile'
export default function createCloseBtn(btnName, shape, device) {
  const closeBtnClassObj = {
    buttonElem: ['modal__close-btn'],
    iconElem: ['far', 'fa-times-circle'],
    textElem: 'screen-reader-text',
  };
  // 모양에 따라 버튼 구분
  if (shape === 'x-mark')
    closeBtnClassObj.iconElem = ['far', 'fa-times-circle'];
  else if (shape === 'arrow-left')
    closeBtnClassObj.iconElem = ['fas', 'fa-long-arrow-alt-left'];
  // 장치에 따라 버튼 구분
  if (device === 'mobile') closeBtnClassObj.buttonElem.push('only-mobile');
  else if (device === 'desktop')
    closeBtnClassObj.buttonElem.push('only-desktop');

  const closeBtnElem = createBtnElem(closeBtnClassObj, 'button', btnName);
  return closeBtnElem;
}
