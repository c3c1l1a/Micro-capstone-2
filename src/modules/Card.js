/* eslint-disable no-unused-vars */

import Involvement from "./Involvement.js";

export default class {
  constructor() {
    this.imageUrl = '';
    this.likes = 0;
    this.card = this.#createCardTemplate();
    this.comments = [];
    this.commentsDialogue = this.#commentsDialogueTemplate();
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

  #commentsDialogueTemplate(){
    const commentsDialogueTemplate = document.querySelector('.comments-popup-template');
    const commentsDialogue = commentsDialogueTemplate.content.firstElementChild.cloneNode(true);
    return commentsDialogue;
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

  async displayComment(index, appId) {
    const involvement = new Involvement();
    const commentBtn = this.card.querySelector('.btn-comment');
    const commentModal = this.commentsDialogue;
    const closeComment = this.commentsDialogue.querySelector('.close-modal');

    commentBtn.addEventListener('click', async () => {
     
      this.comments = await involvement.getComments(index, appId);

      commentModal.children[1].innerHTML =`
          <div class="comment-container card-img-container">
            <img class="card-img" src="${this.imageUrl}" alt="">
          </div>
          <h2 class="card-details-header">Avocado Salad</h2>
           <h3 class="card-details-header clr-primary">Comments</h3>
      `;

      
        const ul = document.createElement('ul');
        console.log(this.comments);
        this.comments.forEach((comment)=>{
          ul.innerHTML +=   `<li> ${comment.creation_date}: ${comment.username} - ${comment.comment} </li>`
        })
        commentModal.children[1].appendChild(ul);
      commentModal.show();
    });

    closeComment.addEventListener('click', () => {
      commentModal.close();
    });

    const mainTag = document.querySelector('main');
    mainTag.appendChild(commentModal);

  }

  async postComment(appId, cardId){
    const involvement = new Involvement();
    const commentModal = this.commentsDialogue;
    let commentData = {};
    const submitComment = commentModal.querySelector('#commentBtn');

    const commentInputs = commentModal.querySelectorAll('.form-input');
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
    });



    commentModal.addEventListener('close', async (e)=> {
      if (commentModal.returnValue){
        const formData = JSON.parse(commentModal.returnValue)
        if(formData.name){
          await involvement.createComment(cardId, appId, formData.name, formData.comment)
          this.comments = await involvement.getComments(cardId, appId);
        }
      }
    });
  }
}