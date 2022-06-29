/**
* @jest-environment jsdom
*/

import fetchMock from 'jest-fetch-mock';
import App from '../modules/App.js';
import Card from '../modules/Card.js';

const card = new Card();
const app = new App();

fetchMock.enableMocks(); 

describe('App', ()=> {
  it('Tests if a new app has been created in Involvement API and a unique stored in localStorage', async ()=> {
    fetch.mockResponseOnce("ZyBiPoL5iOvL5CYLtNcq");
    await app.createNew();

    expect(app.id).toEqual(JSON.parse(localStorage.getItem('app')).id);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Tests a card is added to localstorage', async ()=> {
    fetch.mockResponseOnce(JSON.stringify({"image":"https://foodish-api.herokuapp.com/images/pizza/pizza43.jpg"})); 
    await app.populate(Card, 1);

    expect(app.cards.length).toEqual(1);
    expect(app.cards[0]).toEqual(JSON.parse(localStorage.getItem('app')).cards[0]);
    expect(app.cards[0].imageUrl).toEqual('https://foodish-api.herokuapp.com/images/pizza/pizza43.jpg');
  });
});


describe('Card', ()=> {
  it('Tests that a cardimage is fetched from foodie API', async () => {
    fetch.mockResponseOnce(JSON.stringify({"image":"https://foodish-api.herokuapp.com/images/pizza/pizza43.jpg"})); 
    await card.fetchImage();

    expect(card.imageUrl).toEqual('https://foodish-api.herokuapp.com/images/pizza/pizza43.jpg');
  });
});


