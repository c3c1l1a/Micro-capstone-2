/**
* @jest-environment jsdom
*/

import fetchMock from 'jest-fetch-mock';
import App from '../modules/App.js';
import Card from '../modules/Card.js';

fetchMock.enableMocks();
document.body.innerHTML = `
  <main>
      <template class="card-template">
          <div class="card">
              <div class="card-img-container">
                  <img class="card-img" src="./assets/img/temp-plate.png">
              </div>
              <div class="card-details">
                  <div class="card-details-header">
                      <h2 class="card-title">Avacado salad</h2>
                      <p class="likes-count-container">
                          <i class="fa fa-solid fa-heart"></i>
                          <sup class="likes-count"></sup>
                      </p>
                  </div>
                  <span class="btn-comment block">Comments</span>
                  <div class="card-details-body">
                      <div class="likes-button"> 
                          <i class="fa fa-solid fa-plus"></i>
                      </div>   
                  </div>
              </div>
          </div>
      </template>
      <template class="comments-popup-template">
          <dialog class="comment-modal container">
              <span class="close-modal block icon"> <img src="./assets/img/close.png" alt="comments-icon"> </span>   

              <div class="comment-item">
                 
              </div>
              <form class="comment-form flex" method="dialog">
                  <h2 class="card-details-header">Add a Comment</h2>
                  <input name="name" class="form-input" type="text" placeholder="Your name">
                  <textarea class="form-input" name="comment" id="" cols="30" rows="10" placeholder="Your insights"></textarea>
                  <button id="commentBtn" class="btn"> Comment </button>
              </form>
          </dialog>
          
      </template>
  </main>
`;

const card = new Card();
const app = new App();

describe('App', () => {
  it('Tests if a new app has been created in Involvement API and a unique stored in localStorage', async () => {
    fetch.mockResponseOnce('ZyBiPoL5iOvL5CYLtNcq');
    await app.createNew();

    expect(app.id).toEqual(JSON.parse(localStorage.getItem('app')).id);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Tests a card is added to localstorage', async () => {
    fetch.mockResponseOnce(JSON.stringify({ image: 'https://foodish-api.herokuapp.com/images/pizza/pizza43.jpg' }));
    await app.populate(Card, 1);

    expect(app.cards.length).toEqual(1);
    expect(app.cards[0].imageUrl).toEqual('https://foodish-api.herokuapp.com/images/pizza/pizza43.jpg');
  });
});

describe('Card', () => {
  it('Tests that a cardimage is fetched from foodie API', async () => {
    fetch.mockResponseOnce(JSON.stringify({ image: 'https://foodish-api.herokuapp.com/images/pizza/pizza43.jpg' }));
    await card.fetchImage();

    expect(card.imageUrl).toEqual('https://foodish-api.herokuapp.com/images/pizza/pizza43.jpg');
  });

  it('Tests that likes are added via involve API', async () => {
    fetch.mockResponse(JSON.stringify({
      likes: 5,
      item_id: 'item1',
    }));
    await card.displayLikes('ZyBiPoL5iOvL5CYLtNcq', 1);

    expect(fetch).toHaveBeenCalledTimes(5);
    expect(card.likes).toEqual(0);
  });
});

describe('Involvement', () => {

});
