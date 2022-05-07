import { getCafeListAPI } from '../controllers/apiController.js';
import { renderItem } from '../lib/util.js';

const app = document.querySelector('#content');
const fetchMoreTrigger = document.querySelector('#fetchMore');
const listElem = document.querySelector('#cafe-list');
let page = 1;

const renderList = async page => {
  try {
    // 백엔드에 카페 데이터 요청
    const { data } = await getCafeListAPI(page);
    const list = data;
    const frag = document.createDocumentFragment();
    // // backend api로부터 응답받은 카페 데이터에 대해서 내가 원하는 DOM 형태로 가공 후 주입
    list.forEach(item => frag.appendChild(renderItem(item)));
    listElem.appendChild(frag);
  } catch (err) {
    console.error(err);
  }
};

const fetchMore = async () => {
  try {
    const target = page === 1 ? app : fetchMoreTrigger;
    target.classList.add('loading');
    await renderList(page++);
    target.classList.remove('loading');
  } catch (err) {
    console.error(err);
  }
};

const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
  if (isIntersecting) fetchMore();
});
fetchMoreObserver.observe(fetchMoreTrigger);

fetchMore();
