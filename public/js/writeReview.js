const reviewWriteModal = {
  overlay: document.querySelector('.review-write-modal__overlay'),
  window: document.querySelector('.review-write-modal'),
  writeBtn: document.querySelector('.review-write__btn'),
  closeBtnForDesktop: document.querySelector('.desktop-close-btn'),
  closeBtnForMobile: document.querySelector('.mobile-close-btn'),
};
console.log(reviewWriteModal);

reviewWriteModal.writeBtn.addEventListener('click', evt =>
  handleModalOpen(evt, reviewWriteModal.window),
);
reviewWriteModal.closeBtnForDesktop.addEventListener('click', evt =>
  handleModalOpen(evt, reviewWriteModal.window),
);
reviewWriteModal.closeBtnForMobile.addEventListener('click', evt =>
  handleModalOpen(evt, reviewWriteModal.window),
);
reviewWriteModal.overlay.addEventListener('click', evt =>
  handleModalOpen(evt, reviewWriteModal.window),
);
