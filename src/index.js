import './assets/css/style.css';
import './index.html';
import App from './modules/App.js';
import Card from './modules/Card.js';

const app = new App();

app.createNew().then(() => {
  app.populate(Card, 6);
});
