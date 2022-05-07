import { findCafeListAPI } from '../controllers/apiController.js';
import { renderItem } from '../lib/util.js';

const params = new URLSearchParams(window.location.search);
// 검색 옵션
const searchText = params.has('name') && params.get('name');
const cityInfo = params.has('city') && params.get('city');
const guInfo = params.has('gu') && params.get('gu');
const dongInfo = params.has('dong') && params.get('dong');
// .......
const app = document.querySelector('#content');
const fetchMoreTrigger = document.querySelector('#fetchMore');
const listElem = document.querySelector('#cafe-list');
const notFoundElem = document.querySelector('.not-found');
let page = 1;

const renderSearchedCafeList = async page => {
  try {
    const searchOption = {
      searchText,
      city: cityInfo,
      gu: guInfo,
      dong: dongInfo,
    };
    // 백엔드에 카페 데이터 요청
    const { data } = await findCafeListAPI(searchOption, page);
    const list = data;
    const frag = document.createDocumentFragment();
    // // backend api로부터 응답받은 카페 데이터에 대해서 내가 원하는 DOM 형태로 가공 후 주입
    list.forEach(item => frag.appendChild(renderItem(item)));
    listElem.appendChild(frag);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      // 검색 결과가 존재하지 않습니다.
      notFoundElem.classList.remove('hidden');
      notFoundElem.insertAdjacentHTML(
        'beforeend',
        `
        <p>${`${searchText ? `'${searchText}'` : ''}${
          cityInfo && guInfo && dongInfo
            ? `'${`${cityInfo} ${guInfo} ${dongInfo}`}'`
            : ''
        } 에 대한 검색 결과가 없습니다.`}</p>
      `,
      );
    }
  }
};

const fetchSearchedCafeList = async () => {
  try {
    const target = page === 1 ? app : fetchMoreTrigger;
    target.classList.add('loading');
    await renderSearchedCafeList(page++);
    target.classList.remove('loading');
  } catch (err) {
    return;
  }
};

const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
  if (isIntersecting) fetchSearchedCafeList();
});
fetchMoreObserver.observe(fetchMoreTrigger);

// 카페 카드를 클릭했을 경우, 해당 요소의 id에 해당하는 카페 상세 정보 페이지로 이동
listElem.addEventListener('click', evt => {
  const target = evt.target;
  console.log('cafeId: ', target.dataset.id);
});
