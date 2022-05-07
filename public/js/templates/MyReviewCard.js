import createIcon from '../components/icon/Icon.js';
import createSelectMenuBox from '../components/selectBox/SelectBox.js';
import {
  handleCardMenuListOpen,
  handleCardMenuClick,
} from '../controllers/cardDropdownMenu.js';

// * 커스텀 엘리먼트를 사용하는 이유
// 개발자들끼리 명확한 태그 분리
// 어트리뷰트가 자주 바뀔 때 사용
// 어트리뷰트는 사용자 인터랙션에 의해 백엔드를 거치지 않고 프론트 서버와 주고받을 때 사용
class MyReviewCard extends HTMLElement {
  // FIXME 데이터를 생성자에 받아오는 쪽이 좀 더 편하지 않을까?
  // 고정되는 값은 여기서 받아도 됨.
  constructor() {
    super();
  }
  /* 주입할 데이터 정보
  - 카페 정보 : 카페 이름(cafe-name), 
  - 사용자 정보 : 사용자 이름(user-name), 사용자 프로필 이미지(user-profile) 
  - 리뷰 정보 : 평점(star-rating), 한줄평(comment), 작성일(created-at)
  */
  /* DOM 구조 
    <div class="review-box">
      <!-- top -->
      <div class="box-top">
        <!-- profile -->
        <div class="user-profile">
          <div class="profile-image">
            <img src={user-profile} alt="user profile" />
          </div>
          <!-- name-and-username -->
          <div class="user-name">
            <strong>{user-name}</strong>
          </div>
        </div>
        <!-- reviews -->
        <!-- {star-rating} 정보 토대로 표시함. -->
        <div class="user-average-ratings">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="far fa-star"></i> <!-- Empty star -->
        </div>
      </div>
      <!-- Comments -->
      <div class="user-comment">
        <p class="cafe-name">
          <i class="fas fa-coffee"></i>
          {cafe-name}
        </p>
        <p class="comment-txt">{comment}</p>
        <p class="create-at">{created-at}</p>
      </div>
    </div>
  */
  // 해당 요소가 DOM에 추가될 때 브라우저가 호출함.
  connectedCallback() {
    const cardTop = document.createElement('div');
    const cardContent = document.createElement('div');

    const userProfile = document.createElement('div');
    const userAverageRatings = document.createElement('div');
    const userComment = document.createElement('div');

    const profileImageBox = document.createElement('div');
    const profileImage = document.createElement('img');
    const userNameBox = document.createElement('div');
    const userName = document.createElement('strong');

    const cafeName = document.createElement('a');
    const commentTxt = document.createElement('p');
    const createdAt = document.createElement('p');
    const cafeIcon = createIcon(['fas', 'fa-coffee']);
    const cafeNameTxtNode = document.createTextNode(
      this.getAttribute('cafe-name'),
    );
    const menuNameList = [
      { name: '수정', type: 'edit' },
      { name: '삭제', type: 'delete' },
    ];
    const clickHandlerList = {
      menuBtnHandler: handleCardMenuListOpen,
      btnListHandler: handleCardMenuClick,
    };
    // 드롭다운 메뉴 버튼과 드롭다운 메뉴 박스
    const selectBox = createSelectMenuBox(menuNameList, clickHandlerList);

    cardTop.classList.add('card-top');
    cardContent.classList.add('card-content');
    userProfile.classList.add('user-profile');
    userAverageRatings.classList.add('user-average-ratings');
    userComment.classList.add('user-comment');
    userProfile.classList.add('user-comment');
    profileImageBox.classList.add('profile-image');
    userNameBox.classList.add('user-name');
    cafeName.classList.add('cafe-name');
    commentTxt.classList.add('comment-txt');
    createdAt.classList.add('created-at');

    // FIXME: getAttribute는 getter 형태로 만든다.
    // function화
    cafeName.href = `/cafes/${this.getAttribute('cafe-id')}`;
    profileImage.src = this.getAttribute('user-profile');
    userName.textContent = this.getAttribute('user-name');
    commentTxt.textContent = this.getAttribute('comment');
    createdAt.textContent = this.getAttribute('created-at');
    /* 
      TODO 전달받은 데이터에 따라서 평점을 어떻게 보여줄 것인지 CSS로 제어 필요
      Hint: gradient 이용 => 0.8인 경우 gradient: yellow(80%), white(20%)
    */
    const ratings = this.getAttribute('star-rating');

    for (let i = 1; i < 6; i++) {
      // ratings 에 따라 채워지는 별의 종류가 달라짐.
      // <i class="fas fa-star"></i>
      const starIcon =
        i <= ratings
          ? createIcon(['fas', 'fa-star'])
          : createIcon(['far', 'fa-star']);
      userAverageRatings.appendChild(starIcon);
    }

    cafeName.appendChild(cafeIcon);
    cafeName.appendChild(cafeNameTxtNode);
    profileImageBox.appendChild(profileImage);
    userNameBox.appendChild(userName);
    userProfile.appendChild(profileImageBox);
    userProfile.appendChild(userNameBox);
    userComment.appendChild(cafeName);
    userComment.appendChild(commentTxt);
    userComment.appendChild(createdAt);
    cardTop.appendChild(userProfile);
    cardTop.appendChild(userAverageRatings);
    cardContent.appendChild(userComment);
    cardContent.appendChild(selectBox);
    this.appendChild(cardTop);
    this.appendChild(cardContent);
  }
}

customElements.define('my-review-card', MyReviewCard);
