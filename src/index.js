import './assets/css/style.css';
import './index.html';
import App from './modules/App.js';
import Card from './modules/Card.js';

const commentModal = document.querySelector('.comment-modal');
const closeComment = document.querySelector('.close-modal');

const app = new App();

app.createNew().then(() => {
  app.populate(Card, 5);
});

if (typeof commentModal.showModal !== 'function') {
  commentModal.hidden = true;
  /* a fallback script to allow this dialog/form to function
       for legacy browsers that do not support <dialog>
       could be provided here.
    */
}

closeComment.addEventListener('click', () => {
  commentModal.close();
})


