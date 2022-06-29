import './assets/css/style.css';
import './index.html';
import Involvement from './modules/Involvement.js';

const commentBtns = document.querySelectorAll('.comments');
const commentModal = document.querySelector('.comment-modal');
const closeComment = document.querySelector('.close-modal');
const appInvolvement = new Involvement();

if (typeof commentModal.showModal !== 'function') {
  commentModal.hidden = true;
  /* a fallback script to allow this dialog/form to function
       for legacy browsers that do not support <dialog>
       could be provided here.
    */
}

commentBtns.forEach((commentBtn) => {
  commentBtn.addEventListener('click', () => {
    const itemId = commentBtn.parentElement.parentElement.dataset.index;
    // const commentsData = appInvolvement.getComments(itemId);
    // console.log(commentsData);
    commentModal.children[1].innerHTML = `
    <img src="./src/assets/img/temp-plate.png" alt="">
      <h2>Avocado Salad</h2>
      <h3>Comments</h3>
      <ul>
        <li> 03/11/2021 Cecelia: I love  it</li>
      </ul>
    `;
    commentModal.show();
  });
});

closeComment.addEventListener('click', () => {
  commentModal.close();
});
