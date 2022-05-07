const cafeSearchForm = document.querySelector('#main-search-form');
const cafeSearchInput = document.querySelector('#main-search');

// 이름으로만 검색
const handleCafeSearch = evt => {
  evt.preventDefault();
  const searchText = cafeSearchInput.value ? cafeSearchInput.value : '';

  // 검색어 로컬 스토리지에 저장
  if (!(searchText === '')) {
    const recentKeywordsList = localStorage.getItem('recentKeywords')
      ? JSON.parse(localStorage.getItem('recentKeywords'))
      : [];
    recentKeywordsList.push(searchText);
    localStorage.setItem('recentKeywords', JSON.stringify(recentKeywordsList));
  }

  // 검색 결과 페이지로 이동
  const params = `${searchText ? `name=${searchText}&` : ''}`;

  // 검색어 혹은 검색 옵션이 선택된 경우에만 검색 결과 페이지로 이동
  if (!(params === '')) {
    window.location.href = `/search?${params}`;
  }
};

cafeSearchInput.addEventListener('click', handleCafeSearch);
cafeSearchForm.addEventListener('submit', handleCafeSearch);

const slideWrap = document.querySelector('.slide_wrap');
const slideList = document.querySelector('.slide_list');
const slideConts = document.querySelectorAll('.slide_conts');
const contsFirst = document.querySelector('.slide_conts:first-child');
const contsLast = document.querySelector('.slide_conts:last-child');
const slideLen = slideConts.length;
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const active = 'slide_active';
let contsWidth = 350;
let startNum = 0;
let carIndex;
let carSlide;

const firstNode = contsFirst.cloneNode(true);
const lastNode = contsLast.cloneNode(true);
firstNode.style.width = contsWidth + 'px';
lastNode.style.width = contsWidth + 'px';

slideList.appendChild(firstNode);
slideList.insertBefore(lastNode, slideList.firstElementChild);

slideList.style.transform = `translate(-${
  contsWidth * (startNum + 1) + 8
}px , 0)`;

carIndex = startNum;
carSlide = slideConts[carIndex];
carSlide.classList.add(active);

// make slide dot
function makeDot() {
  const dotWrap = document.querySelector('.dot_wrap');
  let dot = [];

  dot.push('<ul>');
  for (let i = 0; i < slideConts.length; i++) {
    dot.push(`
            <li class="dots">${i + 1}</li>
        `);
  }
  dot.push('</ul>');
  return (dotWrap.innerHTML = dot.join(''));
}

makeDot();

const dots = document.querySelectorAll('.dots');
let selectDot;
let dotIndex = 0;
selectDot = dots[dotIndex];
selectDot.classList.add('on');

function nextEvent() {
  if (carIndex <= slideLen - 1) {
    slideList.style.transition = `all 0.3s`;
    slideList.style.transform = `translate(-${
      (contsWidth + 8) * (carIndex + 2)
    }px, 0)`;
  }
  if (carIndex === slideLen - 1) {
    setTimeout(function () {
      slideList.style.transition = `0s`;
      slideList.style.transform = `translate(-${contsWidth + 8}px, 0)`;
    }, 300);
    carIndex = -1;
  }
  carSlide.classList.remove(active);
  carSlide = slideConts[++carIndex];
  carSlide.classList.add(active);

  if (dotIndex >= slideLen - 1) {
    dotIndex = -1;
  }
  selectDot.classList.remove('on');
  selectDot = dots[++dotIndex];
  selectDot.classList.add('on');
  console.log(selectDot);
}

function prevEvent() {
  if (carIndex >= 0) {
    slideList.style.transition = `all 0.3s`;
    slideList.style.transform = `translate(-${
      (contsWidth + 8) * carIndex
    }px, 0)`;
  }
  if (carIndex === 0) {
    setTimeout(function () {
      slideList.style.transition = `0s`;
      slideList.style.transform = `translate(-${
        (contsWidth + 8) * slideLen
      }px, 0)`;
    }, 300);
    carIndex = slideLen;
  }
  carSlide.classList.remove(active);
  carSlide = slideConts[--carIndex];
  carSlide.classList.add(active);

  if (dotIndex <= 0) {
    dotIndex = slideLen;
  }
  selectDot.classList.remove('on');
  selectDot = dots[--dotIndex];
  selectDot.classList.add('on');
}

// next button
nextBtn.addEventListener('click', function () {
  nextEvent();
});
// prev button
prevBtn.addEventListener('click', function () {
  prevEvent();
});

// play, pause button
let play;
play = setInterval(nextEvent, 3000);
playBtn.style.display = 'none';
pauseBtn.style.display = 'block';

playBtn.addEventListener('click', function () {
  play = setInterval(nextEvent, 3000);
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'block';
});

pauseBtn.addEventListener('click', function () {
  clearInterval(play);
  pauseBtn.style.display = 'none';
  playBtn.style.display = 'block';
});
