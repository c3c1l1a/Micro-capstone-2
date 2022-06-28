import './assets/css/style.css';
import './index.html';

const commentBtns = document.querySelectorAll('.comments');
const commentModal = document.querySelector('.comment-modal');
const closeComment = document.querySelector('.close-modal');

if (typeof commentModal.showModal !== 'function') {
  commentModal.hidden = true;
  /* a fallback script to allow this dialog/form to function
       for legacy browsers that do not support <dialog>
       could be provided here.
    */
}

commentBtns.forEach((commentBtn) => {
  commentBtn.addEventListener('click', () => {
    commentModal.show();
  });
});

closeComment.addEventListener('click', () => {
  commentModal.close();
});
