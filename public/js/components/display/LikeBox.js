// XXX 5번 이상 재사용하지 않는 경우라면 굳이 컴포넌트화 할 필요가 없음.
export default function createDisplayLikeBox() {
  const likeBox = document.createElement('div');
  const iconElem = document.createElement('i');
  const boxNameElem = document.createElement('span');

  iconElem.classList.add(...["fas", "fa-heart"]);
  likeBox.classList.add('like-box');
  boxNameElem.classList.add('screen-reader-text');
  
  boxNameElem.textContent = "좋아요";

  likeBox.appendChild(iconElem);
  likeBox.appendChild(boxNameElem);
  return likeBox;
}