import createCloseBtn from '../button/CloseButton.js';

// 모달 오버레이 생성
export function createModalOverlay() {
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal-overlay');
  return modalOverlay;
}

// 모달 창 생성
// modalContent는 각 모달 창 별로 다름.
export function createModal(
  className,
  modalName,
  modalTopContentElemList,
  modalContentElemList,
  closeBtnElemList,
) {
  const modalElem = document.createElement('div');
  const modalNameElem = document.createElement('span');
  const modalTopElem = document.createElement('div');
  const modalContentWrapperElem = document.createElement('div');

  // <div class="modal"></div>
  modalElem.classList.add('modal');
  modalElem.classList.add(className);
  // 모달창 숨기기
  // modalElem.classList.add('hidden');
  // <span class="modal__heading screen-reader-text"></span>
  modalNameElem.classList.add('modal__heading', 'screen-reader-text');
  // <div class="modal__top"></div>
  modalTopElem.classList.add('modal__top');
  // <div class="modal__content"></div>
  modalContentWrapperElem.classList.add('modal__content');

  modalNameElem.textContent = modalName;
  // 모달 창 닫기 버튼 추가
  // 모달 창 닫기 버튼이 두 개 존재할 경우(장치에 따라 데스크톱, 모바일 버전 구분)
  if (Array.isArray(closeBtnElemList)) {
    closeBtnElemList.forEach(closeBtnElem =>
      modalTopElem.appendChild(closeBtnElem),
    );
    // 장치에 따른 구분 없이 모달 창 닫기 버튼이 한 개 존재할 경우
  } else if (typeof closeBtnElemList === 'object') {
    modalTopElem.appendChild(closeBtnElemList);
  }

  if (modalTopContentElemList) {
    // modalTop에 추가될 요소가 2개 이상 존재할 경우
    if (Array.isArray(modalTopContentElemList)) {
      modalTopContentElemList.forEach(modalTopContentElem =>
        modalTopElem.appendChild(modalTopContentElem),
      );
    // modalTop에 추가될 요소가 한 개인 경우
    } else if (typeof modalTopContentElemList === 'object') {
      modalTopElem.appendChild(modalTopContentElemList);
    }
  }

  if (modalContentElemList) {
    // modalContent에 추가될 요소가 2개 이상 존재할 경우
    if (Array.isArray(modalContentElemList)) {
      modalContentElemList.forEach(modalContentElem =>
        modalContentWrapperElem.appendChild(modalContentElem),
      );
    // modalContent에 추가될 요소가 한 개인 경우
    } else if (typeof modalTopContentElemList === 'object') {
      modalContentWrapperElem.appendChild(modalContentElemList);
    }
  }

  modalElem.appendChild(modalNameElem);
  modalElem.appendChild(modalTopElem);
  modalElem.appendChild(modalContentWrapperElem);

  return modalElem;
}
