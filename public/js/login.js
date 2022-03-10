const body = document.body;
const pwdRevealBtn = document.querySelector('.pwd-reveal');
const emailInput = document.querySelector('#email-address');
const passwordInput = document.querySelector('#password');
const domElemList = [pwdRevealBtn, emailInput, passwordInput];

const handlePwdReveal = evt => {
  const target = evt.currentTarget;
  const pwdInput = target.previousElementSibling;
  const icon = target.children[0];
  pwdInput.classList.toggle('active');

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
const handleInputActivate = evt => {
  const target = evt.currentTarget;
  target.classList.add('active');
};
const handleBodyClick = evt => {
  const target = evt.target;
  if (domElemList.includes(target)) {
    return;
  }

  if (emailInput.classList.contains('active'))
    emailInput.classList.remove('active');
  if (passwordInput.classList.contains('active'))
    passwordInput.classList.remove('active');
};
// 비밀번호 보기/숨기기 기능
pwdRevealBtn.addEventListener('click', handlePwdReveal);
emailInput.addEventListener('click', handleInputActivate);
passwordInput.addEventListener('click', handleInputActivate);
body.addEventListener('click', handleBodyClick);
