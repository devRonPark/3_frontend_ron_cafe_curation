// 관심 목록 카드 혹은 리뷰 카드의 드롭다운 메뉴 버튼 클릭 시 .btn-list 요소에 active 클래스가 붙는다.(display: block)
export const handleCardMenuListOpen = e => {
  // 이벤트 리스너가 붙은 대상
  const target = e.target;
  if (target.parentNode.classList.contains('select-menu-btn')) {
    const btnList = target.parentNode.nextSibling;
    btnList.classList.toggle('active');
    console.log('카드 드롭다운 메뉴 버튼 클릭됨.');
  }
};
// 각각의 버튼에 대한 분기를 어떻게 처리?
// 이벤트 위임을 이용하여 ul.btn-list에 붙이는 걸로
// dataset 이용
export const handleCardMenuClick = e => {
  const target = e.target;
  const btnType = target.dataset.btnType;
  // data-btnType: dislike || edit || delete
  if (btnType === 'dislike') {
    // 관심 카페 좋아요 해제
    // 사용자 관심 목록에서 제거
  } else if (btnType === 'edit') {
    // 리뷰 수정할 수 있는 모달 창 오픈
  } else if (btnType === 'delete') {
    // 삭제하시겠습니까? 컨펌창 띄우기
  }
};
