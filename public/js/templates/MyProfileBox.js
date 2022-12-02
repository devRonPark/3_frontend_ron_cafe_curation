import { backendBaseUrl } from '../lib/constants.js';
import { logoutReq } from '../controllers/apiController.js';

// js 이용해서 사용자 프로필 박스 만들기
export default function createMyProfileBox(nickname = null, imgPath = null) {
  /* 
  <div class="my-profile-box">
    <div class="profile-wrapper">
      <img alt=`${name}의 프로필` />
      <strong>${name} 님</strong>
      <img src="../images/arrow.png" class="arrowIcon" />
    </div>
    <ul class="my-menu-list">
      <li><a href="/account/mypage">마이 페이지</a></li>
      <li><a href="/account/info">계정 정보</a></li>
      <li><a href="javascript:void(0);">로그아웃</a></li>
    </ul>
  </div>
  */
  const myProfileBox = document.createElement('div');
  const profileWrapper = document.createElement('div');
  const profileImageBox = document.createElement('img');
  const nicknameBox = document.createElement('strong');
  const arrowIcon = document.createElement('img');
  const myMenuList = document.createElement('ul');
  const menusInfo = [
    { name: '마이 페이지', path: '/account/mypage' },
    { name: '계정 정보', path: '/account/info' },
    { name: '로그아웃', path: 'javascript:void(0);', class: 'logout-btn' },
    { name: '회원탈퇴', path: 'javascript:void(0);', class: 'leave-btn' },
  ];

  myProfileBox.classList.add('my-profile-box');
  profileWrapper.classList.add('profile-wrapper');
  profileImageBox.classList.add('profile-img');
  profileImageBox.src = `${backendBaseUrl}${imgPath.replace('/uploads', '')}`;
  profileImageBox.alt = `${nickname} 님의 프로필`;
  nicknameBox.classList.add('nickname');
  nicknameBox.innerText = `${nickname} 님`;
  arrowIcon.classList.add('arrow-icon');
  arrowIcon.src = '/images/arrow.png';
  myMenuList.classList.add('my-menu-list');

  profileWrapper.appendChild(profileImageBox);
  profileWrapper.appendChild(nicknameBox);
  profileWrapper.appendChild(arrowIcon);
  myProfileBox.appendChild(profileWrapper);

  menusInfo.forEach(menuInfo => {
    const menuItem = document.createElement('li');
    const menuLink = document.createElement('a');

    menuLink.innerText = menuInfo.name;
    menuLink.href = menuInfo.path;

    // 로그아웃 버튼 클릭 시,
    if (menuInfo.class && menuInfo.class === 'logout-btn') {
      menuItem.addEventListener('click', evt => {
        // 클라이언트 서버로 요청
        logoutReq()
          .then(response => {
            if (response.status === 204) {
              document.body.classList.remove('user-active');
              // 로컬 스토리지에 저장된 사용자 정보 삭제
              localStorage.removeItem('me');
              // 리로드 후 메인 페이지로 이동
              window.location.href = '/';
            }
          })
          .catch(err => console.error(err));
      });
    } else if (menuInfo.class && menuInfo.class === 'leave-btn') {
      menuItem.addEventListener('click', evt => {
        const isUserLeave = confirm('정말 회원에서 탈퇴하시겠습니까?');

        // 확인 누를 시, 회원 탈퇴 페이지로 이동
        if (isUserLeave) window.location.href = '/account/delete';
      });
    }

    menuItem.appendChild(menuLink);
    myMenuList.appendChild(menuItem);
  });

  myProfileBox.appendChild(myMenuList);

  profileWrapper.addEventListener('click', evt => {
    evt.currentTarget.classList.toggle('open');
  });
  return myProfileBox;
}
