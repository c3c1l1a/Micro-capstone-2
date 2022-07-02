/* eslint-disable no-unused-vars */
import Involvement from "./Involvement.js";

export default class {
  constructor() {
    this.imageUrl = '';
    this.likes = 0;
    this.card = this.#createCardTemplate();
    this.comments = 0;
    this.commentsArr = []
  }

  async fetchImage() {
    const response = await fetch('https://foodish-api.herokuapp.com/api/');
    const data = await response.json();
    this.imageUrl = data.image;
  }

  displayImage(appId, cardId) {
    const mainTag = document.querySelector('main');
    const cardImg = this.card.querySelector('.card-img');
    cardImg.setAttribute('src', this.imageUrl);

    mainTag.appendChild(this.card);
  }

  #createCardTemplate(){
    const cardTemplate = document.querySelector('.card-template');
    const card = cardTemplate.content.firstElementChild.cloneNode(true);
    return card;
  }

  postLikesToAPI(appId, cardId){
    const mainTag = document.querySelector('main');
    const likesButton = this.card.querySelector('.likes-button');
    likesButton.addEventListener('click', async (e)=>{
      e.preventDefault();
      let endpoint = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/'+ appId +'/likes/';

      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({
          item_id: cardId,
        }),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
         }
      });

      this.displayLikes(appId, cardId);
    });
  }

  async displayLikes(appId, cardId) {
    let endpoint = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/'+ appId +'/likes/';
    const response = await fetch(endpoint);

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();
      data.forEach((item)=>{
        if (item.item_id === cardId){
          this.likes = item.likes;
        }
      });
    }
    
    const likesButton = this.card.querySelector('.likes-count');
    likesButton.textContent = this.likes;
  }

  async displayComment(commentModal, index, appId) {
    const commentBtn = this.card.querySelector('.btn-comment');
    const closeComment = commentModal.querySelector('.close-modal');
    const involvement = new Involvement();

    commentBtn.addEventListener('click', async () => {
      let comments = await involvement.getComments(index, appId);
      if (!comments.error){ 
        this.commentsArr.push(comments)
        console.log(this.commentsArr)
        this.comments = [...comments].length 
      }
      commentModal.children[1].innerHTML =`
          <div class="comment-container card-img-container">
            <img class="card-img" src="${this.imageUrl}" alt="">
          </div>
          <h2 class="card-details-header">Avocado Salad</h2>
           <h3 class="card-details-header clr-primary">Comments (${this.comments || 0})</h3>
      `;
      if (!comments.error){
        const ul = document.createElement('ul');
        [...comments].forEach((comment)=>{
          ul.innerHTML +=   `<li> ${comment.creation_date}: ${comment.username} - ${comment.comment} </li>`
        })
        commentModal.children[1].appendChild(ul);
      }
      commentModal.show();
    });

    closeComment.addEventListener('click', () => {
      commentModal.close();
    });
  }

  async addComment(commentModal,){
    let commentData = {};
    const commentInputs = commentModal.querySelectorAll('.form-input');
    const submitComment = commentModal.querySelector('#commentBtn');


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
  })
  }
}