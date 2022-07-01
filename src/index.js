import './assets/css/style.css';
import './index.html';
import App from './modules/App.js';
import Card from './modules/Card.js';
import Involvement from "./modules/Involvement.js";

//const commentModal = document.querySelector('.comment-modal');
//const closeComment = document.querySelector('.close-modal');

const app = new App();
//const involvement = new Involvement;

/*if (typeof commentModal.showModal !== 'function') {
  commentModal.hidden = true;
   a fallback script to allow this dialog/form to function
       for legacy browsers that do not support <dialog>
       could be provided here.
    
}*/

/*closeComment.addEventListener('click', () => {
  commentModal.close();
})*/



app.createNew().then(() => {
  app.populate(Card, 5);
  /*const commentBtns = document.querySelectorAll('.btn-comment');  
  const commentInputs = document.querySelectorAll('.form-input');
  const submitComment = document.querySelector('#commentBtn');
  let commentData = {};
  [...commentBtns].forEach((commentBtn,index)=>{
      commentBtn.addEventListener('click', async () => {
        let comments = await involvement.getComments(index, app.id);
        const ul = document.createElement('ul');
        commentData.id = index;
        commentModal.children[1].innerHTML =`
            <div class="comment-container card-img-container">
              <img class="card-img" src="${app.cards[index].imageUrl}" alt="">
            </div>
            <h2 class="card-details-header">Avocado Salad</h2>
             <h3 class="card-details-header clr-primary">Comments</h3>
        `;
        if (!comments.error){
          [...comments].forEach((comment)=>{
            ul.innerHTML +=   `<li> ${comment.creation_date}: ${comment.username} - ${comment.comment} </li>`
          })
          commentModal.children[1].appendChild(ul);
        }
        commentModal.show();
      });
      
  })
  commentInputs.forEach((input)=> {
    input.addEventListener('change', (e)=>{
        if (input.name === 'name'){
          commentData.name = e.target.value;
        }
        if (input.name === 'comment'){
          commentData.comment = e.target.value;
        }
      submitComment.value = JSON.stringify(commentData);
    })
  })
  commentModal.addEventListener('close', async (e)=> {
    if (commentModal.returnValue){
      const formData = JSON.parse(commentModal.returnValue)
      if(formData.name){
      await involvement.createComment(formData.id, app.id, formData.name, formData.comment)
    }
  }
  })*/

});




