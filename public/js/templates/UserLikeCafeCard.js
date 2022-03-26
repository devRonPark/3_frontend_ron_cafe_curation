import createDisplayLikeBox from '../components/display/LikeBox.js';
import createSelectMenuBox from '../components/selectBox/SelectBox.js';
import createCard from '../components/card/Card.js';

/* 
<li class="cafe-item">
  <div class="cafe-item__heading">
   <a href="#" class="cafe-name">카페 퍼블리코</a>
  </div>
  <div class="cafe-item__content">
    <p class="cafe-jibun-address">동작구 대방동 395-18 헬로우빌딩 B동 1, 2층</p>
    <div class="like-box">
      <i class="fas fa-heart"></i>
      <span class="screen-reader-text">좋아요</span>
    </div>
    <div
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
  </div>
</li>
*/

export default function createUserLikeCafeCard(cafeInfo) {
  const jibunAddrBox = document.createElement('div');
  jibunAddrBox.classList.add('cafe-jibun-address');
  jibunAddrBox.textContent = cafeInfo.address;
  const displayLikeBox = createDisplayLikeBox();
  const selectMenuBox = createSelectMenuBox();
  const cafeContentElemList = [jibunAddrBox, displayLikeBox, selectMenuBox]; 
  const cafeItem = createCard(cafeInfo.name, cafeContentElemList);

  return cafeItem;
}