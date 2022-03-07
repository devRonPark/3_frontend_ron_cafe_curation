const navBtn = document.querySelector('#header .header__navBtn');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal .modal__header-close');
const modalOverlay = document.querySelector('#modal__overlay');

const handleModalOpen = event => {
  modal.classList.toggle('open');
  modalOverlay.classList.toggle('open');
};

navBtn.addEventListener('click', handleModalOpen);
modalCloseBtn.addEventListener('click', handleModalOpen);
modalOverlay.addEventListener('click', handleModalOpen);
