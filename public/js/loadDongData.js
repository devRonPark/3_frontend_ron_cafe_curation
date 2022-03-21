// load gu, dong data of Seoul
const dongData = require('../json/dongDataInSeoul.json');
// {
//   [gu]: [ dongList ],
//   "종로구": [
//     "청운효자동", "사직동", "삼청동", "부암동", "평창동", "무악동", "교남동", "가회동", ...
//   ],
//   ...
// }
// const guList = [
//   '강남구',
//   '강동구',
//   '강북구',
//   '강서구',
//   '관악구',
//   '광진구',
//   '구로구',
//   '금천구',
//   '노원구',
//   '도봉구',
//   '동대문구',
//   '동작구',
//   '마포구',
//   '서대문구',
//   '서초구',
//   '성동구',
//   '성북구',
//   '양천구',
//   '영등포구',
//   '용산구',
//   '은평구',
//   '종로구',
//   '중구',
//   '중랑구',
// ];

const dataForDropdownMenu = {};
for (let i = 0; i < dongData.length; i++) {
  const guName = dongData[i]['구'];
  const dongName = dongData[i]['동'];
  if (!dataForDropdownMenu[guName]) {
    dataForDropdownMenu[guName] = [dongName];
  } else {
    dataForDropdownMenu[guName].push(dongName);
  }
}

module.exports = dataForDropdownMenu;
