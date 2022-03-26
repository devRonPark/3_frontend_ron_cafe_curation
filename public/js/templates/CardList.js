import createUserLikeCafeCard from './UserLikeCafeCard.js';

/* 
cardDataObj = [
  { name: "", address: ""},
  { name: "", address: ""},
  { name: "", address: ""},
  { name: "", address: ""},  
  ...
]
*/
export default function createCardList(cardDataObj) {
  const cardList = document.createElement('ul');

  cardDataObj.forEach(cardInfo => {
    // createCard 함수 호출해서 card 데이터 개수만큼 card 요소 생성
    const userLikeCafeCard = createUserLikeCafeCard(cardInfo);
    cardList.appendChild(userLikeCafeCard);
  });

  cardList.classList.add('cafe-list');
  return cardList;
}