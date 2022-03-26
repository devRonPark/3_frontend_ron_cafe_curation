export default function createCard(cardName, cardContentElemList) {
  const card = document.createElement('li');
  const cardHeading = document.createElement('div');
  const navigateBtn = document.createElement('a');
  const cardContentWrapper = document.createElement('div');

  card.classList.add("cafe-item");
  cardHeading.classList.add("cafe-item__heading");
  cardContentWrapper.classList.add("cafe-item__content");

  navigateBtn.href = "#";
  navigateBtn.textContent = cardName;
  
  if (cardContentElemList) {
    // modalContent에 추가될 요소가 2개 이상 존재할 경우
    if (Array.isArray(cardContentElemList)) {
      cardContentElemList.forEach(cardContentElem =>
        cardContentWrapper.appendChild(cardContentElem),
      );
    // modalContent에 추가될 요소가 한 개인 경우
    } else if (typeof cardContentElemList === 'object') {
      cardContentWrapper.appendChild(cardContentElemList);
    }
  }
  cardHeading.appendChild(navigateBtn);
  card.appendChild(cardHeading);
  card.appendChild(cardContentWrapper);

  return card;
}