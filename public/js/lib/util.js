import {
  displayInputValid,
  displayInputInvalid,
} from '../controllers/userValidate.js';

const timeFormatForTimer = time => {
  const minutes = Math.floor(time / 60).toString();
  const seconds = (time % 60).toString();

  return `
    ${minutes.length === 1 ? `0${minutes}` : minutes} :
    ${seconds.length === 1 ? `0${seconds}` : seconds}
  `;
};
// 10분으로 설정된 타이머
export const tenMinuteTimer = (start, func) => {
  const timerId = setInterval(() => {
    const endTime = start.getTime() + 601000;
    const currentTime = new Date().getTime();
    const gap = Math.floor((endTime - currentTime) / 1000);
    if (gap < 1) {
      return () => clearInterval(timer);
    }
    const leftTime = timeFormatForTimer(gap);
    func(leftTime);
  }, 1000);
  return timerId;
};
// 인풋에 값이 입력할 때마다 동작하는 이벤트 핸들러
export const handleInputChange = (evt, name, regExp, inputCheckBtn) => {
  const target = evt.target;
  const inputVal = target.value;
  // 특정 규칙을 만족할 때 버튼 활성화
  // 정규식을 이용하여 인풋 값 검증
  if (regExp.test(inputVal)) {
    displayInputValid({ inputElem: target, btnElem: inputCheckBtn });
  } else {
    displayInputInvalid({ inputElem: target, btnElem: inputCheckBtn });
  }
};

// CafeCard
// item => {id, name, jibun_address}
export const renderItem = item => {
  let { id, name, jibun_address } = item;
  jibun_address = jibun_address.replace('서울특별시 ', '');
  const li = document.createElement('li');
  li.dataset.id = id;
  li.classList.add('cafe-item');
  li.insertAdjacentHTML(
    'beforeend',
    `
      <a href="/cafes/${id}">
        <figure>
          <div class="thumb">
            <img
              src="../images/cafe_thumbnail_mobile.jpg"
              alt="[카페 이름] 사진 - [도로명 주소]"
            />
          </div>
          <figcaption>
            <div class="info">
              <span class="title">${name}</span>
              <span class="address">${jibun_address}</span>
              <strong class="point">4.4</strong>
            </div>
          </figcaption>
        </figure>
      </a>
    `,
  );
  return li;
};

export const makeBtn = (name, classNameList) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = name;

  if (Array.isArray(classNameList)) {
    btn.classList.add(...classNameList);
  } else {
    btn.classList.add(classNameList);
  }
  return btn;
};

function leftPad(value) {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
}

export function toStringByFormatting(source, delimiter = '-') {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());
  return [year, month, day].join(delimiter);
}

export const debounce = (func, delay) => {
  let timeoutId = null;
  // args => event object
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const handlePwdReveal = evt => {
  const target = evt.currentTarget;
  const pwdInput = target.previousElementSibling;
  const icon = target.children[0];
  target.classList.toggle('active');

  if (target.classList.contains('active')) {
    pwdInput.type = 'text';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  } else {
    pwdInput.type = 'password';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  }
  pwdInput.focus();
};
