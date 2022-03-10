const inputImage = document.querySelector('#input-image');

const handleUserProfileUpload = evt => {
  const input = evt.target;

  // 인풋 태그에 파일이 있는 경우
  if (input.files && input.files[0]) {
    // FileReader 인스턴스 생성
    const reader = new FileReader();

    // 이미지가 로드된 경우
    reader.addEventListener('load', evt => {
      const previewImage = document.getElementById('preview-image');
      previewImage.src = evt.target.result;
    });

    // reader가 이미지 읽도록 하기
    reader.readAsDataURL(input.files[0]);
  }
};
// input file에 change 이벤트 부여
inputImage.addEventListener('change', handleUserProfileUpload);
