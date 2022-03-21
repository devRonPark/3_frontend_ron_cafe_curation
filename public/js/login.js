const pwdRevealBtn = document.querySelector('.pwd-reveal');

const handlePwdReveal = evt => {
  const target = evt.currentTarget;
  console.log('target: ', target);
  const pwdInput = target.previousElementSibling;
  console.log('pwdInput: ', pwdInput);
  const icon = target.children[0];
  target.classList.toggle('active');

  if (target.classList.contains('active')) {
    pwdInput.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    pwdInput.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
  pwdInput.focus();
};
// 비밀번호 보기/숨기기 기능
pwdRevealBtn.addEventListener('click', handlePwdReveal);
